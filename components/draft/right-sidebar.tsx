"use client"

import { MatchedContract } from "@/types/contract"

interface RightSidebarProps {
  matchedContracts?: MatchedContract[]
}

export default function RightSidebar({ matchedContracts }: RightSidebarProps) {
  return (
    <div className="space-y-6 sticky top-8">
      {/* Account Progress */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Current Account</div>
        <div className="text-4xl font-bold text-primary mb-2">75%</div>
        <div className="text-sm text-muted-foreground">25% into the launch</div>
      </div>

      {/* Service Level */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Service</div>
        <div className="text-2xl font-bold text-foreground mb-1">Standard</div>
        <div className="text-sm text-muted-foreground">Recurring - Active templates</div>
      </div>

      {/* Account Tier */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Tier</div>
        <div className="text-2xl font-bold text-foreground mb-1">Master starter</div>
        <div className="text-sm text-muted-foreground">Invoicing - Standard deployment</div>
      </div>

      {/* Matter Assignment */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Matter Assignment
        </div>
        <div className="text-xl font-bold text-foreground mb-1">NorthBridge Capital</div>
        <div className="text-sm text-muted-foreground mb-4">Professional Services Agreement; v2</div>

        <div className="space-y-3 text-sm">
          <div>
            <div className="font-semibold text-foreground">Parties</div>
            <div className="text-muted-foreground">Service agreement</div>
          </div>
          <div>
            <div className="font-semibold text-foreground">Locations</div>
            <div className="text-muted-foreground">12 months</div>
          </div>
          <div>
            <div className="font-semibold text-foreground">Confidential</div>
            <div className="text-muted-foreground">Cloud hosting SaaS - New York</div>
          </div>
          <div>
            <div className="font-semibold text-foreground">Price Term Of</div>
            <div className="text-muted-foreground">Managed + rolling playbook</div>
          </div>
        </div>
      </div>

      {/* AI Readiness Score */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Governance</div>
        <div className="text-lg font-bold text-foreground mb-4">AI readiness score</div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="text-green-600 mt-0.5">✓</div>
            <div>
              <div className="font-semibold text-foreground text-sm">AI Ready - Model governance standard</div>
              <div className="text-xs text-muted-foreground mt-1">Fairness and calculation standards</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-green-600 mt-0.5">✓</div>
            <div>
              <div className="font-semibold text-foreground text-sm">AI Ready - Purpose documented</div>
              <div className="text-xs text-muted-foreground mt-1">Business uses documented</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-red-600 mt-0.5">✕</div>
            <div>
              <div className="font-semibold text-foreground text-sm">Missing - Early bias standard</div>
              <div className="text-xs text-muted-foreground mt-1">Liabilities of deleted data at rest</div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Checkpoints */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Playbook</div>
        <div className="text-lg font-bold text-foreground mb-4">Workflow Checkpoints</div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Master Intake</span>
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">COMPLETE</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Business Review</span>
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">IN PROGRESS</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Party Guarantee</span>
            <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-1 rounded">
              AWAITING INPUT
            </span>
          </div>
        </div>
      </div>

      {/* Matched Contracts */}
      {matchedContracts && matchedContracts.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Matched Contracts</div>
          <div className="text-lg font-bold text-foreground mb-4">Similar contracts found</div>

          <div className="space-y-3">
            {matchedContracts.map((contract, idx) => (
              <div key={idx} className="rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors">
                <div className="font-semibold text-foreground text-sm">{contract.client}</div>
                <div className="text-xs text-muted-foreground mb-1">{contract.type}</div>
                <div className="text-xs text-muted-foreground">{contract.match_reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Firm-approved Language */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Approvals</div>
        <div className="text-lg font-bold text-foreground mb-4">Firm-approved language</div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Data Security and Privacy</span>
            <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-1 rounded">HIGH RISK</span>
          </div>
          <div className="text-xs text-muted-foreground">Record-level processing - Cross-cluster transfer</div>
        </div>
      </div>
    </div>
  )
}
