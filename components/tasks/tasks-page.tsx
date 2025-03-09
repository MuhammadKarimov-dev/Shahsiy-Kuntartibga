"use client"

import { useState } from "react"
import { Plus, Calendar, Clock, AlertCircle, Filter, ChevronDown, Tag, CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

interface Task {
  id: string
  title: string
  completed: boolean
  priority: "low" | "medium" | "high"
  category: string
  dueDate?: string
  dueTime?: string
  type: "regular" | "deadline" | "scheduled"
  notes?: string
  recurring?: boolean
  recurringInterval?: "daily" | "weekly" | "monthly"
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Dasturlash darsini tayyorlash",
    completed: false,
    priority: "high",
    category: "Ish",
    dueDate: "2025-03-10",
    dueTime: "14:00",
    type: "deadline",
    notes: "JavaScript asoslari bo'yicha dars tayyorlash",
  },
  {
    id: "2",
    title: "Moliyaviy hisobotni tekshirish",
    completed: true,
    priority: "medium",
    category: "Ish",
    dueDate: "2025-03-09",
    type: "regular",
  },
  {
    id: "3",
    title: "Server yangilanishini o'rnatish",
    completed: false,
    priority: "high",
    category: "Texnik",
    dueDate: "2025-03-11",
    dueTime: "10:00",
    type: "scheduled",
    notes: "Yangi versiyaga o'tkazish",
  },
  {
    id: "4",
    title: "Yangi buyurtma uchun taklif tayyorlash",
    completed: false,
    priority: "medium",
    category: "Ish",
    dueDate: "2025-03-12",
    type: "deadline",
  },
  {
    id: "5",
    title: "Sport mashg'ulotiga borish",
    completed: true,
    priority: "low",
    category: "Shaxsiy",
    dueDate: "2025-03-09",
    dueTime: "18:00",
    type: "scheduled",
    recurring: true,
    recurringInterval: "weekly",
  },
]

