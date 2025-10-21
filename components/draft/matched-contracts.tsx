interface MatchedContractsProps {
  contracts: Array<{
    client: string
    type: string
    match_reason: string
  }>
}

export default function MatchedContracts({ contracts }: MatchedContractsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground font-serif">Launch inquiry contracts</h3>
        <a href="#" className="text-sm font-medium text-primary hover:underline">
          3 templates
        </a>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {contracts.map((contract, idx) => (
          <div key={idx} className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-semibold text-foreground">{contract.client}</div>
                <div className="text-sm text-muted-foreground">{contract.type}</div>
              </div>
              <button className="text-primary hover:text-primary/80 transition-colors">→</button>
            </div>
            <p className="text-sm text-muted-foreground">{contract.match_reason}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
