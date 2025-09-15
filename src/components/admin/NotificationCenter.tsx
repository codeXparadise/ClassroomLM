import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Bell, Send, Users, BookOpen, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'assignment' | 'grade' | 'event' | 'system';
  targetRoles: string[];
  targetCourses: string[];
  sentAt: Date;
  readBy: number;
  totalRecipients: number;
}

const NotificationCenter = () => {
  const [isComposing, setIsComposing] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [notificationType, setNotificationType] = useState('announcement');
  const [targetRoles, setTargetRoles] = useState<string[]>([]);
  const [targetCourses, setTargetCourses] = useState<string[]>([]);

  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Semester Break Announcement',
      message: 'The semester break will begin on February 15th and classes will resume on March 1st.',
      type: 'announcement',
      targetRoles: ['student', 'teacher'],
      targetCourses: [],
      sentAt: new Date(2025, 0, 10),
      readBy: 245,
      totalRecipients: 300
    },
    {
      id: '2',
      title: 'New Assignment Posted',
      message: 'A new assignment has been posted for Advanced Mathematics. Due date: January 25th.',
      type: 'assignment',
      targetRoles: ['student'],
      targetCourses: ['math-101'],
      sentAt: new Date(2025, 0, 12),
      readBy: 28,
      totalRecipients: 35
    },
    {
      id: '3',
      title: 'System Maintenance',
      message: 'The platform will undergo maintenance on January 20th from 2:00 AM to 4:00 AM.',
      type: 'system',
      targetRoles: ['student', 'teacher', 'admin'],
      targetCourses: [],
      sentAt: new Date(2025, 0, 14),
      readBy: 180,
      totalRecipients: 300
    },
  ]);

  const handleRoleToggle = (role: string) => {
    setTargetRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const sendNotification = () => {
    if (!title.trim() || !message.trim() || targetRoles.length === 0) {
      return;
    }

    const newNotification: Notification = {
      id: Date.now().toString(),
      title: title.trim(),
      message: message.trim(),
      type: notificationType as any,
      targetRoles,
      targetCourses,
      sentAt: new Date(),
      readBy: 0,
      totalRecipients: 100, // This would be calculated based on actual recipients
    };

    setNotifications([newNotification, ...notifications]);
    
    // Reset form
    setTitle('');
    setMessage('');
    setTargetRoles([]);
    setTargetCourses([]);
    setIsComposing(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'announcement': return <Bell className="h-4 w-4" />;
      case 'assignment': return <BookOpen className="h-4 w-4" />;
      case 'system': return <AlertCircle className="h-4 w-4" />;
      case 'event': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'assignment': return 'bg-green-100 text-green-800';
      case 'system': return 'bg-red-100 text-red-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notification Center</h1>
          <p className="text-gray-600">Send announcements and manage communications</p>
        </div>
        <Button 
          onClick={() => setIsComposing(!isComposing)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Send className="h-4 w-4 mr-2" />
          Compose
        </Button>
      </div>

      {/* Compose Notification */}
      {isComposing && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-blue-600" />
              <span>Compose Notification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Notification title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={notificationType} onValueChange={setNotificationType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-3">
              <Label>Target Audience</Label>
              <div className="flex flex-wrap gap-4">
                {['student', 'teacher', 'admin'].map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={role}
                      checked={targetRoles.includes(role)}
                      onCheckedChange={() => handleRoleToggle(role)}
                    />
                    <Label htmlFor={role} className="capitalize">
                      {role}s
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button onClick={sendNotification} className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4 mr-2" />
                Send Notification
              </Button>
              <Button variant="outline" onClick={() => setIsComposing(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={getNotificationColor(notification.type)}>
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </Badge>
                      {notification.targetRoles.map((role) => (
                        <Badge key={role} variant="outline" className="text-xs">
                          {role.charAt(0).toUpperCase() + role.slice(1)}s
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>{format(notification.sentAt, 'MMM d, yyyy')}</p>
                  <p>{format(notification.sentAt, 'h:mm a')}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{notification.totalRecipients} recipients</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{notification.readBy} read</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {Math.round((notification.readBy / notification.totalRecipients) * 100)}% read rate
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications sent</h3>
            <p className="text-gray-600">Start by composing your first notification</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationCenter;