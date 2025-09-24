import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Clock, CheckCircle, AlertCircle, Search, Calendar } from 'lucide-react';

const AssignmentsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - replace with actual API calls
  const assignments = [
    {
      id: '1',
      title: 'Research Paper Analysis',
      description: 'Analyze the provided research papers and create a comprehensive summary',
      dueDate: '2025-01-20',
      status: 'pending',
      pointsPossible: 100,
      className: 'Advanced Biology',
      submittedAt: null,
      grade: null
    },
    {
      id: '2',
      title: 'Literature Review',
      description: 'Complete a literature review on modern educational technologies',
      dueDate: '2025-01-25',
      status: 'submitted',
      pointsPossible: 75,
      className: 'Education Technology',
      submittedAt: '2025-01-18',
      grade: null
    },
    {
      id: '3',
      title: 'Case Study Report',
      description: 'Write a detailed case study report based on the provided materials',
      dueDate: '2025-01-30',
      status: 'graded',
      pointsPossible: 100,
      className: 'Business Studies',
      submittedAt: '2025-01-15',
      grade: 87
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'submitted':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'graded':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'late':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { variant: 'secondary', className: 'bg-orange-100 text-orange-800' },
      submitted: { variant: 'secondary', className: 'bg-blue-100 text-blue-800' },
      graded: { variant: 'secondary', className: 'bg-green-100 text-green-800' },
      late: { variant: 'secondary', className: 'bg-red-100 text-red-800' }
    };

    return (
      <Badge {...variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.className.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status === 'pending';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Assignments</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignments</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="graded">Graded</SelectItem>
            <SelectItem value="late">Late</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className={`hover:shadow-md transition-shadow ${isOverdue(assignment.dueDate, assignment.status) ? 'border-red-200 bg-red-50' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(assignment.status)}
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      {isOverdue(assignment.dueDate, assignment.status) && (
                        <Badge variant="destructive">Overdue</Badge>
                      )}
                    </div>
                    <CardDescription className="text-gray-600">
                      {assignment.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {getStatusBadge(assignment.status)}
                    {assignment.grade !== null && (
                      <div className="text-lg font-bold text-green-600">
                        {assignment.grade}/{assignment.pointsPossible}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>{assignment.className}</span>
                    </div>
                    <div>
                      <span>{assignment.pointsPossible} points</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {assignment.status === 'pending' && (
                      <Button size="sm">
                        Submit Assignment
                      </Button>
                    )}
                    {assignment.status === 'graded' && (
                      <Button variant="outline" size="sm">
                        View Feedback
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No assignments found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No assignments have been posted yet'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AssignmentsList;