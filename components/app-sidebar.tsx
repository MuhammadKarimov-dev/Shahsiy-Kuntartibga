"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, CheckSquare, CreditCard, Heart, LayoutDashboard, Moon, Sun, ListTodo } from "lucide-react"
import { useTheme } from "next-themes"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AppSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const navigation = [
    {
      title: "Asosiy",
      items: [
        {
          title: "Dashboard",
          icon: LayoutDashboard,
          href: "/",
          isActive: pathname === "/",
        },
        {
          title: "Kunlik Rejalar",
          icon: ListTodo,
          href: "/planner",
          isActive: pathname === "/planner",
        },
        {
          title: "Vazifalar",
          icon: CheckSquare,
          href: "/tasks",
          isActive: pathname === "/tasks",
        },
        {
          title: "Moliya",
          icon: CreditCard,
          href: "/finance",
          isActive: pathname === "/finance",
        },
      ],
    },
    {
      title: "Boshqaruv",
      items: [
        {
          title: "Darslar",
          icon: Calendar,
          href: "/lessons",
          isActive: pathname === "/lessons",
        },
        {
          title: "Salomatlik",
          icon: Heart,
          href: "/health",
          isActive: pathname === "/health",
        },
      ],
    },
  ]

  return (
    <Sidebar variant="floating" collapsible="icon" className="glass-card border-r border-white/20 dark:border-white/10">
      <SidebarHeader className="flex flex-col items-center justify-center p-4">
        <div className="flex items-center justify-center w-full">
          <Avatar className="h-10 w-10 bg-primary/20">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
            <AvatarFallback className="bg-primary/20 text-primary">MA</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-sm font-medium">MyAutoLife</p>
            <p className="text-xs text-muted-foreground">Shaxsiy Platforma</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      tooltip={item.title}
                      className={item.isActive ? "bg-primary/20 text-primary" : ""}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full flex items-center justify-center glass-card"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </SidebarFooter>
      <SidebarRail />
      <SidebarTrigger className="absolute top-4 right-4 md:hidden" />
    </Sidebar>
  )
}

