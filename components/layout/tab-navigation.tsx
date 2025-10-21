"use client"

interface TabNavigationProps {
  activeTab: "draft" | "review"
  onTabChange: (tab: "draft" | "review") => void
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          <button
            onClick={() => onTabChange("draft")}
            className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
              activeTab === "draft"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Draft Contract
          </button>
          <button
            onClick={() => onTabChange("review")}
            className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
              activeTab === "review"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Review Contract
          </button>
        </div>
      </div>
    </div>
  )
}
