# n8n Backend Integration Guide for Next.js Frontend

## Overview

This guide provides step-by-step instructions for integrating your Next.js contract analysis application with the enhanced n8n backend workflow.

## Prerequisites

- n8n instance (cloud or self-hosted)
- Next.js application with existing contract analysis components
- OpenAI API key
- Basic understanding of webhooks and API integration

## Step 1: n8n Workflow Setup

### 1.1 Import the Enhanced Workflow

1. **Access your n8n instance**
   - Go to your n8n dashboard
   - Click "Import from file" or "Import from URL"

2. **Import the workflow JSON**
   - Use the JSON configuration from `n8n-workflow-design.md`
   - Save the workflow as "Enhanced Contract Analysis"

3. **Configure environment variables**
   ```bash
   # In n8n environment settings
   OPENAI_API_KEY=your-openai-api-key
   REDIS_URL=your-redis-url (optional, for caching)
   ```

### 1.2 Test the Workflow

1. **Activate the workflow**
   - Toggle the workflow to "Active"
   - Note the webhook URL (e.g., `https://your-n8n.com/webhook/contract-analysis`)

2. **Test with sample data**
   ```bash
   curl -X POST https://your-n8n.com/webhook/contract-analysis \
     -H "Content-Type: application/json" \
     -d '{
       "fileName": "test.pdf",
       "fileType": "pdf",
       "fileData": "base64-encoded-content",
       "clientId": "test-client"
     }'
   ```

## Step 2: Frontend Integration

### 2.1 Update Environment Variables

```bash
# .env.local
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com
N8N_CONTRACT_ANALYSIS_WEBHOOK=/webhook/contract-analysis
N8N_DRAFT_WEBHOOK=/webhook/contract-draft
```

### 2.2 Update Webhook Service

```typescript
// lib/n8n/webhooks.ts
import axios from 'axios'

const N8N_BASE_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
const CONTRACT_ANALYSIS_WEBHOOK = process.env.N8N_CONTRACT_ANALYSIS_WEBHOOK
const DRAFT_WEBHOOK = process.env.N8N_DRAFT_WEBHOOK

export interface N8nContractAnalysisRequest {
  fileName: string
  fileType: 'pdf' | 'docx' | 'txt'
  fileData: string // base64 encoded
  clientId?: string
  timestamp: number
}

export interface N8nContractAnalysisResponse {
  overallRisk: 'Critical' | 'High' | 'Medium' | 'Low'
  riskScore: number
  findings: Array<{
    severity: 'Critical' | 'High' | 'Medium' | 'Low'
    category: string
    title: string
    description: string
    clauseReference: string
    recommendation: string
    riskScore: number
  }>
  summary: string
  recommendations: string[]
  metadata: {
    analysisId: string
    timestamp: string
    processingTime: number
    fileType: string
    fileName: string
  }
  status: 'success' | 'error'
}

export interface N8nDraftRequest {
  clientName: string
  industry: string
  contractType: string
  purpose: string
  party1: string
  party2: string
  term: string
}

export interface N8nDraftResponse {
  contractText: string
  metadata: {
    draftId: string
    timestamp: string
    processingTime: number
  }
  status: 'success' | 'error'
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

// Contract Analysis Webhook
export async function triggerContractAnalysis(
  data: N8nContractAnalysisRequest
): Promise<N8nContractAnalysisResponse> {
  if (!N8N_BASE_URL || !CONTRACT_ANALYSIS_WEBHOOK) {
    throw new Error('n8n webhook not configured')
  }
  
  const url = `${N8N_BASE_URL}${CONTRACT_ANALYSIS_WEBHOOK}`
  
  try {
    const response = await axios.post(url, {
      ...data,
      timestamp: Date.now()
    }, {
      timeout: 180000, // 3 minute timeout
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Analysis failed: ${error.response?.data?.message || error.message}`)
    }
    throw error
  }
}

