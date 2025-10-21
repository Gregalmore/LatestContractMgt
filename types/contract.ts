export interface ContractDraftRequest {
  clientName: string
  industry: string
  contractType: string
  purpose: string
  party1: string
  party2: string
  term: string
}

export interface ContractDraftResponse {
  success: boolean
  draft: string
  matched_contracts: MatchedContract[]
  id: string
  format: string
}

export interface MatchedContract {
  client: string
  type: string
  match_reason: string
  id?: string
  score?: number
}

export interface ContractTemplate {
  id: string
  name: string
  type: string
  content: string
  variables: string[]
}

export interface FirmHistory {
  id: string
  client_name: string
  client_industry: string
  contract_type: string
  content: string
  date_created: string
  attorney?: string
  tags?: string[]
  key_clauses?: Record<string, any>
}

export interface Client {
  id: string
  name: string
  industry: string
  sub_industry?: string
  first_engagement?: string
  total_contracts: number
  preferred_terms?: Record<string, any>
  notes?: string
}
