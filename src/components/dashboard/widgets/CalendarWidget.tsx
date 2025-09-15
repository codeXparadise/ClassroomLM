import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';

interface CalendarWidgetProps {
  className?: string;
}

const CalendarWidget = ({ className }: CalendarWidgetProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample events - replace with real data
  const events = [
    { id: 1, title: 'Math Exam', date: new Date(2025, 0, 15), type: 'exam', color: 'bg-red-500' },
    { id: 2, title: 'Physics Lab', date: new Date(2025, 0, 18), type: 'lecture', color: 'bg-blue-500' },
    { id: 3, title: 'Chemistry Assignment Due', date: new Date(2025, 0, 22), type: 'assignment', color: 'bg-orange-500' },
    { id: 4, title: 'Biology Presentation', date: new Date(2025, 0, 25), type: 'lecture', color: 'bg-green-500' },
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <Card className={`${className} hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-purple-50/30`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Calendar className="h-5 w-5 text-purple-600" />
            <span>Calendar</span>
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-100">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h3>
          <Button variant="ghost" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const dayEvents = getEventsForDate(day);
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentDay = isToday(day);
              
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "relative p-2 text-sm rounded-lg transition-all duration-200 hover:bg-gray-100",
                    !isSameMonth(day, currentDate) && "text-gray-300",
                    isCurrentDay && "bg-blue-100 text-blue-600 font-semibold",
                    isSelected && "bg-purple-600 text-white hover:bg-purple-700"
                  )}
                >
                  {format(day, 'd')}
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {dayEvents.slice(0, 2).map((event, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full ${event.color}`}
                        />
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Events */}
        {selectedDateEvents.length > 0 && (
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {format(selectedDate, 'MMM d')} Events
            </h4>
            <div className="space-y-2">
              {selectedDateEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-3 h-3 rounded-full ${event.color}`} />
                  <span className="text-sm text-gray-700 flex-1">{event.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarWidget;