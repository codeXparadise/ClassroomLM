import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { Settings, Eye, EyeOff } from 'lucide-react';
import ProgressChart from './widgets/ProgressChart';
import CalendarWidget from './widgets/CalendarWidget';
import TodoWidget from './widgets/TodoWidget';
import EventsFeed from './widgets/EventsFeed';
import AnalyticsWidget from './widgets/AnalyticsWidget';
import GradesWidget from './widgets/GradesWidget';

interface Widget {
  id: string;
  type: string;
  title: string;
  component: React.ComponentType<{ className?: string }>;
  isVisible: boolean;
  gridArea: string;
}

interface DashboardGridProps {
  className?: string;
}

const DashboardGrid = ({ className }: DashboardGridProps) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: 'progress',
      type: 'progress_chart',
      title: 'Progress Chart',
      component: ProgressChart,
      isVisible: true,
      gridArea: 'progress'
    },
    {
      id: 'calendar',
      type: 'calendar',
      title: 'Calendar',
      component: CalendarWidget,
      isVisible: true,
      gridArea: 'calendar'
    },
    {
      id: 'todos',
      type: 'todos',
      title: 'Todo List',
      component: TodoWidget,
      isVisible: true,
      gridArea: 'todos'
    },
    {
      id: 'events',
      type: 'events_feed',
      title: 'Events Feed',
      component: EventsFeed,
      isVisible: true,
      gridArea: 'events'
    },
    {
      id: 'analytics',
      type: 'analytics',
      title: 'Analytics',
      component: AnalyticsWidget,
      isVisible: true,
      gridArea: 'analytics'
    },
    {
      id: 'grades',
      type: 'grades',
      title: 'Grades',
      component: GradesWidget,
      isVisible: true,
      gridArea: 'grades'
    },
  ]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWidgets(items);
  };

  const toggleWidgetVisibility = (widgetId: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === widgetId 
        ? { ...widget, isVisible: !widget.isVisible }
        : widget
    ));
  };

  const visibleWidgets = widgets.filter(widget => widget.isVisible);

  if (isCustomizing) {
    return (
      <div className={className}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Customize Dashboard</h2>
          <Button onClick={() => setIsCustomizing(false)} className="bg-blue-600 hover:bg-blue-700">
            Done
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className={`p-4 rounded-xl border-2 border-dashed transition-all duration-200 ${
                widget.isVisible 
                  ? 'border-blue-300 bg-blue-50' 
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{widget.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleWidgetVisibility(widget.id)}
                  className={widget.isVisible ? 'text-blue-600' : 'text-gray-400'}
                >
                  {widget.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>
              <div className={`h-32 rounded-lg ${widget.isVisible ? 'bg-white' : 'bg-gray-200'} flex items-center justify-center`}>
                <span className="text-sm text-gray-500">
                  {widget.isVisible ? 'Visible' : 'Hidden'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <Button 
          variant="outline" 
          onClick={() => setIsCustomizing(true)}
          className="flex items-center space-x-2 hover:bg-gray-50"
        >
          <Settings className="h-4 w-4" />
          <span>Customize</span>
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr"
              style={{
                gridTemplateAreas: `
                  "progress progress calendar events"
                  "todos todos analytics analytics"
                  "grades grades grades grades"
                `
              }}
            >
              {visibleWidgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${snapshot.isDragging ? 'opacity-75 transform rotate-2' : ''} transition-all duration-200`}
                      style={{
                        gridArea: widget.gridArea,
                        ...provided.draggableProps.style,
                      }}
                    >
                      <widget.component className="h-full" />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DashboardGrid;