export interface BatteryCell {
  id: string
  voltage: number
  temperature: number
  health: number
}

export interface BatteryData {
  chargeLevel: number
  temperature: number
  voltage: number
  health: number
  charging: boolean
  cells: BatteryCell[]
  lastUpdated: Date
}

export interface HistoricalDataPoint {
  time: string
  chargeLevel: number
  temperature: number
  voltage: number
}

export interface PredictiveDataPoint {
  month: string
  predictedHealth: number
  actualHealth: number
}

