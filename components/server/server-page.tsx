"use client"

import { useState } from "react"
import { Activity, AlertTriangle, ArrowUpDown, CheckCircle, Clock, ServerIcon, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

interface ServerStatus {
  id: string
  name: string
  status: "online" | "offline" | "warning"
  uptime: number
  cpu: number
  memory: number
  disk: number
  lastChecked: string
}

const initialServers: ServerStatus[] = [
  {
    id: "1",
    name: "SeeZNTV Main Server",
    status: "online",
    uptime: 99.98,
    cpu: 45,
    memory: 60,
    disk: 72,
    lastChecked: "2025-03-09T14:30:00",
  },
  {
    id: "2",
    name: "Database Server",
    status: "online",
    uptime: 99.95,
    cpu: 30,
    memory: 50,
    disk: 65,
    lastChecked: "2025-03-09T14:30:00",
  },
  {
    id: "3",
    name: "Backup Server",
    status: "warning",
    uptime: 98.5,
    cpu: 75,
    memory: 85,
    disk: 90,
    lastChecked: "2025-03-09T14:30:00",
  },
  {
    id: "4",
    name: "Development Server",
    status: "offline",
    uptime: 0,
    cpu: 0,
    memory: 0,
    disk: 0,
    lastChecked: "2025-03-09T14:30:00",
  },
]

const performanceData = [
  {
    time: "00:00",
    cpu: 30,
    memory: 45,
    network: 20,
  },
  {
    time: "04:00",
    cpu: 25,
    memory: 48,
    network: 15,
  },
  {
    time: "08:00",
    cpu: 40,
    memory: 55,
    network: 30,
  },
  {
    time: "12:00",
    cpu: 65,
    memory: 70,
    network: 45,
  },
  {
    time: "16:00",
    cpu: 50,
    memory: 60,
    network: 35,
  },
  {
    time: "20:00",
    cpu: 35,
    memory: 50,
    network: 25,
  },
  {
    time: "Now",
    cpu: 45,
    memory: 60,
    network: 30,
  },
]

export function ServerPage() {
  const [servers, setServers] = useState<ServerStatus[]>(initialServers)

  const getStatusIcon = (status: "online" | "offline" | "warning") => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "offline":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusText = (status: "online" | "offline" | "warning") => {
    switch (status) {
      case "online":
        return "Online"
      case "offline":
        return "Offline"
      case "warning":
        return "Warning"
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString()
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Server Monitoring</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <ArrowUpDown className="mr-2 h-4 w-4" /> Yangilash
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serverlar holati</CardTitle>
            <ServerIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {servers.filter((s) => s.status === "online").length}/{servers.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {servers.filter((s) => s.status === "online").length} ta server ishlayapti
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">O'rtacha uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(servers.reduce((sum, server) => sum + server.uptime, 0) / servers.length).toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">So'nggi 30 kun</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU yuklanishi</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                servers.reduce((sum, server) => sum + (server.status !== "offline" ? server.cpu : 0), 0) /
                  servers.filter((s) => s.status !== "offline").length,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">O'rtacha</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">So'nggi tekshiruv</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(servers[0].lastChecked)}</div>
            <p className="text-xs text-muted-foreground">Bugun</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="servers">
        <TabsList>
          <TabsTrigger value="servers">Serverlar</TabsTrigger>
          <TabsTrigger value="performance">Ishlash ko'rsatkichlari</TabsTrigger>
          <TabsTrigger value="logs">Loglar</TabsTrigger>
        </TabsList>

        <TabsContent value="servers" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Serverlar holati</CardTitle>
              <CardDescription>Barcha serverlar holati</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {servers.map((server) => (
                  <div key={server.id} className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {getStatusIcon(server.status)}
                        <div className="ml-2">
                          <h3 className="text-sm font-medium">{server.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {getStatusText(server.status)} • Uptime: {server.uptime}%
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Batafsil
                      </Button>
                    </div>

                    {server.status !== "offline" && (
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>CPU</span>
                            <span>{server.cpu}%</span>
                          </div>
                          <Progress value={server.cpu} className="h-1" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>Memory</span>
                            <span>{server.memory}%</span>
                          </div>
                          <Progress value={server.memory} className="h-1" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>Disk</span>
                            <span>{server.disk}%</span>
                          </div>
                          <Progress value={server.disk} className="h-1" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ishlash ko'rsatkichlari</CardTitle>
              <CardDescription>So'nggi 24 soat</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={performanceData}>
                  <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Line type="monotone" dataKey="cpu" stroke="var(--color-chart-1)" strokeWidth={2} />
                  <Line type="monotone" dataKey="memory" stroke="var(--color-chart-2)" strokeWidth={2} />
                  <Line type="monotone" dataKey="network" stroke="var(--color-chart-3)" strokeWidth={2} />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>

              <div className="flex items-center justify-center mt-4 space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-chart-1)] mr-1" />
                  <span className="text-xs">CPU</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-chart-2)] mr-1" />
                  <span className="text-xs">Memory</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-chart-3)] mr-1" />
                  <span className="text-xs">Network</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Server loglari</CardTitle>
              <CardDescription>So'nggi xabarlar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="border-l-4 border-green-500 pl-2 py-1">
                  <p className="font-medium">System startup completed</p>
                  <p className="text-xs text-muted-foreground">Today, 08:00:00</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-2 py-1">
                  <p className="font-medium">High CPU usage detected</p>
                  <p className="text-xs text-muted-foreground">Today, 12:15:30</p>
                </div>
                <div className="border-l-4 border-red-500 pl-2 py-1">
                  <p className="font-medium">Backup Server connection lost</p>
                  <p className="text-xs text-muted-foreground">Today, 13:45:22</p>
                </div>
                <div className="border-l-4 border-green-500 pl-2 py-1">
                  <p className="font-medium">Database backup completed</p>
                  <p className="text-xs text-muted-foreground">Today, 14:00:00</p>
                </div>
                <div className="border-l-4 border-green-500 pl-2 py-1">
                  <p className="font-medium">New content uploaded</p>
                  <p className="text-xs text-muted-foreground">Today, 14:30:15</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

