"use client"

import { useState } from "react"

interface Concern {
  severity: string
  title: string
  section: string
  description: string
  recommendation: string
}

interface TopConcernsProps {
  concerns: Concern[]
}

export default function TopConcerns({ concerns }: TopConcernsProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return "🔴"
      case "high":
        return "🟠"
      case "medium":
        return "🟡"
      default:
        return "🟢"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-200 bg-red-50"
      case "high":
        return "border-orange-200 bg-orange-50"
      case "medium":
        return "border-yellow-200 bg-yellow-50"
      default:
        return "border-green-200 bg-green-50"
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Top Concerns</h3>
      <div className="space-y-3">
        {concerns.map((concern, idx) => (
          <div
            key={idx}
            className={`rounded-lg border-2 p-4 cursor-pointer transition-colors ${getSeverityColor(concern.severity)}`}
            onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{getSeverityIcon(concern.severity)}</span>
              <div className="flex-1">
                <div className="font-semibold text-foreground">{concern.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{concern.section}</div>
                {expandedIdx === idx && (
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="text-foreground">{concern.description}</div>
                    <div className="rounded bg-white/50 p-2">
                      <div className="text-xs font-semibold text-muted-foreground">Recommendation:</div>
                      <div className="text-foreground">{concern.recommendation}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
