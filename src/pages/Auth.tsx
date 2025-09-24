import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';
import Logo from '@/components/ui/Logo';

const Auth = () => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'admin' | null>(null);

  if (selectedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedRole(null)}
              className="mb-4 text-gray-600 hover:text-gray-800"
            >
              ← Back to role selection
            </Button>
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedRole === 'student' ? 'Student' : 'Admin'} Portal
            </h1>
            <p className="text-gray-600">
              {selectedRole === 'student' 
                ? 'Sign in or create an account to access your learning dashboard'
                : 'Sign in or create an account to manage your classroom'
              }
            </p>
          </div>
          <AuthForm expectedRole={selectedRole} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to InsightsLM</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your role to access the appropriate dashboard and features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300"
            onClick={() => setSelectedRole('student')}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Student Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Access your learning materials, assignments, and AI-powered research tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-600 mb-6">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Create and manage AI-powered notebooks</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Submit and track assignments</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>View progress and grades</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Chat with documents using AI</span>
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Continue as Student
              </Button>
            </CardContent>
          </Card>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-300"
            onClick={() => setSelectedRole('admin')}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Admin Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Manage students, classes, assignments, and view comprehensive analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-600 mb-6">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span>Manage student accounts and enrollment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span>Create and distribute assignments</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span>Track progress and analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span>Organize classes and curriculum</span>
                </li>
              </ul>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Continue as Admin
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            New to InsightsLM? Create an account to get started with AI-powered learning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;