import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  BarChart3, 
  Users, 
  Settings,
  Bell,
  FileText,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const { profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getNavigationItems = () => {
    const baseItems = [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', badge: null },
    ];

    if (profile?.role === 'student') {
      return [
        ...baseItems,
        { icon: BookOpen, label: 'My Courses', path: '/courses', badge: null },
        { icon: FileText, label: 'Assignments', path: '/assignments', badge: '3' },
        { icon: BarChart3, label: 'Grades', path: '/grades', badge: null },
        { icon: Calendar, label: 'Calendar', path: '/calendar', badge: null },
        { icon: CheckSquare, label: 'Todo List', path: '/todos', badge: '5' },
      ];
    }

    if (profile?.role === 'teacher') {
      return [
        ...baseItems,
        { icon: BookOpen, label: 'My Courses', path: '/courses', badge: null },
        { icon: Users, label: 'Students', path: '/students', badge: null },
        { icon: FileText, label: 'Assignments', path: '/assignments', badge: null },
        { icon: BarChart3, label: 'Analytics', path: '/analytics', badge: null },
        { icon: Calendar, label: 'Schedule', path: '/calendar', badge: null },
      ];
    }

    if (profile?.role === 'admin') {
      return [
        ...baseItems,
        { icon: Users, label: 'User Management', path: '/users', badge: null },
        { icon: BookOpen, label: 'Course Management', path: '/courses', badge: null },
        { icon: Bell, label: 'Notifications', path: '/notifications', badge: null },
        { icon: BarChart3, label: 'Analytics', path: '/analytics', badge: null },
        { icon: Settings, label: 'Settings', path: '/settings', badge: null },
      ];
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose?.();
  };

  return (
    <aside className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
      "fixed inset-y-0 left-0 z-40 w-64 transform md:relative md:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ClassroomLM
              </h2>
              <p className="text-xs text-gray-500 capitalize">{profile?.role} Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-12 transition-all duration-200",
                  isActive 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                    : "hover:bg-gray-100 text-gray-700"
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>ClassroomLM v1.0</p>
            <p>© 2025 All rights reserved</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;