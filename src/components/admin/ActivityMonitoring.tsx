import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, Search, Filter, BookOpen, MessageCircle, FileText, Clock, Users, TrendingUp, Eye } from 'lucide-react';

const ActivityMonitoring = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterClass, setFilterClass] = useState('all');
  const [timeRange, setTimeRange] = useState('today');

  // Mock data - replace with actual API calls
  const activities = [
    {
      id: '1',
      studentId: 'student-1',
      studentName: 'John Smith',
      studentAvatar: null,
      activityType: 'notebook_created',
      activityData: { notebookTitle: 'Biology Research Notes' },
      className: 'Advanced Biology',
      timestamp: '2025-01-15T14:30:00',
      duration: 45
    },
    {
      id: '2',
      studentId: 'student-2',
      studentName: 'Mary Johnson',
      studentAvatar: null,
      activityType: 'chat_sent',
      activityData: { messageCount: 5, chatRoom: 'Biology Study Group' },
      className: 'Advanced Biology',
      timestamp: '2025-01-15T14:15:00',
      duration: 12
    },
    {
      id: '3',
      studentId: 'student-3',
      studentName: 'Robert Wilson',
      studentAvatar: null,
      activityType: 'material_accessed',
      activityData: { materialTitle: 'Molecular Biology Lecture Notes' },
      className: 'Advanced Biology',
      timestamp: '2025-01-15T13:45:00',
      duration: 23
    },
    {
      id: '4',
      studentId: 'student-1',
      studentName: 'John Smith',
      studentAvatar: null,
      activityType: 'assignment_submitted',
      activityData: { assignmentTitle: 'Research Paper Analysis' },
      className: 'Education Technology',
      timestamp: '2025-01-15T12:20:00',
      duration: 120
    }
  ];

  const activityStats = {
    totalActivities: 156,
    activeStudents: 42,
    avgSessionTime: 35,
    topActivity: 'notebook_created'
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'notebook_created':
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'chat_sent':
        return <MessageCircle className="h-4 w-4 text-green-600" />;
      case 'material_accessed':
        return <FileText className="h-4 w-4 text-purple-600" />;
      case 'assignment_submitted':
        return <FileText className="h-4 w-4 text-orange-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'notebook_created':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'chat_sent':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'material_accessed':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'assignment_submitted':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityDescription = (activity: any) => {
    switch (activity.activityType) {
      case 'notebook_created':
        return `Created notebook: "${activity.activityData.notebookTitle}"`;
      case 'chat_sent':
        return `Sent ${activity.activityData.messageCount} messages in ${activity.activityData.chatRoom}`;
      case 'material_accessed':
        return `Accessed material: "${activity.activityData.materialTitle}"`;
      case 'assignment_submitted':
        return `Submitted assignment: "${activity.activityData.assignmentTitle}"`;
      default:
        return 'Unknown activity';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getActivityDescription(activity).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || activity.activityType === filterType;
    const matchesClass = filterClass === 'all' || activity.className === filterClass;
    return matchesSearch && matchesType && matchesClass;
  });

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Activity Monitoring</h2>
        <p className="text-gray-600">Track student engagement and learning activities in real-time</p>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {activityStats.totalActivities}
            </div>
            <p className="text-sm text-gray-500">Last 24 hours</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{activityStats.activeStudents}</div>
            <p className="text-sm text-gray-500">Currently online</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Session Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{activityStats.avgSessionTime}m</div>
            <p className="text-sm text-gray-500">Per student</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Top Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-orange-600">Notebooks</div>
            <p className="text-sm text-gray-500">Most popular</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/50 border-white/30"
              />
            </div>
            <div className="flex space-x-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48 bg-white/50 border-white/30">
                  <SelectValue placeholder="Activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="notebook_created">Notebook Created</SelectItem>
                  <SelectItem value="chat_sent">Chat Messages</SelectItem>
                  <SelectItem value="material_accessed">Material Access</SelectItem>
                  <SelectItem value="assignment_submitted">Assignment Submitted</SelectItem>
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 bg-white/50 border-white/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <span>Recent Activities</span>
          </CardTitle>
          <CardDescription>Real-time student activity feed</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-xl backdrop-blur-sm bg-white/50 border border-white/30 hover:bg-white/70 hover:shadow-md transition-all duration-300 hover:scale-102"
                >
                  <Avatar className="w-10 h-10 shadow-md">
                    <AvatarImage src={activity.studentAvatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {getInitials(activity.studentName)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      {getActivityIcon(activity.activityType)}
                      <span className="font-medium text-gray-900">{activity.studentName}</span>
                      <Badge variant="outline" className={getActivityColor(activity.activityType)}>
                        {activity.activityType.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">
                      {getActivityDescription(activity)}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTime(activity.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{activity.className}</span>
                      </div>
                      {activity.duration && (
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>{activity.duration}m session</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="hover:bg-white/50">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityMonitoring;