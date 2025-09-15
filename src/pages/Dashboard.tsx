import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
import UserManagement from '@/components/admin/UserManagement';
import NotificationCenter from '@/components/admin/NotificationCenter';

const Dashboard = () => {
  const { profile } = useAuth();

  const renderDashboardContent = () => {
    switch (profile?.role) {
      case 'student':
        return <DashboardGrid />;
      case 'teacher':
        return <DashboardGrid />;
      case 'admin':
        return <DashboardGrid />;
      default:
        return <DashboardGrid />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {renderDashboardContent()}
    </div>
  );
};

export default Dashboard;