"use client"

import { useState } from "react"
import { Activity, Apple, Calendar, Heart, Moon, Plus, Scale, Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const sleepData = [
  {
    date: "Dushanba",
    hours: 7.5,
  },
  {
    date: "Seshanba",
    hours: 8,
  },
  {
    date: "Chorshanba",
    hours: 6.5,
  },
  {
    date: "Payshanba",
    hours: 7,
  },
  {
    date: "Juma",
    hours: 7.5,
  },
  {
    date: "Shanba",
    hours: 8.5,
  },
  {
    date: "Yakshanba",
    hours: 9,
  },
]

const activityData = [
  {
    date: "Dushanba",
    steps: 8500,
    calories: 350,
  },
  {
    date: "Seshanba",
    steps: 10200,
    calories: 420,
  },
  {
    date: "Chorshanba",
    steps: 7800,
    calories: 320,
  },
  {
    date: "Payshanba",
    steps: 9500,
    calories: 380,
  },
  {
    date: "Juma",
    steps: 11000,
    calories: 450,
  },
  {
    date: "Shanba",
    steps: 6500,
    calories: 280,
  },
  {
    date: "Yakshanba",
    steps: 5000,
    calories: 220,
  },
]

interface DailyTask {
  id: string
  title: string
  completed: boolean
  category: "exercise" | "hygiene" | "diet"
  count?: number
  unit?: string
}

const initialDailyTasks: DailyTask[] = [
  {
    id: "1",
    title: "Ajmaniya",
    completed: false,
    category: "exercise",
    count: 30,
    unit: "marta",
  },
  {
    id: "2",
    title: "Otirib turish",
    completed: false,
    category: "exercise",
    count: 20,
    unit: "marta",
  },
  {
    id: "3",
    title: "Yuz yuvish",
    completed: true,
    category: "hygiene",
  },
  {
    id: "4",
    title: "Kechki kiyimlarni almashtirish",
    completed: false,
    category: "hygiene",
  },
  {
    id: "5",
    title: "Nonushta",
    completed: true,
    category: "diet",
  },
  {
    id: "6",
    title: "Suv ichish (2 litr)",
    completed: false,
    category: "diet",
  },
]

interface WeightRecord {
  id: string
  date: string
  weight: number
}

const initialWeightRecords: WeightRecord[] = [
  {
    id: "1",
    date: "2025-03-03",
    weight: 75.5,
  },
  {
    id: "2",
    date: "2025-03-05",
    weight: 75.2,
  },
  {
    id: "3",
    date: "2025-03-07",
    weight: 74.8,
  },
  {
    id: "4",
    date: "2025-03-09",
    weight: 74.5,
  },
]

export function HealthPage() {
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>(initialDailyTasks)
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>(initialWeightRecords)
  const [sleepHours, setSleepHours] = useState("")
  const [newWeight, setNewWeight] = useState("")
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskCategory, setNewTaskCategory] = useState<"exercise" | "hygiene" | "diet">("exercise")
  const [newTaskCount, setNewTaskCount] = useState("")
  const [newTaskUnit, setNewTaskUnit] = useState("marta")
  const [activityType, setActivityType] = useState("")
  const [activityDuration, setActivityDuration] = useState("")

  const averageSleep = sleepData.reduce((sum, day) => sum + day.hours, 0) / sleepData.length
  const averageSteps = activityData.reduce((sum, day) => sum + day.steps, 0) / activityData.length
  const latestWeight = weightRecords.length > 0 ? weightRecords[weightRecords.length - 1].weight : 0

  const toggleTaskCompletion = (id: string) => {
    setDailyTasks(dailyTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const addDailyTask = () => {
    if (!newTaskTitle.trim()) return

    const task: DailyTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      category: newTaskCategory,
      count: newTaskCount ? Number(newTaskCount) : undefined,
      unit: newTaskCount ? newTaskUnit : undefined,
    }

    setDailyTasks([...dailyTasks, task])
    setNewTaskTitle("")
    setNewTaskCount("")
  }

  const addWeightRecord = () => {
    if (!newWeight) return

    const record: WeightRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      weight: Number(newWeight),
    }

    setWeightRecords([...weightRecords, record])
    setNewWeight("")
  }

  const addSleepRecord = () => {
    // Add sleep record logic
    setSleepHours("")
  }

  const addActivityRecord = () => {
    // Add activity record logic
    setActivityType("")
    setActivityDuration("")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Salomatlik</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Yangi ma'lumot
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">O'rtacha uyqu</CardTitle>
            <Moon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageSleep.toFixed(1)} soat</div>
            <p className="text-xs text-muted-foreground">So'nggi 7 kun</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">O'rtacha qadam</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(averageSteps)}</div>
            <p className="text-xs text-muted-foreground">So'nggi 7 kun</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Joriy vazn</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestWeight} kg</div>
            <p className="text-xs text-muted-foreground">So'nggi o'lchov</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bugungi vazifalar</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dailyTasks.filter((t) => t.completed).length}/{dailyTasks.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((dailyTasks.filter((t) => t.completed).length / dailyTasks.length) * 100)}% bajarildi
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily">
        <TabsList className="grid grid-cols-4 md:w-auto md:grid-cols-5">
          <TabsTrigger value="daily">Kunlik</TabsTrigger>
          <TabsTrigger value="weight">Vazn</TabsTrigger>
          <TabsTrigger value="sleep">Uyqu</TabsTrigger>
          <TabsTrigger value="exercise">Mashqlar</TabsTrigger>
          <TabsTrigger value="diet" className="hidden md:block">
            Ovqatlanish
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bugungi vazifalar</CardTitle>
              <CardDescription>Kunlik salomatlik vazifalari</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <h3 className="text-sm font-medium">Mashqlar</h3>
                  {dailyTasks
                    .filter((task) => task.category === "exercise")
                    .map((task) => (
                      <div key={task.id} className="flex items-center border rounded-md p-3">
                        <Checkbox
                          id={task.id}
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskCompletion(task.id)}
                        />
                        <div className="ml-4 space-y-1 flex-1">
                          <label
                            htmlFor={task.id}
                            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                              task.completed ? "line-through text-muted-foreground" : ""
                            }`}
                          >
                            {task.title} {task.count && `(${task.count} ${task.unit})`}
                          </label>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="grid gap-2">
                  <h3 className="text-sm font-medium">Gigiyena</h3>
                  {dailyTasks
                    .filter((task) => task.category === "hygiene")
                    .map((task) => (
                      <div key={task.id} className="flex items-center border rounded-md p-3">
                        <Checkbox
                          id={task.id}
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskCompletion(task.id)}
                        />
                        <div className="ml-4 space-y-1 flex-1">
                          <label
                            htmlFor={task.id}
                            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                              task.completed ? "line-through text-muted-foreground" : ""
                            }`}
                          >
                            {task.title}
                          </label>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="grid gap-2">
                  <h3 className="text-sm font-medium">Ovqatlanish</h3>
                  {dailyTasks
                    .filter((task) => task.category === "diet")
                    .map((task) => (
                      <div key={task.id} className="flex items-center border rounded-md p-3">
                        <Checkbox
                          id={task.id}
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskCompletion(task.id)}
                        />
                        <div className="ml-4 space-y-1 flex-1">
                          <label
                            htmlFor={task.id}
                            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                              task.completed ? "line-through text-muted-foreground" : ""
                            }`}
                          >
                            {task.title}
                          </label>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Yangi vazifa qo'shish</CardTitle>
              <CardDescription>Kunlik vazifa qo'shing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="task-title">Vazifa nomi</Label>
                  <Input
                    id="task-title"
                    placeholder="Vazifa nomini kiriting"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-category">Kategoriya</Label>
                  <Select
                    value={newTaskCategory}
                    onValueChange={(value) => setNewTaskCategory(value as "exercise" | "hygiene" | "diet")}
                  >
                    <SelectTrigger id="task-category">
                      <SelectValue placeholder="Kategoriyani tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exercise">Mashq</SelectItem>
                      <SelectItem value="hygiene">Gigiyena</SelectItem>
                      <SelectItem value="diet">Ovqatlanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newTaskCategory === "exercise" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="task-count">Miqdor</Label>
                      <Input
                        id="task-count"
                        placeholder="Miqdorni kiriting"
                        value={newTaskCount}
                        onChange={(e) => setNewTaskCount(e.target.value)}
                        type="number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="task-unit">O'lchov birligi</Label>
                      <Select value={newTaskUnit} onValueChange={setNewTaskUnit}>
                        <SelectTrigger id="task-unit">
                          <SelectValue placeholder="Birlikni tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marta">Marta</SelectItem>
                          <SelectItem value="daqiqa">Daqiqa</SelectItem>
                          <SelectItem value="set">Set</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <Button onClick={addDailyTask} className="md:col-span-2">
                  Qo'shish
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weight" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Vazn o'zgarishi</CardTitle>
              <CardDescription>Vazn o'zgarishi dinamikasi</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={weightRecords.map((record) => ({
                    date: record.date,
                    weight: record.weight,
                  }))}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={["dataMin - 1", "dataMax + 1"]}
                  />
                  <Line type="monotone" dataKey="weight" stroke="var(--color-chart-1)" strokeWidth={2} />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-4 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Yangi vazn (kg)</Label>
                    <Input
                      id="weight"
                      placeholder="Vaznni kiriting"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                      type="number"
                      step="0.1"
                    />
                  </div>
                  <Button onClick={addWeightRecord} className="md:self-end">
                    Qo'shish
                  </Button>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Vazn tarixi</h3>
                  <div className="space-y-2">
                    {weightRecords
                      .slice()
                      .reverse()
                      .map((record) => (
                        <div key={record.id} className="flex justify-between text-sm">
                          <span>{record.date}</span>
                          <span className="font-medium">{record.weight} kg</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Uyqu ma'lumotlari</CardTitle>
              <CardDescription>So'nggi 7 kun</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sleepData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 12]}
                    ticks={[0, 2, 4, 6, 8, 10, 12]}
                  />
                  <Line type="monotone" dataKey="hours" stroke="var(--color-chart-1)" strokeWidth={2} />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-4">
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                  <div className="flex-1">
                    <Label htmlFor="sleep-hours">Uyqu vaqti (soat)</Label>
                    <Input
                      id="sleep-hours"
                      placeholder="Uyqu vaqtini kiriting"
                      value={sleepHours}
                      onChange={(e) => setSleepHours(e.target.value)}
                      type="number"
                      step="0.5"
                    />
                  </div>
                  <Button onClick={addSleepRecord} className="md:self-end">
                    Qo'shish
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercise" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Mashqlar</CardTitle>
              <CardDescription>Jismoniy faollik</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-md p-4">
                    <h3 className="text-sm font-medium mb-2">Bugungi mashqlar</h3>
                    <div className="space-y-2">
                      {dailyTasks
                        .filter((task) => task.category === "exercise")
                        .map((task) => (
                          <div key={task.id} className="flex items-center">
                            <Checkbox
                              id={`ex-${task.id}`}
                              checked={task.completed}
                              onCheckedChange={() => toggleTaskCompletion(task.id)}
                            />
                            <label
                              htmlFor={`ex-${task.id}`}
                              className={`ml-2 text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}
                            >
                              {task.title} {task.count && `(${task.count} ${task.unit})`}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="text-sm font-medium mb-2">Haftalik faollik</h3>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Yugurish</span>
                          <span>3/5 kun</span>
                        </div>
                        <Progress value={60} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Kuch mashqlari</span>
                          <span>2/3 kun</span>
                        </div>
                        <Progress value={66} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Cho'zilish</span>
                          <span>4/7 kun</span>
                        </div>
                        <Progress value={57} />
                      </div>
                    </div>
                  </div>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Yangi mashq qo'shish</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="exercise-title">Mashq nomi</Label>
                        <Input
                          id="exercise-title"
                          placeholder="Mashq nomini kiriting"
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="exercise-count">Miqdor</Label>
                        <Input
                          id="exercise-count"
                          placeholder="Miqdorni kiriting"
                          value={newTaskCount}
                          onChange={(e) => setNewTaskCount(e.target.value)}
                          type="number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="exercise-unit">O'lchov birligi</Label>
                        <Select value={newTaskUnit} onValueChange={setNewTaskUnit}>
                          <SelectTrigger id="exercise-unit">
                            <SelectValue placeholder="Birlikni tanlang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="marta">Marta</SelectItem>
                            <SelectItem value="daqiqa">Daqiqa</SelectItem>
                            <SelectItem value="set">Set</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={() => {
                          setNewTaskCategory("exercise")
                          addDailyTask()
                        }}
                        className="md:col-span-3"
                      >
                        Qo'shish
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diet" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ovqatlanish</CardTitle>
              <CardDescription>Ovqatlanish rejimi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-md p-4">
                    <h3 className="text-sm font-medium mb-2">Bugungi ovqatlanish</h3>
                    <div className="space-y-2">
                      {dailyTasks
                        .filter((task) => task.category === "diet")
                        .map((task) => (
                          <div key={task.id} className="flex items-center">
                            <Checkbox
                              id={`diet-${task.id}`}
                              checked={task.completed}
                              onCheckedChange={() => toggleTaskCompletion(task.id)}
                            />
                            <label
                              htmlFor={`diet-${task.id}`}
                              className={`ml-2 text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}
                            >
                              {task.title}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="text-sm font-medium mb-2">Tavsiyalar</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <Apple className="h-4 w-4 mr-2 text-green-500" />
                        <span>Kuniga kamida 2 ta meva iste'mol qiling</span>
                      </li>
                      <li className="flex items-center">
                        <Utensils className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Kuniga 2 litr suv iching</span>
                      </li>
                      <li className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                        <span>Ovqatlanish vaqtlarini rejalashtiring</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Yangi ovqatlanish vazifasi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                      <div className="flex-1">
                        <Label htmlFor="diet-title">Vazifa nomi</Label>
                        <Input
                          id="diet-title"
                          placeholder="Vazifa nomini kiriting"
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={() => {
                          setNewTaskCategory("diet")
                          addDailyTask()
                        }}
                        className="md:self-end"
                      >
                        Qo'shish
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

