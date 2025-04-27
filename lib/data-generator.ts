import type { BatteryData, HistoricalDataPoint, PredictiveDataPoint } from "./types"

// Generate random battery data
export function generateBatteryData(): BatteryData {
  const chargeLevel = Math.floor(Math.random() * 100)
  const temperature = 20 + Math.floor(Math.random() * 30)
  const voltage = 350 + Math.floor(Math.random() * 100)
  const health = 70 + Math.floor(Math.random() * 30)
  const charging = Math.random() > 0.7

  // Generate cells data
  const cells = Array.from({ length: 10 }, (_, i) => ({
    id: `Cell ${i + 1}`,
    voltage: 3.5 + Math.random() * 0.5,
    temperature: temperature + (Math.random() * 5 - 2.5),
    health: health + (Math.random() * 10 - 5),
  }))

  return {
    chargeLevel,
    temperature,
    voltage,
    health,
    charging,
    cells,
    lastUpdated: new Date(),
  }
}

// Generate historical data for charts
export function generateHistoricalData(timeRange: string): HistoricalDataPoint[] {
  let points: number
  let format: string

  switch (timeRange) {
    case "24h":
      points = 24
      format = "HH:mm"
      break
    case "7d":
      points = 7
      format = "ddd"
      break
    case "30d":
      points = 30
      format = "MMM D"
      break
    default:
      points = 24
      format = "HH:mm"
  }

  return Array.from({ length: points }, (_, i) => {
    const time =
      timeRange === "24h"
        ? `${23 - i}:00`
        : timeRange === "7d"
          ? ["Sun", "Sat", "Fri", "Thu", "Wed", "Tue", "Mon"][i]
          : `Day ${points - i}`

    // Create a trend with some randomness
    const baseCharge = 50 + Math.sin((i / (points / 2)) * Math.PI) * 30
    const chargeLevel = Math.max(10, Math.min(100, baseCharge + (Math.random() * 10 - 5)))

    const baseTemp = 30 + Math.sin((i / (points / 3)) * Math.PI) * 10
    const temperature = Math.max(20, Math.min(50, baseTemp + (Math.random() * 5 - 2.5)))

    const baseVoltage = 380 + Math.sin((i / (points / 4)) * Math.PI) * 30
    const voltage = Math.max(350, Math.min(420, baseVoltage + (Math.random() * 10 - 5)))

    return {
      time,
      chargeLevel: Math.round(chargeLevel),
      temperature: Math.round(temperature),
      voltage: Math.round(voltage),
    }
  })
}

// Generate predictive data for future battery health
export function generatePredictiveData(): PredictiveDataPoint[] {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return Array.from({ length: 12 }, (_, i) => {
    // Predictive health decreases over time with some randomness
    const predictedHealth = Math.max(50, 100 - i * 3 + (Math.random() * 6 - 3))

    // Actual health follows the prediction but with more variance
    const actualHealth = i < 6 ? Math.max(50, predictedHealth + (Math.random() * 10 - 5)) : null // No actual data for future months

    return {
      month: months[i],
      predictedHealth: Math.round(predictedHealth),
      actualHealth: actualHealth ? Math.round(actualHealth) : null,
    }
  })
}

