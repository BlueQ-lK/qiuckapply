import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface AddNoteModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (noteData: any) => Promise<void>;
    preselectedJobId?: string
}

export function AddNoteModal({
    open,
    onOpenChange,
    onSubmit,
    preselectedJobId,
}: AddNoteModalProps) {
    return (
        <p>hello {open}</p>
    )
}