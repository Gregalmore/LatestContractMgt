"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import DraftContractTab from "@/components/tabs/draft-contract-tab"
import ReviewContractTab from "@/components/tabs/review-contract-tab"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"draft" | "review">("draft")

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {activeTab === "draft" && <DraftContractTab />}
        {activeTab === "review" && <ReviewContractTab />}
      </main>
    </div>
  )
}
