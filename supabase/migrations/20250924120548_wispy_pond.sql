/*
  # Classroom Management System Schema

  1. New Tables
    - `classes` - Store class information with teacher assignments
    - `class_enrollments` - Many-to-many relationship between students and classes
    - `assignments` - Store assignment details for classes
    - `submissions` - Store student assignment submissions
    - `progress_tracking` - Track student learning progress and activities

  2. Profile Updates
    - Add role enum (student, teacher, admin)
    - Add student-specific fields (student_id, enrollment_date)
    - Add indexes for better performance

  3. Security
    - Enable RLS on all new tables
    - Add appropriate policies for role-based access
    - Ensure students can only access their own data
    - Ensure teachers can only access their classes' data

  4. Functions
    - Add helper functions for role checking
    - Update existing functions to work with new schema
*/

-- Create user role enum
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');

-- Create assignment status enum
CREATE TYPE assignment_status AS ENUM ('draft', 'published', 'archived');

-- Create submission status enum  
CREATE TYPE submission_status AS ENUM ('pending', 'submitted', 'graded', 'late');

-- Update profiles table with new fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'student';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS student_id text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS enrollment_date timestamptz DEFAULT timezone('utc'::text, now());
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- Add indexes for profiles
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_is_active ON profiles(is_active);

-- Create classes table
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  subject text,
  class_code text UNIQUE NOT NULL,
  teacher_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz DEFAULT timezone('utc'::text, now()),
  is_active boolean DEFAULT true
);

-- Add indexes for classes
CREATE INDEX IF NOT EXISTS idx_classes_teacher_id ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_classes_class_code ON classes(class_code);
CREATE INDEX IF NOT EXISTS idx_classes_is_active ON classes(is_active);

-- Enable RLS on classes
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

-- Create class enrollments table (many-to-many between students and classes)
CREATE TABLE IF NOT EXISTS class_enrollments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id uuid NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT timezone('utc'::text, now()),
  is_active boolean DEFAULT true,
  UNIQUE(class_id, student_id)
);

-- Add indexes for class_enrollments
CREATE INDEX IF NOT EXISTS idx_class_enrollments_class_id ON class_enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_class_enrollments_student_id ON class_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_class_enrollments_is_active ON class_enrollments(is_active);

-- Enable RLS on class_enrollments
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;

-- Create assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id uuid NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  instructions text,
  due_date timestamptz,
  points_possible integer DEFAULT 100,
  status assignment_status DEFAULT 'draft',
  created_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz DEFAULT timezone('utc'::text, now())
);

-- Add indexes for assignments
CREATE INDEX IF NOT EXISTS idx_assignments_class_id ON assignments(class_id);
CREATE INDEX IF NOT EXISTS idx_assignments_created_by ON assignments(created_by);
CREATE INDEX IF NOT EXISTS idx_assignments_status ON assignments(status);
CREATE INDEX IF NOT EXISTS idx_assignments_due_date ON assignments(due_date);

-- Enable RLS on assignments
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id uuid NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status submission_status DEFAULT 'pending',
  submitted_at timestamptz,
  content text,
  file_path text,
  points_awarded integer,
  feedback text,
  graded_at timestamptz,
  graded_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz DEFAULT timezone('utc'::text, now()),
  UNIQUE(assignment_id, student_id)
);

-- Add indexes for submissions
CREATE INDEX IF NOT EXISTS idx_submissions_assignment_id ON submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student_id ON submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_graded_by ON submissions(graded_by);

-- Enable RLS on submissions
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create progress tracking table
CREATE TABLE IF NOT EXISTS progress_tracking (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  class_id uuid NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  notebook_id uuid REFERENCES notebooks(id) ON DELETE SET NULL,
  activity_type text NOT NULL, -- 'notebook_created', 'assignment_submitted', 'chat_interaction', etc.
  activity_data jsonb DEFAULT '{}',
  timestamp timestamptz DEFAULT timezone('utc'::text, now()),
  points_earned integer DEFAULT 0
);

-- Add indexes for progress_tracking
CREATE INDEX IF NOT EXISTS idx_progress_student_id ON progress_tracking(student_id);
CREATE INDEX IF NOT EXISTS idx_progress_class_id ON progress_tracking(class_id);
CREATE INDEX IF NOT EXISTS idx_progress_timestamp ON progress_tracking(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_progress_activity_type ON progress_tracking(activity_type);

-- Enable RLS on progress_tracking
ALTER TABLE progress_tracking ENABLE ROW LEVEL SECURITY;

-- Add class_id to notebooks table to associate notebooks with classes
ALTER TABLE notebooks ADD COLUMN IF NOT EXISTS class_id uuid REFERENCES classes(id) ON DELETE SET NULL;

-- Add index for notebooks class_id
CREATE INDEX IF NOT EXISTS idx_notebooks_class_id ON notebooks(class_id);

-- Create helper functions for RLS policies

-- Function to check if user has access to a class (either as teacher or enrolled student)
CREATE OR REPLACE FUNCTION has_class_access(class_uuid uuid)
RETURNS boolean AS $$
BEGIN
  -- Check if user is the teacher of the class
  IF EXISTS (
    SELECT 1 FROM classes 
    WHERE id = class_uuid AND teacher_id = auth.uid()
  ) THEN
    RETURN true;
  END IF;
  
  -- Check if user is enrolled in the class as a student
  IF EXISTS (
    SELECT 1 FROM class_enrollments 
    WHERE class_id = class_uuid AND student_id = auth.uid() AND is_active = true
  ) THEN
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is notebook owner (for existing notebooks)
CREATE OR REPLACE FUNCTION is_notebook_owner(notebook_uuid uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM notebooks 
    WHERE id = notebook_uuid AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is notebook owner for document metadata
CREATE OR REPLACE FUNCTION is_notebook_owner_for_document(doc_metadata jsonb)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM notebooks 
    WHERE id = (doc_metadata->>'notebook_id')::uuid AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for classes
CREATE POLICY "Teachers can manage their classes" ON classes
  FOR ALL USING (teacher_id = auth.uid());

CREATE POLICY "Students can view classes they're enrolled in" ON classes
  FOR SELECT USING (
    id IN (
      SELECT class_id FROM class_enrollments 
      WHERE student_id = auth.uid() AND is_active = true
    )
  );

-- RLS Policies for class_enrollments
CREATE POLICY "Teachers can manage enrollments for their classes" ON class_enrollments
  FOR ALL USING (
    class_id IN (
      SELECT id FROM classes WHERE teacher_id = auth.uid()
    )
  );

CREATE POLICY "Students can view their own enrollments" ON class_enrollments
  FOR SELECT USING (student_id = auth.uid());

-- RLS Policies for assignments
CREATE POLICY "Teachers can manage assignments for their classes" ON assignments
  FOR ALL USING (
    class_id IN (
      SELECT id FROM classes WHERE teacher_id = auth.uid()
    )
  );

CREATE POLICY "Students can view assignments for their classes" ON assignments
  FOR SELECT USING (
    class_id IN (
      SELECT class_id FROM class_enrollments 
      WHERE student_id = auth.uid() AND is_active = true
    )
  );

-- RLS Policies for submissions
CREATE POLICY "Students can manage their own submissions" ON submissions
  FOR ALL USING (student_id = auth.uid());

CREATE POLICY "Teachers can view and grade submissions for their assignments" ON submissions
  FOR ALL USING (
    assignment_id IN (
      SELECT a.id FROM assignments a
      JOIN classes c ON a.class_id = c.id
      WHERE c.teacher_id = auth.uid()
    )
  );

-- RLS Policies for progress_tracking
CREATE POLICY "Students can view their own progress" ON progress_tracking
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Teachers can view progress for their class students" ON progress_tracking
  FOR SELECT USING (
    class_id IN (
      SELECT id FROM classes WHERE teacher_id = auth.uid()
    )
  );

CREATE POLICY "System can insert progress tracking" ON progress_tracking
  FOR INSERT WITH CHECK (true);

-- Update notebooks policies to include class access
CREATE POLICY "Users can view notebooks in their classes" ON notebooks
  FOR SELECT USING (
    (user_id = auth.uid()) OR 
    (class_id IS NOT NULL AND has_class_access(class_id))
  );

-- Update existing triggers to work with new schema
CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON classes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assignments_updated_at
  BEFORE UPDATE ON assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();