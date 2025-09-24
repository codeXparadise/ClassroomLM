/*
  # Add Registration Support

  1. Updates
    - Update profiles table to support registration data
    - Add trigger to automatically create profile on user registration
    - Update RLS policies to support new user registration flow

  2. Security
    - Maintain existing RLS policies
    - Add policy for profile creation during registration
*/

-- Update the handle_new_user function to support registration metadata
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, student_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')::user_role,
    NEW.raw_user_meta_data->>'student_id'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add policy to allow users to insert their own profile during registration
CREATE POLICY "Users can create their own profile during registration"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);