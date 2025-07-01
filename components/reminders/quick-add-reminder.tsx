"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddReminderModal } from "./add-reminder-modal"
import { useReminders } from "@/hooks/use-reminders"

export function QuickAddReminder() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addReminder } = useReminders()

  const handleAddReminder = async (reminderData: any) => {
    try {
      await addReminder(reminderData)
      setIsModalOpen(false)
    } catch (error) {
      // Error handled in hook
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
        size="icon"
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Add Reminder</span>
      </Button>

      <AddReminderModal open={isModalOpen} onOpenChange={setIsModalOpen} onSubmit={handleAddReminder} />
    </>
  )
}
