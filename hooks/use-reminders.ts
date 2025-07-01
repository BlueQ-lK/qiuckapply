"use client"

import { useState, useEffect } from "react"
import { supabase, type Reminder } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  const fetchReminders = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("reminders")
        .select(`
          *,
          jobs (
            company,
            position
          )
        `)
        .eq("user_id", user.id)
        .order("due_date", { ascending: true })

      if (error) throw error
      setReminders(data || [])
    } catch (error) {
      console.error("Error fetching reminders:", error)
      toast({
        title: "Error fetching reminders",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addReminder = async (reminderData: Omit<Reminder, "id" | "user_id" | "created_at" | "updated_at">) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("reminders")
        .insert([{ ...reminderData, user_id: user.id }])
        .select()
        .single()

      if (error) throw error

      setReminders((prev) =>
        [...prev, data].sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()),
      )
      toast({
        title: "Reminder added successfully!",
        description: reminderData.title,
      })
      return data
    } catch (error) {
      console.error("Error adding reminder:", error)
      toast({
        title: "Error adding reminder",
        description: "Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const updateReminder = async (id: string, updates: Partial<Reminder>) => {
    try {
      const { data, error } = await supabase.from("reminders").update(updates).eq("id", id).select().single()

      if (error) throw error

      setReminders((prev) => prev.map((reminder) => (reminder.id === id ? data : reminder)))
      toast({
        title: "Reminder updated successfully!",
      })
      return data
    } catch (error) {
      console.error("Error updating reminder:", error)
      toast({
        title: "Error updating reminder",
        description: "Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const toggleReminder = async (id: string) => {
    const reminder = reminders.find((r) => r.id === id)
    if (!reminder) return

    return updateReminder(id, { completed: !reminder.completed })
  }

  const deleteReminder = async (id: string) => {
    try {
      const { error } = await supabase.from("reminders").delete().eq("id", id)

      if (error) throw error

      setReminders((prev) => prev.filter((reminder) => reminder.id !== id))
      toast({
        title: "Reminder deleted successfully!",
      })
    } catch (error) {
      console.error("Error deleting reminder:", error)
      toast({
        title: "Error deleting reminder",
        description: "Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  useEffect(() => {
    fetchReminders()
  }, [user])

  return {
    reminders,
    isLoading,
    addReminder,
    updateReminder,
    toggleReminder,
    deleteReminder,
    refetch: fetchReminders,
  }
}
