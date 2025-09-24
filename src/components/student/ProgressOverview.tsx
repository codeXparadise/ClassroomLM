import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award, Target, BookOpen } from 'lucide-react';

const ProgressOverview = () => {
  // Mock data - replace with actual API calls
  const progressData = {
    overallGrade: 87,
    completedAssignments: 15,
    totalAssignments: 18,
    notebooksCreated: 8,
    averageScore: 85,
    recentGrades: [92, 78, 89, 95, 82],
    subjectProgress: [
      { subject: 'Advanced Biology', grade: 92, assignments: 6, completed: 6 },
      { subject: 'Education Technology', grade: 85, assignments: 5, completed: 4 },
      { subject: 'Business Studies', grade: 84, assignments: 7, completed: 5 }
    ]
  };

  const completionRate = (progressData.completedAssignments / progressData.totalAssignments) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Progress</h2>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Award className="h-4 w-4 mr-2" />
              Overall Grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{progressData.overallGrade}%</div>
            <p className="text-sm text-gray-500">Above average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{Math.round(completionRate)}%</div>
            <p className="text-sm text-gray-500">{progressData.completedAssignments}/{progressData.totalAssignments} assignments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Notebooks Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{progressData.notebooksCreated}</div>
            <p className="text-sm text-gray-500">Research projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{progressData.averageScore}%</div>
            <p className="text-sm text-green-600">+5% this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Progress</CardTitle>
          <CardDescription>Your performance across different subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {progressData.subjectProgress.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                    <Badge variant="outline" className="text-xs">
                      {subject.completed}/{subject.assignments} completed
                    </Badge>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {subject.grade}%
                  </div>
                </div>
                <Progress value={subject.grade} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
            <CardDescription>Your last 5 assignment scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {progressData.recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="text-sm text-gray-600">Assignment {progressData.recentGrades.length - index}</span>
                  <span className={`font-semibold ${grade >= 90 ? 'text-green-600' : grade >= 80 ? 'text-blue-600' : grade >= 70 ? 'text-orange-600' : 'text-red-600'}`}>
                    {grade}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Goals</CardTitle>
            <CardDescription>Track your progress towards learning objectives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Research Skills</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Critical Analysis</span>
                  <span className="font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Written Communication</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Digital Literacy</span>
                  <span className="font-medium">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressOverview;