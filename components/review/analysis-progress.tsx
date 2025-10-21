interface AnalysisProgressProps {
  progress: number
}

export default function AnalysisProgress({ progress }: AnalysisProgressProps) {
  const stages = [
    { label: "Extracting text...", progress: 25 },
    { label: "Running pattern matching...", progress: 50 },
    { label: "Analyzing against checklist...", progress: 75 },
    { label: "Generating report...", progress: 100 },
  ]

  const currentStage = stages.find((s) => s.progress >= progress) || stages[stages.length - 1]

  return (
    <div className="rounded-lg border border-border bg-card p-8">
      <div className="mb-6 text-center">
        <h3 className="mb-2 text-lg font-semibold text-foreground">Analyzing Contract</h3>
        <p className="text-sm text-muted-foreground">Estimated time: 90-120 seconds</p>
      </div>

      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground">{currentStage.label}</span>
          <span className="text-muted-foreground">{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="space-y-2">
        {stages.map((stage, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm">
            <div
              className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold ${
                progress >= stage.progress ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {progress >= stage.progress ? "✓" : idx + 1}
            </div>
            <span className={progress >= stage.progress ? "text-foreground" : "text-muted-foreground"}>
              {stage.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
