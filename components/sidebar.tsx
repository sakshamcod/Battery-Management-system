"use client"

import { useState } from "react"
import Link from "next/link"
import { Battery, BarChart3, Zap, Settings, AlertTriangle, Home, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Battery, label: "Battery Status", href: "#" },
    { icon: BarChart3, label: "Analytics", href: "#" },
    { icon: Zap, label: "Charging", href: "#" },
    { icon: AlertTriangle, label: "Alerts", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ]

  return (
    <div
      className={cn("h-screen bg-card border-r flex flex-col transition-all duration-300", collapsed ? "w-16" : "w-64")}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
          <Battery className="h-6 w-6 text-primary" />
          {!collapsed && <span className="font-bold text-lg">EV BMS</span>}
        </div>
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded-full hover:bg-muted">
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors",
                  index === 0 && "bg-muted",
                )}
              >
                <item.icon className="h-5 w-5 text-primary" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            U
          </div>
          {!collapsed && <span className="font-medium">User</span>}
        </div>
      </div>
    </div>
  )
}

