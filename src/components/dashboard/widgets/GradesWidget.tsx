import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface GradesWidgetProps {
  className?: string;
}

const GradesWidget = ({ className }: GradesWidgetProps) => {
  // Sample grades data - replace with real data
  const recentGrades = [
    {
      id: 1,
      course: 'Advanced Mathematics',
      assignment: 'Calculus Problem Set #3',
      grade: 92,
      maxPoints: 100,
      submittedAt: new Date(2025, 0, 10),
      trend: 'up'
    },
    {
      id: 2,
      course: 'Physics',
      assignment: 'Lab Report - Motion',
      grade: 88,
      maxPoints: 100,
      submittedAt: new Date(2025, 0, 8),
      trend: 'down'
    },
    {
      id: 3,
      course: 'Chemistry',
      assignment: 'Organic Compounds Quiz',
      grade: 95,
      maxPoints: 100,
      submittedAt: new Date(2025, 0, 5),
      trend: 'up'
    },
    {
      id: 4,
      course: 'Biology',
      assignment: 'Cell Structure Essay',
      grade: 87,
      maxPoints: 100,
      submittedAt: new Date(2025, 0, 3),
      trend: 'same'
    },
  ];

  const overallStats = {
    gpa: 3.7,
    totalAssignments: 24,
    completedAssignments: 20,
    averageGrade: 89.2
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeBadgeColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-500" />;
      default: return <Minus className="h-3 w-3 text-gray-400" />;
    }
  };

  return (
    <Card className={`${className} hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-emerald-50/30`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Award className="h-5 w-5 text-emerald-600" />
          <span>Recent Grades</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Stats */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{overallStats.gpa}</p>
              <p className="text-xs text-gray-500">Current GPA</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{overallStats.averageGrade}%</p>
              <p className="text-xs text-gray-500">Average Grade</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Assignment Progress</span>
              <span>{overallStats.completedAssignments}/{overallStats.totalAssignments}</span>
            </div>
            <Progress 
              value={(overallStats.completedAssignments / overallStats.totalAssignments) * 100} 
              className="h-2"
            />
          </div>
        </div>

        {/* Recent Grades List */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {recentGrades.map((grade) => {
            const percentage = (grade.grade / grade.maxPoints) * 100;
            return (
              <div
                key={grade.id}
                className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {grade.assignment}
                    </h4>
                    <p className="text-xs text-gray-600">{grade.course}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(grade.trend)}
                    <Badge className={`text-xs ${getGradeBadgeColor(percentage)}`}>
                      {grade.grade}/{grade.maxPoints}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-bold ${getGradeColor(percentage)}`}>
                    {percentage.toFixed(0)}%
                  </span>
                  <span className="text-xs text-gray-500">
                    {grade.submittedAt.toLocaleDateString()}
                  </span>
                </div>
                
                <Progress value={percentage} className="h-1.5 mt-2" />
              </div>
            );
          })}
        </div>

        {recentGrades.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Award className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No grades yet</p>
            <p className="text-xs">Grades will appear here once assignments are graded</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GradesWidget;