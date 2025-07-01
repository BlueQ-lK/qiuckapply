import { DashboardLayout } from "@/components/dashboard/layout"
import { JobTracker } from "@/components/tracker/job-tracker"

export default function TrackerPage() {
  return (
    <DashboardLayout>
      <JobTracker />
    </DashboardLayout>
  )
}
