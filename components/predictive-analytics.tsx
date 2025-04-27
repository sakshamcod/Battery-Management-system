"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { BatteryData } from "@/lib/types"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine } from "recharts"
import { generatePredictiveData } from "@/lib/data-generator"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react"

interface PredictiveAnalyticsProps {
  data: BatteryData
}

export default function PredictiveAnalytics({ data }: PredictiveAnalyticsProps) {
  const predictiveData = generatePredictiveData()

  const remainingLifespan = Math.round(data.health * 0.8)
  const efficiencyTrend = data.health > 80 ? "stable" : "declining"
  const anomalyRisk = data.temperature > 40 || data.voltage > 410 ? "high" : "low"

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <CardTitle>AI-Powered Predictive Analytics</CardTitle>
            </div>
            <Badge variant="outline" className="w-fit">
              Powered by Machine Learning
            </Badge>
          </div>
          <CardDescription>Predictive insights based on historical data and usage patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Estimated Lifespan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">{remainingLifespan}%</div>
                  {remainingLifespan > 60 ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Remaining battery lifespan</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Efficiency Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold capitalize">{efficiencyTrend}</div>
                  {efficiencyTrend === "stable" ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-warning" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Based on recent performance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Anomaly Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold capitalize">{anomalyRisk}</div>
                  {anomalyRisk === "low" ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Probability of system anomalies</p>
              </CardContent>
            </Card>
          </div>

          <div className="h-[300px] chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictiveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    color: "var(--card-foreground)",
                  }}
                />
                <ReferenceLine y={70} label="Critical" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                <defs>
                  <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="predictedHealth"
                  name="Predicted Health"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#healthGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="actualHealth"
                  name="Actual Health"
                  stroke="hsl(var(--info))"
                  strokeDasharray="5 5"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 p-4 bg-muted rounded-md">
            <h4 className="font-medium mb-2">AI Insights</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                <span>
                  Battery degradation is occurring at a rate of 1.2% per month, which is within normal parameters.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-info mt-0.5" />
                <span>Recommended maintenance in approximately 3 months based on current usage patterns.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-success mt-0.5" />
                <span>
                  Optimal temperature range maintained 92% of the time, contributing to extended battery life.
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

