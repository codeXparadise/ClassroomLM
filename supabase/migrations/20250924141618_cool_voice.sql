/*
  # Enhanced Classroom Management System

  1. New Tables
    - `student_activities` - Track all student activities and interactions
    - `admin_activities` - Track admin actions and system management
    - `study_materials` - Store materials shared by admins
    - `student_shares` - Track notebook sharing between students
    - `events` - Calendar events created by admins
    - `quizzes` - Quiz/exam scheduling and management
    - `quiz_attempts` - Student quiz attempts and scores
    - `attendance` - Daily attendance tracking
    - `todo_items` - Student personal todo lists
    - `student_chats` - Student-to-student messaging
    - `material_access` - Track student access to study materials

  2. Security
    - Enable RLS on all new tables
    - Add appropriate policies for role-based access
    - Ensure students can only access their own data
    - Admins can access all relevant data

  3. Indexes
    - Performance indexes on frequently queried columns
    - Composite indexes for complex queries
*/

-- Student Activities Tracking
CREATE TABLE IF NOT EXISTS student_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  activity_type text NOT NULL, -- 'notebook_created', 'chat_sent', 'material_accessed', etc.
  activity_data jsonb DEFAULT '{}',
  notebook_id uuid REFERENCES notebooks(id) ON DELETE SET NULL,
  class_id uuid REFERENCES classes(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Admin Activities Tracking
CREATE TABLE IF NOT EXISTS admin_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  activity_type text NOT NULL, -- 'student_added', 'material_uploaded', 'event_created', etc.
  activity_data jsonb DEFAULT '{}',
  target_student_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  class_id uuid REFERENCES classes(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Study Materials
CREATE TABLE IF NOT EXISTS study_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  file_path text,
  file_size bigint,
  file_type text,
  content text,
  uploaded_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  is_public boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Student Notebook Sharing
CREATE TABLE IF NOT EXISTS student_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notebook_id uuid NOT NULL REFERENCES notebooks(id) ON DELETE CASCADE,
  shared_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  shared_with uuid REFERENCES profiles(id) ON DELETE CASCADE, -- NULL means shared with all class
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  share_type text DEFAULT 'view', -- 'view', 'collaborate'
  message text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Calendar Events
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_type text DEFAULT 'general', -- 'general', 'quiz', 'exam', 'assignment_due'
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  location text,
  created_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  is_all_classes boolean DEFAULT false,
  reminder_minutes integer DEFAULT 60,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Quizzes and Exams
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  instructions text,
  class_id uuid NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  created_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  duration_minutes integer DEFAULT 60,
  total_points integer DEFAULT 100,
  questions jsonb DEFAULT '[]',
  settings jsonb DEFAULT '{}', -- shuffle_questions, show_results, etc.
  status text DEFAULT 'draft', -- 'draft', 'published', 'active', 'completed'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Quiz Attempts
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  submitted_at timestamptz,
  answers jsonb DEFAULT '{}',
  score integer,
  time_spent_minutes integer,
  status text DEFAULT 'in_progress', -- 'in_progress', 'submitted', 'graded'
  created_at timestamptz DEFAULT now(),
  UNIQUE(quiz_id, student_id)
);

-- Attendance Tracking
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  class_id uuid NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  date date NOT NULL,
  status text DEFAULT 'present', -- 'present', 'absent', 'late', 'excused'
  notes text,
  marked_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, class_id, date)
);

-- Student Todo Items
CREATE TABLE IF NOT EXISTS todo_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date timestamptz,
  priority text DEFAULT 'medium', -- 'low', 'medium', 'high'
  status text DEFAULT 'pending', -- 'pending', 'completed', 'cancelled'
  category text DEFAULT 'personal', -- 'personal', 'assignment', 'study'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Student Chat System
CREATE TABLE IF NOT EXISTS student_chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES profiles(id) ON DELETE CASCADE, -- NULL for group chats
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  message text NOT NULL,
  message_type text DEFAULT 'text', -- 'text', 'file', 'notebook_share'
  attachment_url text,
  is_group_message boolean DEFAULT false,
  read_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Material Access Tracking
