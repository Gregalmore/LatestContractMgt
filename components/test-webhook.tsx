"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { triggerReviewWorkflow } from "@/lib/n8n/webhooks"
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react"

export function TestWebhook() {
  const [isTesting, setIsTesting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testWebhook = async () => {
    setIsTesting(true)
    setError(null)
    setResult(null)

    try {
      // Create a test file
      const testContent = `
        TEST CONTRACT AGREEMENT
        
        This is a test contract for webhook verification.
        
        Section 1: Payment Terms
        Payment shall be made within 30 days of invoice.
        
        Section 2: Liability
        The vendor shall not be liable for any indirect damages.
        
        Section 3: Termination
        Either party may terminate this agreement with 30 days notice.
      `
      
      const testFile = new File([testContent], "test-contract.txt", { type: "text/plain" })
      
      // Send to webhook as multipart
      const response = await triggerReviewWorkflow({
        file: testFile // Send File object directly
      })
      
      setResult(response)
    } catch (err: any) {
      console.error('Webhook test failed:', err)
      setError(err.message || 'Webhook test failed')
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          n8n Webhook Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p><strong>Webhook URL:</strong> https://n8n.srv1073744.hstgr.cloud/webhook/contract-analysis</p>
          <p>This will send a test contract to your n8n workflow for analysis.</p>
        </div>
        
        <Button 
          onClick={testWebhook}
          disabled={isTesting}
          className="w-full"
        >
          {isTesting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Testing Webhook...
            </>
          ) : (
            'Test Webhook Connection'
          )}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p><strong>n8n Webhook Response Received!</strong></p>
                <div className="text-sm space-y-1">
                  <p><strong>Overall Risk:</strong> {result.overall_risk || 'N/A'}</p>
                  <p><strong>Critical Issues:</strong> {result.critical_issues || 0}</p>
                  <p><strong>High Priority Issues:</strong> {result.high_priority_issues || 0}</p>
                  <p><strong>Medium Priority Issues:</strong> {result.medium_priority_issues || 0}</p>
                  <p><strong>Top Concerns:</strong> {result.top_concerns?.length || 0}</p>
                  <p><strong>Checklist Results:</strong> {result.checklist_results?.length || 0}</p>
                </div>
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs font-medium">View Full Response</summary>
                  <pre className="text-xs bg-muted p-2 rounded overflow-auto mt-1">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </details>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
