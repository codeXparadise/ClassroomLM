import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, FileText, Clock, TrendingUp, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotebooks } from '@/hooks/useNotebooks';
import NotebookGrid from '@/components/dashboard/NotebookGrid';
import StudentHeader from '@/components/student/StudentHeader';
import AssignmentsList from '@/components/student/AssignmentsList';
import ProgressOverview from '@/components/student/ProgressOverview';

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
    <div className="min-h-screen bg-gray-50">
      <StudentHeader />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back! Continue your learning journey with AI-powered insights.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="notebooks" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Notebooks</span>
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Assignments</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Notebooks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{notebooks?.length || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Pending Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">3</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Completed This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">7</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Average Grade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">87%</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Notebooks
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setActiveTab('notebooks')}
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
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => navigate(`/notebook/${notebook.id}`)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
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
                      <Button onClick={handleCreateNotebook} disabled={isCreating}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Notebook
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Upcoming Assignments
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setActiveTab('assignments')}
                    >
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 border border-orange-200">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Research Paper Analysis</p>
                        <p className="text-sm text-gray-600">Due: Tomorrow</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Literature Review</p>
                        <p className="text-sm text-gray-600">Due: Friday</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
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
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Notebooks</h2>
              <Button onClick={handleCreateNotebook} disabled={isCreating}>
                <Plus className="h-4 w-4 mr-2" />
                {isCreating ? 'Creating...' : 'New Notebook'}
              </Button>
            </div>
            {hasNotebooks ? <NotebookGrid /> : (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">No notebooks yet</h3>
                <p className="text-gray-600 mb-6">Create your first notebook to start organizing your research and notes.</p>
                <Button onClick={handleCreateNotebook} disabled={isCreating}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Notebook
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="assignments">
            <AssignmentsList />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressOverview />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;