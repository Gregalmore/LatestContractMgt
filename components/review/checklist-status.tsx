"use client"

import { useState } from "react"

interface ChecklistItem {
  category: string
  status: string
}

interface ChecklistStatusProps {
  checklist: ChecklistItem[]
}

export default function ChecklistStatus({ checklist }: ChecklistStatusProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return "✓"
      case "warning":
        return "⚠"
      case "critical":
        return "✕"
      default:
        return "○"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "bg-green-100 text-green-700"
      case "warning":
        return "bg-yellow-100 text-yellow-700"
      case "critical":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Checklist Status</h3>
      <div className="grid grid-cols-2 gap-3">
        {checklist.map((item, idx) => (
          <div
            key={idx}
            className={`rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(item.status)}`}
            onClick={() => setExpandedCategory(expandedCategory === item.category ? null : item.category)}
          >
            <span className="text-lg font-bold">{getStatusIcon(item.status)}</span>
            <span className="font-medium">{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
