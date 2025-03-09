"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  {
    name: "Yan",
    kirim: 2400,
    chiqim: 1800,
  },
  {
    name: "Fev",
    kirim: 1398,
    chiqim: 1200,
  },
  {
    name: "Mar",
    kirim: 9800,
    chiqim: 8200,
  },
  {
    name: "Apr",
    kirim: 3908,
    chiqim: 3000,
  },
  {
    name: "May",
    kirim: 4800,
    chiqim: 3800,
  },
  {
    name: "Iyn",
    kirim: 3800,
    chiqim: 2800,
  },
  {
    name: "Iyl",
    kirim: 4300,
    chiqim: 3300,
  },
]

export function FinanceSummary() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Umumiy</TabsTrigger>
        <TabsTrigger value="income">Kirimlar</TabsTrigger>
        <TabsTrigger value="expenses">Chiqimlar</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Kirimlar</CardTitle>
              <CardDescription>Umumiy: 4,500,000 so'm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Darslar</span>
                    <span>2,500,000 so'm</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Buyurtmalar</span>
                    <span>1,800,000 so'm</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Boshqa</span>
                    <span>200,000 so'm</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Chiqimlar</CardTitle>
              <CardDescription>Umumiy: 3,250,000 so'm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>O'quv markaz</span>
                    <span>1,200,000 so'm</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Kommunal</span>
                    <span>450,000 so'm</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Transport</span>
                    <span>600,000 so'm</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Boshqa</span>
                    <span>1,000,000 so'm</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Moliyaviy ko'rsatkichlar</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()} so'm`, ""]}
                  labelFormatter={(label) => `${label}`}
                />
                <Line type="monotone" dataKey="kirim" stroke="var(--color-chart-1)" strokeWidth={2} name="Kirim" />
                <Line type="monotone" dataKey="chiqim" stroke="var(--color-chart-2)" strokeWidth={2} name="Chiqim" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="income">
        <Card>
          <CardHeader>
            <CardTitle>Kirimlar</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Kirimlar bo'yicha batafsil ma'lumot</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="expenses">
        <Card>
          <CardHeader>
            <CardTitle>Chiqimlar</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Chiqimlar bo'yicha batafsil ma'lumot</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

