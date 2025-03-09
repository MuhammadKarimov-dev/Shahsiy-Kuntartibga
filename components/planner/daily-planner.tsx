"use client"

import { useState } from "react"
import { CalendarIcon, Check, Clock, Plus, X, AlertCircle } from "lucide-react"
import { format, isToday } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

interface PlanItem {
  id: string
  title: string
  status: "planned" | "completed" | "missed"
  time?: string
  category: string
  notes?: string
  priority?: "low" | "medium" | "high"
}

const categories = [
  { value: "work", label: "Ish" },
  { value: "personal", label: "Shaxsiy" },
  { value: "study", label: "O'qish" },
  { value: "health", label: "Salomatlik" },
  { value: "other", label: "Boshqa" },
]

const initialPlans: PlanItem[] = [
  {
    id: "1",
    title: "Ertalabki mashqlar",
    status: "completed",
    time: "07:00",
    category: "health",
    notes: "30 daqiqa davomida",
    priority: "high",
  },
  {
    id: "2",
    title: "Dasturlash darsi",
    status: "completed",
    time: "10:00",
    category: "study",
    notes: "JavaScript asoslari",
    priority: "medium",
  },
  {
    id: "3",
    title: "Loyiha uchun taqdimot tayyorlash",
    status: "planned",
    time: "14:00",
    category: "work",
    priority: "high",
  },
  {
    id: "4",
    title: "Do'stlar bilan uchrashuv",
    status: "planned",
    time: "18:00",
    category: "personal",
    priority: "medium",
  },
  {
    id: "5",
    title: "Kitob o'qish",
    status: "missed",
    category: "personal",
    notes: "Yangi roman",
    priority: "low",
  },
]