// Contract Draft Generation Webhook
export async function triggerContractDraft(
  data: N8nDraftRequest
): Promise<N8nDraftResponse> {
  if (!N8N_BASE_URL || !DRAFT_WEBHOOK) {
    throw new Error('n8n webhook not configured')
  }
  
  const url = `${N8N_BASE_URL}${DRAFT_WEBHOOK}`
  
  try {
    const response = await axios.post(url, data, {
      timeout: 120000, // 2 minute timeout
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Draft generation failed: ${error.response?.data?.message || error.message}`)
    }
    throw error
  }
}
```

### 2.3 Create Contract Analysis Hook

```typescript
// hooks/use-contract-analysis.ts
import { useState, useCallback } from 'react'
import { triggerContractAnalysis, fileToBase64, N8nContractAnalysisResponse } from '@/lib/n8n/webhooks'

export interface UseContractAnalysisReturn {
  analyzeContract: (file: File) => Promise<void>
  result: N8nContractAnalysisResponse | null
  loading: boolean
  error: string | null
  clearResult: () => void
}

export function useContractAnalysis(): UseContractAnalysisReturn {
  const [result, setResult] = useState<N8nContractAnalysisResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeContract = useCallback(async (file: File) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Unsupported file type. Please upload PDF, DOCX, or TXT files.')
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size too large. Please upload files smaller than 10MB.')
      }

      // Convert file to base64
      const fileData = await fileToBase64(file)
      
      // Determine file type
      let fileType: 'pdf' | 'docx' | 'txt'
      if (file.type === 'application/pdf') {
        fileType = 'pdf'
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        fileType = 'docx'
      } else {
        fileType = 'txt'
      }

      // Call n8n webhook
      const analysisResult = await triggerContractAnalysis({
        fileName: file.name,
        fileType,
        fileData,
        clientId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      })

      setResult(analysisResult)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed'
      setError(errorMessage)
      console.error('Contract analysis error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearResult = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return {
    analyzeContract,
    result,
    loading,
    error,
    clearResult
  }
}
```

### 2.4 Update Contract Analysis Component

```typescript
// components/contract-analysis/contract-analyzer.tsx
'use client'

import { useState } from 'react'
import { useContractAnalysis } from '@/hooks/use-contract-analysis'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { FileUpload } from './file-upload'
import { AnalysisResults } from './analysis-results'
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react'

export function ContractAnalyzer() {
  const { analyzeContract, result, loading, error, clearResult } = useContractAnalysis()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file)
    await analyzeContract(file)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'bg-red-500'
      case 'High': return 'bg-orange-500'
      case 'Medium': return 'bg-yellow-500'
      case 'Low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">AI Contract Analyzer</h1>
        <p className="text-muted-foreground mt-2">
          Upload a contract for AI-powered risk analysis and recommendations
        </p>
      </div>

      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Contract</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUpload
            onFileSelect={handleFileUpload}
            disabled={loading}
            acceptedTypes={['.pdf', '.docx', '.txt']}
          />
          {uploadedFile && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">Selected file: {uploadedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Loader2 className="h-6 w-6 animate-spin" />
              <div className="flex-1">
                <p className="font-medium">Analyzing contract...</p>
                <p className="text-sm text-muted-foreground">
                  This may take 1-3 minutes depending on contract complexity
                </p>
                <Progress value={undefined} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Analysis Summary</span>
                <Badge className={getRiskColor(result.overallRisk)}>
                  {result.overallRisk} Risk
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Risk Score</p>
                  <p className="text-2xl font-bold">{result.riskScore.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Issues Found</p>
                  <p className="text-2xl font-bold">{result.findings.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Processing Time</p>
                  <p className="text-2xl font-bold">{result.metadata.processingTime}ms</p>
                </div>
              </div>
              
              {result.summary && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Executive Summary</p>
                  <p className="text-sm text-muted-foreground">{result.summary}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <AnalysisResults result={result} />

          {/* Actions */}
          <div className="flex justify-center space-x-4">
            <Button onClick={clearResult} variant="outline">
              Analyze Another Contract
            </Button>
            <Button onClick={() => window.print()}>
              Print Report
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
```

### 2.5 Create Analysis Results Component

```typescript
// components/contract-analysis/analysis-results.tsx
import { N8nContractAnalysisResponse } from '@/lib/n8n/webhooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertTriangle, Info, CheckCircle } from 'lucide-react'

interface AnalysisResultsProps {
  result: N8nContractAnalysisResponse
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const criticalIssues = result.findings.filter(f => f.severity === 'Critical')
  const highIssues = result.findings.filter(f => f.severity === 'High')
  const mediumIssues = result.findings.filter(f => f.severity === 'Medium')
  const lowIssues = result.findings.filter(f => f.severity === 'Low')

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'High': return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case 'Medium': return <Info className="h-4 w-4 text-yellow-500" />
      case 'Low': return <CheckCircle className="h-4 w-4 text-green-500" />
      default: return <Info className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'border-red-200 bg-red-50'
      case 'High': return 'border-orange-200 bg-orange-50'
      case 'Medium': return 'border-yellow-200 bg-yellow-50'
      case 'Low': return 'border-green-200 bg-green-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-sm font-medium text-blue-600">{index + 1}.</span>
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Issues by Severity */}
      <Tabs defaultValue="critical" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="critical">
            Critical ({criticalIssues.length})
          </TabsTrigger>
          <TabsTrigger value="high">
            High ({highIssues.length})
          </TabsTrigger>
          <TabsTrigger value="medium">
            Medium ({mediumIssues.length})
          </TabsTrigger>
          <TabsTrigger value="low">
            Low ({lowIssues.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="critical" className="space-y-4">
          {criticalIssues.length > 0 ? (
            criticalIssues.map((issue, index) => (
              <Card key={index} className={getSeverityColor(issue.severity)}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {getSeverityIcon(issue.severity)}
                    <span>{issue.title}</span>
                    <Badge variant="destructive">{issue.severity}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">{issue.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Clause Reference</p>
                      <p className="text-sm text-muted-foreground">{issue.clauseReference}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Recommendation</p>
                      <p className="text-sm text-muted-foreground">{issue.recommendation}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Risk Score: {issue.riskScore.toFixed(2)}
                      </span>
                      <Badge variant="outline">{issue.category}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                No critical issues found in this contract.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="high" className="space-y-4">
          {highIssues.length > 0 ? (
            highIssues.map((issue, index) => (
              <Card key={index} className={getSeverityColor(issue.severity)}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {getSeverityIcon(issue.severity)}
                    <span>{issue.title}</span>
                    <Badge variant="secondary">{issue.severity}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">{issue.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Clause Reference</p>
                      <p className="text-sm text-muted-foreground">{issue.clauseReference}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Recommendation</p>
                      <p className="text-sm text-muted-foreground">{issue.recommendation}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Risk Score: {issue.riskScore.toFixed(2)}
                      </span>
                      <Badge variant="outline">{issue.category}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                No high priority issues found in this contract.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="medium" className="space-y-4">
          {mediumIssues.length > 0 ? (
            mediumIssues.map((issue, index) => (
              <Card key={index} className={getSeverityColor(issue.severity)}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {getSeverityIcon(issue.severity)}
                    <span>{issue.title}</span>
                    <Badge variant="outline">{issue.severity}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">{issue.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Clause Reference</p>
                      <p className="text-sm text-muted-foreground">{issue.clauseReference}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Recommendation</p>
                      <p className="text-sm text-muted-foreground">{issue.recommendation}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Risk Score: {issue.riskScore.toFixed(2)}
                      </span>
                      <Badge variant="outline">{issue.category}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                No medium priority issues found in this contract.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="low" className="space-y-4">
          {lowIssues.length > 0 ? (
            lowIssues.map((issue, index) => (
              <Card key={index} className={getSeverityColor(issue.severity)}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {getSeverityIcon(issue.severity)}
                    <span>{issue.title}</span>
                    <Badge variant="outline">{issue.severity}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">{issue.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Clause Reference</p>
                      <p className="text-sm text-muted-foreground">{issue.clauseReference}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Recommendation</p>
                      <p className="text-sm text-muted-foreground">{issue.recommendation}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Risk Score: {issue.riskScore.toFixed(2)}
                      </span>
                      <Badge variant="outline">{issue.category}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                No low priority issues found in this contract.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

## Step 3: Testing and Validation

### 3.1 Test the Integration

1. **Start your Next.js application**
   ```bash
   npm run dev
   ```

2. **Test file upload**
   - Upload a sample contract
   - Verify the analysis completes
   - Check the results display correctly

3. **Test error handling**
   - Upload an unsupported file type
   - Upload a file that's too large
   - Test with network issues

### 3.2 Monitor n8n Workflow

1. **Check n8n execution logs**
   - Go to your n8n dashboard
   - View execution history
   - Check for any errors

2. **Verify webhook responses**
   - Check response times
   - Monitor error rates
   - Validate data format

## Step 4: Production Deployment

### 4.1 Environment Configuration

```bash
# Production .env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-production-n8n.com
N8N_CONTRACT_ANALYSIS_WEBHOOK=/webhook/contract-analysis
N8N_DRAFT_WEBHOOK=/webhook/contract-draft
```

### 4.2 Security Considerations

1. **API Key Management**
   - Store API keys securely
   - Use environment variables
   - Rotate keys regularly

2. **Rate Limiting**
   - Implement client-side rate limiting
   - Monitor usage patterns
   - Set appropriate limits

3. **Data Privacy**
   - Don't store sensitive contract data
   - Implement data retention policies
   - Use secure file handling

### 4.3 Performance Optimization

1. **Caching**
   - Cache analysis results
   - Implement Redis for session storage
   - Use CDN for static assets

2. **Error Recovery**
   - Implement retry mechanisms
   - Add fallback strategies
   - Monitor system health

## Troubleshooting

### Common Issues

1. **Webhook not responding**
   - Check n8n workflow status
   - Verify webhook URL
   - Check network connectivity

2. **File upload failures**
   - Verify file size limits
   - Check file type support
   - Validate base64 encoding

3. **Analysis timeouts**
   - Increase timeout values
   - Check OpenAI API status
   - Monitor resource usage

### Debug Steps

1. **Check browser console**
   - Look for JavaScript errors
   - Monitor network requests
   - Verify API responses

2. **Check n8n logs**
   - View execution details
   - Check error messages
   - Monitor performance metrics

3. **Test with sample data**
   - Use known good contracts
   - Test with different file types
   - Verify error handling

## Next Steps

1. **Implement additional features**
   - Contract comparison
   - Batch processing
   - Export functionality

2. **Add monitoring**
   - Performance metrics
   - Usage analytics
   - Error tracking

3. **Scale the solution**
   - Load balancing
   - Database optimization
   - Caching strategies

This integration guide provides a complete solution for connecting your Next.js frontend to the enhanced n8n backend workflow. The implementation is production-ready and includes proper error handling, security considerations, and performance optimizations.
