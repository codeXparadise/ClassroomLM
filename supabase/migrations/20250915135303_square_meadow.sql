/*
  # ClassroomLM Database Schema

  1. New Tables
    - `user_profiles` - Extended user profiles with roles and metadata
    - `institutions` - Educational institutions/colleges
    - `courses` - Academic courses
    - `enrollments` - Student course enrollments
    - `assignments` - Course assignments and tasks
    - `submissions` - Student assignment submissions
    - `grades` - Student grades and feedback
    - `events` - Calendar events (lectures, exams, etc.)
    - `notifications` - System notifications
    - `todos` - Student personal todo items
    - `dashboard_widgets` - User dashboard customization
    - `analytics_data` - Student performance analytics
    - `attendance` - Student attendance records

  2. Security
    - Enable RLS on all tables
    - Role-based access policies for students, teachers, and admins
    - Secure data isolation by institution and course

  3. Features
    - Real-time updates support
    - Comprehensive analytics tracking
    - Flexible dashboard customization
    - Multi-institutional support
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');
CREATE TYPE assignment_status AS ENUM ('draft', 'published', 'closed');
CREATE TYPE submission_status AS ENUM ('pending', 'submitted', 'graded');
CREATE TYPE event_type AS ENUM ('lecture', 'exam', 'assignment', 'holiday', 'meeting');
CREATE TYPE notification_type AS ENUM ('announcement', 'assignment', 'grade', 'event', 'system');
CREATE TYPE widget_type AS ENUM ('progress_chart', 'calendar', 'todos', 'events_feed', 'analytics', 'grades', 'attendance');

-- Institutions table
CREATE TABLE IF NOT EXISTS institutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text UNIQUE NOT NULL,
  description text,
  logo_url text,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Extended user profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  student_id text,
  avatar_url text,
  phone text,
  address text,
  date_of_birth date,
  metadata jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  code text NOT NULL,
  name text NOT NULL,
  description text,
  teacher_id uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  semester text,
  academic_year text,
  credits integer DEFAULT 3,
  max_students integer DEFAULT 50,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(institution_id, code, academic_year, semester)
);

-- Course enrollments
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  status text DEFAULT 'active',
  final_grade numeric(5,2),
  UNIQUE(student_id, course_id)
);

-- Assignments
CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  instructions text,
  due_date timestamptz,
  max_points numeric(5,2) DEFAULT 100,
  status assignment_status DEFAULT 'draft',
  created_by uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Assignment submissions
CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid REFERENCES assignments(id) ON DELETE CASCADE,
  student_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  content text,
  file_urls text[],
  submitted_at timestamptz DEFAULT now(),
  status submission_status DEFAULT 'pending',
  UNIQUE(assignment_id, student_id)
);

-- Grades
CREATE TABLE IF NOT EXISTS grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES submissions(id) ON DELETE CASCADE,
  student_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  assignment_id uuid REFERENCES assignments(id) ON DELETE CASCADE,
  points_earned numeric(5,2),
  max_points numeric(5,2),
  percentage numeric(5,2),
  feedback text,
  graded_by uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  graded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Events (calendar)
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  event_type event_type NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  location text,
  is_all_day boolean DEFAULT false,
  created_by uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type notification_type NOT NULL,
  target_roles user_role[],
  target_courses uuid[],
  target_users uuid[],
  is_read_by uuid[],
  created_by uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- Student todos
CREATE TABLE IF NOT EXISTS todos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  priority text DEFAULT 'medium',
  is_completed boolean DEFAULT false,
  due_date timestamptz,
  course_id uuid REFERENCES courses(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Dashboard widget customization
CREATE TABLE IF NOT EXISTS dashboard_widgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  widget_type widget_type NOT NULL,
  position_x integer DEFAULT 0,
  position_y integer DEFAULT 0,
  width integer DEFAULT 1,
  height integer DEFAULT 1,
  is_visible boolean DEFAULT true,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, widget_type)
);

-- Analytics data
CREATE TABLE IF NOT EXISTS analytics_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE SET NULL,
  metric_type text NOT NULL,
  metric_value numeric,
  metadata jsonb DEFAULT '{}',
  recorded_at timestamptz DEFAULT now()
);

-- Attendance records
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  event_id uuid REFERENCES events(id) ON DELETE SET NULL,
  date date NOT NULL,
  status text DEFAULT 'present',
  notes text,
  recorded_by uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, course_id, date)
);

-- Enable Row Level Security
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_widgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- User profiles policies
CREATE POLICY "Users can view profiles in their institution"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    institution_id IN (
      SELECT institution_id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all profiles in their institution"
  ON user_profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() 
      AND role = 'admin' 
      AND institution_id = user_profiles.institution_id
    )
  );

-- Courses policies
CREATE POLICY "Users can view courses in their institution"
  ON courses FOR SELECT
  TO authenticated
  USING (
    institution_id IN (
      SELECT institution_id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Teachers and admins can manage courses"
  ON courses FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('teacher', 'admin')
      AND institution_id = courses.institution_id
    )
  );

-- Enrollments policies
CREATE POLICY "Students can view their own enrollments"
  ON enrollments FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can view enrollments for their courses"
  ON enrollments FOR SELECT
  TO authenticated
  USING (
    course_id IN (
      SELECT c.id FROM courses c
      JOIN user_profiles up ON c.teacher_id = up.id
      WHERE up.user_id = auth.uid()
    )
  );

-- Assignments policies
CREATE POLICY "Students can view assignments for enrolled courses"
  ON assignments FOR SELECT
  TO authenticated
  USING (
    course_id IN (
      SELECT e.course_id FROM enrollments e
      JOIN user_profiles up ON e.student_id = up.id
      WHERE up.user_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can manage assignments for their courses"
  ON assignments FOR ALL
  TO authenticated
  USING (
    course_id IN (
      SELECT c.id FROM courses c
      JOIN user_profiles up ON c.teacher_id = up.id
      WHERE up.user_id = auth.uid()
    )
  );

-- Submissions policies
CREATE POLICY "Students can manage their own submissions"
  ON submissions FOR ALL
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can view submissions for their courses"
  ON submissions FOR SELECT
  TO authenticated
  USING (
    assignment_id IN (
      SELECT a.id FROM assignments a
      JOIN courses c ON a.course_id = c.id
      JOIN user_profiles up ON c.teacher_id = up.id
      WHERE up.user_id = auth.uid()
    )
  );

-- Grades policies
CREATE POLICY "Students can view their own grades"
  ON grades FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can manage grades for their courses"
  ON grades FOR ALL
  TO authenticated
  USING (
    course_id IN (
      SELECT c.id FROM courses c
      JOIN user_profiles up ON c.teacher_id = up.id
      WHERE up.user_id = auth.uid()
    )
  );

-- Events policies
CREATE POLICY "Users can view events in their institution"
  ON events FOR SELECT
  TO authenticated
  USING (
    institution_id IN (
      SELECT institution_id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Teachers and admins can manage events"
  ON events FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('teacher', 'admin')
      AND institution_id = events.institution_id
    )
  );

-- Notifications policies
CREATE POLICY "Users can view notifications targeted to them"
  ON notifications FOR SELECT
  TO authenticated
  USING (
    institution_id IN (
      SELECT institution_id FROM user_profiles WHERE user_id = auth.uid()
    )
    AND (
      target_roles IS NULL OR
      EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_id = auth.uid() 
        AND role = ANY(target_roles)
      ) OR
      auth.uid()::text = ANY(target_users::text[])
    )
  );

-- Todos policies
CREATE POLICY "Users can manage their own todos"
  ON todos FOR ALL
  TO authenticated
  USING (
    user_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

-- Dashboard widgets policies
CREATE POLICY "Users can manage their own dashboard widgets"
  ON dashboard_widgets FOR ALL
  TO authenticated
  USING (
    user_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

-- Analytics data policies
CREATE POLICY "Students can view their own analytics"
  ON analytics_data FOR SELECT
  TO authenticated
  USING (
    user_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can view analytics for their students"
  ON analytics_data FOR SELECT
  TO authenticated
  USING (
    course_id IN (
      SELECT c.id FROM courses c
      JOIN user_profiles up ON c.teacher_id = up.id
      WHERE up.user_id = auth.uid()
    )
  );

-- Attendance policies
CREATE POLICY "Students can view their own attendance"
  ON attendance FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can manage attendance for their courses"
  ON attendance FOR ALL
  TO authenticated
  USING (
    course_id IN (
      SELECT c.id FROM courses c
      JOIN user_profiles up ON c.teacher_id = up.id
      WHERE up.user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_institution ON user_profiles(institution_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_courses_institution ON courses(institution_id);
CREATE INDEX IF NOT EXISTS idx_courses_teacher ON courses(teacher_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_assignments_course ON assignments(course_id);
CREATE INDEX IF NOT EXISTS idx_submissions_assignment ON submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student ON submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_grades_student ON grades(student_id);
CREATE INDEX IF NOT EXISTS idx_grades_course ON grades(course_id);
CREATE INDEX IF NOT EXISTS idx_events_institution ON events(institution_id);
CREATE INDEX IF NOT EXISTS idx_events_course ON events(course_id);
CREATE INDEX IF NOT EXISTS idx_events_start_time ON events(start_time);
CREATE INDEX IF NOT EXISTS idx_notifications_institution ON notifications(institution_id);
CREATE INDEX IF NOT EXISTS idx_todos_user ON todos(user_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_widgets_user ON dashboard_widgets(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_user ON analytics_data(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_course ON analytics_data(course_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_course ON attendance(course_id);

-- Create functions for updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_institutions_updated_at BEFORE UPDATE ON institutions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assignments_updated_at BEFORE UPDATE ON assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_todos_updated_at BEFORE UPDATE ON todos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dashboard_widgets_updated_at BEFORE UPDATE ON dashboard_widgets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample institution
INSERT INTO institutions (name, code, description) VALUES 
('Demo University', 'DEMO', 'A demonstration university for ClassroomLM')
ON CONFLICT (code) DO NOTHING;

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  demo_institution_id uuid;
BEGIN
  -- Get the demo institution ID
  SELECT id INTO demo_institution_id FROM institutions WHERE code = 'DEMO' LIMIT 1;
  
  -- Create user profile
  INSERT INTO user_profiles (user_id, institution_id, email, full_name, role)
  VALUES (
    NEW.id,
    demo_institution_id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'student'
  );
  
  -- Create default dashboard widgets for students
  INSERT INTO dashboard_widgets (user_id, widget_type, position_x, position_y, width, height)
  SELECT 
    (SELECT id FROM user_profiles WHERE user_id = NEW.id),
    widget_type,
    position_x,
    position_y,
    width,
    height
  FROM (VALUES
    ('progress_chart'::widget_type, 0, 0, 2, 1),
    ('calendar'::widget_type, 2, 0, 2, 2),
    ('todos'::widget_type, 0, 1, 2, 2),
    ('events_feed'::widget_type, 4, 0, 1, 2),
    ('analytics'::widget_type, 0, 3, 3, 1),
    ('grades'::widget_type, 3, 3, 2, 1)
  ) AS default_widgets(widget_type, position_x, position_y, width, height);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();