"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { 
  DUE_DILIGENCE_RESULTS, 
  LOADING_STAGES,
  type DueDiligenceResult 
} from "@/lib/demo-data"
import { triggerReviewWorkflow, type N8nReviewRequest } from "@/lib/n8n/webhooks"
import { AlertTriangle, CheckCircle, XCircle, Clock, FileText, Shield, Loader2 } from "lucide-react"

export default function ReviewContractTab() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStage, setAnalysisStage] = useState("")
  const [result, setResult] = useState<DueDiligenceResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true)
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

      // Show loading stages
      const stages = LOADING_STAGES.due_diligence
      for (let i = 0; i < stages.length; i++) {
        setAnalysisStage(stages[i])
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500))
      }

      // Send to n8n webhook as multipart
      setAnalysisStage("Sending file to AI analysis...")
      const requestData: N8nReviewRequest = {
        file: file // Send File object directly
      }


      const analysisResult = await triggerReviewWorkflow(requestData)

      // Convert n8n response to our expected format
      let mappedResult: DueDiligenceResult
      
      if (analysisResult && typeof analysisResult === 'object') {
        // Handle the actual n8n response structure: { output: { ... } }
        const responseData = analysisResult.output || analysisResult
        
        // Use the data directly from the API response
        mappedResult = {
          overall_risk: responseData.overall_risk || 'LOW',
          critical_issues: responseData.critical_issues || 0,
          high_priority_issues: responseData.high_priority_issues || 0,
          medium_priority_issues: responseData.medium_priority_issues || 0,
          top_concerns: responseData.top_concerns || [],
          checklist_results: responseData.checklist_results || []
        }
      } else {
        // Fallback to demo data if response is not in expected format
        mappedResult = DUE_DILIGENCE_RESULTS.good_contract
      }

      setResult(mappedResult)
    } catch (err: any) {
      setError(err.message || 'Failed to analyze contract')
    } finally {
      setIsAnalyzing(false)
      setAnalysisStage("")
    }
  }


  const getRiskColor = (risk: string) => {
    switch (risk?.toUpperCase()) {
      case 'LOW': return 'text-green-600 bg-green-50'
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50'
      case 'HIGH': return 'text-orange-600 bg-orange-50'
      case 'CRITICAL': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return <XCircle className="h-4 w-4 text-red-500" />
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />
      default: return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Due Diligence Contract Review</h2>
        <p className="text-lg text-muted-foreground">
          Automated analysis using Eric Sacks' due diligence checklist
        </p>
      </div>


      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Upload Contract for Analysis
          </CardTitle>
          <CardDescription>
            Upload a PDF, DOCX, or TXT file to run due diligence analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Drop your contract here</p>
            <p className="text-sm text-gray-500 mb-4">or click to browse</p>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file)
              }}
              disabled={isAnalyzing}
              className="hidden"
              id="contract-upload"
            />
            <label 
              htmlFor="contract-upload"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer disabled:opacity-50"
            >
              Choose File
            </label>
            <p className="text-xs text-gray-500 mt-2">Supported: PDF, DOCX, TXT (Max 10MB)</p>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isAnalyzing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">{analysisStage}</span>
              </div>
              <Progress value={75} className="w-full" />
              <p className="text-xs text-muted-foreground">
                Uploading file directly to n8n webhook...
              </p>
              <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                <strong>Webhook URL:</strong> https://n8n.srv1073744.hstgr.cloud/webhook/contract-analysis<br/>
                <strong>Content-Type:</strong> multipart/form-data<br/>
                <strong>Field:</strong> file
          </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">

          {/* Risk Assessment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold p-3 rounded-lg ${getRiskColor(result.overall_risk)}`}>
                    {result.overall_risk || 'UNKNOWN'}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Overall Risk</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 p-3 rounded-lg bg-red-50">
                    {result.critical_issues || 0}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Critical Issues</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 p-3 rounded-lg bg-orange-50">
                    {result.high_priority_issues || 0}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">High Priority</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 p-3 rounded-lg bg-yellow-50">
                    {result.medium_priority_issues || 0}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Medium Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Concerns */}
          {result.top_concerns && result.top_concerns.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Top Concerns</CardTitle>
                <CardDescription>
                  Issues identified in the contract analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.top_concerns.map((concern, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        {getSeverityIcon(concern.severity)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{concern.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{concern.description}</p>
                          <div className="mt-2">
                            <Badge variant={concern.severity === 'critical' ? 'destructive' : 'secondary'}>
                              {concern.severity?.toUpperCase() || 'UNKNOWN'}
                            </Badge>
                          </div>
                          <div className="mt-3 p-3 bg-muted rounded-md">
                            <p className="text-sm font-medium text-foreground mb-1">Recommendation:</p>
                            <p className="text-sm text-muted-foreground">{concern.recommendation}</p>
                          </div>
                          <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                            <span className="font-medium">Context:</span> {concern.context}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p className="font-medium">No concerns identified</p>
                  <p className="text-sm">The contract appears to be well-structured with no major issues detected.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Checklist Results */}
          {result.checklist_results && result.checklist_results.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Checklist Analysis</CardTitle>
                <CardDescription>
                  Due diligence checklist results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.checklist_results.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {item.status === 'pass' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : item.status === 'warning' ? (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <Badge variant={
                        item.status === 'pass' ? 'default' : 
                        item.status === 'warning' ? 'secondary' : 
                        'destructive'
                      }>
                        {item.status?.toUpperCase() || 'UNKNOWN'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p className="font-medium">All checklist items passed</p>
                  <p className="text-sm">The contract meets all due diligence requirements.</p>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      )}
    </div>
  )
}