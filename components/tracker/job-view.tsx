import type { Job } from "@/lib/supabase"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface JobViewProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (jobData: any) => Promise<void>
    job: Job
}

export function JobViewAll({
    open,
    onOpenChange,
    onSubmit,
    job
    }: JobViewProps) {

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>
            <SheetHeader>
            <SheetTitle>{job.company}</SheetTitle>
            <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </SheetDescription>
            </SheetHeader>
        </SheetContent>
        </Sheet>
    )
}