import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BarChart3, TrendingUp, Activity, Calendar } from 'lucide-react';

interface AnalyticsWidgetProps {
  className?: string;
}

const AnalyticsWidget = ({ className }: AnalyticsWidgetProps) => {
  const [activeTab, setActiveTab] = useState('performance');

  // Sample data - replace with real analytics data
  const performanceData = [
    { subject: 'Math', score: 92, target: 90 },
    { subject: 'Physics', score: 88, target: 85 },
    { subject: 'Chemistry', score: 85, target: 88 },
    { subject: 'Biology', score: 94, target: 90 },
    { subject: 'English', score: 87, target: 85 },
  ];

  const activityData = [
    { day: 'Mon', hours: 4.5 },
    { day: 'Tue', hours: 6.2 },
    { day: 'Wed', hours: 3.8 },
    { day: 'Thu', hours: 5.1 },
    { day: 'Fri', hours: 4.9 },
    { day: 'Sat', hours: 2.3 },
    { day: 'Sun', hours: 1.8 },
  ];

  const attendanceData = [
    { month: 'Sep', rate: 95 },
    { month: 'Oct', rate: 92 },
    { month: 'Nov', rate: 98 },
    { month: 'Dec', rate: 89 },
    { month: 'Jan', rate: 94 },
  ];

  return (
    <Card className={`${className} hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-indigo-50/30`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <BarChart3 className="h-5 w-5 text-indigo-600" />
          <span>Analytics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="performance" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="activity" className="text-xs">
              <Activity className="h-3 w-3 mr-1" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="attendance" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Attendance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Subject Performance</h4>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Weekly Study Hours</h4>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#8b5cf6" 
                    fill="url(#colorGradient)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Attendance Rate</h4>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis domain={[80, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#10b981" 
                    fill="url(#attendanceGradient)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalyticsWidget;