"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "@/components/ui/chart"

const data = [
  {
    name: "Dushanba",
    tasks: 4,
    finance: 2400,
    health: 80,
  },
  {
    name: "Seshanba",
    tasks: 3,
    finance: 1398,
    health: 75,
  },
  {
    name: "Chorshanba",
    tasks: 5,
    finance: 9800,
    health: 90,
  },
  {
    name: "Payshanba",
    tasks: 2,
    finance: 3908,
    health: 65,
  },
  {
    name: "Juma",
    tasks: 6,
    finance: 4800,
    health: 85,
  },
  {
    name: "Shanba",
    tasks: 3,
    finance: 3800,
    health: 70,
  },
  {
    name: "Yakshanba",
    tasks: 1,
    finance: 4300,
    health: 60,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.substring(0, 3)}
        />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickCount={5} />
        <Tooltip formatter={(value) => [`${value}`, ""]} labelFormatter={(label) => `${label}`} />
        <Bar
          dataKey="tasks"
          fill="var(--color-chart-1)"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
          name="Vazifalar"
        />
        <Bar
          dataKey="health"
          fill="var(--color-chart-2)"
          radius={[4, 4, 0, 0]}
          className="fill-blue-400 dark:fill-blue-600"
          name="Salomatlik"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

