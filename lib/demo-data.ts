// Static demo data for Grubman Contract Assistant
// This simulates the firm history and templates without API calls

export interface FirmHistoryContract {
  id: string;
  client_name: string;
  client_industry: string;
  contract_type: string;
  complexity_level: 'simple' | 'mid' | 'comprehensive';
  date_created: string;
  attorney: string;
  tags: string[];
  key_clauses: {
    [key: string]: string;
  };
  content: string;
}

export interface DueDiligenceResult {
  overall_risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  critical_issues: number;
  high_priority_issues: number;
  medium_priority_issues: number;
  top_concerns: Array<{
    title: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    description: string;
    recommendation: string;
    context: string;
  }>;
  checklist_results: Array<{
    category: string;
    status: 'pass' | 'warning' | 'fail';
    details: string;
  }>;
}

// Firm History Data (3 complexity levels)
export const FIRM_HISTORY: FirmHistoryContract[] = [
  // SIMPLE LEVEL - Drake/Metro Boomin Producer Agreement
  {
    id: 'contract_001',
    client_name: 'Drake & Metro Boomin',
    client_industry: 'Music',
    contract_type: 'producer_agreement',
    complexity_level: 'simple',
    date_created: '2024-03-15',
    attorney: 'John Smith',
    tags: ['entertainment', 'recording', 'collaboration', 'simple'],
    key_clauses: {
      royalty_rate: '3%',
      advance: '$50,000',
      jurisdiction: 'California',
      term: 'Per-project',
      work_for_hire: 'Yes'
    },
    content: `PRODUCER AGREEMENT - DRAKE & METRO BOOMIN

This Agreement is entered into as of March 15, 2024 between Republic Records and Metro Boomin Productions.

1. ENGAGEMENT
Producer shall provide production services for the musical composition "Rich Flex" featuring Drake.

2. COMPENSATION
- Advance: $50,000 (non-recoupable)
- Royalty Rate: 3% of suggested retail list price
- Payment: Net 30 days

3. OWNERSHIP
All master recordings shall be "works made for hire" owned by Republic Records.

4. CREDIT
Producer shall receive credit as "Produced by Metro Boomin" on all records.

5. TERM
This Agreement shall continue until completion of the Master Recording.

6. GOVERNING LAW
This Agreement shall be governed by the laws of the State of California.`
  },

  // MID LEVEL - Billie Eilish Management Agreement
  {
    id: 'contract_002',
    client_name: 'Billie Eilish',
    client_industry: 'Music',
    contract_type: 'management_agreement',
    complexity_level: 'mid',
    date_created: '2023-09-22',
    attorney: 'Jane Doe',
    tags: ['entertainment', 'music', 'management', 'mid-complexity'],
    key_clauses: {
      commission_rate: '20%',
      sunset_provisions: 'Yes',
      term_years: '4',
      jurisdiction: 'California',
      arbitration: 'JAMS'
    },
    content: `PERSONAL MANAGEMENT AGREEMENT - BILLIE EILISH

This Agreement is entered into as of September 22, 2023 between Billie Eilish and Darkroom Management.

1. ENGAGEMENT
Manager shall act as Artist's exclusive personal manager for all entertainment industry activities.

2. TERM
Initial term of 4 years with options to extend.

3. COMPENSATION
- Commission: 20% of Gross Earnings
- Sunset Provisions: Declining over 4 years (100%, 75%, 50%, 50%)
- Expense Reimbursement: Reasonable and necessary expenses

4. SUNSET PROVISIONS
After termination, Manager shall receive declining commissions:
- Year 1: 100% of pre-termination rate
- Year 2: 75% of pre-termination rate  
- Year 3: 50% of pre-termination rate
- Year 4: 50% of pre-termination rate

5. FIDUCIARY DUTIES
Manager owes Artist fiduciary duties of loyalty, care, and good faith.

6. TERMINATION
Either party may terminate with 90 days written notice.

7. DISPUTE RESOLUTION
All disputes shall be resolved through JAMS arbitration in Los Angeles.

8. GOVERNING LAW
This Agreement shall be governed by the laws of the State of California.`
  },

  // COMPREHENSIVE LEVEL - Pharrell Williams Producer Agreement
  {
    id: 'contract_003',
    client_name: 'Pharrell Williams',
    client_industry: 'Music',
    contract_type: 'comprehensive_producer_agreement',
    complexity_level: 'comprehensive',
    date_created: '2024-01-10',
    attorney: 'Michael Johnson',
    tags: ['entertainment', 'music', 'comprehensive', 'high-stakes'],
    key_clauses: {
      royalty_structure: 'Tiered',
      advance: '$500,000',
      jurisdiction: 'California',
      term: 'Multi-album',
      exhibits: '4'
    },
    content: `COMPREHENSIVE PRODUCER AGREEMENT - PHARRELL WILLIAMS

This Agreement is entered into as of January 10, 2024 between Columbia Records and Pharrell Williams Productions.

1. ENGAGEMENT
Producer shall provide comprehensive production services for Artist's next album project, including but not limited to:
- Full album production (12-15 tracks)
- International distribution
- Complex royalty structure with escalations
- Sample clearance requirements
- Behind-the-scenes rights
- SoundExchange provisions

2. COMPENSATION STRUCTURE
- Advance: $500,000 (recoupable)
- Royalty Rates:
  * USNRC: 4% base rate
  * International: Proportional to US rate
  * Singles: Pro-rated based on album sales
  * Budget Records: Reduced rate (2.5%)
  * Video: 50% of base rate
- Escalations:
  * >500K units: 4.5%
  * >1M units: 5%
  * >2M units: 5.5%

3. COMPLEX ROYALTY CALCULATIONS
- Net Artist Rate: All-in rate minus aggregate third-party rates
- International: Proportional based on US sales
- Streaming: Separate calculation methodology
- Physical vs Digital: Different rate structures

4. SAMPLE CLEARANCE
Producer responsible for all sample clearances with full indemnification.

5. SECURITY PROTOCOLS
- Confidentiality agreements for all personnel
- Secure file transfer protocols
- Leak prevention measures
- Background check requirements

6. EXHIBITS
- Exhibit A: Letter of Direction
- Exhibit B: Controlled Compositions Agreement
- Exhibit C: Sampling Forms and Clearances
- Exhibit D: SoundExchange Letter of Direction

7. TERM
Multi-album commitment with delivery schedule and milestone payments.

8. GOVERNING LAW
This Agreement shall be governed by the laws of the State of California with exclusive jurisdiction in Los Angeles County.`
  }
];

