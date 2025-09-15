import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Award, Target } from 'lucide-react';

interface ProgressChartProps {
  className?: string;
}

const ProgressChart = ({ className }: ProgressChartProps) => {
  // Sample data - replace with real data from your API
  const gradeData = [
    { month: 'Jan', average: 78 },
    { month: 'Feb', average: 82 },
    { month: 'Mar', average: 85 },
    { month: 'Apr', average: 88 },
    { month: 'May', average: 91 },
    { month: 'Jun', average: 89 },
  ];

  const performanceData = [
    { name: 'Completed', value: 85, color: '#10b981' },
    { name: 'In Progress', value: 10, color: '#f59e0b' },
    { name: 'Pending', value: 5, color: '#ef4444' },
  ];

  return (
    <Card className={`${className} hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50/30`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <span>Academic Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Award className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">89%</p>
            <p className="text-xs text-gray-500">Overall GPA</p>
          </div>
          <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Target className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">12/15</p>
            <p className="text-xs text-gray-500">Assignments</p>
          </div>
          <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">94%</p>
            <p className="text-xs text-gray-500">Attendance</p>
          </div>
        </div>

        {/* Grade Trend Chart */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Grade Trend</h4>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Assignment Status</h4>
          <div className="flex items-center space-x-4">
            <ResponsiveContainer width="50%" height={80}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={35}
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {performanceData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;