"use client"

interface HeaderProps {
  activeTab: "draft" | "review"
  onTabChange: (tab: "draft" | "review") => void
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary"></div>
          <span className="text-lg font-semibold text-foreground">Grubman Contract Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onTabChange("draft")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "draft" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>📄</span>
            Draft Contract
          </button>
          <button
            onClick={() => onTabChange("review")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "review"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>🔍</span>
            Review Contract
          </button>
        </div>
      </div>
    </header>
  )
}
