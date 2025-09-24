import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Calendar as CalendarIcon, Clock, MapPin, Users, Bell, Edit, Trash2 } from 'lucide-react';

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    eventType: 'general',
    startDate: '',
    endDate: '',
    location: '',
    classId: '',
    isAllClasses: false,
    reminderMinutes: 60
  });

  // Mock data - replace with actual API calls
  const classes = [
    { id: '1', name: 'Advanced Biology' },
    { id: '2', name: 'Education Technology' },
    { id: '3', name: 'Business Studies' }
  ];

  const events = [
    {
      id: '1',
      title: 'Biology Quiz',
      description: 'Chapter 5-7 quiz on molecular biology',
      eventType: 'quiz',
      startDate: '2025-01-20T10:00:00',
      endDate: '2025-01-20T11:00:00',
      location: 'Room 101',
      className: 'Advanced Biology',
      isAllClasses: false,
      reminderMinutes: 30,
      attendeeCount: 28
    },
    {
      id: '2',
      title: 'Guest Lecture: AI in Education',
      description: 'Special guest speaker on artificial intelligence applications',
      eventType: 'general',
      startDate: '2025-01-25T14:00:00',
      endDate: '2025-01-25T15:30:00',
      location: 'Main Auditorium',
      className: 'All Classes',
      isAllClasses: true,
      reminderMinutes: 60,
      attendeeCount: 105
    },
    {
      id: '3',
      title: 'Business Case Study Presentation',
      description: 'Student presentations on business case studies',
      eventType: 'presentation',
      startDate: '2025-01-22T13:00:00',
      endDate: '2025-01-22T15:00:00',
      location: 'Conference Room B',
      className: 'Business Studies',
      isAllClasses: false,
      reminderMinutes: 120,
      attendeeCount: 42
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'quiz':
      case 'exam':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'general':
        return <CalendarIcon className="h-4 w-4 text-blue-600" />;
      case 'presentation':
        return <Users className="h-4 w-4 text-purple-600" />;
      default:
        return <CalendarIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getEventBadge = (type: string) => {
    const variants: Record<string, any> = {
      quiz: { className: 'bg-orange-100 text-orange-800 border-orange-200' },
      exam: { className: 'bg-red-100 text-red-800 border-red-200' },
      general: { className: 'bg-blue-100 text-blue-800 border-blue-200' },
      presentation: { className: 'bg-purple-100 text-purple-800 border-purple-200' }
    };

    return (
      <Badge variant="outline" {...variants[type]}>
        {type.toUpperCase()}
      </Badge>
    );
  };

  const handleCreateEvent = () => {
    // TODO: Implement actual API call
    console.log('Creating event:', eventData);
    setShowCreateDialog(false);
    setEventData({
      title: '',
      description: '',
      eventType: 'general',
      startDate: '',
      endDate: '',
      location: '',
      classId: '',
      isAllClasses: false,
      reminderMinutes: 60
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const upcomingEvents = events
    .filter(event => new Date(event.startDate) >= new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Calendar</h2>
            <p className="text-gray-600">Schedule and manage academic events for your students</p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl backdrop-blur-sm bg-white/90">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>Schedule an event for your students</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={eventData.title}
                    onChange={(e) => setEventData({...eventData, title: e.target.value})}
                    placeholder="Enter event title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={eventData.description}
                    onChange={(e) => setEventData({...eventData, description: e.target.value})}
                    placeholder="Event description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type</Label>
                    <Select value={eventData.eventType} onValueChange={(value) => setEventData({...eventData, eventType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="presentation">Presentation</SelectItem>
                        <SelectItem value="assignment_due">Assignment Due</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={eventData.location}
                      onChange={(e) => setEventData({...eventData, location: e.target.value})}
                      placeholder="Event location"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date & Time</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={eventData.startDate}
                      onChange={(e) => setEventData({...eventData, startDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date & Time</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={eventData.endDate}
                      onChange={(e) => setEventData({...eventData, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={eventData.isAllClasses}
                      onCheckedChange={(checked) => setEventData({...eventData, isAllClasses: checked})}
                    />
                    <Label>Share with all classes</Label>
                  </div>
                  {!eventData.isAllClasses && (
                    <div className="space-y-2">
                      <Label htmlFor="class">Select Class</Label>
                      <Select value={eventData.classId} onValueChange={(value) => setEventData({...eventData, classId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="reminder">Reminder (minutes before)</Label>
                    <Select 
                      value={eventData.reminderMinutes.toString()} 
                      onValueChange={(value) => setEventData({...eventData, reminderMinutes: parseInt(value)})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="1440">1 day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateEvent}>Create Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              <span>Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-xl border border-white/30"
            />
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="lg:col-span-2 backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-purple-600" />
              <span>Upcoming Events</span>
            </CardTitle>
            <CardDescription>Scheduled events and important dates</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-xl backdrop-blur-sm bg-white/50 border border-white/30 hover:bg-white/70 hover:shadow-md transition-all duration-300 hover:scale-102"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getEventIcon(event.eventType)}
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getEventBadge(event.eventType)}
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
                    
                    <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{formatDate(event.startDate)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {formatTime(event.startDate)}
                            {event.endDate && ` - ${formatTime(event.endDate)}`}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {event.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{event.attendeeCount} attendees</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-white/30">
                      <Badge variant="outline" className="bg-white/50 border-white/30">
                        {event.className}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventCalendar;