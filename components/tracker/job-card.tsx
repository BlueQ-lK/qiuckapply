"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, IndianRupee, FileText, ExternalLink, Bell } from "lucide-react"
import type { Job } from "@/lib/supabase"
import { useJobs } from "@/hooks/use-jobs"
import { formatDistanceToNow } from "date-fns"
import { AddReminderModal } from "../reminders/add-reminder-modal"
import { useReminders } from "@/hooks/use-reminders"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { JobViewAll } from "./job-view"

interface JobCardProps {
  job: Job
}

const statusColors = {
  Applied: "bg-blue-100 text-blue-800",
  Interview: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  Waiting: "bg-gray-100 text-gray-800",
}

const statusOptions = ["Applied", "Interview", "Offer", "Rejected", "Waiting"] as const

export function JobCard({ job }: JobCardProps) {
  const { updateJob, refetch } = useJobs()
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false)
  const { addReminder } = useReminders()
  const [updateStatus, setUpdateStatus] = useState<(typeof statusOptions)[number] | undefined>(job.status)
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleStatusChange = async (newStatus: (typeof statusOptions)[number]) => {
    try {
      const res = await updateJob(job.id, { status: newStatus })
      setUpdateStatus(res.status)
    } catch (error) {
      // Error handled in hook
    }
  }

  const handleAddReminder = async (reminderData: any) => {
    try {
      await addReminder(reminderData)
      setIsReminderModalOpen(false)
    } catch (error) {
      // Error handled in hook
    }
  }

  function handleUpdateJob(jobData: any): Promise<void> {
    throw new Error("Function not implemented.")
  }

  return (
    <Card className="hover:shadow-xl transition-shadow shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {job.company}
              {job.job_url && (
                <a
                  href={job.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{job.position}</p>
          </div>
          <Badge className={statusColors[updateStatus ?? job.status] || "bg-gray-100 text-gray-800"}>
            {updateStatus ?? job.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          Applied {formatDistanceToNow(new Date(job.applied_date), { addSuffix: true })}
        </div>
        {job.location && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            {job.location}
          </div>
        )}
        {job.salary && (
          <div className="flex items-center text-sm text-muted-foreground">
            <IndianRupee className="mr-2 h-4 w-4" />
            {job.salary}
          </div>
        )}
        {job.notes && (
          <div className="flex items-start text-sm text-muted-foreground">
            <FileText className="mr-2 h-4 w-4 mt-0.5" />
            <p className="line-clamp-2">{job.notes}</p>
          </div>
        )}
        <div className="flex space-x-2 pt-2">
          <Select
            value={updateStatus || job.status}
            onValueChange={(value) => handleStatusChange(value as (typeof statusOptions)[number])}
          >
            <SelectTrigger>
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem value={status}>{status}</SelectItem>
            ))}
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" onClick={() => setIsSheetOpen(true)}>View</Button>
          <Button size="sm" variant="outline" className="bg-transparent" onClick={() => setIsReminderModalOpen(true)}>
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <AddReminderModal
        open={isReminderModalOpen}
        onOpenChange={setIsReminderModalOpen}
        onSubmit={handleAddReminder}
        preselectedJobId={job.id}
        />
        <JobViewAll 
          open={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          onSubmit={handleUpdateJob}
          job={job}
        />
    </Card>
  )
}
