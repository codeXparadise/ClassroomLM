/*
  # Separate Role-Based Tables for ClassroomLM

  1. New Tables
    - `students` - Dedicated student information and tracking
    - `teachers` - Teacher/admin information and permissions
    - `student_progress` - Detailed student progress tracking
    - `teacher_actions` - All teacher/admin actions logging
    - `classroom_settings` - System-wide settings and configurations

  2. Enhanced Security
    - Separate RLS policies for students and teachers
    - Role-based data isolation
    - Comprehensive activity tracking

  3. Performance Optimizations
    - Optimized indexes for role-based queries
    - Efficient data retrieval patterns
*/

-- Drop existing role-based constraints to recreate with better structure
DO $$
BEGIN
  -- Update existing user_role enum to include more specific roles
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_new') THEN
    CREATE TYPE user_role_new AS ENUM ('student', 'teacher', 'admin', 'super_admin');
  END IF;
END $$;

-- Students Table (separate from profiles)
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  student_id text UNIQUE,
  full_name text NOT NULL,
  email text NOT NULL,
  enrollment_date timestamptz DEFAULT now(),
  graduation_date timestamptz,
  academic_year text,
  grade_level text,
  gpa decimal(3,2),
  total_credits integer DEFAULT 0,
  status text DEFAULT 'active', -- 'active', 'inactive', 'suspended', 'graduated'
  emergency_contact jsonb DEFAULT '{}',
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Teachers Table (separate from profiles)
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  employee_id text UNIQUE,
  full_name text NOT NULL,
  email text NOT NULL,
  department text,
  position text DEFAULT 'teacher', -- 'teacher', 'admin', 'super_admin'
  hire_date timestamptz DEFAULT now(),
  permissions jsonb DEFAULT '{}', -- detailed permissions object
  specializations text[] DEFAULT '{}',
  office_location text,
  phone text,
  bio text,
  status text DEFAULT 'active', -- 'active', 'inactive', 'on_leave'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enhanced Student Progress Tracking
CREATE TABLE IF NOT EXISTS student_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  subject text,
  current_grade decimal(5,2),
  assignment_scores jsonb DEFAULT '[]',
  quiz_scores jsonb DEFAULT '[]',
  participation_score decimal(5,2),
  attendance_rate decimal(5,2),
  notebook_count integer DEFAULT 0,
  chat_activity_score decimal(5,2),
  last_activity timestamptz,
  progress_notes text,
  goals jsonb DEFAULT '[]',
  achievements jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(student_id, class_id)
);

-- Teacher Actions Logging
CREATE TABLE IF NOT EXISTS teacher_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  action_type text NOT NULL, -- 'student_added', 'grade_updated', 'material_uploaded', etc.
  action_data jsonb DEFAULT '{}',
  target_student_id uuid REFERENCES students(id) ON DELETE SET NULL,
  target_class_id uuid REFERENCES classes(id) ON DELETE SET NULL,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enhanced Study Materials with Better Tracking
CREATE TABLE IF NOT EXISTS study_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content text,
  file_path text,
  file_size bigint,
  file_type text,
  uploaded_by uuid NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  is_public boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  download_count integer DEFAULT 0,
  view_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  expiry_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Material Access Tracking
CREATE TABLE IF NOT EXISTS material_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id uuid NOT NULL REFERENCES study_materials(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  access_type text NOT NULL, -- 'view', 'download', 'save'
  duration_minutes integer,
  created_at timestamptz DEFAULT now()
);

-- Student Chat System
CREATE TABLE IF NOT EXISTS student_chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES students(id) ON DELETE CASCADE, -- NULL for group chats
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  chat_type text DEFAULT 'direct', -- 'direct', 'group', 'class'
  message text NOT NULL,
  attachments jsonb DEFAULT '[]',
  is_read boolean DEFAULT false,
  reply_to uuid REFERENCES student_chats(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Student Todo Items
CREATE TABLE IF NOT EXISTS student_todos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date timestamptz,
  priority text DEFAULT 'medium', -- 'low', 'medium', 'high'
  category text DEFAULT 'personal', -- 'personal', 'assignment', 'study'
  status text DEFAULT 'pending', -- 'pending', 'completed', 'cancelled'
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Weekly Plans for Students
CREATE TABLE IF NOT EXISTS student_weekly_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  week_start_date date NOT NULL,
  goals jsonb DEFAULT '[]',
  schedule jsonb DEFAULT '{}', -- day-wise schedule
  notes text,
  completion_rate decimal(5,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(student_id, week_start_date)
);

-- Enhanced Events Table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_type text DEFAULT 'general', -- 'general', 'quiz', 'exam', 'assignment_due', 'holiday'
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  location text,
  created_by uuid NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  is_all_classes boolean DEFAULT false,
  reminder_minutes integer DEFAULT 60,
  attendee_count integer DEFAULT 0,
  status text DEFAULT 'scheduled', -- 'scheduled', 'active', 'completed', 'cancelled'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enhanced Attendance with More Details
CREATE TABLE IF NOT EXISTS attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_id uuid NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  date date NOT NULL,
  status text DEFAULT 'present', -- 'present', 'absent', 'late', 'excused'
  check_in_time time,
  check_out_time time,
  notes text,
  marked_by uuid REFERENCES teachers(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(student_id, class_id, date)
);

-- Quizzes and Exams
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  instructions text,
  class_id uuid NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  created_by uuid NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  duration_minutes integer DEFAULT 60,
  total_points integer DEFAULT 100,
  questions jsonb DEFAULT '[]',
  settings jsonb DEFAULT '{}',
  status text DEFAULT 'draft', -- 'draft', 'published', 'active', 'completed'
  submission_count integer DEFAULT 0,
  average_score decimal(5,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Quiz Attempts
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  submitted_at timestamptz,
  answers jsonb DEFAULT '{}',
  score integer,
  percentage decimal(5,2),
  time_spent_minutes integer,
  status text DEFAULT 'in_progress',
  feedback text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(quiz_id, student_id)
);

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);
CREATE INDEX IF NOT EXISTS idx_students_enrollment_date ON students(enrollment_date);

