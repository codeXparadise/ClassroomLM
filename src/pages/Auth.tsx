import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, Sparkles, BookOpen } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';
import Logo from '@/components/ui/Logo';

const Auth = () => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'admin' | null>(null);

  if (selectedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedRole(null)}
              className="mb-4 text-gray-600 hover:text-gray-800 backdrop-blur-sm bg-white/50 hover:bg-white/70 transition-all duration-300 hover:scale-105 shadow-lg border border-white/20"
            >
              ← Back to role selection
            </Button>
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {selectedRole === 'student' ? 'Student' : 'Admin'} Portal
            </h1>
            <p className="text-gray-600 text-lg">
              {selectedRole === 'student' 
                ? 'Sign in or create an account to access your AI-powered learning dashboard'
                : 'Sign in or create an account to manage your intelligent classroom'
              }
            </p>
          </div>
          <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-8 border border-white/20 shadow-2xl">
            <AuthForm expectedRole={selectedRole} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-floating delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8 relative">
            <Logo size="lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-gradient">
            Welcome to ClassroomLM
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose your role to access your personalized AI-powered learning environment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card 
            className="cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 hover:border-blue-300 backdrop-blur-sm bg-white/70 hover:bg-white/80 hover:scale-105 group relative overflow-hidden"
            onClick={() => setSelectedRole('student')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                <GraduationCap className="h-10 w-10 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
                Student Portal
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Access your AI-powered learning environment with personalized tools and resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm text-gray-600 mb-8">
                <li className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-sm"></div>
                  <span>AI-powered research notebooks with citations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-sm"></div>
                  <span>Personal dashboard with progress tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-sm"></div>
                  <span>Collaborate and share with classmates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-sm"></div>
                  <span>Todo planner and study materials access</span>
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg text-lg py-3 rounded-xl">
                <Sparkles className="h-5 w-5 mr-2" />
                Continue as Student
              </Button>
            </CardContent>
          </Card>
          
          <Card 
            className="cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 hover:border-purple-300 backdrop-blur-sm bg-white/70 hover:bg-white/80 hover:scale-105 group relative overflow-hidden"
            onClick={() => setSelectedRole('admin')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                <Users className="h-10 w-10 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-300">
                Admin Portal
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Comprehensive classroom management with AI-powered insights and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm text-gray-600 mb-8">
                <li className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-sm"></div>
                  <span>Advanced student management and analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-sm"></div>
                  <span>Activity monitoring and attendance tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-sm"></div>
                  <span>Content distribution and quiz management</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-sm"></div>
                  <span>Event scheduling and comprehensive reporting</span>
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg text-lg py-3 rounded-xl">
                <BookOpen className="h-5 w-5 mr-2" />
                Continue as Admin
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-lg backdrop-blur-sm bg-white/50 rounded-xl p-4 border border-white/20 shadow-lg">
            New to ClassroomLM? Create an account to get started with AI-powered education.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;