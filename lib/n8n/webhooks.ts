import axios from 'axios'

const N8N_BASE_URL = process.env.N8N_WEBHOOK_URL
const DRAFT_WEBHOOK = process.env.N8N_DRAFT_WEBHOOK
const REVIEW_WEBHOOK = process.env.N8N_REVIEW_WEBHOOK

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
  fileName: string
  fileType: string
  fileData: string // base64 encoded
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
  
  const response = await axios.post(url, data, {
    timeout: 180000, // 3 minute timeout
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  return response.data
}