// Static contract templates for different complexity levels
export const CONTRACT_TEMPLATES = {
  simple: {
    name: 'Simple Producer Agreement',
    description: 'Quick turnaround for single productions',
    estimated_pages: '13 pages',
    key_features: ['Basic royalty structure', 'Work-for-hire provisions', 'Standard terms']
  },
  mid: {
    name: 'Management Agreement',
    description: 'Standard protections for artist representation',
    estimated_pages: '21 pages',
    key_features: ['Sunset provisions', 'Commission structure', 'Fiduciary duties']
  },
  comprehensive: {
    name: 'Comprehensive Producer Agreement',
    description: 'Maximum protection for high-stakes deals',
    estimated_pages: '50+ pages',
    key_features: ['Tiered royalties', 'Multiple exhibits', 'Complex structures']
  }
};

// Static due diligence results for demo
export const DUE_DILIGENCE_RESULTS: { [key: string]: DueDiligenceResult } = {
  // Good contract result
  good_contract: {
    overall_risk: 'LOW',
    critical_issues: 0,
    high_priority_issues: 0,
    medium_priority_issues: 2,
    top_concerns: [
      {
        title: 'Payment Terms',
        severity: 'medium',
        description: '60-day payment terms exceed industry standard',
        recommendation: 'Negotiate to net 30 or request early payment discount',
        context: 'Section 3.4: "Payment shall be made within 60 days of invoice"'
      }
    ],
    checklist_results: [
      { category: 'Party Identification', status: 'pass', details: 'All parties clearly identified with addresses' },
      { category: 'Financial Terms', status: 'warning', details: 'Payment terms longer than standard' },
      { category: 'Liability & Indemnification', status: 'pass', details: 'Reasonable caps and exclusions' },
      { category: 'Termination Rights', status: 'pass', details: 'Mutual termination with proper notice' },
      { category: 'Intellectual Property', status: 'pass', details: 'Clear ownership and licensing terms' }
    ]
  },

  // Bad contract result
  bad_contract: {
    overall_risk: 'CRITICAL',
    critical_issues: 3,
    high_priority_issues: 2,
    medium_priority_issues: 1,
    top_concerns: [
      {
        title: 'Unlimited Liability',
        severity: 'critical',
        description: 'Artist must indemnify manager for "any and all claims" with no cap',
        recommendation: 'Add liability cap equal to fees paid in prior 12 months. Exclude manager negligence.',
        context: 'Section 7.2: "Artist shall indemnify Manager from any and all claims, damages, losses, costs and expenses"'
      },
      {
        title: 'Excessive Commission Rate',
        severity: 'critical',
        description: '30% commission rate is 50% higher than industry standard (20%)',
        recommendation: 'Negotiate down to 20% or justify the premium with additional services',
        context: 'Section 4.1: "Manager shall receive 30% of all Gross Monies"'
      },
      {
        title: 'No Sunset Provisions',
        severity: 'critical',
        description: 'Artist pays commissions forever even after relationship ends',
        recommendation: 'Add declining sunset - 100%, 75%, 50%, 50% over 4 years',
        context: 'Section 4.3: "Commissions shall be payable in perpetuity"'
      },
      {
        title: 'One-Sided Termination',
        severity: 'high',
        description: 'Manager can terminate anytime, artist cannot',
        recommendation: 'Make termination rights mutual with same notice period',
        context: 'Section 10.1: "Manager may terminate at any time with 30 days notice"'
      },
      {
        title: 'No Commission Exclusions',
        severity: 'high',
        description: 'Artist pays on recording costs, tour expenses, and other costs',
        recommendation: 'Exclude recording costs, tour expenses, and other direct costs',
        context: 'Section 4.2: "Gross Earnings includes all income from entertainment activities"'
      }
    ],
    checklist_results: [
      { category: 'Party Identification', status: 'pass', details: 'Parties identified but manager entity unclear' },
      { category: 'Financial Terms', status: 'fail', details: 'Excessive commission rate and payment terms' },
      { category: 'Liability & Indemnification', status: 'fail', details: 'Unlimited liability exposure' },
      { category: 'Termination Rights', status: 'fail', details: 'One-sided termination rights' },
      { category: 'Intellectual Property', status: 'warning', details: 'Broad IP assignment beyond scope' }
    ]
  }
};

