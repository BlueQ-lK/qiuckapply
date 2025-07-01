"use client"

import { useState, useEffect } from "react"
import { supabase, type Note } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  const fetchNotes = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("notes")
        .select(`
          *,
          jobs (
            company,
            position
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setNotes(data || [])
    } catch (error) {
      console.error("Error fetching notes:", error)
      toast({
        title: "Error fetching notes",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addNote = async (noteData: Omit<Note, "id" | "user_id" | "created_at" | "updated_at">) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("notes")
        .insert([{ ...noteData, user_id: user.id }])
        .select()
        .single()

      if (error) throw error

      setNotes((prev) => [data, ...prev])
      toast({
        title: "Note added successfully!",
        description: noteData.title,
      })
      return data
    } catch (error) {
      console.error("Error adding note:", error)
      toast({
        title: "Error adding note",
        description: "Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const updateNote = async (id: string, updates: Partial<Note>) => {
    try {
      const { data, error } = await supabase.from("notes").update(updates).eq("id", id).select().single()

      if (error) throw error

      setNotes((prev) => prev.map((note) => (note.id === id ? data : note)))
      toast({
        title: "Note updated successfully!",
      })
      return data
    } catch (error) {
      console.error("Error updating note:", error)
      toast({
        title: "Error updating note",
        description: "Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase.from("notes").delete().eq("id", id)

      if (error) throw error

      setNotes((prev) => prev.filter((note) => note.id !== id))
      toast({
        title: "Note deleted successfully!",
      })
    } catch (error) {
      console.error("Error deleting note:", error)
      toast({
        title: "Error deleting note",
        description: "Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [user])

  return {
    notes,
    isLoading,
    addNote,
    updateNote,
    deleteNote,
    refetch: fetchNotes,
  }
}
