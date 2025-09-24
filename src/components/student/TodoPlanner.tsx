import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, CheckSquare, Calendar, Clock, AlertCircle, Trash2, Edit, Filter } from 'lucide-react';

const TodoPlanner = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [filterPriority, setFilterPriority] = useState('all');
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: 'personal'
  });

  // Mock data - replace with actual API calls
  const todoItems = [
    {
      id: '1',
      title: 'Complete Biology Lab Report',
      description: 'Finish the enzyme analysis and write conclusions',
      dueDate: '2025-01-20T23:59:00',
      priority: 'high',
      category: 'assignment',
      status: 'pending',
      createdAt: '2025-01-15T10:00:00'
    },
    {
      id: '2',
      title: 'Study for Chemistry Quiz',
      description: 'Review chapters 8-10 on organic compounds',
      dueDate: '2025-01-22T09:00:00',
      priority: 'high',
      category: 'study',
      status: 'pending',
      createdAt: '2025-01-14T15:30:00'
    },
    {
      id: '3',
      title: 'Read Research Papers',
      description: 'Read 3 papers on machine learning applications',
      dueDate: '2025-01-25T18:00:00',
      priority: 'medium',
      category: 'study',
      status: 'pending',
      createdAt: '2025-01-13T12:00:00'
    },
    {
      id: '4',
      title: 'Group Project Meeting',
      description: 'Discuss project timeline and assign tasks',
      dueDate: '2025-01-18T16:00:00',
      priority: 'medium',
      category: 'personal',
      status: 'completed',
      createdAt: '2025-01-12T09:00:00'
    }
  ];

  const weeklyPlan = {
    goals: [
      'Complete all pending assignments',
      'Study for upcoming quizzes',
      'Organize research notes'
    ],
    notes: 'Focus on time management this week. Break down large tasks into smaller chunks.'
  };

  const handleAddTodo = () => {
    // TODO: Implement actual API call
    console.log('Adding todo:', newTodo);
    setShowAddDialog(false);
    setNewTodo({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      category: 'personal'
    });
  };

  const toggleTodoStatus = (todoId: string) => {
    // TODO: Implement actual API call
    console.log('Toggling todo status:', todoId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'assignment':
        return <CheckSquare className="h-4 w-4 text-blue-600" />;
      case 'study':
        return <Calendar className="h-4 w-4 text-purple-600" />;
      case 'personal':
        return <Clock className="h-4 w-4 text-green-600" />;
      default:
        return <CheckSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const filteredTodos = todoItems.filter(todo => {
    if (filterPriority === 'all') return true;
    return todo.priority === filterPriority;
  });

  const pendingTodos = filteredTodos.filter(todo => todo.status === 'pending');
  const completedTodos = filteredTodos.filter(todo => todo.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Todo & Weekly Planner</h2>
            <p className="text-gray-600">Organize your tasks and plan your week effectively</p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md backdrop-blur-sm bg-white/90">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>Create a new task for your todo list</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                    placeholder="Enter task title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                    placeholder="Task description (optional)"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newTodo.priority} onValueChange={(value) => setNewTodo({...newTodo, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={newTodo.category} onValueChange={(value) => setNewTodo({...newTodo, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="study">Study</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="datetime-local"
                    value={newTodo.dueDate}
                    onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTodo}>Add Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="todo" className="space-y-6">
        <div className="backdrop-blur-sm bg-white/60 rounded-2xl p-2 border border-white/20 shadow-lg">
          <TabsList className="grid w-full grid-cols-2 bg-transparent">
            <TabsTrigger 
              value="todo" 
              className="data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
            >
              <CheckSquare className="h-4 w-4 mr-2" />
              Todo List
            </TabsTrigger>
            <TabsTrigger 
              value="planner" 
              className="data-[state=active]:bg-white/80 data-[state=active]:shadow-md transition-all duration-300 hover:bg-white/50"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Weekly Planner
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="todo" className="space-y-6">
          {/* Filters */}
          <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Filter className="h-4 w-4 text-gray-600" />
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-48 bg-white/50 border-white/30">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <span>Pending Tasks ({pendingTodos.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-102 hover:shadow-lg ${
                      isOverdue(todo.dueDate)
                        ? 'bg-red-50/80 border-red-200/50'
                        : 'bg-white/50 border-white/30 hover:bg-white/70'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={false}
                        onCheckedChange={() => toggleTodoStatus(todo.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          {getCategoryIcon(todo.category)}
                          <h4 className="font-medium text-gray-900">{todo.title}</h4>
                          <Badge variant="outline" className={getPriorityColor(todo.priority)}>
                            {todo.priority}
                          </Badge>
                          {isOverdue(todo.dueDate) && (
                            <Badge variant="destructive" className="animate-pulse">
                              Overdue
                            </Badge>
                          )}
                        </div>
                        {todo.description && (
                          <p className="text-sm text-gray-600 mb-2">{todo.description}</p>
                        )}
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{todo.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" className="hover:bg-white/50">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-red-50 text-red-600">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Completed Tasks */}
          {completedTodos.length > 0 && (
            <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckSquare className="h-5 w-5 text-green-600" />
                  <span>Completed Tasks ({completedTodos.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completedTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className="p-4 rounded-xl backdrop-blur-sm bg-green-50/50 border border-green-200/30 transition-all duration-300 hover:scale-102"
                    >
                      <div className="flex items-start space-x-3">
                        <Checkbox checked={true} disabled className="mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-700 line-through">{todo.title}</h4>
                          <p className="text-sm text-gray-500">
                            Completed on {new Date(todo.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="planner" className="space-y-6">
          {/* Weekly Goals */}
          <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span>Weekly Goals</span>
              </CardTitle>
              <CardDescription>Set and track your weekly learning objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyPlan.goals.map((goal, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-xl backdrop-blur-sm bg-white/50 border border-white/30 hover:bg-white/70 transition-all duration-300"
                  >
                    <Checkbox />
                    <span className="text-gray-900">{goal}</span>
                  </div>
                ))}
              </div>
              
              {weeklyPlan.notes && (
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-purple-50/50 border border-blue-200/30">
                  <h4 className="font-medium text-gray-900 mb-2">Weekly Notes</h4>
                  <p className="text-sm text-gray-700">{weeklyPlan.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weekly Schedule */}
          <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Plan your study sessions and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="font-medium text-gray-900 mb-2">{day}</div>
                    <div className="space-y-2">
                      {/* Mock schedule items */}
                      {index < 5 && (
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100/80 to-purple-100/80 border border-blue-200/30 text-xs">
                          <div className="font-medium">Study Session</div>
                          <div className="text-gray-600">2:00 PM</div>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-100/80 to-red-100/80 border border-orange-200/30 text-xs">
                          <div className="font-medium">Quiz</div>
                          <div className="text-gray-600">10:00 AM</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TodoPlanner;