import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCheck, Search, Calendar as CalendarIcon, Users, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

const AttendanceManagement = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API calls
  const classes = [
    { id: '1', name: 'Advanced Biology', studentCount: 28 },
    { id: '2', name: 'Education Technology', studentCount: 35 },
    { id: '3', name: 'Business Studies', studentCount: 42 }
  ];

  const attendanceData = [
    {
      id: '1',
      studentId: 'student-1',
      studentName: 'John Smith',
      studentAvatar: null,
      className: 'Advanced Biology',
      status: 'present',
      checkInTime: '09:05:00',
      notes: ''
    },
    {
      id: '2',
      studentId: 'student-2',
      studentName: 'Mary Johnson',
      studentAvatar: null,
      className: 'Advanced Biology',
      status: 'late',
      checkInTime: '09:15:00',
      notes: 'Traffic delay'
    },
    {
      id: '3',
      studentId: 'student-3',
      studentName: 'Robert Wilson',
      studentAvatar: null,
      className: 'Advanced Biology',
      status: 'absent',
      checkInTime: null,
      notes: 'Sick leave'
    },
    {
      id: '4',
      studentId: 'student-4',
      studentName: 'Sarah Davis',
      studentAvatar: null,
      className: 'Advanced Biology',
      status: 'present',
      checkInTime: '08:58:00',
      notes: ''
    }
  ];

  const attendanceStats = {
    totalStudents: 105,
    presentToday: 89,
    absentToday: 12,
    lateToday: 4,
    attendanceRate: 85
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'excused':
        return <AlertTriangle className="h-4 w-4 text-blue-600" />;
      default:
        return <UserCheck className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      present: { className: 'bg-green-100 text-green-800 border-green-200' },
      absent: { className: 'bg-red-100 text-red-800 border-red-200' },
      late: { className: 'bg-orange-100 text-orange-800 border-orange-200' },
      excused: { className: 'bg-blue-100 text-blue-800 border-blue-200' }
    };

    return (
      <Badge variant="outline" {...variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const updateAttendance = (studentId: string, status: string) => {
    // TODO: Implement actual API call
    console.log('Updating attendance:', studentId, status);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredAttendance = attendanceData.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || record.className === classes.find(c => c.id === selectedClass)?.name;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Attendance Management</h2>
        <p className="text-gray-600">Track and manage student attendance across all classes</p>
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{attendanceStats.totalStudents}</div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Present Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{attendanceStats.presentToday}</div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Absent Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{attendanceStats.absentToday}</div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{attendanceStats.attendanceRate}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              <span>Select Date</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-xl border border-white/30"
            />
          </CardContent>
        </Card>

        {/* Attendance Table */}
        <Card className="lg:col-span-3 backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5 text-green-600" />
                <span>Attendance for {selectedDate?.toLocaleDateString()}</span>
              </CardTitle>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 bg-white/50 border-white/30"
                  />
                </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-48 bg-white/50 border-white/30">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check-in Time</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.map((record) => (
                  <TableRow key={record.id} className="hover:bg-white/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={record.studentAvatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                            {getInitials(record.studentName)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">{record.studentName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-white/50 border-white/30">
                        {record.className}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(record.status)}
                        {getStatusBadge(record.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {record.checkInTime || '-'}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{record.notes || '-'}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateAttendance(record.studentId, 'present')}
                          className="hover:bg-green-50 text-green-600"
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateAttendance(record.studentId, 'absent')}
                          className="hover:bg-red-50 text-red-600"
                        >
                          <XCircle className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateAttendance(record.studentId, 'late')}
                          className="hover:bg-orange-50 text-orange-600"
                        >
                          <Clock className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceManagement;