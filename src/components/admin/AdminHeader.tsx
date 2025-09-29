import React from 'react';
import { Button } from '@/components/ui/button';
import { User, LogOut, Settings, Bell, Activity } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Logo from '@/components/ui/Logo';

const AdminHeader = () => {
  return (
    <header className="backdrop-blur-sm bg-white/80 border-b border-white/20 px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Logo />
          <div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">ClassroomLM</h1>
            <p className="text-sm text-gray-600">Admin Portal</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative hover:bg-white/50 transition-all duration-300">
            <Activity className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full animate-pulse"></span>
          </Button>
          <Button variant="ghost" size="sm" className="relative hover:bg-white/50 transition-all duration-300">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg">
                  <User className="h-4 w-4 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 backdrop-blur-sm bg-white/90 border-white/20">
              <div className="px-2 py-1.5 text-sm text-gray-600">
                admin@example.com
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-white/50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-white/50">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;