CREATE INDEX IF NOT EXISTS idx_teachers_user_id ON teachers(user_id);
CREATE INDEX IF NOT EXISTS idx_teachers_department ON teachers(department);
CREATE INDEX IF NOT EXISTS idx_teachers_status ON teachers(status);

CREATE INDEX IF NOT EXISTS idx_student_progress_student_id ON student_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_student_progress_class_id ON student_progress(class_id);
CREATE INDEX IF NOT EXISTS idx_student_progress_updated_at ON student_progress(updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_teacher_actions_teacher_id ON teacher_actions(teacher_id);
CREATE INDEX IF NOT EXISTS idx_teacher_actions_action_type ON teacher_actions(action_type);
CREATE INDEX IF NOT EXISTS idx_teacher_actions_created_at ON teacher_actions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_study_materials_uploaded_by ON study_materials(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_study_materials_class_id ON study_materials(class_id);
CREATE INDEX IF NOT EXISTS idx_study_materials_is_public ON study_materials(is_public);

CREATE INDEX IF NOT EXISTS idx_material_access_student_id ON material_access(student_id);
CREATE INDEX IF NOT EXISTS idx_material_access_material_id ON material_access(material_id);

CREATE INDEX IF NOT EXISTS idx_student_chats_sender_id ON student_chats(sender_id);
CREATE INDEX IF NOT EXISTS idx_student_chats_class_id ON student_chats(class_id);
CREATE INDEX IF NOT EXISTS idx_student_chats_created_at ON student_chats(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_student_todos_student_id ON student_todos(student_id);
CREATE INDEX IF NOT EXISTS idx_student_todos_status ON student_todos(status);
CREATE INDEX IF NOT EXISTS idx_student_todos_due_date ON student_todos(due_date);

CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);
CREATE INDEX IF NOT EXISTS idx_events_class_id ON events(class_id);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);

CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON attendance_records(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_class_id ON attendance_records(class_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance_records(date DESC);

CREATE INDEX IF NOT EXISTS idx_quizzes_class_id ON quizzes(class_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_created_by ON quizzes(created_by);
CREATE INDEX IF NOT EXISTS idx_quizzes_start_date ON quizzes(start_date);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student_id ON quiz_attempts(student_id);

-- Enable RLS on all tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_weekly_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Students Table
CREATE POLICY "Students can view their own data"
  ON students FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Teachers can view all students"
  ON students FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teachers t 
      JOIN profiles p ON t.user_id = p.id 
      WHERE p.id = auth.uid() AND p.role IN ('teacher', 'admin')
    )
  );

CREATE POLICY "Teachers can manage students"
  ON students FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teachers t 
      JOIN profiles p ON t.user_id = p.id 
      WHERE p.id = auth.uid() AND p.role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for Teachers Table
CREATE POLICY "Teachers can view their own data"
  ON teachers FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all teachers"
  ON teachers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage teachers"
  ON teachers FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- RLS Policies for Student Progress
CREATE POLICY "Students can view their own progress"
  ON student_progress FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students s 
      WHERE s.id = student_progress.student_id AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can view progress for their classes"
  ON student_progress FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teachers t 
      JOIN profiles p ON t.user_id = p.id 
      WHERE p.id = auth.uid() AND p.role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for Study Materials
CREATE POLICY "Students can view public materials and class materials"
  ON study_materials FOR SELECT
  TO authenticated
  USING (
    is_public = true OR
    EXISTS (
      SELECT 1 FROM students s
      JOIN class_enrollments ce ON s.id = ce.student_id
      WHERE s.user_id = auth.uid() AND ce.class_id = study_materials.class_id AND ce.is_active = true
    )
  );

CREATE POLICY "Teachers can manage materials"
  ON study_materials FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teachers t 
      JOIN profiles p ON t.user_id = p.id 
      WHERE p.id = auth.uid() AND p.role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for Student Chats
CREATE POLICY "Students can view their own chats"
  ON student_chats FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students s 
      WHERE s.user_id = auth.uid() AND (
        s.id = student_chats.sender_id OR 
        s.id = student_chats.receiver_id OR
        (student_chats.chat_type = 'class' AND EXISTS (
          SELECT 1 FROM class_enrollments ce 
          WHERE ce.student_id = s.id AND ce.class_id = student_chats.class_id AND ce.is_active = true
        ))
      )
    )
  );