CREATE TABLE IF NOT EXISTS material_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  material_id uuid NOT NULL REFERENCES study_materials(id) ON DELETE CASCADE,
  access_type text DEFAULT 'view', -- 'view', 'download', 'save'
  accessed_at timestamptz DEFAULT now(),
  time_spent_minutes integer DEFAULT 0
);

-- Weekly Planner
CREATE TABLE IF NOT EXISTS weekly_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  week_start_date date NOT NULL,
  plan_data jsonb DEFAULT '{}', -- Store weekly schedule data
  goals text[],
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(student_id, week_start_date)
);

-- Enable RLS
ALTER TABLE student_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE todo_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Student Activities
CREATE POLICY "Students can view their own activities"
  ON student_activities FOR SELECT
  TO authenticated
  USING (student_id = uid());

CREATE POLICY "System can insert student activities"
  ON student_activities FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all student activities"
  ON student_activities FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = uid() AND role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for Admin Activities
CREATE POLICY "Admins can manage their activities"
  ON admin_activities FOR ALL
  TO authenticated
  USING (admin_id = uid())
  WITH CHECK (admin_id = uid());

CREATE POLICY "Admins can view all admin activities"
  ON admin_activities FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = uid() AND role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for Study Materials
CREATE POLICY "Students can view materials for their classes"
  ON study_materials FOR SELECT
  TO authenticated
  USING (
    is_public = true OR
    class_id IN (
      SELECT class_id FROM class_enrollments 
      WHERE student_id = uid() AND is_active = true
    )
  );

CREATE POLICY "Admins can manage study materials"
  ON study_materials FOR ALL
  TO authenticated
  USING (uploaded_by = uid())
  WITH CHECK (uploaded_by = uid());

-- RLS Policies for Student Shares
CREATE POLICY "Students can view shares involving them"
  ON student_shares FOR SELECT
  TO authenticated
  USING (
    shared_by = uid() OR 
    shared_with = uid() OR 
    (shared_with IS NULL AND class_id IN (
      SELECT class_id FROM class_enrollments 
      WHERE student_id = uid() AND is_active = true
    ))
  );

CREATE POLICY "Students can create shares"
  ON student_shares FOR INSERT
  TO authenticated
  WITH CHECK (shared_by = uid());

CREATE POLICY "Students can update their shares"
  ON student_shares FOR UPDATE
  TO authenticated
  USING (shared_by = uid())
  WITH CHECK (shared_by = uid());

-- RLS Policies for Events
CREATE POLICY "Students can view events for their classes"
  ON events FOR SELECT
  TO authenticated
  USING (
    is_all_classes = true OR
    class_id IN (
      SELECT class_id FROM class_enrollments 
      WHERE student_id = uid() AND is_active = true
    )
  );

CREATE POLICY "Admins can manage events"
  ON events FOR ALL
  TO authenticated
  USING (created_by = uid())
  WITH CHECK (created_by = uid());

-- RLS Policies for Quizzes
CREATE POLICY "Students can view published quizzes for their classes"
  ON quizzes FOR SELECT
  TO authenticated
  USING (
    status IN ('published', 'active') AND
    class_id IN (
      SELECT class_id FROM class_enrollments 
      WHERE student_id = uid() AND is_active = true
    )
  );

CREATE POLICY "Admins can manage quizzes"
  ON quizzes FOR ALL
  TO authenticated
  USING (created_by = uid())
  WITH CHECK (created_by = uid());

-- RLS Policies for Quiz Attempts
CREATE POLICY "Students can manage their quiz attempts"
  ON quiz_attempts FOR ALL
  TO authenticated
  USING (student_id = uid())
  WITH CHECK (student_id = uid());

CREATE POLICY "Admins can view quiz attempts for their quizzes"
  ON quiz_attempts FOR SELECT
  TO authenticated
  USING (
    quiz_id IN (
      SELECT id FROM quizzes WHERE created_by = uid()
    )
  );

-- RLS Policies for Attendance
CREATE POLICY "Students can view their attendance"
  ON attendance FOR SELECT
  TO authenticated
  USING (student_id = uid());

CREATE POLICY "Admins can manage attendance"
  ON attendance FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = uid() AND role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for Todo Items
CREATE POLICY "Students can manage their todo items"
  ON todo_items FOR ALL
  TO authenticated
  USING (student_id = uid())
  WITH CHECK (student_id = uid());

-- RLS Policies for Student Chats
CREATE POLICY "Students can view chats they're involved in"
  ON student_chats FOR SELECT
  TO authenticated
  USING (
    sender_id = uid() OR 
    receiver_id = uid() OR 
    (is_group_message = true AND class_id IN (
      SELECT class_id FROM class_enrollments 
      WHERE student_id = uid() AND is_active = true
    ))
  );

CREATE POLICY "Students can send messages"
  ON student_chats FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = uid());

CREATE POLICY "Students can update read status"
  ON student_chats FOR UPDATE
  TO authenticated
  USING (receiver_id = uid())
  WITH CHECK (receiver_id = uid());

-- RLS Policies for Material Access
CREATE POLICY "Students can track their material access"
  ON material_access FOR ALL
  TO authenticated
  USING (student_id = uid())
  WITH CHECK (student_id = uid());

CREATE POLICY "Admins can view material access analytics"
  ON material_access FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = uid() AND role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for Weekly Plans
CREATE POLICY "Students can manage their weekly plans"
  ON weekly_plans FOR ALL
  TO authenticated
  USING (student_id = uid())
  WITH CHECK (student_id = uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_student_activities_student_id ON student_activities(student_id);
CREATE INDEX IF NOT EXISTS idx_student_activities_created_at ON student_activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_student_activities_activity_type ON student_activities(activity_type);

CREATE INDEX IF NOT EXISTS idx_admin_activities_admin_id ON admin_activities(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_activities_created_at ON admin_activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_activities_activity_type ON admin_activities(activity_type);

CREATE INDEX IF NOT EXISTS idx_study_materials_class_id ON study_materials(class_id);
CREATE INDEX IF NOT EXISTS idx_study_materials_uploaded_by ON study_materials(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_study_materials_created_at ON study_materials(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_student_shares_shared_by ON student_shares(shared_by);
CREATE INDEX IF NOT EXISTS idx_student_shares_shared_with ON student_shares(shared_with);
CREATE INDEX IF NOT EXISTS idx_student_shares_class_id ON student_shares(class_id);

CREATE INDEX IF NOT EXISTS idx_events_class_id ON events(class_id);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);

CREATE INDEX IF NOT EXISTS idx_quizzes_class_id ON quizzes(class_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_start_date ON quizzes(start_date);
CREATE INDEX IF NOT EXISTS idx_quizzes_status ON quizzes(status);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student_id ON quiz_attempts(student_id);

CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_class_id ON attendance(class_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date DESC);

CREATE INDEX IF NOT EXISTS idx_todo_items_student_id ON todo_items(student_id);
CREATE INDEX IF NOT EXISTS idx_todo_items_due_date ON todo_items(due_date);
CREATE INDEX IF NOT EXISTS idx_todo_items_status ON todo_items(status);

CREATE INDEX IF NOT EXISTS idx_student_chats_sender_id ON student_chats(sender_id);
CREATE INDEX IF NOT EXISTS idx_student_chats_receiver_id ON student_chats(receiver_id);
CREATE INDEX IF NOT EXISTS idx_student_chats_class_id ON student_chats(class_id);
CREATE INDEX IF NOT EXISTS idx_student_chats_created_at ON student_chats(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_material_access_student_id ON material_access(student_id);
CREATE INDEX IF NOT EXISTS idx_material_access_material_id ON material_access(material_id);

CREATE INDEX IF NOT EXISTS idx_weekly_plans_student_id ON weekly_plans(student_id);
CREATE INDEX IF NOT EXISTS idx_weekly_plans_week_start ON weekly_plans(week_start_date DESC);

-- Create triggers for updated_at columns
CREATE TRIGGER update_study_materials_updated_at
  BEFORE UPDATE ON study_materials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quizzes_updated_at
  BEFORE UPDATE ON quizzes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_todo_items_updated_at
  BEFORE UPDATE ON todo_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_weekly_plans_updated_at
  BEFORE UPDATE ON weekly_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();