"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, CheckSquare, CreditCard, LayoutDashboard, ListTodo } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      icon: LayoutDashboard,
      label: "Dashboard",
      active: pathname === "/",
    },
    {
      href: "/planner",
      icon: ListTodo,
      label: "Rejalar",
      active: pathname === "/planner",
    },
    {
      href: "/tasks",
      icon: CheckSquare,
      label: "Vazifalar",
      active: pathname === "/tasks",
    },
    {
      href: "/finance",
      icon: CreditCard,
      label: "Moliya",
      active: pathname === "/finance",
    },
    {
      href: "/lessons",
      icon: Calendar,
      label: "Darslar",
      active: pathname === "/lessons",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 glass-card border-t border-white/20 dark:border-white/10 backdrop-blur-md md:hidden">
      <div className="grid h-full grid-cols-5">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`flex flex-col items-center justify-center ${
              route.active ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            <route.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{route.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

