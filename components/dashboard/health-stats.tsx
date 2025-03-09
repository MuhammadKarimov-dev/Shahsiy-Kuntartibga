"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function HealthStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Uyqu</CardTitle>
          <CardDescription>So'nggi 7 kun</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Dushanba</div>
              <div className="text-sm text-muted-foreground">7.5 soat</div>
            </div>
            <Progress value={75} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Seshanba</div>
              <div className="text-sm text-muted-foreground">8 soat</div>
            </div>
            <Progress value={80} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Chorshanba</div>
              <div className="text-sm text-muted-foreground">6.5 soat</div>
            </div>
            <Progress value={65} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Payshanba</div>
              <div className="text-sm text-muted-foreground">7 soat</div>
            </div>
            <Progress value={70} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sport</CardTitle>
          <CardDescription>Haftalik faollik</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Yugurish</div>
              <div className="text-sm text-muted-foreground">3/5 kun</div>
            </div>
            <Progress value={60} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Kuch mashqlari</div>
              <div className="text-sm text-muted-foreground">2/3 kun</div>
            </div>
            <Progress value={66} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Cho'zilish</div>
              <div className="text-sm text-muted-foreground">4/7 kun</div>
            </div>
            <Progress value={57} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Qadam soni</div>
              <div className="text-sm text-muted-foreground">8,500/10,000</div>
            </div>
            <Progress value={85} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

