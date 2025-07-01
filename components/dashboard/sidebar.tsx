"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Shield, LayoutDashboard, Briefcase, Bell, FileText, TimerIcon as Timeline, Settings, UserRound} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Job Tracker", href: "/tracker", icon: Briefcase },
  { name: "Reminders", href: "/reminders", icon: Bell },
  { name: "Notes", href: "/notes", icon: FileText },
  { name: "Timeline", href: "/timeline", icon: Timeline },
  { name: "Settings", href: "/settings", icon: Settings },  
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Shield className="h-8 w-8 text-primary" />
          <span className="ml-2 text-xl font-bold">QuietApply</span>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <Link href="/profile">
            <div className="flex text-muted-foreground hover:text-foreground hover:bg-muted group gap-x-3 rounded-md p-2 text-base font-semibold items-center">
              <Avatar>
                <AvatarImage src="https://gravatar.com/avatar/d36a4b28f6eb953cccdc495f1e2e1314?s=400&d=robohash&r=x" className="bg-muted-foreground/30"/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>Profile</div>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  )
}
