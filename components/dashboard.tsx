"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/sidebar"
import BatteryOverview from "@/components/battery-overview"
import BatteryDetails from "@/components/battery-details"
import PredictiveAnalytics from "@/components/predictive-analytics"
import ChargingRecommendations from "@/components/charging-recommendations"
import NotificationCenter from "@/components/notification-center"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from "@/components/mode-toggle"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { generateBatteryData } from "@/lib/data-generator"
import type { BatteryData } from "@/lib/types"

export default function Dashboard() {
  const [batteryData, setBatteryData] = useState<BatteryData | null>(null)
  const [notifications, setNotifications] = useState<string[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    // Initial data load
    const data = generateBatteryData()
    setBatteryData(data)

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newData = generateBatteryData()
      setBatteryData(newData)

      // Generate notifications based on battery conditions
      if (newData.chargeLevel < 20) {
        setNotifications((prev) => [`Low battery alert: ${newData.chargeLevel}% remaining`, ...prev.slice(0, 4)])
      }

      if (newData.temperature > 40) {
        setNotifications((prev) => [`High temperature warning: ${newData.temperature}°C`, ...prev.slice(0, 4)])
      }

      if (newData.voltage > 400) {
        setNotifications((prev) => [`High voltage alert: ${newData.voltage}V`, ...prev.slice(0, 4)])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (!batteryData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b">
          <h1 className="text-2xl font-bold">EV Battery Management System</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 notification-badge bg-destructive text-destructive-foreground">
                  {notifications.length}
                </Badge>
              )}
            </Button>
            <ModeToggle />
          </div>
        </header>

        <main className="p-4 md:p-6">
          {showNotifications && notifications.length > 0 && (
            <NotificationCenter notifications={notifications} onClose={() => setShowNotifications(false)} />
          )}

          <BatteryOverview data={batteryData} />

          <Tabs defaultValue="details" className="mt-6">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="details">Battery Details</TabsTrigger>
              <TabsTrigger value="analytics">Predictive Analytics</TabsTrigger>
              <TabsTrigger value="charging">Charging Recommendations</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <BatteryDetails data={batteryData} />
            </TabsContent>
            <TabsContent value="analytics" className="mt-4">
              <PredictiveAnalytics data={batteryData} />
            </TabsContent>
            <TabsContent value="charging" className="mt-4">
              <ChargingRecommendations data={batteryData} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

