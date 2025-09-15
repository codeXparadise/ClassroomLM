import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Plus, Trash2, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface TodoWidgetProps {
  className?: string;
}

interface TodoItem {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  isCompleted: boolean;
  dueDate?: Date;
  course?: string;
}

const TodoWidget = ({ className }: TodoWidgetProps) => {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: '1',
      title: 'Complete Math Assignment #3',
      priority: 'high',
      isCompleted: false,
      dueDate: new Date(2025, 0, 20),
      course: 'Mathematics'
    },
    {
      id: '2',
      title: 'Read Chapter 5 - Physics',
      priority: 'medium',
      isCompleted: false,
      dueDate: new Date(2025, 0, 18),
      course: 'Physics'
    },
    {
      id: '3',
      title: 'Prepare for Chemistry Lab',
      priority: 'high',
      isCompleted: true,
      course: 'Chemistry'
    },
    {
      id: '4',
      title: 'Submit Biology Report',
      priority: 'medium',
      isCompleted: false,
      dueDate: new Date(2025, 0, 25),
      course: 'Biology'
    },
  ]);

  const [newTodo, setNewTodo] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: TodoItem = {
        id: Date.now().toString(),
        title: newTodo.trim(),
        priority: 'medium',
        isCompleted: false,
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
      setShowAddForm(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const activeTodos = todos.filter(todo => !todo.isCompleted);
  const completedTodos = todos.filter(todo => todo.isCompleted);

  return (
    <Card className={`${className} hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-green-50/30`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <CheckSquare className="h-5 w-5 text-green-600" />
            <span>Todo List</span>
            <Badge variant="secondary" className="ml-2">
              {activeTodos.length}
            </Badge>
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-green-600 hover:bg-green-100"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Todo Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 space-y-3">
            <Input
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              className="border-gray-200 focus:ring-2 focus:ring-green-500"
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={addTodo} className="bg-green-600 hover:bg-green-700">
                Add
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Active Todos */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {activeTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-start space-x-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              <Checkbox
                checked={todo.isCompleted}
                onCheckedChange={() => toggleTodo(todo.id)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {todo.title}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={`text-xs ${getPriorityColor(todo.priority)}`}>
                    {todo.priority}
                  </Badge>
                  {todo.course && (
                    <span className="text-xs text-gray-500">{todo.course}</span>
                  )}
                </div>
                {todo.dueDate && (
                  <div className="flex items-center space-x-1 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      Due {format(todo.dueDate, 'MMM d')}
                    </span>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-400 hover:text-red-500 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Completed Todos */}
        {completedTodos.length > 0 && (
          <div className="border-t border-gray-100 pt-3">
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Completed ({completedTodos.length})
            </h4>
            <div className="space-y-2">
              {completedTodos.slice(0, 3).map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg opacity-75"
                >
                  <Checkbox checked={true} onCheckedChange={() => toggleTodo(todo.id)} />
                  <span className="text-sm text-gray-600 line-through flex-1">
                    {todo.title}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTodos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <CheckSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">All caught up!</p>
            <p className="text-xs">No pending tasks</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoWidget;