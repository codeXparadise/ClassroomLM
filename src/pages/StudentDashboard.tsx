import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, FileText, Clock, TrendingUp, Plus, Search, Calendar, MessageCircle, SquareCheck as CheckSquare, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotebooks } from '@/hooks/useNotebooks';
import NotebookGrid from '@/components/dashboard/NotebookGrid';
import StudentHeader from '@/components/student/StudentHeader';
import AssignmentsList from '@/components/student/AssignmentsList';
import ProgressOverview from '@/components/student/ProgressOverview';
import StudentCalendar from '@/components/student/StudentCalendar';
import StudentChat from '@/components/student/StudentChat';
import TodoPlanner from '@/components/student/TodoPlanner';
import StudyMaterials from '@/components/student/StudyMaterials';
import SharedNotebooks from '@/components/student/SharedNotebooks';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { notebooks, createNotebook, isCreating } = useNotebooks();
  const [activeTab, setActiveTab] = useState('overview');

  const handleCreateNotebook = () => {
    createNotebook({
      title: 'Untitled notebook',
      description: ''
    }, {
      onSuccess: (data) => {
        navigate(`/notebook/${data.id}`);
      }
    });
  };

  const recentNotebooks = notebooks?.slice(0, 3) || [];
  const hasNotebooks = notebooks && notebooks.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-floating delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <StudentHeader />
      
      <main className="max-w-7xl mx-auto px-6 py-8 relative">
        <div className="mb-8">
          <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Student Dashboard
            </h1>
            <p className="text-gray-600">Welcome back! Continue your learning journey with AI-powered insights.</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="backdrop-blur-sm bg-white/60 rounded-2xl p-2 border border-white/20 shadow-lg">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-transparent gap-1">
              <TabsTrigger 
                value="overview" 
                className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
              >
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notebooks" 
                className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Notebooks</span>
              </TabsTrigger>
              <TabsTrigger 
                value="shared" 
                className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Shared</span>
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
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Materials</span>
              </TabsTrigger>
              <TabsTrigger 
                value="todo" 
                className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
              >
                <CheckSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Todo</span>
              </TabsTrigger>
              <TabsTrigger 
                value="calendar" 
                className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Calendar</span>
              </TabsTrigger>
              <TabsTrigger 
                value="chat" 
                className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Chat</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Notebooks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {notebooks?.length || 0}
                  </div>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Pending Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">3</div>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Completed This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">7</div>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Average Grade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">87%</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Notebooks
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setActiveTab('notebooks')}
                      className="hover:bg-white/50 transition-colors"
                    >
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {hasNotebooks ? (
                    <div className="space-y-3">
                      {recentNotebooks.map((notebook) => (
                        <div 
                          key={notebook.id}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 cursor-pointer transition-all duration-300 hover:scale-102 border border-transparent hover:border-white/30"
                          onClick={() => navigate(`/notebook/${notebook.id}`)}
                        >
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-sm">
                            <span className="text-lg">{notebook.icon || '📝'}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{notebook.title}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(notebook.updated_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No notebooks yet</p>
                      <Button 
                        onClick={handleCreateNotebook} 
                        disabled={isCreating}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Notebook
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Upcoming Assignments
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setActiveTab('assignments')}
                      className="hover:bg-white/50 transition-colors"
                    >
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/50 shadow-sm">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Research Paper Analysis</p>
                        <p className="text-sm text-gray-600">Due: Tomorrow</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 cursor-pointer transition-all duration-300 border border-transparent hover:border-white/30">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Literature Review</p>
                        <p className="text-sm text-gray-600">Due: Friday</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 cursor-pointer transition-all duration-300 border border-transparent hover:border-white/30">
                      <FileText className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Case Study Report</p>
                        <p className="text-sm text-gray-600">Due: Next Week</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notebooks" className="space-y-6">
            <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">My Notebooks</h2>
                <Button 
                  onClick={handleCreateNotebook} 
                  disabled={isCreating}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {isCreating ? 'Creating...' : 'New Notebook'}
                </Button>
              </div>
            </div>
            {hasNotebooks ? <NotebookGrid /> : (
              <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-16 border border-white/20 shadow-lg text-center">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">No notebooks yet</h3>
                <p className="text-gray-600 mb-6">Create your first notebook to start organizing your research and notes.</p>
                <Button 
                  onClick={handleCreateNotebook} 
                  disabled={isCreating}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Notebook
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="shared">
            <SharedNotebooks />
          </TabsContent>

          <TabsContent value="assignments">
            <AssignmentsList />
          </TabsContent>

          <TabsContent value="materials">
            <StudyMaterials />
          </TabsContent>

          <TabsContent value="todo">
            <TodoPlanner />
          </TabsContent>

          <TabsContent value="calendar">
            <StudentCalendar />
          </TabsContent>

          <TabsContent value="chat">
            <StudentChat />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;