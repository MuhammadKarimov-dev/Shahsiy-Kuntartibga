"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentTasks } from "@/components/dashboard/recent-tasks"
import { FinanceSummary } from "@/components/dashboard/finance-summary"
import { HealthStats } from "@/components/dashboard/health-stats"
import { CheckSquare, CreditCard, Heart, Calendar, ListTodo, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Sample data for today's schedule
const todaySchedule = [
  { time: "07:00", title: "Ertalabki mashqlar", category: "Salomatlik", completed: true },
  { time: "09:00", title: "Dasturlash darsi", category: "O'qish", completed: true },
  { time: "12:00", title: "Tushlik", category: "Shaxsiy", completed: false },
  { time: "14:00", title: "Loyiha ustida ishlash", category: "Ish", completed: false },
  { time: "18:00", title: "Do'stlar bilan uchrashuv", category: "Shaxsiy", completed: false },
]

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate completion percentage
  const completedTasks = todaySchedule.filter((task) => task.completed).length
  const completionPercentage = Math.round((completedTasks / todaySchedule.length) * 100)

  // Get current time
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const currentTimeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`

  // Find current and next tasks
  const currentTask = todaySchedule.find((task) => {
    const [taskHour, taskMinute] = task.time.split(":").map(Number)
    return (
      (taskHour === currentHour && taskMinute <= currentMinute) ||
      (taskHour < currentHour &&
        todaySchedule
          .find((nextTask) => {
            const [nextHour] = nextTask.time.split(":").map(Number)
            return nextHour > currentHour
          })
          ?.time.split(":")[0] > taskHour)
    )
  })

  const nextTask = todaySchedule.find((task) => {
    const [taskHour, taskMinute] = task.time.split(":").map(Number)
    return (taskHour === currentHour && taskMinute > currentMinute) || taskHour > currentHour
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" variant="outline" className="glass-card">
            <Link href="/planner">
              <ListTodo className="mr-2 h-4 w-4" />
              Kunlik Rejalar
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="glass-card">
            <Link href="/tasks">
              <CheckSquare className="mr-2 h-4 w-4" />
              Vazifalar
            </Link>
          </Button>
        </div>
      </div>

      {/* Today's Progress Card */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Bugungi Kun</CardTitle>
            <Badge variant="outline" className="glass-card">
              <Clock className="h-3 w-3 mr-1" /> {currentTimeString}
            </Badge>
          </div>
          <CardDescription>
            {now.toLocaleDateString("uz-UZ", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Kunlik rejalar bajarilishi</span>
                <span className="text-sm font-medium">
                  {completedTasks}/{todaySchedule.length}
                </span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>

            {currentTask && (
              <div className="bg-primary/10 p-3 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground">Hozirgi vazifa</p>
                    <h4 className="text-sm font-medium">{currentTask.title}</h4>
                  </div>
                  <Badge variant={currentTask.completed ? "default" : "outline"}>
                    {currentTask.completed ? "Bajarildi" : currentTask.time}
                  </Badge>
                </div>
              </div>
            )}

            {nextTask && (
              <div className="bg-secondary/10 p-3 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground">Keyingi vazifa</p>
                    <h4 className="text-sm font-medium">{nextTask.title}</h4>
                  </div>
                  <Badge variant="outline">{nextTask.time}</Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="ghost" size="sm" className="ml-auto">
            <Link href="/planner">
              Barcha rejalarni ko'rish <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bugungi vazifalar</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">3 ta bajarildi, 2 ta qoldi</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moliyaviy holat</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250,000 so'm</div>
            <p className="text-xs text-muted-foreground">+15% o'tgan oyga nisbatan</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Darslar</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 ta</div>
            <p className="text-xs text-muted-foreground">Bugun rejalashtirilgan</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salomatlik</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.5 soat</div>
            <p className="text-xs text-muted-foreground">O'rtacha uyqu vaqti</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="glass-card w-full justify-start overflow-x-auto flex-nowrap whitespace-nowrap">
          <TabsTrigger value="overview">Umumiy</TabsTrigger>
          <TabsTrigger value="today">Bugun</TabsTrigger>
          <TabsTrigger value="tasks">Vazifalar</TabsTrigger>
          <TabsTrigger value="finance">Moliya</TabsTrigger>
          <TabsTrigger value="health">Salomatlik</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-full md:col-span-4 glass-card">
              <CardHeader>
                <CardTitle>Haftalik faollik</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-full md:col-span-3 glass-card">
              <CardHeader>
                <CardTitle>Bugungi vazifalar</CardTitle>
                <CardDescription>Bugun bajarilishi kerak bo'lgan ishlar</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTasks />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="today" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Bugungi jadval</CardTitle>
              <CardDescription>Bugun rejalashtirilgan barcha ishlar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 rounded-md bg-accent/20">
                    <div className="flex-shrink-0 w-16 text-sm font-medium">{item.time}</div>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {item.title}
                      </p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="flex-shrink-0">
                      {item.completed ? (
                        <Badge variant="default">Bajarildi</Badge>
                      ) : (
                        <Badge variant="outline">Rejalashtirilgan</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/planner">Kunlik rejalarni boshqarish</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Vazifalar</CardTitle>
              <CardDescription>Barcha vazifalar ro'yxati</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTasks showAll />
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/tasks">Barcha vazifalarni ko'rish</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Moliyaviy holat</CardTitle>
              <CardDescription>Kirim va chiqimlar</CardDescription>
            </CardHeader>
            <CardContent>
              <FinanceSummary />
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/finance">Moliyaviy ma'lumotlarni ko'rish</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Salomatlik</CardTitle>
              <CardDescription>Uyqu va sport ma'lumotlari</CardDescription>
            </CardHeader>
            <CardContent>
              <HealthStats />
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/health">Salomatlik ma'lumotlarini ko'rish</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

