"use client"

import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  id: string
  title: string
  completed: boolean
  priority: "low" | "medium" | "high"
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Dasturlash darsini tayyorlash",
    completed: false,
    priority: "high",
  },
  {
    id: "2",
    title: "Moliyaviy hisobotni tekshirish",
    completed: true,
    priority: "medium",
  },
  {
    id: "3",
    title: "Server yangilanishini o'rnatish",
    completed: false,
    priority: "high",
  },
  {
    id: "4",
    title: "Yangi buyurtma uchun taklif tayyorlash",
    completed: false,
    priority: "medium",
  },
  {
    id: "5",
    title: "Sport mashg'ulotiga borish",
    completed: true,
    priority: "low",
  },
]

export function RecentTasks({ showAll = false }: { showAll?: boolean }) {
  const displayTasks = showAll ? tasks : tasks.slice(0, 3)

  return (
    <div className="space-y-4">
      {displayTasks.map((task) => (
        <div key={task.id} className="flex items-center border rounded-md p-3">
          <Checkbox id={task.id} checked={task.completed} />
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
          <div
            className={`h-2 w-2 rounded-full ${
              task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
            }`}
          />
        </div>
      ))}
    </div>
  )
}

