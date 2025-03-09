"use client"

import { useState } from "react"
import {
  BookOpen,
  CalendarIcon,
  Clock,
  FileText,
  GraduationCap,
  LinkIcon,
  Plus,
  Search,
  AlertCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, LineChart } from "@/components/ui/chart"

interface Lesson {
  id: string
  title: string
  subject: string
  date: Date
  startTime: string
  endTime: string
  type: "teaching" | "learning"
  location: string
  description?: string
  resources?: Resource[]
}

interface Resource {
  id: string
  title: string
  type: "book" | "website" | "video" | "document"
  url?: string
  description?: string
}

interface Task {
  id: string
  title: string
  subject: string
  dueDate: Date
  completed: boolean
  description?: string
}

interface Subject {
  id: string
  name: string
  progress: number
  color: string
}

const initialSubjects: Subject[] = [
  {
    id: "1",
    name: "Ingliz tili",
    progress: 65,
    color: "blue",
  },
  {
    id: "2",
    name: "Matematika",
    progress: 80,
    color: "green",
  },
  {
    id: "3",
    name: "Dasturlash",
    progress: 45,
    color: "purple",
  },
  {
    id: "4",
    name: "Fizika",
    progress: 30,
    color: "orange",
  },
]

const initialLessons: Lesson[] = [
  {
    id: "1",
    title: "Ingliz tili asoslari",
    subject: "Ingliz tili",
    date: new Date(2025, 2, 10),
    startTime: "14:00",
    endTime: "16:00",
    type: "learning",
    location: "Online",
    description: "Ingliz tili grammatikasi bo'yicha dars",
    resources: [
      {
        id: "1-1",
        title: "Essential Grammar in Use",
        type: "book",
        description: "Raymond Murphy kitobi",
      },
      {
        id: "1-2",
        title: "BBC Learning English",
        type: "website",
        url: "https://www.bbc.co.uk/learningenglish",
      },
    ],
  },
  {
    id: "2",
    title: "Matematika",
    subject: "Matematika",
    date: new Date(2025, 2, 12),
    startTime: "10:00",
    endTime: "12:00",
    type: "learning",
    location: "Universitet",
    description: "Algebra va geometriya",
  },
  {
    id: "3",
    title: "Dasturlash asoslari",
    subject: "Dasturlash",
    date: new Date(2025, 2, 11),
    startTime: "16:00",
    endTime: "18:00",
    type: "learning",
    location: "IT Center",
    description: "JavaScript asoslari",
  },
  {
    id: "4",
    title: "Fizika laboratoriya",
    subject: "Fizika",
    date: new Date(2025, 2, 15),
    startTime: "09:00",
    endTime: "11:00",
    type: "learning",
    location: "Universitet",
    description: "Mexanika bo'yicha laboratoriya ishlari",
  },
]

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Ingliz tili grammatika mashqlari",
    subject: "Ingliz tili",
    dueDate: new Date(2025, 2, 12),
    completed: false,
    description: "Essential Grammar in Use kitobidan 10-15 betlar",
  },
  {
    id: "2",
    title: "Matematika uy vazifasi",
    subject: "Matematika",
    dueDate: new Date(2025, 2, 14),
    completed: true,
    description: "Algebra masalalar to'plami 25-30 betlar",
  },
  {
    id: "3",
    title: "JavaScript loyihasi",
    subject: "Dasturlash",
    dueDate: new Date(2025, 2, 18),
    completed: false,
    description: "Kichik to-do list dasturini yaratish",
  },
  {
    id: "4",
    title: "Fizika laboratoriya hisoboti",
    subject: "Fizika",
    dueDate: new Date(2025, 2, 17),
    completed: false,
    description: "Mexanika laboratoriya ishi hisoboti",
  },
]