// Demo scenarios with pre-filled data
export const DEMO_SCENARIOS = {
  simple: {
    name: 'Taylor Martinez - Simple Production Deal',
    description: 'New up-and-coming producer working with music client',
    formData: {
      templateType: 'producer_agreement',
      artist: 'Taylor Martinez',
      producer: 'Taylor Martinez Productions',
      company: 'Republic Records',
      companyAddress: '1755 Broadway, New York, NY 10019',
      companyContact: 'John Smith',
      companyEmail: 'contracts@republicrecords.com',
      companyPhone: '(212) 555-0123',
      compositionTitle: 'New Hit Single',
      advance: '$25,000',
      royaltyRate: '3%'
    },
    matchedContracts: ['Drake & Metro Boomin'],
    complexityLevel: 'simple',
    estimatedTime: '5 minutes',
    keyMessage: 'What used to take 45 minutes now takes 5 minutes'
  },

  mid: {
    name: 'Management Agreement Review',
    description: 'Review incoming management agreement for risk assessment',
    contractType: 'management_agreement',
    complexityLevel: 'mid',
    estimatedTime: '8 minutes',
    keyMessage: 'Eric Sacks\' entire due diligence process is now automated'
  },

  comprehensive: {
    name: 'Pharrell Williams - Comprehensive Album Production',
    description: 'Multi-million dollar album production with maximum complexity',
    formData: {
      templateType: 'comprehensive_producer_agreement',
      artist: 'Pharrell Williams',
      producer: 'Pharrell Williams Productions',
      company: 'Columbia Records',
      companyAddress: '550 Madison Avenue, New York, NY 10022',
      companyContact: 'Michael Johnson',
      companyEmail: 'contracts@columbiarecords.com',
      companyPhone: '(212) 555-0456',
      compositionTitle: 'Next Album Project',
      advance: '$500,000',
      royaltyRate: '4% (tiered structure)'
    },
    matchedContracts: ['Pharrell Williams'],
    complexityLevel: 'comprehensive',
    estimatedTime: '6 minutes',
    keyMessage: 'Same AI system adapts to complexity levels'
  }
};

// Simulated loading stages for demo
export const LOADING_STAGES = {
  contract_generation: [
    'Searching firm history for similar agreements...',
    'Found 3 matching contracts: Drake, Beyoncé, Kendrick Lamar',
    'Extracting key clauses from previous agreements...',
    'Generating contract using AI...',
    'Applying firm-specific language and standards...',
    'Finalizing contract structure...',
    'Contract generation complete!'
  ],
  due_diligence: [
    'Extracting text from uploaded contract...',
    'Running pattern matching against risk database...',
    'Checking Eric Sacks\' due diligence checklist...',
    'Analyzing financial terms and liability provisions...',
    'Comparing to industry standards...',
    'Generating comprehensive risk report...',
    'Analysis complete!'
  ]
};
