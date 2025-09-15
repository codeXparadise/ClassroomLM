export type UserRole = 'student' | 'teacher' | 'admin';
export type AssignmentStatus = 'draft' | 'published' | 'closed';
export type SubmissionStatus = 'pending' | 'submitted' | 'graded';
export type EventType = 'lecture' | 'exam' | 'assignment' | 'holiday' | 'meeting';
export type NotificationType = 'announcement' | 'assignment' | 'grade' | 'event' | 'system';
export type WidgetType = 'progress_chart' | 'calendar' | 'todos' | 'events_feed' | 'analytics' | 'grades' | 'attendance';

export interface Institution {
  id: string;
  name: string;
  code: string;
  description?: string;
  logo_url?: string;
  settings: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  institution_id: string;
  email: string;
  full_name: string;
  role: UserRole;
  student_id?: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  date_of_birth?: string;
  metadata: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  institution?: Institution;
}

export interface Course {
  id: string;
  institution_id: string;
  code: string;
  name: string;
  description?: string;
  teacher_id?: string;
  semester?: string;
  academic_year?: string;
  credits: number;
  max_students: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  teacher?: UserProfile;
  enrollments?: Enrollment[];
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  enrolled_at: string;
  status: string;
  final_grade?: number;
  student?: UserProfile;
  course?: Course;
}

export interface Assignment {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  instructions?: string;
  due_date?: string;
  max_points: number;
  status: AssignmentStatus;
  created_by?: string;
  created_at: string;
  updated_at: string;
  course?: Course;
  submissions?: Submission[];
}

export interface Submission {
  id: string;
  assignment_id: string;
  student_id: string;
  content?: string;
  file_urls?: string[];
  submitted_at: string;
  status: SubmissionStatus;
  assignment?: Assignment;
  student?: UserProfile;
  grade?: Grade;
}

export interface Grade {
  id: string;
  submission_id: string;
  student_id: string;
  course_id: string;
  assignment_id: string;
  points_earned?: number;
  max_points?: number;
  percentage?: number;
  feedback?: string;
  graded_by?: string;
  graded_at: string;
  created_at: string;
  course?: Course;
  assignment?: Assignment;
}

export interface Event {
  id: string;
  institution_id: string;
  course_id?: string;
  title: string;
  description?: string;
  event_type: EventType;
  start_time: string;
  end_time: string;
  location?: string;
  is_all_day: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
  course?: Course;
}

export interface Notification {
  id: string;
  institution_id: string;
  title: string;
  message: string;
  type: NotificationType;
  target_roles?: UserRole[];
  target_courses?: string[];
  target_users?: string[];
  is_read_by?: string[];
  created_by?: string;
  created_at: string;
  expires_at?: string;
}

export interface Todo {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  priority: string;
  is_completed: boolean;
  due_date?: string;
  course_id?: string;
  created_at: string;
  updated_at: string;
  course?: Course;
}

export interface DashboardWidget {
  id: string;
  user_id: string;
  widget_type: WidgetType;
  position_x: number;
  position_y: number;
  width: number;
  height: number;
  is_visible: boolean;
  settings: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsData {
  id: string;
  user_id: string;
  course_id?: string;
  metric_type: string;
  metric_value?: number;
  metadata: Record<string, any>;
  recorded_at: string;
}

export interface Attendance {
  id: string;
  student_id: string;
  course_id: string;
  event_id?: string;
  date: string;
  status: string;
  notes?: string;
  recorded_by?: string;
  created_at: string;
  course?: Course;
}