import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Job {
  id: string
  user_id: string
  company: string
  position: string
  status: "Applied" | "Interview" | "Offer" | "Rejected" | "Waiting"
  applied_date: string
  salary?: string
  location?: string
  job_url?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Reminder {
  id: string
  user_id: string
  job_id?: string
  title: string
  description?: string
  due_date: string
  type: "Follow-up" | "Interview Prep" | "Thank You" | "Other"
  completed: boolean
  created_at: string
  updated_at: string
}

export interface Note {
  id: string
  user_id: string
  job_id?: string
  title: string
  content: string
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string
  full_name: string
  created_at: string
  updated_at: string
}
