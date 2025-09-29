import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, FileText, BarChart3, Settings, TrendingUp, UserPlus, BookOpen, Calendar, Activity, UserCheck, Upload, Clock } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import StudentManagement from '@/components/admin/StudentManagement';
import ClassManagement from '@/components/admin/ClassManagement';
import AssignmentManagement from '@/components/admin/AssignmentManagement';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import ActivityMonitoring from '@/components/admin/ActivityMonitoring';
import AttendanceManagement from '@/components/admin/AttendanceManagement';
import StudyMaterialsManagement from '@/components/admin/StudyMaterialsManagement';
import EventCalendar from '@/components/admin/EventCalendar';
import QuizManagement from '@/components/admin/QuizManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-blue-50/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-pink-400/10 rounded-full blur-3xl animate-floating delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto px-6 py-8 relative">
        <div className="mb-8">
          <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage your classroom, students, and track educational progress.</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="backdrop-blur-sm bg-white/60 rounded-2xl p-2 border border-white/20 shadow-lg">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 bg-transparent gap-1">
              <TabsTrigger 
                value="overview" 
                className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
              >
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="students" 
                className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Students</span>
              </TabsTrigger>
              <TabsTrigger 
                value="classes" 
                className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Classes</span>
              </TabsTrigger>
              <TabsTrigger 
                value="assignments" 
                className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Assignments</span>
              </TabsTrigger>
              <TabsTrigger 
                value="materials" 
                className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Materials</span>
              </TabsTrigger>
              <TabsTrigger 
                value="quizzes" 
                className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
              >
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Quizzes</span>
              </TabsTrigger>
              <TabsTrigger 
                value="attendance" 
                className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
              >
                <UserCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Attendance</span>
              </TabsTrigger>
              <TabsTrigger 
                value="calendar" 
                className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Calendar</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">156</div>
                  <p className="text-sm text-green-600">+12 this month</p>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">8</div>
                  <p className="text-sm text-gray-500">3 subjects</p>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">24</div>
                  <p className="text-sm text-gray-500">5 pending review</p>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Avg. Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">85%</div>
                  <p className="text-sm text-green-600">+3% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle>Recent Student Activity</CardTitle>
                  <CardDescription>Latest student interactions and submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 shadow-sm">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white text-sm font-medium">JS</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">John Smith</p>
                        <p className="text-sm text-gray-600">Submitted Research Paper Analysis</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 cursor-pointer transition-all duration-300 border border-transparent hover:border-white/30">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white text-sm font-medium">MJ</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Mary Johnson</p>
                        <p className="text-sm text-gray-600">Created new notebook: "Biology Notes"</p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 cursor-pointer transition-all duration-300 border border-transparent hover:border-white/30">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white text-sm font-medium">RW</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Robert Wilson</p>
                        <p className="text-sm text-gray-600">Completed Literature Review assignment</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-center space-y-2 backdrop-blur-sm bg-white/50 border-white/30 hover:bg-white/70 transition-all duration-300 hover:scale-105 shadow-md"
                      onClick={() => setActiveTab('students')}
                    >
                      <UserPlus className="h-6 w-6 text-blue-600" />
                      <span className="text-sm font-medium">Add Student</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-center space-y-2 backdrop-blur-sm bg-white/50 border-white/30 hover:bg-white/70 transition-all duration-300 hover:scale-105 shadow-md"
                      onClick={() => setActiveTab('assignments')}
                    >
                      <FileText className="h-6 w-6 text-green-600" />
                      <span className="text-sm font-medium">New Assignment</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-center space-y-2 backdrop-blur-sm bg-white/50 border-white/30 hover:bg-white/70 transition-all duration-300 hover:scale-105 shadow-md"
                      onClick={() => setActiveTab('classes')}
                    >
                      <BookOpen className="h-6 w-6 text-purple-600" />
                      <span className="text-sm font-medium">Manage Classes</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-center space-y-2 backdrop-blur-sm bg-white/50 border-white/30 hover:bg-white/70 transition-all duration-300 hover:scale-105 shadow-md"
                      onClick={() => setActiveTab('analytics')}
                    >
                      <BarChart3 className="h-6 w-6 text-orange-600" />
                      <span className="text-sm font-medium">View Analytics</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students">
            <StudentManagement />
          </TabsContent>

          <TabsContent value="classes">
            <ClassManagement />
          </TabsContent>

          <TabsContent value="assignments">
            <AssignmentManagement />
          </TabsContent>

          <TabsContent value="materials">
            <StudyMaterialsManagement />
          </TabsContent>

          <TabsContent value="quizzes">
            <QuizManagement />
          </TabsContent>

          <TabsContent value="attendance">
            <AttendanceManagement />
          </TabsContent>

          <TabsContent value="calendar">
            <EventCalendar />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;