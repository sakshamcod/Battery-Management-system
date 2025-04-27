"use client"

import { Battery, Thermometer, Zap, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { BatteryData } from "@/lib/types"
import { cn } from "@/lib/utils"

interface BatteryOverviewProps {
  data: BatteryData
}

export default function BatteryOverview({ data }: BatteryOverviewProps) {
  const getBatteryColor = (level: number) => {
    if (level < 20) return "text-destructive"
    if (level < 50) return "text-warning"
    return "text-success"
  }

  const getTemperatureColor = (temp: number) => {
    if (temp > 45) return "text-destructive"
    if (temp > 35) return "text-warning"
    return "text-info"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Battery className={cn("h-4 w-4", getBatteryColor(data.chargeLevel))} />
            Battery Charge
          </CardTitle>
          <CardDescription>Current charge level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{data.chargeLevel}%</div>
          <Progress
            value={data.chargeLevel}
            className={cn(
              "h-2 battery-animation",
              data.chargeLevel < 20 ? "bg-destructive/20" : data.chargeLevel < 50 ? "bg-warning/20" : "bg-success/20",
            )}
            indicatorClassName={cn(
              data.chargeLevel < 20 ? "bg-destructive" : data.chargeLevel < 50 ? "bg-warning" : "bg-success",
            )}
          />
          <p className="text-xs text-muted-foreground mt-2">{data.charging ? "Currently charging" : "Not charging"}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Thermometer className={cn("h-4 w-4", getTemperatureColor(data.temperature))} />
            Temperature
          </CardTitle>
          <CardDescription>Current battery temperature</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.temperature}°C</div>
          <Progress
            value={(data.temperature / 60) * 100}
            className={cn(
              "h-2 mt-2",
              data.temperature > 45 ? "bg-destructive/20" : data.temperature > 35 ? "bg-warning/20" : "bg-info/20",
            )}
            indicatorClassName={cn(
              data.temperature > 45 ? "bg-destructive" : data.temperature > 35 ? "bg-warning" : "bg-info",
            )}
          />
          <p className="text-xs text-muted-foreground mt-2">
            {data.temperature > 45
              ? "Critical temperature"
              : data.temperature > 35
                ? "High temperature"
                : "Normal temperature"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Zap className="h-4 w-4 text-info" />
            Voltage
          </CardTitle>
          <CardDescription>Current battery voltage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.voltage}V</div>
          <Progress value={(data.voltage / 450) * 100} className="h-2 mt-2 bg-info/20" indicatorClassName="bg-info" />
          <p className="text-xs text-muted-foreground mt-2">Nominal range: 350V - 420V</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Health
          </CardTitle>
          <CardDescription>Overall battery health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.health}%</div>
          <Progress value={data.health} className="h-2 mt-2 bg-primary/20" indicatorClassName="bg-primary" />
          <p className="text-xs text-muted-foreground mt-2">
            {data.health > 80 ? "Excellent condition" : data.health > 60 ? "Good condition" : "Degraded condition"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