CREATE POLICY "Students can send chats"
  ON student_chats FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM students s 
      WHERE s.user_id = auth.uid() AND s.id = student_chats.sender_id
    )
  );

-- RLS Policies for Student Todos
CREATE POLICY "Students can manage their own todos"
  ON student_todos FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students s 
      WHERE s.user_id = auth.uid() AND s.id = student_todos.student_id
    )
  );

-- RLS Policies for Events
CREATE POLICY "Students can view events for their classes"
  ON events FOR SELECT
  TO authenticated
  USING (
    is_all_classes = true OR
    EXISTS (
      SELECT 1 FROM students s
      JOIN class_enrollments ce ON s.id = ce.student_id
      WHERE s.user_id = auth.uid() AND ce.class_id = events.class_id AND ce.is_active = true
    )
  );

CREATE POLICY "Teachers can manage events"
  ON events FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teachers t 
      JOIN profiles p ON t.user_id = p.id 
      WHERE p.id = auth.uid() AND p.role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for Attendance
CREATE POLICY "Students can view their own attendance"
  ON attendance_records FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students s 
      WHERE s.user_id = auth.uid() AND s.id = attendance_records.student_id
    )
  );

CREATE POLICY "Teachers can manage attendance"
  ON attendance_records FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teachers t 
      JOIN profiles p ON t.user_id = p.id 
      WHERE p.id = auth.uid() AND p.role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for Quizzes
CREATE POLICY "Students can view published quizzes for their classes"
  ON quizzes FOR SELECT
  TO authenticated
  USING (
    status = 'published' AND
    EXISTS (
      SELECT 1 FROM students s
      JOIN class_enrollments ce ON s.id = ce.student_id
      WHERE s.user_id = auth.uid() AND ce.class_id = quizzes.class_id AND ce.is_active = true
    )
  );

CREATE POLICY "Teachers can manage quizzes"
  ON quizzes FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teachers t 
      JOIN profiles p ON t.user_id = p.id 
      WHERE p.id = auth.uid() AND p.role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for Quiz Attempts
CREATE POLICY "Students can manage their own quiz attempts"
  ON quiz_attempts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students s 
      WHERE s.user_id = auth.uid() AND s.id = quiz_attempts.student_id
    )
  );

CREATE POLICY "Teachers can view quiz attempts for their quizzes"
  ON quiz_attempts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teachers t 
      JOIN quizzes q ON q.created_by = t.id
      JOIN profiles p ON t.user_id = p.id 
      WHERE p.id = auth.uid() AND q.id = quiz_attempts.quiz_id AND p.role IN ('teacher', 'admin')
    )
  );

-- Update existing profiles table to work with new structure
DO $$
BEGIN
  -- Add new columns if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'role') THEN
    ALTER TABLE profiles ADD COLUMN role user_role DEFAULT 'student';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'student_id') THEN
    ALTER TABLE profiles ADD COLUMN student_id text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'enrollment_date') THEN
    ALTER TABLE profiles ADD COLUMN enrollment_date timestamptz DEFAULT now();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'is_active') THEN
    ALTER TABLE profiles ADD COLUMN is_active boolean DEFAULT true;
  END IF;
END $$;

-- Create indexes on profiles for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_is_active ON profiles(is_active);

-- Update trigger functions
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  user_role text;
  user_full_name text;
  user_student_id text;
BEGIN
  -- Extract metadata from auth.users
  user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'student');
  user_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', '');
  user_student_id := NEW.raw_user_meta_data->>'student_id';

  -- Insert into profiles table
  INSERT INTO public.profiles (id, email, full_name, role, student_id, enrollment_date, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    user_full_name,
    user_role::user_role,
    user_student_id,
    NOW(),
    true
  );

  -- Insert into role-specific table
  IF user_role = 'student' THEN
    INSERT INTO public.students (user_id, student_id, full_name, email, enrollment_date, status)
    VALUES (
      NEW.id,
      user_student_id,
      user_full_name,
      NEW.email,
      NOW(),
      'active'
    );
  ELSIF user_role IN ('teacher', 'admin') THEN
    INSERT INTO public.teachers (user_id, full_name, email, position, hire_date, status)
    VALUES (
      NEW.id,
      user_full_name,
      NEW.email,
      user_role,
      NOW(),
      'active'
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_student_progress_updated_at BEFORE UPDATE ON student_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_study_materials_updated_at BEFORE UPDATE ON study_materials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_student_todos_updated_at BEFORE UPDATE ON student_todos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_student_weekly_plans_updated_at BEFORE UPDATE ON student_weekly_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_attendance_records_updated_at BEFORE UPDATE ON attendance_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON quizzes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();