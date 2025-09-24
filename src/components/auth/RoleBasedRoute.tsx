import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface RoleBasedRouteProps {
  studentComponent: React.ReactNode;
  adminComponent: React.ReactNode;
  fallback: React.ReactNode;
}

const RoleBasedRoute = ({ studentComponent, adminComponent, fallback }: RoleBasedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    },
    enabled: !!user && isAuthenticated,
  });

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const userRole = profile?.role;

  if (userRole === 'student') {
    return <>{studentComponent}</>;
  } else if (userRole === 'teacher' || userRole === 'admin') {
    return <>{adminComponent}</>;
  }

  // Fallback for users without a defined role
  return <>{fallback}</>;
};

export default RoleBasedRoute;