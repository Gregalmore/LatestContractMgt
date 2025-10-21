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
import { AlertTriangle, CheckCircle, XCircle, Clock, FileText, Shield } from "lucide-react"

export default function ReviewContractTab() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStage, setAnalysisStage] = useState("")
  const [result, setResult] = useState<DueDiligenceResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedDemo, setSelectedDemo] = useState<'good' | 'bad' | null>(null)

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      // Simulate AI processing with loading stages
      const stages = LOADING_STAGES.due_diligence
      for (let i = 0; i < stages.length; i++) {
        setAnalysisStage(stages[i])
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500))
      }

      // Simulate analysis based on file name or content
      let analysisResult: DueDiligenceResult
      
      if (file.name.toLowerCase().includes('bad') || file.name.toLowerCase().includes('risky')) {
        analysisResult = DUE_DILIGENCE_RESULTS.bad_contract
      } else {
        analysisResult = DUE_DILIGENCE_RESULTS.good_contract
      }

      setResult(analysisResult)
    } catch (err: any) {
      console.error('Error analyzing contract:', err)
      setError(err.message || 'Failed to analyze contract')
    } finally {
      setIsAnalyzing(false)
      setAnalysisStage("")
    }
  }

  const handleDemoScenario = async (scenario: 'good' | 'bad') => {
    setSelectedDemo(scenario)
    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      // Simulate AI processing with loading stages
      const stages = LOADING_STAGES.due_diligence
      for (let i = 0; i < stages.length; i++) {
        setAnalysisStage(stages[i])
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500))
      }

      const analysisResult = DUE_DILIGENCE_RESULTS[scenario === 'good' ? 'good_contract' : 'bad_contract']
      setResult(analysisResult)
    } catch (err: any) {
      console.error('Error analyzing contract:', err)
      setError(err.message || 'Failed to analyze contract')
    } finally {
      setIsAnalyzing(false)
      setAnalysisStage("")
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-green-600 bg-green-50'
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50'
      case 'HIGH': return 'text-orange-600 bg-orange-50'
      case 'CRITICAL': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="h-4 w-4 text-red-500" />
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />
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

      {/* Demo Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Demo: Good Contract
            </CardTitle>
            <CardDescription>
              Standard management agreement with fair terms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This contract has standard terms with only minor issues. Perfect for demonstrating the system's ability to identify well-structured agreements.
            </p>
            <Button 
              onClick={() => handleDemoScenario('good')}
              disabled={isAnalyzing}
              className="w-full"
              variant="outline"
            >
              Analyze Good Contract
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Demo: Risky Contract
            </CardTitle>
            <CardDescription>
              Management agreement with multiple red flags
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This contract has serious issues including unlimited liability, excessive commission rates, and one-sided terms. Shows the system's risk detection capabilities.
            </p>
            <Button 
              onClick={() => handleDemoScenario('bad')}
              disabled={isAnalyzing}
              className="w-full"
              variant="destructive"
            >
              Analyze Risky Contract
            </Button>
          </CardContent>
        </Card>
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
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span className="text-sm font-medium">{analysisStage}</span>
              </div>
              <Progress value={75} className="w-full" />
              <p className="text-xs text-muted-foreground">
                Eric Sacks' due diligence process is now automated...
              </p>
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
                    {result.overall_risk}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Overall Risk</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 p-3 rounded-lg bg-red-50">
                    {result.critical_issues}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Critical Issues</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 p-3 rounded-lg bg-orange-50">
                    {result.high_priority_issues}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">High Priority</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 p-3 rounded-lg bg-yellow-50">
                    {result.medium_priority_issues}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Medium Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Concerns */}
          {result.top_concerns.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Top Concerns</CardTitle>
                <CardDescription>
                  Critical issues that require immediate attention
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
                              {concern.severity.toUpperCase()}
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
          )}

          {/* Checklist Results */}
          <Card>
            <CardHeader>
              <CardTitle>Checklist Analysis</CardTitle>
              <CardDescription>
                Eric Sacks' due diligence checklist results
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
                      {item.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Demo Message */}
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Demo Message:</strong> "Eric Sacks' entire due diligence process - the checklist he's refined over decades - is now automated. What used to take 3 hours of careful review just happened in 90 seconds."
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}