import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, BookOpen } from 'lucide-react';
import { format, isToday, isTomorrow, isThisWeek } from 'date-fns';

interface EventsFeedProps {
  className?: string;
}

const EventsFeed = ({ className }: EventsFeedProps) => {
  // Sample events - replace with real data
  const upcomingEvents = [
    {
      id: 1,
      title: 'Advanced Calculus Lecture',
      type: 'lecture',
      course: 'Mathematics',
      startTime: new Date(2025, 0, 15, 10, 0),
      endTime: new Date(2025, 0, 15, 11, 30),
      location: 'Room 201',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Midterm Exam - Physics',
      type: 'exam',
      course: 'Physics',
      startTime: new Date(2025, 0, 16, 14, 0),
      endTime: new Date(2025, 0, 16, 16, 0),
      location: 'Hall A',
      color: 'bg-red-500'
    },
    {
      id: 3,
      title: 'Chemistry Lab Session',
      type: 'lecture',
      course: 'Chemistry',
      startTime: new Date(2025, 0, 18, 9, 0),
      endTime: new Date(2025, 0, 18, 12, 0),
      location: 'Lab 3',
      color: 'bg-green-500'
    },
    {
      id: 4,
      title: 'Assignment Due: Biology Report',
      type: 'assignment',
      course: 'Biology',
      startTime: new Date(2025, 0, 20, 23, 59),
      endTime: new Date(2025, 0, 20, 23, 59),
      location: 'Online Submission',
      color: 'bg-orange-500'
    },
    {
      id: 5,
      title: 'Group Project Presentation',
      type: 'assignment',
      course: 'Computer Science',
      startTime: new Date(2025, 0, 22, 15, 0),
      endTime: new Date(2025, 0, 22, 16, 0),
      location: 'Room 305',
      color: 'bg-purple-500'
    },
  ];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture': return <BookOpen className="h-4 w-4" />;
      case 'exam': return <Clock className="h-4 w-4" />;
      case 'assignment': return <Calendar className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 text-blue-800';
      case 'exam': return 'bg-red-100 text-red-800';
      case 'assignment': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isThisWeek(date)) return format(date, 'EEEE');
    return format(date, 'MMM d');
  };

  return (
    <Card className={`${className} hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-orange-50/30`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Calendar className="h-5 w-5 text-orange-600" />
          <span>Upcoming Events</span>
          <Badge variant="secondary" className="ml-2">
            {upcomingEvents.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${event.color} text-white shadow-sm`}>
                  {getEventTypeIcon(event.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">{event.course}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {getTimeLabel(event.startTime)} at {format(event.startTime, 'h:mm a')}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {upcomingEvents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No upcoming events</p>
            <p className="text-xs">Your schedule is clear</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventsFeed;