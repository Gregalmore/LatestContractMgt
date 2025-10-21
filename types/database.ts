export interface Database {
  public: {
    Tables: {
      templates: {
        Row: {
          id: string
          name: string
          type: string
          content: string
          variables: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          content: string
          variables?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          content?: string
          variables?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      firm_history: {
        Row: {
          id: string
          client_name: string
          client_industry: string
          contract_type: string
          content: string
          date_created: string
          attorney: string | null
          tags: string[] | null
          key_clauses: Record<string, any> | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_name: string
          client_industry: string
          contract_type: string
          content: string
          date_created: string
          attorney?: string | null
          tags?: string[] | null
          key_clauses?: Record<string, any> | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          client_industry?: string
          contract_type?: string
          content?: string
          date_created?: string
          attorney?: string | null
          tags?: string[] | null
          key_clauses?: Record<string, any> | null
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          industry: string
          sub_industry: string | null
          first_engagement: string | null
          total_contracts: number
          preferred_terms: Record<string, any> | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          industry: string
          sub_industry?: string | null
          first_engagement?: string | null
          total_contracts?: number
          preferred_terms?: Record<string, any> | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          industry?: string
          sub_industry?: string | null
          first_engagement?: string | null
          total_contracts?: number
          preferred_terms?: Record<string, any> | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contracts: {
        Row: {
          id: string
          client_id: string | null
          client_name: string | null
          contract_type: string
          draft_content: string
          matched_history: Record<string, any> | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id?: string | null
          client_name?: string | null
          contract_type: string
          draft_content: string
          matched_history?: Record<string, any> | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string | null
          client_name?: string | null
          contract_type?: string
          draft_content?: string
          matched_history?: Record<string, any> | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          contract_file_name: string | null
          contract_file_url: string | null
          contract_text: string | null
          overall_risk: string
          issues_count: Record<string, any> | null
          top_concerns: Record<string, any> | null
          checklist_results: Record<string, any> | null
          critical_issues: Record<string, any> | null
          report_markdown: string | null
          created_at: string
        }
        Insert: {
          id?: string
          contract_file_name?: string | null
          contract_file_url?: string | null
          contract_text?: string | null
          overall_risk: string
          issues_count?: Record<string, any> | null
          top_concerns?: Record<string, any> | null
          checklist_results?: Record<string, any> | null
          critical_issues?: Record<string, any> | null
          report_markdown?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          contract_file_name?: string | null
          contract_file_url?: string | null
          contract_text?: string | null
          overall_risk?: string
          issues_count?: Record<string, any> | null
          top_concerns?: Record<string, any> | null
          checklist_results?: Record<string, any> | null
          critical_issues?: Record<string, any> | null
          report_markdown?: string | null
          created_at?: string
        }
      }
      due_diligence_checklist: {
        Row: {
          id: string
          category_id: string
          category_name: string
          priority: number
          questions: string[]
          risk_keywords: string[]
          created_at: string
        }
        Insert: {
          id?: string
          category_id: string
          category_name: string
          priority: number
          questions: string[]
          risk_keywords: string[]
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          category_name?: string
          priority?: number
          questions?: string[]
          risk_keywords?: string[]
          created_at?: string
        }
      }
      risk_patterns: {
        Row: {
          id: string
          pattern_id: string
          severity: string
          keywords: string[]
          description: string
          recommendation: string
          created_at: string
        }
        Insert: {
          id?: string
          pattern_id: string
          severity: string
          keywords: string[]
          description: string
          recommendation: string
          created_at?: string
        }
        Update: {
          id?: string
          pattern_id?: string
          severity?: string
          keywords?: string[]
          description?: string
          recommendation?: string
          created_at?: string
        }
      }
    }
  }
}
