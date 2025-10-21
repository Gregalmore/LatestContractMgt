export interface ContractReviewRequest {
  fileName: string
  fileType: string
  fileData: string // base64 encoded
}

export interface ContractReviewResponse {
  success: boolean
  overallRisk: string
  topConcerns: TopConcern[]
  report: string
  id: string
  issues_count?: {
    critical: number
    high: number
    medium: number
  }
  checklist_status?: ChecklistItem[]
}

export interface TopConcern {
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  section: string
  description: string
  recommendation: string
}

export interface ChecklistItem {
  category: string
  status: 'pass' | 'warning' | 'critical' | 'pending'
  details?: string
  issues?: string[]
}

export interface RiskPattern {
  id: string
  pattern_id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  keywords: string[]
  description: string
  recommendation: string
}

export interface DueDiligenceCategory {
  id: string
  category_id: string
  category_name: string
  priority: number
  questions: string[]
  risk_keywords: string[]
}
