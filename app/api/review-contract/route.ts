import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { ContractReviewRequest, ContractReviewResponse } from '@/types/review'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('contract') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }
    
    // For now, return mock data if n8n is not configured
    if (!process.env.N8N_WEBHOOK_URL) {
      console.log('n8n not configured, returning mock data')
      return NextResponse.json({
        success: true,
        overallRisk: 'HIGH',
        topConcerns: [
          {
            severity: 'critical',
            title: 'Unlimited Liability',
            section: 'Section 7.2',
            description: 'Contract requires indemnification for "any and all claims" with no cap on liability exposure.',
            recommendation: 'Add liability cap equal to fees paid in the preceding 12 months. Exclude vendor negligence and willful misconduct from indemnification.'
          },
          {
            severity: 'high',
            title: 'Broad Termination Rights',
            section: 'Section 4.1',
            description: 'Either party can terminate without cause on 15 days notice, creating significant business continuity risk.',
            recommendation: 'Increase notice period to 90 days or require cause for termination. Add wind-down obligations.'
          },
          {
            severity: 'high',
            title: 'IP Ownership Ambiguity',
            section: 'Section 6.3',
            description: 'Unclear ownership of work product created during the engagement term.',
            recommendation: 'Clarify that all work product is owned by [Client]. Add explicit assignment language.'
          }
        ],
        report: `# Contract Review Report

## Executive Summary
**Overall Risk Level: HIGH**

This contract contains several critical issues that require immediate attention before execution.

## Top Concerns

### 1. Unlimited Liability (CRITICAL)
**Section:** 7.2
**Issue:** Contract requires indemnification for "any and all claims" with no cap on liability exposure.
**Recommendation:** Add liability cap equal to fees paid in the preceding 12 months. Exclude vendor negligence and willful misconduct from indemnification.

### 2. Broad Termination Rights (HIGH)
**Section:** 4.1
**Issue:** Either party can terminate without cause on 15 days notice, creating significant business continuity risk.
**Recommendation:** Increase notice period to 90 days or require cause for termination. Add wind-down obligations.

### 3. IP Ownership Ambiguity (HIGH)
**Section:** 6.3
**Issue:** Unclear ownership of work product created during the engagement term.
**Recommendation:** Clarify that all work product is owned by [Client]. Add explicit assignment language.

## Checklist Status
- ✅ Party Identification
- ⚠️ Financial Terms
- ❌ Liability & Indemnification
- ⚠️ Termination Rights
- ❌ Intellectual Property
- ✅ Confidentiality
- ✅ Regulatory Compliance
- ⚠️ Dispute Resolution
- ✅ Material Adverse Changes
- ✅ Conflicts of Interest

## Next Steps
1. Address critical liability issues
2. Clarify IP ownership terms
3. Revise termination provisions
4. Review financial terms for fairness`,
        id: 'mock-review-' + Date.now(),
        issues_count: {
          critical: 1,
          high: 2,
          medium: 4
        },
        checklist_status: [
          { category: 'Party Identification', status: 'pass' },
          { category: 'Financial Terms', status: 'warning' },
          { category: 'Liability & Indemnification', status: 'critical' },
          { category: 'Termination Rights', status: 'warning' },
          { category: 'Intellectual Property', status: 'critical' },
          { category: 'Confidentiality', status: 'pass' },
          { category: 'Regulatory Compliance', status: 'pass' },
          { category: 'Dispute Resolution', status: 'warning' },
          { category: 'Material Adverse Changes', status: 'pass' },
          { category: 'Conflicts of Interest', status: 'pass' }
        ]
      } as ContractReviewResponse)
    }
    
    // Convert file to base64 for n8n
    const buffer = await file.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    
    // Trigger n8n workflow
    const n8nUrl = `${process.env.N8N_WEBHOOK_URL}${process.env.N8N_REVIEW_WEBHOOK}`
    
    const response = await axios.post(n8nUrl, {
      fileName: file.name,
      fileType: file.type,
      fileData: base64
    } as ContractReviewRequest, {
      timeout: 180000 // 3 minute timeout for review
    })
    
    return NextResponse.json({
      success: true,
      ...response.data
    } as ContractReviewResponse)
    
  } catch (error: any) {
    console.error('Review contract error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to review contract' },
      { status: 500 }
    )
  }
}
