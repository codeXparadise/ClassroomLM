import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar as CalendarIcon, Clock, MapPin, Bell, BookOpen, FileText, Users } from 'lucide-react';

const StudentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock data - replace with actual API calls
  const events = [
    {
      id: '1',
      title: 'Biology Quiz',
      description: 'Chapter 5-7 quiz on molecular biology',
      type: 'quiz',
      startDate: '2025-01-20T10:00:00',
      endDate: '2025-01-20T11:00:00',
      location: 'Room 101',
      className: 'Advanced Biology',
      reminderMinutes: 30
    },
    {
      id: '2',
      title: 'Research Paper Due',
      description: 'Submit your research paper analysis',
      type: 'assignment_due',
      startDate: '2025-01-22T23:59:00',
      location: 'Online Submission',
      className: 'Education Technology'
    },
    {
      id: '3',
      title: 'Guest Lecture: AI in Education',
      description: 'Special guest speaker on artificial intelligence applications',
      type: 'general',
      startDate: '2025-01-25T14:00:00',
      endDate: '2025-01-25T15:30:00',
      location: 'Main Auditorium',
      className: 'All Classes'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'quiz':
      case 'exam':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'assignment_due':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'general':
        return <CalendarIcon className="h-4 w-4 text-purple-600" />;
      default:
        return <CalendarIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getEventBadge = (type: string) => {
    const variants: Record<string, any> = {
      quiz: { className: 'bg-orange-100 text-orange-800 border-orange-200' },
      exam: { className: 'bg-red-100 text-red-800 border-red-200' },
      assignment_due: { className: 'bg-blue-100 text-blue-800 border-blue-200' },
      general: { className: 'bg-purple-100 text-purple-800 border-purple-200' }
    };

    return (
      <Badge variant="outline" {...variants[type]}>
        {type.replace('_', ' ').toUpperCase()}
      </Badge>
    );
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const upcomingEvents = events
    .filter(event => new Date(event.startDate) >= new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5);

  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.startDate);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  });

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Calendar</h2>
        <p className="text-gray-600">View upcoming events, assignments, and important dates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
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
              className="rounded-xl border border-white/30 shadow-sm"
            />
          </CardContent>
        </Card>

        {/* Today's Events */}
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span>Today's Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              {todayEvents.length > 0 ? (
                <div className="space-y-3">
                  {todayEvents.map((event) => (
                    <div 
                      key={event.id}
                      className="p-3 rounded-xl bg-gradient-to-r from-blue-50/50 to-purple-50/50 border border-blue-200/30 hover:shadow-md transition-all duration-300 hover:scale-102"
                    >
                      <div className="flex items-start space-x-2 mb-2">
                        {getEventIcon(event.type)}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {formatTime(event.startDate)}
                          {event.endDate && ` - ${formatTime(event.endDate)}`}
                        </span>
                        {getEventBadge(event.type)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No events scheduled for today</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-purple-600" />
            <span>Upcoming Events</span>
          </CardTitle>
          <CardDescription>Important dates and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id}
                className="p-4 rounded-xl backdrop-blur-sm bg-white/50 border border-white/30 hover:bg-white/70 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getEventIcon(event.type)}
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                  </div>
                  {getEventBadge(event.type)}
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                
                <div className="space-y-2 text-xs text-gray-500">
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
                  {event.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-3 w-3" />
                    <span>{event.className}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentCalendar