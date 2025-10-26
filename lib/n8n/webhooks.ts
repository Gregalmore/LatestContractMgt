import axios from 'axios'

const N8N_BASE_URL = process.env.N8N_WEBHOOK_URL || 'https://n8n.srv1073744.hstgr.cloud'
const DRAFT_WEBHOOK = process.env.N8N_DRAFT_WEBHOOK || '/webhook/contract-draft'
const REVIEW_WEBHOOK = process.env.N8N_REVIEW_WEBHOOK || '/webhook/contract-analysis'

export interface N8nDraftRequest {
  clientName: string
  industry: string
  contractType: string
  purpose: string
  party1: string
  party2: string
  term: string
}

export interface N8nReviewRequest {
  file: File // File object for multipart upload
}

export async function triggerDraftWorkflow(data: N8nDraftRequest) {
  if (!N8N_BASE_URL || !DRAFT_WEBHOOK) {
    throw new Error('n8n webhook not configured')
  }
  
  const url = `${N8N_BASE_URL}${DRAFT_WEBHOOK}`
  
  const response = await axios.post(url, data, {
    timeout: 60000, // 60 second timeout
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  return response.data
}

export async function triggerReviewWorkflow(data: N8nReviewRequest) {
  if (!N8N_BASE_URL || !REVIEW_WEBHOOK) {
    throw new Error('n8n webhook not configured')
  }
  
  const url = `${N8N_BASE_URL}${REVIEW_WEBHOOK}`
  
  // Create FormData with just the file
  const formData = new FormData()
  formData.append('file', data.file)
  
  
  const response = await axios.post(url, formData, {
    timeout: 180000, // 3 minute timeout
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  
  return response.data
}

// Utility function to convert file to base64
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // Remove data:application/pdf;base64, prefix
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = error => reject(error)
  })
}