// Weekly schedule data
const weeklySchedule = [
  { day: "Dushanba", hours: 4 },
  { day: "Seshanba", hours: 6 },
  { day: "Chorshanba", hours: 2 },
  { day: "Payshanba", hours: 5 },
  { day: "Juma", hours: 3 },
  { day: "Shanba", hours: 1 },
  { day: "Yakshanba", hours: 0 },
]

// Monthly progress data
const monthlyProgressData = [
  { month: "Yanvar", progress: 45 },
  { month: "Fevral", progress: 58 },
  { month: "Mart", progress: 65 },
  { month: "Aprel", progress: 0 },
  { month: "May", progress: 0 },
  { month: "Iyun", progress: 0 },
]

export function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>()
  const [searchQuery, setSearchQuery] = useState("")

  // New lesson form state
  const [newLessonTitle, setNewLessonTitle] = useState("")
  const [newLessonSubject, setNewLessonSubject] = useState("")
  const [newLessonDate, setNewLessonDate] = useState<Date | undefined>(new Date())
  const [newLessonStartTime, setNewLessonStartTime] = useState("")
  const [newLessonEndTime, setNewLessonEndTime] = useState("")
  const [newLessonLocation, setNewLessonLocation] = useState("")
  const [newLessonDescription, setNewLessonDescription] = useState("")

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskSubject, setNewTaskSubject] = useState("")
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date | undefined>(new Date())
  const [newTaskDescription, setNewTaskDescription] = useState("")

  // New subject form state
  const [newSubjectName, setNewSubjectName] = useState("")
  const [newSubjectColor, setNewSubjectColor] = useState("blue")

  // Function to get lessons for a specific date
  const getLessonsForDate = (date: Date | undefined) => {
    if (!date) return []

    return lessons.filter(
      (lesson) =>
        lesson.date.getDate() === date.getDate() &&
        lesson.date.getMonth() === date.getMonth() &&
        lesson.date.getFullYear() === date.getFullYear(),
    )
  }

  // Function to get tasks for a specific date
  const getTasksForDate = (date: Date | undefined) => {
    if (!date) return []

    return tasks.filter(
      (task) =>
        task.dueDate.getDate() === date.getDate() &&
        task.dueDate.getMonth() === date.getMonth() &&
        task.dueDate.getFullYear() === date.getFullYear(),
    )
  }

  // Function to get lessons for a specific subject
  const getLessonsForSubject = (subjectName: string | undefined) => {
    if (!subjectName) return lessons
    return lessons.filter((lesson) => lesson.subject === subjectName)
  }

  // Function to get tasks for a specific subject
  const getTasksForSubject = (subjectName: string | undefined) => {
    if (!subjectName) return tasks
    return tasks.filter((task) => task.subject === subjectName)
  }

  // Function to add a new lesson
  const addLesson = () => {
    if (
      !newLessonTitle ||
      !newLessonSubject ||
      !newLessonDate ||
      !newLessonStartTime ||
      !newLessonEndTime ||
      !newLessonLocation
    ) {
      return // Validate required fields
    }

    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: newLessonTitle,
      subject: newLessonSubject,
      date: newLessonDate,
      startTime: newLessonStartTime,
      endTime: newLessonEndTime,
      type: "learning",
      location: newLessonLocation,
      description: newLessonDescription,
      resources: [],
    }

    setLessons([...lessons, newLesson])

    // Reset form
    setNewLessonTitle("")
    setNewLessonSubject("")
    setNewLessonStartTime("")
    setNewLessonEndTime("")
    setNewLessonLocation("")
    setNewLessonDescription("")
  }

  // Function to add a new task
  const addTask = () => {
    if (!newTaskTitle || !newTaskSubject || !newTaskDueDate) {
      return // Validate required fields
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      subject: newTaskSubject,
      dueDate: newTaskDueDate,
      completed: false,
      description: newTaskDescription,
    }

    setTasks([...tasks, newTask])

    // Reset form
    setNewTaskTitle("")
    setNewTaskSubject("")
    setNewTaskDescription("")
  }

  // Function to add a new subject
  const addSubject = () => {
    if (!newSubjectName) {
      return // Validate required fields
    }

    const newSubject: Subject = {
      id: Date.now().toString(),
      name: newSubjectName,
      progress: 0,
      color: newSubjectColor,
    }

    setSubjects([...subjects, newSubject])

    // Reset form
    setNewSubjectName("")
    setNewSubjectColor("blue")
  }

  // Function to toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const selectedDateLessons = getLessonsForDate(date)
  const selectedDateTasks = getTasksForDate(date)
  const filteredLessons = getLessonsForSubject(selectedSubject)
  const filteredTasks = getTasksForSubject(selectedSubject)

  // Calculate statistics
  const completedTasksCount = tasks.filter((task) => task.completed).length
  const totalTasksCount = tasks.length
  const completionRate = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0

  // Get subject color
  const getSubjectColor = (subjectName: string) => {
    const subject = subjects.find((s) => s.name === subjectName)
    return subject?.color || "gray"
  }

  // Filter lessons and tasks by search query
  const searchedLessons = searchQuery
    ? lessons.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lesson.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lesson.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : lessons

  const searchedTasks = searchQuery
    ? tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : tasks

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Darslar</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="glass-button">
                <Plus className="mr-2 h-4 w-4" /> Yangi dars
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card max-w-md">
              <DialogHeader>
                <DialogTitle>Yangi dars qo'shish</DialogTitle>
                <DialogDescription>Dars ma'lumotlarini kiriting</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="lesson-title">Nomi</Label>
                  <Input
                    id="lesson-title"
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    className="glass-input"
                    placeholder="Dars nomini kiriting"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lesson-subject">Fan</Label>
                  <Select value={newLessonSubject} onValueChange={setNewLessonSubject}>
                    <SelectTrigger id="lesson-subject" className="glass-input">
                      <SelectValue placeholder="Fanni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.name}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lesson-date">Sana</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" id="lesson-date" className="w-full justify-start text-left glass-card">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newLessonDate ? newLessonDate.toLocaleDateString() : <span>Sanani tanlang</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={newLessonDate} onSelect={setNewLessonDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lesson-start-time">Boshlanish vaqti</Label>
                    <Input
                      id="lesson-start-time"
                      type="time"
                      value={newLessonStartTime}
                      onChange={(e) => setNewLessonStartTime(e.target.value)}
                      className="glass-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lesson-end-time">Tugash vaqti</Label>
                    <Input
                      id="lesson-end-time"
                      type="time"
                      value={newLessonEndTime}
                      onChange={(e) => setNewLessonEndTime(e.target.value)}
                      className="glass-input"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lesson-location">Joyi</Label>
                  <Input
                    id="lesson-location"
                    value={newLessonLocation}
                    onChange={(e) => setNewLessonLocation(e.target.value)}
                    className="glass-input"
                    placeholder="Dars joyini kiriting"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lesson-description">Tavsif</Label>
                  <Textarea
                    id="lesson-description"
                    value={newLessonDescription}
                    onChange={(e) => setNewLessonDescription(e.target.value)}
                    className="glass-input"
                    placeholder="Dars haqida qo'shimcha ma'lumot"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addLesson} className="glass-button">
                  Qo'shish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="glass-card">
                <FileText className="mr-2 h-4 w-4" /> Vazifa qo'shish
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card max-w-md">
              <DialogHeader>
                <DialogTitle>Yangi vazifa qo'shish</DialogTitle>
                <DialogDescription>Vazifa ma'lumotlarini kiriting</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="task-title">Nomi</Label>
                  <Input
                    id="task-title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="glass-input"
                    placeholder="Vazifa nomini kiriting"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-subject">Fan</Label>
                  <Select value={newTaskSubject} onValueChange={setNewTaskSubject}>
                    <SelectTrigger id="task-subject" className="glass-input">
                      <SelectValue placeholder="Fanni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.name}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-due-date">Muddat</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="task-due-date"
                        className="w-full justify-start text-left glass-card"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTaskDueDate ? newTaskDueDate.toLocaleDateString() : <span>Sanani tanlang</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={newTaskDueDate} onSelect={setNewTaskDueDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-description">Tavsif</Label>
                  <Textarea
                    id="task-description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="glass-input"
                    placeholder="Vazifa haqida qo'shimcha ma'lumot"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addTask} className="glass-button">
                  Qo'shish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="w-full sm:w-auto">
            <Input
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input"
              prefix={<Search className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="calendar">
        <TabsList className="glass-card w-full justify-start overflow-x-auto flex-nowrap whitespace-nowrap">
          <TabsTrigger value="calendar">Taqvim</TabsTrigger>
          <TabsTrigger value="subjects">Fanlar</TabsTrigger>
          <TabsTrigger value="tasks">Vazifalar</TabsTrigger>
          <TabsTrigger value="statistics">Statistika</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-[1fr_300px]">
            <Card className="col-span-1 glass-card">
              <CardHeader>
                <CardTitle>Darslar jadvali</CardTitle>
                <CardDescription>Barcha darslar ro'yxati</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchedLessons.length > 0 ? (
                    searchedLessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center border rounded-md p-3 glass-card">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full bg-${getSubjectColor(lesson.subject)}-100 dark:bg-${getSubjectColor(lesson.subject)}-900/30`}
                        >
                          <BookOpen
                            className={`h-5 w-5 text-${getSubjectColor(lesson.subject)}-600 dark:text-${getSubjectColor(lesson.subject)}-400`}
                          />
                        </div>
                        <div className="ml-4 space-y-1 flex-1">
                          <p className="text-sm font-medium leading-none">{lesson.title}</p>
                          <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-1 mt-1">
                            <Badge
                              variant="outline"
                              className={`bg-${getSubjectColor(lesson.subject)}-100/50 text-${getSubjectColor(lesson.subject)}-700 dark:bg-${getSubjectColor(lesson.subject)}-900/30 dark:text-${getSubjectColor(lesson.subject)}-400`}
                            >
                              {lesson.subject}
                            </Badge>
                            <Badge variant="outline" className="bg-blue-100/50 dark:bg-blue-900/30">
                              <Calendar className="h-3 w-3 mr-1" />
                              {lesson.date.toLocaleDateString()}
                            </Badge>
                            <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/30">
                              <Clock className="h-3 w-3 mr-1" />
                              {lesson.startTime} - {lesson.endTime}
                            </Badge>
                            <Badge variant="outline">{lesson.location}</Badge>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground flex flex-col items-center">
                      <AlertCircle className="h-8 w-8 mb-2" />
                      Darslar topilmadi
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Taqvim</CardTitle>
                  <CardDescription>Darslar kunini tanlang</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
                </CardContent>
              </Card>

              {date && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>{date.toLocaleDateString()}</CardTitle>
                    <CardDescription>
                      {selectedDateLessons.length > 0 ? `${selectedDateLessons.length} ta dars` : "Darslar yo'q"}
                      {selectedDateTasks.length > 0 ? `, ${selectedDateTasks.length} ta vazifa` : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedDateLessons.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium mb-2">Darslar</h3>
                          {selectedDateLessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center space-x-2 mb-2 p-2 rounded-md bg-accent/20"
                            >
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{lesson.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {lesson.startTime} - {lesson.endTime} • {lesson.location}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {selectedDateTasks.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium mb-2">Vazifalar</h3>
                          {selectedDateTasks.map((task) => (
                            <div key={task.id} className="flex items-center mb-2 p-2 rounded-md bg-accent/20">
                              <Checkbox
                                id={task.id}
                                checked={task.completed}
                                onCheckedChange={() => toggleTaskCompletion(task.id)}
                              />
                              <label
                                htmlFor={task.id}
                                className={`ml-2 text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}
                              >
                                {task.title}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}

                      {selectedDateLessons.length === 0 && selectedDateTasks.length === 0 && (
                        <div className="text-center py-4 text-muted-foreground">Bu kunda darslar va vazifalar yo'q</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Card key={subject.id} className={`glass-card border-${subject.color}-200`}>
                <CardHeader className={`rounded-t-lg`}>
                  <div
                    className={`absolute inset-0 rounded-t-lg bg-${subject.color}-100/50 dark:bg-${subject.color}-900/30 h-24 z-0`}
                  ></div>
                  <div className="relative z-10">
                    <CardTitle>{subject.name}</CardTitle>
                    <CardDescription>O'zlashtirish: {subject.progress}%</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <Progress value={subject.progress} className="mb-4" />
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Darslar:</p>
                      <p className="font-medium">{lessons.filter((l) => l.subject === subject.name).length} ta</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Vazifalar:</p>
                      <p className="font-medium">{tasks.filter((t) => t.subject === subject.name).length} ta</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setSelectedSubject(subject.name)}>
                    Batafsil
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Yangi fan qo'shish</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject-name">Fan nomi</Label>
                    <Input
                      id="subject-name"
                      placeholder="Fan nomini kiriting"
                      value={newSubjectName}
                      onChange={(e) => setNewSubjectName(e.target.value)}
                      className="glass-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject-color">Rang</Label>
                    <Select value={newSubjectColor} onValueChange={setNewSubjectColor}>
                      <SelectTrigger id="subject-color" className="glass-input">
                        <SelectValue placeholder="Rangni tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Ko'k</SelectItem>
                        <SelectItem value="green">Yashil</SelectItem>
                        <SelectItem value="purple">Binafsha</SelectItem>
                        <SelectItem value="orange">Jigarrang</SelectItem>
                        <SelectItem value="red">Qizil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={addSubject} className="w-full glass-button">
                  Qo'shish
                </Button>
              </CardFooter>
            </Card>
          </div>

          {selectedSubject && (
            <Card className="mt-4 glass-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{selectedSubject}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedSubject(undefined)}>
                    Orqaga
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="lessons">
                  <TabsList className="glass-card">
                    <TabsTrigger value="lessons">Darslar</TabsTrigger>
                    <TabsTrigger value="tasks">Vazifalar</TabsTrigger>
                    <TabsTrigger value="resources">Manbalar</TabsTrigger>
                  </TabsList>

                  <TabsContent value="lessons" className="mt-4">
                    <div className="space-y-4">
                      {filteredLessons.length > 0 ? (
                        filteredLessons.map((lesson) => (
                          <div key={lesson.id} className="border rounded-md p-4 glass-card">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-sm font-medium">{lesson.title}</h3>
                                <p className="text-xs text-muted-foreground">
                                  {lesson.date.toLocaleDateString()} • {lesson.startTime} - {lesson.endTime}
                                </p>
                              </div>
                              <Badge variant="outline">{lesson.location}</Badge>
                            </div>
                            {lesson.description && <p className="text-sm mt-2">{lesson.description}</p>}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">Bu fan bo'yicha darslar yo'q</div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="tasks" className="mt-4">
                    <div className="space-y-4">
                      {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                          <div key={task.id} className="border rounded-md p-4 glass-card">
                            <div className="flex items-center mb-2">
                              <Checkbox
                                id={`subject-task-${task.id}`}
                                checked={task.completed}
                                onCheckedChange={() => toggleTaskCompletion(task.id)}
                              />
                              <label
                                htmlFor={`subject-task-${task.id}`}
                                className={`ml-2 text-sm font-medium ${
                                  task.completed ? "line-through text-muted-foreground" : ""
                                }`}
                              >
                                {task.title}
                              </label>
                              <Badge variant="outline" className="ml-auto">
                                {task.dueDate.toLocaleDateString()}
                              </Badge>
                            </div>
                            {task.description && (
                              <p className={`text-sm mt-2 ml-6 ${task.completed ? "text-muted-foreground" : ""}`}>
                                {task.description}
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">Bu fan bo'yicha vazifalar yo'q</div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="resources" className="mt-4">
                    <div className="space-y-4">
                      {filteredLessons.flatMap((lesson) => lesson.resources || []).length > 0 ? (
                        filteredLessons
                          .flatMap((lesson) => lesson.resources || [])
                          .map((resource) => (
                            <div key={resource.id} className="border rounded-md p-4 glass-card">
                              <div className="flex items-start">
                                {resource.type === "book" && <BookOpen className="h-5 w-5 mr-2 text-blue-500" />}
                                {resource.type === "website" && <LinkIcon className="h-5 w-5 mr-2 text-green-500" />}
                                {resource.type === "video" && <FileText className="h-5 w-5 mr-2 text-red-500" />}
                                {resource.type === "document" && <FileText className="h-5 w-5 mr-2 text-orange-500" />}
                                <div>
                                  <h3 className="text-sm font-medium">{resource.title}</h3>
                                  {resource.description && (
                                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                                  )}
                                  {resource.url && (
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-blue-500 hover:underline mt-1 inline-block"
                                    >
                                      Manbaga o'tish
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">Bu fan bo'yicha manbalar yo'q</div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4 mt-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Vazifalar</CardTitle>
              <CardDescription>Barcha vazifalar ro'yxati</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Card className="glass-card border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Jami: {tasks.length} ta vazifa</p>
                        <p className="text-xs text-muted-foreground">
                          {completedTasksCount} ta bajarilgan, {totalTasksCount - completedTasksCount} ta qolgan
                        </p>
                      </div>
                      <div className="w-32">
                        <Progress value={completionRate} className="h-2" />
                        <p className="text-xs text-right mt-1 text-muted-foreground">{completionRate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium">Bajarilmagan vazifalar</h3>
                    <Badge
                      variant="outline"
                      className="ml-2 bg-red-100/50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                    >
                      {searchedTasks.filter((task) => !task.completed).length}
                    </Badge>
                  </div>

                  {searchedTasks.filter((task) => !task.completed).length > 0 ? (
                    <div className="grid gap-2">
                      {searchedTasks
                        .filter((task) => !task.completed)
                        .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
                        .map((task) => (
                          <div
                            key={task.id}
                            className="glass-card rounded-lg p-3 border border-blue-100/50 dark:border-blue-900/20 shadow-sm"
                          >
                            <div className="flex items-start">
                              <Checkbox
                                id={`task-list-${task.id}`}
                                checked={task.completed}
                                onCheckedChange={() => toggleTaskCompletion(task.id)}
                                className="mt-1"
                              />
                              <div className="ml-3 space-y-1 flex-1">
                                <div className="flex items-start justify-between">
                                  <label htmlFor={`task-list-${task.id}`} className="text-sm font-medium leading-tight">
                                    {task.title}
                                  </label>
                                  <Badge
                                    variant="outline"
                                    className={`ml-2 shrink-0 bg-${getSubjectColor(task.subject)}-100/50 text-${getSubjectColor(task.subject)}-700 dark:bg-${getSubjectColor(task.subject)}-900/20 dark:text-${getSubjectColor(task.subject)}-400`}
                                  >
                                    {task.subject}
                                  </Badge>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{task.dueDate.toLocaleDateString()}</span>
                                </div>
                                {task.description && (
                                  <p className="text-xs text-muted-foreground mt-1 border-t border-border/30 pt-1">
                                    {task.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground bg-muted/10 rounded-lg border border-border/50">
                      Bajarilmagan vazifalar yo'q
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium">Bajarilgan vazifalar</h3>
                    <Badge
                      variant="outline"
                      className="ml-2 bg-green-100/50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                    >
                      {searchedTasks.filter((task) => task.completed).length}
                    </Badge>
                  </div>

                  {searchedTasks.filter((task) => task.completed).length > 0 ? (
                    <div className="grid gap-2">
                      {searchedTasks
                        .filter((task) => task.completed)
                        .map((task) => (
                          <div
                            key={task.id}
                            className="glass-card rounded-lg p-3 border border-green-100/50 dark:border-green-900/20 bg-muted/10 shadow-sm"
                          >
                            <div className="flex items-start">
                              <Checkbox
                                id={`task-list-completed-${task.id}`}
                                checked={task.completed}
                                onCheckedChange={() => toggleTaskCompletion(task.id)}
                                className="mt-1"
                              />
                              <div className="ml-3 space-y-1 flex-1">
                                <div className="flex items-start justify-between">
                                  <label
                                    htmlFor={`task-list-completed-${task.id}`}
                                    className="text-sm font-medium leading-tight line-through text-muted-foreground"
                                  >
                                    {task.title}
                                  </label>
                                  <Badge variant="outline" className="ml-2 shrink-0 opacity-70">
                                    {task.subject}
                                  </Badge>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground opacity-70">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{task.dueDate.toLocaleDateString()}</span>
                                </div>
                                {task.description && (
                                  <p className="text-xs text-muted-foreground mt-1 opacity-70 border-t border-border/30 pt-1">
                                    {task.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground bg-muted/10 rounded-lg border border-border/50">
                      Bajarilgan vazifalar yo'q
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jami darslar</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lessons.length}</div>
                <p className="text-xs text-muted-foreground">
                  {lessons.filter((l) => l.date >= new Date()).length} ta kelayotgan darslar
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jami vazifalar</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tasks.length}</div>
                <p className="text-xs text-muted-foreground">
                  {completedTasksCount} ta bajarilgan ({completionRate}%)
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fanlar</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{subjects.length}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round(subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length)}% o'rtacha
                  o'zlashtirish
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Haftalik soatlar</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weeklySchedule.reduce((sum, day) => sum + day.hours, 0)}</div>
                <p className="text-xs text-muted-foreground">Haftalik o'qish soatlari</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Fanlar bo'yicha o'zlashtirish</CardTitle>
                <CardDescription>Har bir fan bo'yicha o'zlashtirish darajasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{subject.name}</span>
                        <span>{subject.progress}%</span>
                      </div>
                      <Progress
                        value={subject.progress}
                        className={`h-2 bg-${subject.color}-100 dark:bg-${subject.color}-900/30`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Oylik o'zlashtirish</CardTitle>
                <CardDescription>Oylar bo'yicha o'zlashtirish darajasi</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyProgressData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", color: "#000" }}
                      formatter={(value) => [`${value}%`, "O'zlashtirish"]}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="progress"
                      stroke="var(--color-chart-1)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Haftalik jadval</CardTitle>
              <CardDescription>Kunlar bo'yicha o'qish soatlari</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklySchedule} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <XAxis
                    dataKey="day"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.substring(0, 3)}
                  />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickCount={5} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", color: "#000" }}
                    formatter={(value) => [`${value} soat`, ""]}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Bar
                    dataKey="hours"
                    fill="var(--color-chart-1)"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                    name="Soatlar"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Vazifalar bajarilishi</CardTitle>
              <CardDescription>Fanlar bo'yicha vazifalar bajarilishi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjects.map((subject) => {
                  const subjectTasks = tasks.filter((t) => t.subject === subject.name)
                  const completedSubjectTasks = subjectTasks.filter((t) => t.completed)
                  const completionPercentage =
                    subjectTasks.length > 0 ? Math.round((completedSubjectTasks.length / subjectTasks.length) * 100) : 0

                  return (
                    <div key={subject.id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{subject.name}</span>
                        <span>
                          {completedSubjectTasks.length}/{subjectTasks.length} ({completionPercentage}%)
                        </span>
                      </div>
                      <Progress
                        value={completionPercentage}
                        className={`h-2 bg-${subject.color}-100 dark:bg-${subject.color}-900/30`}
                      />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

