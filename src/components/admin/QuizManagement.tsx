import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Clock, Users, FileText, Search, Edit, Trash2, Eye, Play, Pause, BarChart3 } from 'lucide-react';

const QuizManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    instructions: '',
    classId: '',
    startDate: '',
    endDate: '',
    durationMinutes: 60,
    totalPoints: 100,
    shuffleQuestions: false,
    showResults: true
  });

  // Mock data - replace with actual API calls
  const classes = [
    { id: '1', name: 'Advanced Biology' },
    { id: '2', name: 'Education Technology' },
    { id: '3', name: 'Business Studies' }
  ];

  const quizzes = [
    {
      id: '1',
      title: 'Molecular Biology Quiz',
      description: 'Quiz covering DNA replication and protein synthesis',
      className: 'Advanced Biology',
      startDate: '2025-01-20T10:00:00',
      endDate: '2025-01-20T11:00:00',
      durationMinutes: 60,
      totalPoints: 100,
      status: 'published',
      submissionCount: 25,
      totalStudents: 28,
      averageScore: 87,
      createdAt: '2025-01-15T09:00:00'
    },
    {
      id: '2',
      title: 'AI Applications Assessment',
      description: 'Assessment on artificial intelligence in education',
      className: 'Education Technology',
      startDate: '2025-01-25T14:00:00',
      endDate: '2025-01-25T15:30:00',
      durationMinutes: 90,
      totalPoints: 150,
      status: 'draft',
      submissionCount: 0,
      totalStudents: 35,
      averageScore: null,
      createdAt: '2025-01-14T11:30:00'
    },
    {
      id: '3',
      title: 'Business Strategy Exam',
      description: 'Comprehensive exam on business strategy concepts',
      className: 'Business Studies',
      startDate: '2025-01-30T09:00:00',
      endDate: '2025-01-30T11:00:00',
      durationMinutes: 120,
      totalPoints: 200,
      status: 'scheduled',
      submissionCount: 0,
      totalStudents: 42,
      averageScore: null,
      createdAt: '2025-01-12T16:45:00'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <FileText className="h-4 w-4 text-gray-600" />;
      case 'published':
        return <Play className="h-4 w-4 text-green-600" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'completed':
        return <BarChart3 className="h-4 w-4 text-purple-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      draft: { className: 'bg-gray-100 text-gray-800 border-gray-200' },
      published: { className: 'bg-green-100 text-green-800 border-green-200' },
      scheduled: { className: 'bg-blue-100 text-blue-800 border-blue-200' },
      completed: { className: 'bg-purple-100 text-purple-800 border-purple-200' }
    };

    return (
      <Badge variant="outline" {...variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleCreateQuiz = () => {
    // TODO: Implement actual API call
    console.log('Creating quiz:', quizData);
    setShowCreateDialog(false);
    setQuizData({
      title: '',
      description: '',
      instructions: '',
      classId: '',
      startDate: '',
      endDate: '',
      durationMinutes: 60,
      totalPoints: 100,
      shuffleQuestions: false,
      showResults: true
    });
  };

  const getCompletionRate = (submitted: number, total: number) => {
    return Math.round((submitted / total) * 100);
  };

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz & Exam Management</h2>
            <p className="text-gray-600">Create, schedule, and manage quizzes and exams</p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Create Quiz
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl backdrop-blur-sm bg-white/90">
              <DialogHeader>
                <DialogTitle>Create New Quiz</DialogTitle>
                <DialogDescription>Set up a new quiz or exam for your students</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Quiz Title</Label>
                  <Input
                    id="title"
                    value={quizData.title}
                    onChange={(e) => setQuizData({...quizData, title: e.target.value})}
                    placeholder="Enter quiz title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={quizData.description}
                    onChange={(e) => setQuizData({...quizData, description: e.target.value})}
                    placeholder="Quiz description"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea
                    id="instructions"
                    value={quizData.instructions}
                    onChange={(e) => setQuizData({...quizData, instructions: e.target.value})}
                    placeholder="Instructions for students"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select value={quizData.classId} onValueChange={(value) => setQuizData({...quizData, classId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={quizData.durationMinutes}
                      onChange={(e) => setQuizData({...quizData, durationMinutes: parseInt(e.target.value)})}
                      min="5"
                      max="300"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date & Time</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={quizData.startDate}
                      onChange={(e) => setQuizData({...quizData, startDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date & Time</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={quizData.endDate}
                      onChange={(e) => setQuizData({...quizData, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="points">Total Points</Label>
                    <Input
                      id="points"
                      type="number"
                      value={quizData.totalPoints}
                      onChange={(e) => setQuizData({...quizData, totalPoints: parseInt(e.target.value)})}
                      min="1"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={quizData.shuffleQuestions}
                        onCheckedChange={(checked) => setQuizData({...quizData, shuffleQuestions: checked})}
                      />
                      <Label>Shuffle questions for each student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={quizData.showResults}
                        onCheckedChange={(checked) => setQuizData({...quizData, showResults: checked})}
                      />
                      <Label>Show results immediately after submission</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateQuiz}>Create Quiz</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 border-white/30"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quizzes Table */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle>Quizzes & Exams</CardTitle>
          <CardDescription>Manage all quizzes and exams across your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quiz</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Avg Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuizzes.map((quiz) => {
                const completionRate = getCompletionRate(quiz.submissionCount, quiz.totalStudents);
                return (
                  <TableRow key={quiz.id} className="hover:bg-white/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(quiz.status)}
                        <div>
                          <div className="font-medium text-gray-900">{quiz.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{quiz.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-white/50 border-white/30">
                        {quiz.className}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(quiz.startDate).toLocaleDateString()}</div>
                        <div className="text-gray-500">
                          {new Date(quiz.startDate).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(quiz.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{quiz.submissionCount}/{quiz.totalStudents}</div>
                        <div className="text-gray-500">{completionRate}% complete</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {quiz.averageScore ? (
                        <div className="text-sm">
                          <div className="font-medium text-green-600">{quiz.averageScore}%</div>
                          <div className="text-gray-500">Average</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" className="hover:bg-blue-50 text-blue-600">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-gray-50">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-green-50 text-green-600">
                          <BarChart3 className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-red-50 text-red-600">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizManagement;