-- Create a function to check if a user is an admin
-- This will be used in RLS policies to restrict data access
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  -- For now, we'll check if the user is authenticated
  -- In the future, you can modify this to check actual admin roles
  -- For example: SELECT role FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'
  RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create secure SELECT policies for contact_submissions
-- Only authenticated users (potential admins) can read contact data
CREATE POLICY "Only authenticated users can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (public.is_admin_user());

-- Create secure SELECT policies for project_leads  
-- Only authenticated users (potential admins) can read lead data
CREATE POLICY "Only authenticated users can view project leads" 
ON public.project_leads 
FOR SELECT 
USING (public.is_admin_user());

-- Add UPDATE and DELETE policies for admin management
CREATE POLICY "Only authenticated users can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (public.is_admin_user());

CREATE POLICY "Only authenticated users can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
USING (public.is_admin_user());

CREATE POLICY "Only authenticated users can update project leads" 
ON public.project_leads 
FOR UPDATE 
USING (public.is_admin_user());

CREATE POLICY "Only authenticated users can delete project leads" 
ON public.project_leads 
FOR DELETE 
USING (public.is_admin_user());