const categories = [
  { value: "Ish", label: "Ish" },
  { value: "Shaxsiy", label: "Shaxsiy" },
  { value: "Texnik", label: "Texnik" },
  { value: "O'qish", label: "O'qish" },
  { value: "Boshqa", label: "Boshqa" },
]

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTask, setNewTask] = useState("")
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high">("medium")
  const [newTaskCategory, setNewTaskCategory] = useState("Ish")
  const [newTaskType, setNewTaskType] = useState<"regular" | "deadline" | "scheduled">("regular")
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date | undefined>(undefined)
  const [newTaskDueTime, setNewTaskDueTime] = useState("")
  const [newTaskNotes, setNewTaskNotes] = useState("")
  const [newTaskRecurring, setNewTaskRecurring] = useState(false)
  const [newTaskRecurringInterval, setNewTaskRecurringInterval] = useState<"daily" | "weekly" | "monthly">("weekly")
  const [filter, setFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const addTask = () => {
    if (!newTask.trim()) return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      priority: newTaskPriority,
      category: newTaskCategory,
      type: newTaskType,
      dueDate: newTaskDueDate ? format(newTaskDueDate, "yyyy-MM-dd") : undefined,
      dueTime: newTaskDueTime || undefined,
      notes: newTaskNotes || undefined,
      recurring: newTaskRecurring,
      recurringInterval: newTaskRecurring ? newTaskRecurringInterval : undefined,
    }

    setTasks([...tasks, task])
    setNewTask("")
    setNewTaskNotes("")
    setNewTaskDueDate(undefined)
    setNewTaskDueTime("")
    setNewTaskRecurring(false)
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Apply all filters
  const filteredTasks = tasks.filter((task) => {
    // Status filter
    if (filter !== "all") {
      if (filter === "completed" && !task.completed) return false
      if (filter === "active" && task.completed) return false
    }

    // Priority filter
    if (priorityFilter !== "all" && task.priority !== priorityFilter) return false

    // Category filter
    if (categoryFilter !== "all" && task.category !== categoryFilter) return false

    // Type filter
    if (typeFilter !== "all" && task.type !== typeFilter) return false

    return true
  })

  // Sort tasks by due date and priority
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Incomplete tasks first
    if (!a.completed && b.completed) return -1
    if (a.completed && !b.completed) return 1

    // Then by due date
    if (a.dueDate && b.dueDate) {
      const dateComparison = a.dueDate.localeCompare(b.dueDate)
      if (dateComparison !== 0) return dateComparison
    } else if (a.dueDate) return -1
    else if (b.dueDate) return 1

    // Then by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  // Calculate stats
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.completed).length
  const highPriorityTasks = tasks.filter((t) => t.priority === "high" && !t.completed).length
  const todayTasks = tasks.filter((t) => t.dueDate === format(new Date(), "yyyy-MM-dd") && !t.completed).length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Get task type label
  const getTaskTypeLabel = (type: string) => {
    switch (type) {
      case "regular":
        return "Oddiy"
      case "deadline":
        return "Muddatli"
      case "scheduled":
        return "Rejalashtirilgan"
      default:
        return type
    }
  }

  // Get task type icon
  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case "regular":
        return <Tag className="h-4 w-4" />
      case "deadline":
        return <Calendar className="h-4 w-4" />
      case "scheduled":
        return <Clock className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Vazifalar</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="glass-button">
                <Plus className="mr-2 h-4 w-4" /> Yangi vazifa
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card max-w-md">
              <DialogHeader>
                <DialogTitle>Yangi vazifa qo'shish</DialogTitle>
                <DialogDescription>Vazifa ma'lumotlarini kiriting</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="task">Vazifa nomi</Label>
                  <Input
                    id="task"
                    placeholder="Vazifa nomini kiriting"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="glass-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-type">Vazifa turi</Label>
                    <Select value={newTaskType} onValueChange={(value) => setNewTaskType(value as any)}>
                      <SelectTrigger id="task-type" className="glass-input">
                        <SelectValue placeholder="Vazifa turini tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Oddiy</SelectItem>
                        <SelectItem value="deadline">Muddatli</SelectItem>
                        <SelectItem value="scheduled">Rejalashtirilgan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Muhimlik</Label>
                    <Select
                      value={newTaskPriority}
                      onValueChange={(value) => setNewTaskPriority(value as "low" | "medium" | "high")}
                    >
                      <SelectTrigger id="priority" className="glass-input">
                        <SelectValue placeholder="Muhimlik" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Past</SelectItem>
                        <SelectItem value="medium">O'rta</SelectItem>
                        <SelectItem value="high">Yuqori</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kategoriya</Label>
                  <Select value={newTaskCategory} onValueChange={setNewTaskCategory}>
                    <SelectTrigger id="category" className="glass-input">
                      <SelectValue placeholder="Kategoriya" />
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

                {(newTaskType === "deadline" || newTaskType === "scheduled") && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Sana</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left glass-card">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newTaskDueDate ? format(newTaskDueDate, "PPP") : "Sanani tanlang"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={newTaskDueDate} onSelect={setNewTaskDueDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {newTaskType === "scheduled" && (
                      <div className="space-y-2">
                        <Label htmlFor="task-time">Vaqt</Label>
                        <Input
                          id="task-time"
                          type="time"
                          value={newTaskDueTime}
                          onChange={(e) => setNewTaskDueTime(e.target.value)}
                          className="glass-input"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="task-notes">Izoh</Label>
                  <Input
                    id="task-notes"
                    placeholder="Qo'shimcha ma'lumot"
                    value={newTaskNotes}
                    onChange={(e) => setNewTaskNotes(e.target.value)}
                    className="glass-input"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="task-recurring"
                    checked={newTaskRecurring}
                    onCheckedChange={(checked) => setNewTaskRecurring(checked === true)}
                  />
                  <Label htmlFor="task-recurring">Takrorlanuvchi vazifa</Label>
                </div>

                {newTaskRecurring && (
                  <div className="space-y-2">
                    <Label htmlFor="recurring-interval">Takrorlanish davri</Label>
                    <Select
                      value={newTaskRecurringInterval}
                      onValueChange={(value) => setNewTaskRecurringInterval(value as any)}
                    >
                      <SelectTrigger id="recurring-interval" className="glass-input">
                        <SelectValue placeholder="Takrorlanish davrini tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Har kuni</SelectItem>
                        <SelectItem value="weekly">Har hafta</SelectItem>
                        <SelectItem value="monthly">Har oy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={addTask} className="glass-button">
                  Qo'shish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="glass-card">
                <Filter className="mr-2 h-4 w-4" />
                Filtrlar
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 glass-card">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Kategoriya bo'yicha</h4>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="glass-input">
                      <SelectValue placeholder="Kategoriyani tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Barchasi</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Muhimlik bo'yicha</h4>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="glass-input">
                      <SelectValue placeholder="Muhimlikni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Barchasi</SelectItem>
                      <SelectItem value="high">Yuqori</SelectItem>
                      <SelectItem value="medium">O'rta</SelectItem>
                      <SelectItem value="low">Past</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Tur bo'yicha</h4>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="glass-input">
                      <SelectValue placeholder="Turni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Barchasi</SelectItem>
                      <SelectItem value="regular">Oddiy</SelectItem>
                      <SelectItem value="deadline">Muddatli</SelectItem>
                      <SelectItem value="scheduled">Rejalashtirilgan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Stats Card */}
      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalTasks}</div>
              <p className="text-sm text-muted-foreground">Jami vazifalar</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{completedTasks}</div>
              <p className="text-sm text-muted-foreground">Bajarilgan</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{highPriorityTasks}</div>
              <p className="text-sm text-muted-foreground">Yuqori muhimlikdagi</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{todayTasks}</div>
              <p className="text-sm text-muted-foreground">Bugungi</p>
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

      <Tabs defaultValue="all" onValueChange={setFilter}>
        <TabsList className="glass-card w-full justify-start overflow-x-auto flex-nowrap whitespace-nowrap">
          <TabsTrigger value="all">Barchasi</TabsTrigger>
          <TabsTrigger value="active">Faol</TabsTrigger>
          <TabsTrigger value="completed">Bajarilgan</TabsTrigger>
          <TabsTrigger value="high">Muhim</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>
                {filter === "all"
                  ? "Barcha vazifalar"
                  : filter === "active"
                    ? "Faol vazifalar"
                    : filter === "completed"
                      ? "Bajarilgan vazifalar"
                      : "Muhim vazifalar"}
              </CardTitle>
              <CardDescription>Jami {sortedTasks.length} ta vazifa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedTasks.length > 0 ? (
                  sortedTasks.map((task) => (
                    <div key={task.id} className="flex items-start border rounded-md p-3 glass-card">
                      <Checkbox
                        id={task.id}
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                        className="mt-1"
                      />
                      <div className="ml-4 space-y-1 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <label
                              htmlFor={task.id}
                              className={`text-sm font-medium leading-none ${
                                task.completed ? "line-through text-muted-foreground" : ""
                              }`}
                            >
                              {task.title}
                              {task.recurring && (
                                <Badge variant="outline" className="ml-2 bg-purple-100/50 dark:bg-purple-900/20">
                                  Takrorlanuvchi
                                </Badge>
                              )}
                            </label>
                            <div className="flex flex-wrap items-center text-xs text-muted-foreground mt-1 gap-1">
                              <Badge variant="outline">{task.category}</Badge>
                              <Badge
                                variant="outline"
                                className={`flex items-center ${
                                  task.type === "deadline"
                                    ? "bg-red-100/50 dark:bg-red-900/20"
                                    : task.type === "scheduled"
                                      ? "bg-blue-100/50 dark:bg-blue-900/20"
                                      : "bg-green-100/50 dark:bg-green-900/20"
                                }`}
                              >
                                {getTaskTypeIcon(task.type)}
                                <span className="ml-1">{getTaskTypeLabel(task.type)}</span>
                              </Badge>
                              {task.dueDate && (
                                <Badge variant="outline" className="bg-yellow-100/50 dark:bg-yellow-900/20">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {task.dueDate}
                                  {task.dueTime && ` ${task.dueTime}`}
                                </Badge>
                              )}
                            </div>
                            {task.notes && <p className="text-xs text-muted-foreground mt-1">{task.notes}</p>}
                          </div>
                          <div
                            className={`h-2 w-2 rounded-full ${
                              task.priority === "high"
                                ? "bg-red-500"
                                : task.priority === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground flex flex-col items-center">
                    <AlertCircle className="h-8 w-8 mb-2" />
                    Vazifalar mavjud emas
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

