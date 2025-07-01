"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { JobCard } from "./job-card"
import { AddJobModal } from "./add-job-modal"
import { Plus, Search, Filter } from "lucide-react"
import { useJobs } from "@/hooks/use-jobs"
import { Briefcase } from "lucide-react"

export function JobTracker() {
  const { jobs, isLoading, addJob } = useJobs()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [filterValue, setFilterValue] = useState(false)

  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddJob = async (jobData: any) => {
    try {
      await addJob(jobData)
      setIsAddModalOpen(false)
    } catch (error) {
      // Error is handled in the hook
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Job Tracker</h1>
            <p className="text-muted-foreground">Loading your job applications...</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Job Tracker</h1>
          <p className="text-muted-foreground">
            {jobs.length === 0
              ? "Start tracking your job applications"
              : `Managing ${jobs.length} job application${jobs.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Job
        </Button>
      </div>

      {jobs.length > 0 && (
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search companies or positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setFilterValue(!filterValue)}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      )}
      {filterValue && (
        <p>Hello world</p>
      )}
      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Briefcase className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No job applications yet</h3>
          <p className="text-muted-foreground mb-4">
            Start tracking your job applications to stay organized and never miss a follow-up.
          </p>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Job
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      <AddJobModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSubmit={handleAddJob} />
    </div>
  )
}
