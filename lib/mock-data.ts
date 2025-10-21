export const mockDraftResponse = {
  matched_contracts: [
    {
      client: "Drake",
      type: "Mutual NDA",
      match_reason: "Same industry: Music",
    },
    {
      client: "Beyoncé",
      type: "Mutual NDA",
      match_reason: "Same industry: Music",
    },
    {
      client: "The Weeknd",
      type: "Service Agreement",
      match_reason: "Similar contract type and industry",
    },
  ],
  draft: `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of the date of execution ("Effective Date") by and between Grubman Shire Meiselas & Sacks, P.C., a professional corporation ("First Party"), and Taylor Martinez ("Second Party").

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
This Agreement shall commence on the Effective Date and continue for a period of three years, unless earlier terminated by either party upon thirty (30) days' written notice.

4. RETURN OF CONFIDENTIAL INFORMATION
Upon termination of this Agreement or upon request by the Disclosing Party, the Receiving Party shall return or destroy all Confidential Information and certify such return or destruction in writing.

5. LIMITATION OF LIABILITY
IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT.

6. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.

GRUBMAN SHIRE MEISELAS & SACKS, P.C.

By: _________________________________
Name: _______________________________
Title: ________________________________
Date: ________________________________

TAYLOR MARTINEZ

By: _________________________________
Date: ________________________________`,
  template_used: "mutual_nda",
  generation_time: "23 seconds",
}

export const mockReviewResponse = {
  overall_risk: "HIGH",
  risk_score: 0.67,
  issues_count: {
    critical: 1,
    high: 2,
    medium: 4,
  },
  top_concerns: [
    {
      severity: "critical",
      title: "Unlimited Liability",
      section: "Section 7.2",
      description: 'Contract requires indemnification for "any and all claims" with no cap on liability exposure.',
      recommendation:
        "Add liability cap equal to fees paid in the preceding 12 months. Exclude vendor negligence and willful misconduct from indemnification.",
    },
    {
      severity: "high",
      title: "Broad Termination Rights",
      section: "Section 4.1",
      description:
        "Either party can terminate without cause on 15 days notice, creating significant business continuity risk.",
      recommendation: "Increase notice period to 90 days or require cause for termination. Add wind-down obligations.",
    },
    {
      severity: "high",
      title: "IP Ownership Ambiguity",
      section: "Section 6.3",
      description: "Unclear ownership of work product created during the engagement term.",
      recommendation: "Clarify that all work product is owned by [Client]. Add explicit assignment language.",
    },
  ],
  checklist_status: [
    { category: "Party Identification", status: "pass" },
    { category: "Financial Terms", status: "warning" },
    { category: "Liability & Indemnification", status: "critical" },
    { category: "Termination Rights", status: "warning" },
    { category: "Intellectual Property", status: "critical" },
    { category: "Confidentiality", status: "pass" },
    { category: "Regulatory Compliance", status: "pass" },
    { category: "Dispute Resolution", status: "warning" },
    { category: "Material Adverse Changes", status: "pass" },
    { category: "Conflicts of Interest", status: "pass" },
  ],
}
