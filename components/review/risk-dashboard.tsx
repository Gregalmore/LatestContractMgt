"use client"
import TopConcerns from "./top-concerns"
import ChecklistStatus from "./checklist-status"

interface RiskDashboardProps {
  data: any
  onReset: () => void
}

export default function RiskDashboard({ data, onReset }: RiskDashboardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "CRITICAL":
        return "bg-red-100 text-red-700"
      case "HIGH":
        return "bg-orange-100 text-orange-700"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700"
      case "LOW":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="text-sm text-muted-foreground mb-2">CURRENT RISK SCORE</div>
          <div className={`inline-block rounded-lg px-4 py-2 font-bold ${getRiskColor(data.overall_risk)}`}>
            {data.overall_risk}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="text-sm text-muted-foreground mb-2">OPEN ISSUES</div>
          <div className="text-3xl font-bold text-foreground">
            {data.issues_count.critical + data.issues_count.high + data.issues_count.medium}
          </div>
          <div className="text-xs text-muted-foreground">Awaiting first analysis</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="text-sm text-muted-foreground mb-2">PLAYBOOK ALIGNMENT</div>
          <div className="text-3xl font-bold text-foreground">82%</div>
          <div className="text-xs text-muted-foreground">Most clauses align</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="text-sm text-muted-foreground mb-2">OUTSTANDING TASKS</div>
          <div className="text-3xl font-bold text-foreground">4</div>
          <div className="text-xs text-muted-foreground">Action items before sign-off</div>
        </div>
      </div>

      <TopConcerns concerns={data.top_concerns} />
      <ChecklistStatus checklist={data.checklist_status} />

      <div className="flex gap-3 justify-center">
        <button className="rounded-lg border border-border px-6 py-3 font-medium text-foreground hover:bg-muted transition-colors">
          Download Full Report
        </button>
        <button className="rounded-lg border border-border px-6 py-3 font-medium text-foreground hover:bg-muted transition-colors">
          Copy Summary
        </button>
        <button className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90 transition-opacity">
          Generate AI Briefing
        </button>
        <button
          onClick={onReset}
          className="rounded-lg border border-border px-6 py-3 font-medium text-foreground hover:bg-muted transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  )
}