export function DailyPlanner() {
  const [date, setDate] = useState<Date>(new Date())
  const [plans, setPlans] = useState<PlanItem[]>(initialPlans)
  const [newPlanTitle, setNewPlanTitle] = useState("")
  const [newPlanTime, setNewPlanTime] = useState("")
  const [newPlanCategory, setNewPlanCategory] = useState("work")
  const [newPlanNotes, setNewPlanNotes] = useState("")
  const [newPlanPriority, setNewPlanPriority] = useState<"low" | "medium" | "high">("medium")
  const [filter, setFilter] = useState<"all" | "planned" | "completed" | "missed" | "today">("today")

  // Get formatted date string
  const formattedDate = format(date, "PPP")

  // Filter plans based on status and date
  const filteredPlans = plans.filter((plan) => {
    if (filter === "today" && !isToday(date)) {
      return false
    }

    if (filter === "all") return true
    if (filter === "today") return true
    return plan.status === filter
  })

  // Sort plans by time
  const sortedPlans = [...filteredPlans].sort((a, b) => {
    // Plans with time come first
    if (a.time && !b.time) return -1
    if (!a.time && b.time) return 1
    if (!a.time && !b.time) return 0

    // Sort by time
    return a.time!.localeCompare(b.time!)
  })

  // Add new plan
  const addPlan = () => {
    if (!newPlanTitle.trim()) return

    const newPlan: PlanItem = {
      id: Date.now().toString(),
      title: newPlanTitle,
      status: "planned",
      time: newPlanTime || undefined,
      category: newPlanCategory,
      notes: newPlanNotes || undefined,
      priority: newPlanPriority,
    }

    setPlans([...plans, newPlan])
    setNewPlanTitle("")
    setNewPlanTime("")
    setNewPlanNotes("")
    setNewPlanPriority("medium")
  }

  // Update plan status
  const updatePlanStatus = (id: string, status: "planned" | "completed" | "missed") => {
    setPlans(plans.map((plan) => (plan.id === id ? { ...plan, status } : plan)))
  }

  // Delete plan
  const deletePlan = (id: string) => {
    setPlans(plans.filter((plan) => plan.id !== id))
  }

  // Get category label
  const getCategoryLabel = (value: string) => {
    return categories.find((cat) => cat.value === value)?.label || value
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "work":
        return "blue"
      case "personal":
        return "purple"
      case "study":
        return "green"
      case "health":
        return "red"
      default:
        return "gray"
    }
  }

  // Get priority color
  const getPriorityColor = (priority: string | undefined) => {
    switch (priority) {
      case "high":
        return "red"
      case "medium":
        return "yellow"
      case "low":
        return "green"
      default:
        return "gray"
    }
  }

  // Get priority label
  const getPriorityLabel = (priority: string | undefined) => {
    switch (priority) {
      case "high":
        return "Yuqori"
      case "medium":
        return "O'rta"
      case "low":
        return "Past"
      default:
        return "Belgilanmagan"
    }
  }

  // Calculate completion stats
  const totalPlans = plans.length
  const completedPlans = plans.filter((plan) => plan.status === "completed").length
  const missedPlans = plans.filter((plan) => plan.status === "missed").length
  const plannedPlans = plans.filter((plan) => plan.status === "planned").length
  const completionRate = totalPlans > 0 ? Math.round((completedPlans / totalPlans) * 100) : 0

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Kunlik Rejalar</h2>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="glass-card">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Sana tanlash
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 glass-card">
              <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
          </Popover>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="glass-button">
                <Plus className="mr-2 h-4 w-4" />
                Yangi reja
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card">
              <DialogHeader>
                <DialogTitle>Yangi reja qo'shish</DialogTitle>
                <DialogDescription>Kunlik rejangizni qo'shing</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plan-title" className="text-right">
                    Nomi
                  </Label>
                  <Input
                    id="plan-title"
                    value={newPlanTitle}
                    onChange={(e) => setNewPlanTitle(e.target.value)}
                    className="col-span-3 glass-input"
                    placeholder="Reja nomini kiriting"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plan-time" className="text-right">
                    Vaqt
                  </Label>
                  <Input
                    id="plan-time"
                    type="time"
                    value={newPlanTime}
                    onChange={(e) => setNewPlanTime(e.target.value)}
                    className="col-span-3 glass-input"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plan-category" className="text-right">
                    Kategoriya
                  </Label>
                  <Select value={newPlanCategory} onValueChange={setNewPlanCategory}>
                    <SelectTrigger id="plan-category" className="col-span-3 glass-input">
                      <SelectValue placeholder="Kategoriyani tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plan-priority" className="text-right">
                    Muhimlik
                  </Label>
                  <Select value={newPlanPriority} onValueChange={(value) => setNewPlanPriority(value as any)}>
                    <SelectTrigger id="plan-priority" className="col-span-3 glass-input">
                      <SelectValue placeholder="Muhimlikni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Yuqori</SelectItem>
                      <SelectItem value="medium">O'rta</SelectItem>
                      <SelectItem value="low">Past</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plan-notes" className="text-right">
                    Izoh
                  </Label>
                  <Input
                    id="plan-notes"
                    value={newPlanNotes}
                    onChange={(e) => setNewPlanNotes(e.target.value)}
                    className="col-span-3 glass-input"
                    placeholder="Qo'shimcha ma'lumot"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addPlan} className="glass-button">
                  Qo'shish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Card */}
      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalPlans}</div>
              <p className="text-sm text-muted-foreground">Jami rejalar</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{completedPlans}</div>
              <p className="text-sm text-muted-foreground">Bajarilgan</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{plannedPlans}</div>
              <p className="text-sm text-muted-foreground">Rejalashtirilgan</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{missedPlans}</div>
              <p className="text-sm text-muted-foreground">Bajarilmagan</p>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-sm">
              <span>Bajarilish darajasi</span>
              <span>{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="today" value={filter} onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="glass-card w-full justify-start overflow-x-auto flex-nowrap whitespace-nowrap">
          <TabsTrigger value="today">Bugun</TabsTrigger>
          <TabsTrigger value="all">Barchasi</TabsTrigger>
          <TabsTrigger value="planned">Rejalashtirilgan</TabsTrigger>
          <TabsTrigger value="completed">Bajarilgan</TabsTrigger>
          <TabsTrigger value="missed">Bajarilmagan</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>
                {filter === "today"
                  ? "Bugungi rejalar"
                  : filter === "all"
                    ? "Barcha rejalar"
                    : filter === "planned"
                      ? "Rejalashtirilgan"
                      : filter === "completed"
                        ? "Bajarilgan"
                        : "Bajarilmagan"}
              </CardTitle>
              <CardDescription>
                {formattedDate} uchun {sortedPlans.length} ta reja
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedPlans.length > 0 ? (
                  sortedPlans.map((plan) => (
                    <div key={plan.id} className="flex items-start border rounded-md p-3 glass-card">
                      <div className="flex-shrink-0 mt-0.5">
                        {plan.status === "completed" ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : plan.status === "missed" ? (
                          <X className="h-5 w-5 text-red-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              <p
                                className={`text-sm font-medium ${plan.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                              >
                                {plan.title}
                              </p>
                              {plan.priority && (
                                <div
                                  className={`ml-2 h-2 w-2 rounded-full bg-${getPriorityColor(plan.priority)}-500`}
                                  title={getPriorityLabel(plan.priority)}
                                />
                              )}
                            </div>
                            <div className="flex flex-wrap items-center text-xs text-muted-foreground mt-1 gap-1">
                              {plan.time && (
                                <Badge variant="outline" className="bg-blue-100/50 dark:bg-blue-900/20">
                                  <Clock className="h-3 w-3 mr-1" /> {plan.time}
                                </Badge>
                              )}
                              <Badge
                                variant="outline"
                                className={`bg-${getCategoryColor(plan.category)}-100/50 dark:bg-${getCategoryColor(plan.category)}-900/20`}
                              >
                                {getCategoryLabel(plan.category)}
                              </Badge>
                            </div>
                            {plan.notes && <p className="text-xs text-muted-foreground mt-1">{plan.notes}</p>}
                          </div>
                          <div className="flex items-center space-x-2">
                            {plan.status !== "completed" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updatePlanStatus(plan.id, "completed")}
                                className="h-8 w-8 p-0"
                              >
                                <Check className="h-4 w-4" />
                                <span className="sr-only">Bajarildi</span>
                              </Button>
                            )}
                            {plan.status !== "missed" && plan.status !== "completed" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updatePlanStatus(plan.id, "missed")}
                                className="h-8 w-8 p-0"
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Bajarilmadi</span>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deletePlan(plan.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">O'chirish</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground flex flex-col items-center">
                    <AlertCircle className="h-8 w-8 mb-2" />
                    Rejalar mavjud emas
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

