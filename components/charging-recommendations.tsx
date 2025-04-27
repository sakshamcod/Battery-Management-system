"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { BatteryData } from "@/lib/types"
import { Zap, Clock, Calendar, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface ChargingRecommendationsProps {
  data: BatteryData
}

export default function ChargingRecommendations({ data }: ChargingRecommendationsProps) {
  // Calculate optimal charging time based on battery data
  const optimalChargingTime =
    data.chargeLevel < 20
      ? "Immediate charging recommended"
      : data.chargeLevel < 50
        ? "Charging recommended within 24 hours"
        : "Charging not required at this time"

  // Calculate estimated charging time
  const estimatedChargingTime = Math.round((100 - data.chargeLevel) * 0.6)

  // Calculate optimal charging rate
  const optimalChargingRate = data.temperature > 35 ? "Slow charging (0.5C)" : "Standard charging (1C)"

  // Charging efficiency data
  const chargingEfficiencyData = [
    { name: "Efficient", value: 85 },
    { name: "Loss", value: 15 },
  ]

  const COLORS = ["hsl(var(--success))", "hsl(var(--muted))"]

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle>Smart Charging Recommendations</CardTitle>
          </div>
          <CardDescription>Optimize your charging strategy for maximum battery life and efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Charging Schedule
                </h3>

                <Card className="bg-muted">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Current Status</span>
                      <Badge variant={data.charging ? "default" : "outline"}>
                        {data.charging ? "Charging" : "Not Charging"}
                      </Badge>
                    </div>

                    <div className="space-y-4 mt-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Recommendation</span>
                          <span className="font-medium">{optimalChargingTime}</span>
                        </div>
                        <Progress value={data.chargeLevel} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Estimated Charging Time</span>
                          <span className="font-medium">{estimatedChargingTime} minutes</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Optimal Charging Rate</span>
                          <span className="font-medium">{optimalChargingRate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Charging Efficiency
                </h3>

                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chargingEfficiencyData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {chargingEfficiencyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          borderColor: "var(--border)",
                          color: "var(--card-foreground)",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Charging Best Practices
              </h3>

              <Card className="bg-muted h-full">
                <CardContent className="p-4">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Maintain between 20-80%</p>
                        <p className="text-sm text-muted-foreground">
                          For daily use, keep battery level between 20% and 80% to maximize battery lifespan.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Avoid extreme temperatures</p>
                        <p className="text-sm text-muted-foreground">
                          Charge in moderate temperature environments. Avoid charging in very hot or cold conditions.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Use recommended chargers</p>
                        <p className="text-sm text-muted-foreground">
                          Always use manufacturer-approved charging equipment to ensure optimal charging rates.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-warning mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Avoid frequent fast charging</p>
                        <p className="text-sm text-muted-foreground">
                          While convenient, frequent fast charging can accelerate battery degradation over time.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-warning mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Scheduled charging</p>
                        <p className="text-sm text-muted-foreground">
                          Use scheduled charging to take advantage of off-peak electricity rates and cooler
                          temperatures.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

