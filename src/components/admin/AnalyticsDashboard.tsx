import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, FileText, Award, Calendar } from 'lucide-react';

const AnalyticsDashboard = () => {
  // Mock data - replace with actual API calls
  const performanceData = [
    { month: 'Sep', avgGrade: 78, submissions: 45 },
    { month: 'Oct', avgGrade: 82, submissions: 52 },
    { month: 'Nov', avgGrade: 85, submissions: 48 },
    { month: 'Dec', avgGrade: 87, submissions: 41 },
    { month: 'Jan', avgGrade: 89, submissions: 38 }
  ];

  const classPerformance = [
    { class: 'Advanced Biology', avgGrade: 92, students: 28 },
    { class: 'Education Tech', avgGrade: 85, students: 35 },
    { class: 'Business Studies', avgGrade: 84, students: 42 }
  ];

  const submissionStatus = [
    { name: 'On Time', value: 78, color: '#10B981' },
    { name: 'Late', value: 15, color: '#F59E0B' },
    { name: 'Missing', value: 7, color: '#EF4444' }
  ];

  const engagementData = [
    { day: 'Mon', notebooks: 12, chats: 45 },
    { day: 'Tue', notebooks: 15, chats: 52 },
    { day: 'Wed', notebooks: 18, chats: 38 },
    { day: 'Thu', notebooks: 22, chats: 61 },
    { day: 'Fri', notebooks: 19, chats: 44 },
    { day: 'Sat', notebooks: 8, chats: 23 },
    { day: 'Sun', notebooks: 6, chats: 18 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Award className="h-4 w-4 mr-2" />
              Average Grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">89%</div>
            <p className="text-sm text-green-600">+4% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Submission Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">93%</div>
            <p className="text-sm text-gray-500">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Active Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">142</div>
            <p className="text-sm text-gray-500">Out of 156 total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Engagement Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">8.7</div>
            <p className="text-sm text-green-600">+0.3 this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Average grades and submission counts over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                avgGrade: { label: "Average Grade", color: "#3B82F6" },
                submissions: { label: "Submissions", color: "#10B981" }
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="avgGrade" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="submissions" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Class Performance</CardTitle>
            <CardDescription>Average grades by class</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                avgGrade: { label: "Average Grade", color: "#8B5CF6" }
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="class" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="avgGrade" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submission Status</CardTitle>
            <CardDescription>Distribution of assignment submission statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                onTime: { label: "On Time", color: "#10B981" },
                late: { label: "Late", color: "#F59E0B" },
                missing: { label: "Missing", color: "#EF4444" }
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={submissionStatus}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {submissionStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Engagement</CardTitle>
            <CardDescription>Daily notebook creation and chat activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                notebooks: { label: "Notebooks Created", color: "#6366F1" },
                chats: { label: "Chat Messages", color: "#EC4899" }
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="notebooks" fill="#6366F1" />
                  <Bar dataKey="chats" fill="#EC4899" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;