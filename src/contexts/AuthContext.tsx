import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types/database';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select(`
          *,
          institution:institutions(*)
        `)
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (err) {
      console.error('Error in fetchUserProfile:', err);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const userProfile = await fetchUserProfile(user.id);
      setProfile(userProfile);
    }
  };

  const updateAuthState = async (newSession: Session | null) => {
    console.log('AuthContext: Updating auth state:', newSession?.user?.email || 'No session');
    setSession(newSession);
    setUser(newSession?.user ?? null);
    
    if (newSession?.user) {
      const userProfile = await fetchUserProfile(newSession.user.id);
      setProfile(userProfile);
    } else {
      setProfile(null);
    }
    
    if (newSession && error) {
      setError(null);
    }
  };

  const clearAuthState = () => {
    console.log('AuthContext: Clearing auth state');
    setSession(null);
    setUser(null);
    setProfile(null);
    setError(null);
  };

  const signOut = async () => {
    try {
      console.log('AuthContext: Starting logout process...');
      clearAuthState();
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.log('AuthContext: Logout error:', error);
        if (error.message.includes('session_not_found') || 
            error.message.includes('Session not found') ||
            error.status === 403) {
          console.log('AuthContext: Session already invalid on server');
          return;
        }
        await supabase.auth.signOut({ scope: 'local' });
        return;
      }
      
      console.log('AuthContext: Logout successful');
    } catch (err) {
      console.error('AuthContext: Unexpected logout error:', err);
      try {
        await supabase.auth.signOut({ scope: 'local' });
      } catch (localError) {
        console.error('AuthContext: Failed to clear local session:', localError);
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!mounted) return;
        
        console.log('AuthContext: Auth state changed:', event, newSession?.user?.email || 'No session');
        
        if (event === 'SIGNED_OUT') {
          clearAuthState();
          setLoading(false);
          return;
        }
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          await updateAuthState(newSession);
          setLoading(false);
          return;
        }
        
        if (session?.access_token !== newSession?.access_token) {
          await updateAuthState(newSession);
          if (loading) setLoading(false);
        }
      }
    );

    const initializeAuth = async () => {
      try {
        console.log('AuthContext: Initializing auth...');
        
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('AuthContext: Error getting initial session:', sessionError);
          
          if (sessionError.message.includes('session_not_found') || 
              sessionError.message.includes('Session not found')) {
            console.log('AuthContext: Session not found on server, clearing local session');
            await supabase.auth.signOut({ scope: 'local' });
            if (mounted) {
              clearAuthState();
              setLoading(false);
            }
            return;
          }
          
          if (mounted) {
            setError(sessionError.message);
            setLoading(false);
          }
          return;
        }
        
        if (mounted) {
          console.log('AuthContext: Initial session:', initialSession?.user?.email || 'No session');
          await updateAuthState(initialSession);
          setLoading(false);
        }
      } catch (err) {
        console.error('AuthContext: Auth initialization error:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Authentication error');
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    user,
    session,
    profile,
    loading,
    error,
    isAuthenticated: !!user && !!session && !!profile,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};