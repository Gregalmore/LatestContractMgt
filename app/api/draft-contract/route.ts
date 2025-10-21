import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { ContractDraftRequest, ContractDraftResponse } from '@/types/contract'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const { clientName, industry, contractType, purpose, party1, party2, term } = body as ContractDraftRequest
    
    if (!clientName || !contractType) {
      return NextResponse.json(
        { error: 'Missing required fields: clientName and contractType are required' },
        { status: 400 }
      )
    }
    
    // For now, return mock data if n8n is not configured
    if (!process.env.N8N_WEBHOOK_URL) {
      console.log('n8n not configured, returning mock data')
      return NextResponse.json({
        success: true,
        draft: `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of ${new Date().toLocaleDateString()} by and between ${party1 || 'First Party'} and ${party2 || 'Second Party'}.

WHEREAS, the parties desire to disclose to each other certain confidential and proprietary information and wish to protect the confidentiality of such information;

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any and all information, whether written, oral, electronic, or visual, disclosed by one party ("Disclosing Party") to the other party ("Receiving Party") that is marked as confidential or that reasonably should be understood to be confidential given the nature of the information and circumstances of disclosure.

2. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party agrees to:
(a) Maintain the confidentiality of all Confidential Information;
(b) Limit access to Confidential Information to employees and contractors with a legitimate need to know;
(c) Protect Confidential Information using the same degree of care used to protect its own confidential information, but in no event less than reasonable care;
(d) Not disclose Confidential Information to third parties without prior written consent.

3. TERM AND DURATION
This Agreement shall commence on the Effective Date and continue for a period of ${term || '3'} years, unless earlier terminated by either party upon thirty (30) days' written notice.

4. RETURN OF CONFIDENTIAL INFORMATION
Upon termination of this Agreement or upon request by the Disclosing Party, the Receiving Party shall return or destroy all Confidential Information and certify such return or destruction in writing.

5. LIMITATION OF LIABILITY
IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT.

6. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.

${party1 || 'FIRST PARTY'}

By: _________________________________
Name: _______________________________
Title: ________________________________
Date: ________________________________

${party2 || 'SECOND PARTY'}

By: _________________________________
Date: ________________________________`,
        matched_contracts: [
          {
            client: 'Drake',
            type: 'Mutual NDA',
            match_reason: 'Same industry: Music'
          },
          {
            client: 'Beyoncé',
            type: 'Mutual NDA',
            match_reason: 'Same industry: Music'
          },
          {
            client: 'The Weeknd',
            type: 'Service Agreement',
            match_reason: 'Similar contract type and industry'
          }
        ],
        id: 'mock-draft-' + Date.now(),
        format: 'markdown'
      } as ContractDraftResponse)
    }
    
    // Trigger n8n workflow
    const n8nUrl = `${process.env.N8N_WEBHOOK_URL}${process.env.N8N_DRAFT_WEBHOOK}`
    
    const response = await axios.post(n8nUrl, {
      clientName,
      industry,
      contractType,
      purpose,
      party1,
      party2,
      term
    }, {
      timeout: 60000 // 60 second timeout
    })
    
    return NextResponse.json({
      success: true,
      ...response.data
    } as ContractDraftResponse)
    
  } catch (error: any) {
    console.error('Draft contract error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate contract' },
      { status: 500 }
    )
  }
}
