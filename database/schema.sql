-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Templates table
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'mutual_nda', 'oneway_nda', 'service_agreement'
  content TEXT NOT NULL,
  variables JSONB, -- List of {{VARIABLES}} in template
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Firm history table
CREATE TABLE firm_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name VARCHAR(200) NOT NULL,
  client_industry VARCHAR(100) NOT NULL,
  contract_type VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  date_created DATE NOT NULL,
  attorney VARCHAR(200),
  tags TEXT[],
  key_clauses JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for firm_history
CREATE INDEX idx_firm_history_client ON firm_history(client_name);
CREATE INDEX idx_firm_history_industry ON firm_history(client_industry);
CREATE INDEX idx_firm_history_type ON firm_history(contract_type);

-- Clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL UNIQUE,
  industry VARCHAR(100) NOT NULL,
  sub_industry VARCHAR(100),
  first_engagement DATE,
  total_contracts INTEGER DEFAULT 0,
  preferred_terms JSONB,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contracts table (generated)
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  client_name VARCHAR(200),
  contract_type VARCHAR(50),
  draft_content TEXT NOT NULL,
  matched_history JSONB, -- Array of matched contract IDs
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'reviewed', 'approved'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for contracts
CREATE INDEX idx_contracts_client ON contracts(client_id);
CREATE INDEX idx_contracts_status ON contracts(status);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_file_name VARCHAR(300),
  contract_file_url TEXT, -- Supabase Storage URL
  contract_text TEXT,
  overall_risk VARCHAR(20), -- 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'
  issues_count JSONB, -- {"critical": 1, "high": 2, "medium": 4}
  top_concerns JSONB, -- Array of top 3 issues
  checklist_results JSONB, -- Full checklist analysis
  critical_issues JSONB, -- All flagged issues
  report_markdown TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for reviews
CREATE INDEX idx_reviews_risk ON reviews(overall_risk);

-- Due diligence checklist table
CREATE TABLE due_diligence_checklist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id VARCHAR(100) UNIQUE NOT NULL,
  category_name VARCHAR(200) NOT NULL,
  priority INTEGER NOT NULL,
  questions TEXT[] NOT NULL,
  risk_keywords TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Risk patterns table
CREATE TABLE risk_patterns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pattern_id VARCHAR(100) UNIQUE NOT NULL,
  severity VARCHAR(20) NOT NULL, -- 'critical', 'high', 'medium', 'low'
  keywords TEXT[] NOT NULL,
  description TEXT NOT NULL,
  recommendation TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sample data for templates
INSERT INTO templates (name, type, content, variables) VALUES
('Mutual NDA', 'mutual_nda', 
'MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of {{DATE}} by and between {{PARTY_1}} and {{PARTY_2}}.

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
This Agreement shall commence on the Effective Date and continue for a period of {{TERM}} years, unless earlier terminated by either party upon thirty (30) days written notice.

4. RETURN OF CONFIDENTIAL INFORMATION
Upon termination of this Agreement or upon request by the Disclosing Party, the Receiving Party shall return or destroy all Confidential Information and certify such return or destruction in writing.

5. LIMITATION OF LIABILITY
IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT.

6. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.

{{PARTY_1}}

By: _________________________________
Name: _______________________________
Title: ________________________________
Date: ________________________________

{{PARTY_2}}

By: _________________________________
Date: ________________________________', 
'["DATE", "PARTY_1", "PARTY_2", "TERM"]'::jsonb),

('Service Agreement', 'service_agreement',
'ENTERPRISE SAAS MASTER SERVICE AGREEMENT

This Enterprise SaaS Master Service Agreement ("Agreement") is entered into as of {{DATE}} between {{PROVIDER}} ("Provider") and {{CLIENT}} ("Client").

1. SERVICES AND SERVICE LEVELS
Provider shall provide the following services: {{SERVICES_DESCRIPTION}}

Service Level Agreement: 99.9% uptime availability, excluding scheduled maintenance.

2. DATA PROTECTION
Provider shall implement appropriate technical and organizational measures to protect Client data in accordance with applicable data protection laws.

3. FEES AND PAYMENT
Client shall pay Provider fees as set forth in the applicable Order Form. Payment terms are net 30 days.

4. INTELLECTUAL PROPERTY
All intellectual property rights in the Services remain with Provider. Client retains ownership of its data.

5. LIMITATION OF LIABILITY
Provider''s total liability shall not exceed the fees paid by Client in the 12 months preceding the claim.

6. TERM AND TERMINATION
This Agreement shall commence on the Effective Date and continue for {{TERM}} months, unless earlier terminated in accordance with this Agreement.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.

{{PROVIDER}}                    {{CLIENT}}

By: _________________________    By: _________________________
Name: _______________________    Name: _______________________
Title: ______________________    Title: ______________________
Date: _______________________    Date: _______________________',
'["DATE", "PROVIDER", "CLIENT", "SERVICES_DESCRIPTION", "TERM"]'::jsonb);

-- Sample data for firm_history
INSERT INTO firm_history (client_name, client_industry, contract_type, content, date_created, attorney, tags, key_clauses)
VALUES
('Drake', 'Music', 'mutual_nda', 'MUTUAL NDA content for Drake...', '2024-03-15', 'John Smith', 
 ARRAY['entertainment', 'recording', 'collaboration'],
 '{"confidentiality_term": "3 years", "jurisdiction": "New York"}'::jsonb),
('Beyoncé', 'Music', 'mutual_nda', 'MUTUAL NDA content for Beyoncé...', '2023-09-22', 'Jane Doe',
 ARRAY['entertainment', 'music', 'touring'],
 '{"confidentiality_term": "5 years", "jurisdiction": "California"}'::jsonb),
('The Weeknd', 'Music', 'service_agreement', 'Service agreement content for The Weeknd...', '2024-01-10', 'Mike Johnson',
 ARRAY['entertainment', 'music', 'streaming'],
 '{"service_level": "99.9%", "liability_cap": "12 months fees"}'::jsonb);

-- Sample data for clients
INSERT INTO clients (name, industry, sub_industry, first_engagement, total_contracts, preferred_terms, notes)
VALUES
('Drake', 'Music', 'Recording Artist', '2022-01-10', 5,
 '{"confidentiality_duration": "3 years", "jurisdiction": "New York"}'::jsonb,
 'Prefers shorter confidentiality terms. Always includes IP ownership clauses.'),
('Beyoncé', 'Music', 'Recording Artist', '2020-05-15', 8,
 '{"confidentiality_duration": "5 years", "jurisdiction": "California"}'::jsonb,
 'Large artist. Standard terms. Requires insurance provisions.'),
('The Weeknd', 'Music', 'Recording Artist', '2021-03-20', 3,
 '{"confidentiality_duration": "3 years", "jurisdiction": "New York"}'::jsonb,
 'Tech-savvy artist. Prefers digital-first contracts.'),
('Universal Studios', 'Film', 'Production', '2020-05-15', 12,
 '{"confidentiality_duration": "5 years", "jurisdiction": "California"}'::jsonb,
 'Large studio. Standard terms. Requires insurance provisions.');

-- Sample data for due_diligence_checklist
INSERT INTO due_diligence_checklist (category_id, category_name, priority, questions, risk_keywords)
VALUES
('party_identification', 'Party Identification', 1,
 ARRAY['Who are the contracting parties?', 'Are entities properly identified?', 'Are there any shell companies involved?'],
 ARRAY['shell company', 'offshore', 'unnamed party', 'entity not specified']),
('financial_terms', 'Financial Terms', 1,
 ARRAY['What are payment amounts?', 'Are there penalties?', 'Is there a liability cap?'],
 ARRAY['unlimited', 'no cap', 'penalties exceeding', 'unlimited liability']),
('liability_indemnification', 'Liability & Indemnification', 1,
 ARRAY['What is the liability cap?', 'Are indemnification terms fair?', 'Is there insurance coverage?'],
 ARRAY['unlimited liability', 'any and all claims', 'without limitation', 'indemnify']),
('termination_rights', 'Termination Rights', 2,
 ARRAY['Can either party terminate?', 'What is the notice period?', 'Are termination rights mutual?'],
 ARRAY['may terminate at any time', 'without cause', 'at sole discretion', 'immediate termination']),
('intellectual_property', 'Intellectual Property', 1,
 ARRAY['Who owns the IP?', 'Are there proper assignments?', 'Is there work-for-hire language?'],
 ARRAY['work for hire', 'assignment', 'intellectual property', 'copyright']),
('confidentiality', 'Confidentiality', 2,
 ARRAY['Are confidentiality terms defined?', 'What is the duration?', 'Are there proper exceptions?'],
 ARRAY['confidential', 'proprietary', 'non-disclosure', 'trade secret']),
('regulatory_compliance', 'Regulatory Compliance', 2,
 ARRAY['Are there regulatory requirements?', 'Is data protection addressed?', 'Are there export controls?'],
 ARRAY['GDPR', 'CCPA', 'export control', 'regulatory']),
('dispute_resolution', 'Dispute Resolution', 3,
 ARRAY['How are disputes resolved?', 'What is the governing law?', 'Is there arbitration?'],
 ARRAY['arbitration', 'governing law', 'jurisdiction', 'dispute']),
('material_adverse_changes', 'Material Adverse Changes', 3,
 ARRAY['Are there MAC clauses?', 'How are they defined?', 'Are they reasonable?'],
 ARRAY['material adverse change', 'MAC', 'material adverse effect']),
('conflicts_of_interest', 'Conflicts of Interest', 3,
 ARRAY['Are there any conflicts?', 'Are they disclosed?', 'How are they managed?'],
 ARRAY['conflict of interest', 'related party', 'affiliate']);

-- Sample data for risk_patterns
INSERT INTO risk_patterns (pattern_id, severity, keywords, description, recommendation)
VALUES
('unlimited_liability', 'critical',
 ARRAY['unlimited liability', 'any and all claims', 'without limitation', 'no cap'],
 'Unlimited liability exposure detected',
 'Add cap equal to fees paid in prior 12 months. Exclude gross negligence and willful misconduct.'),
('one_sided_termination', 'high',
 ARRAY['may terminate at any time', 'without cause', 'at sole discretion', 'immediate termination'],
 'One-sided termination rights detected',
 'Require notice period (30-90 days) and mutual termination rights. Add wind-down obligations.'),
('broad_indemnification', 'high',
 ARRAY['indemnify', 'hold harmless', 'defend', 'any and all claims'],
 'Overly broad indemnification language detected',
 'Limit indemnification to third-party claims. Exclude vendor negligence. Add liability caps.'),
('work_for_hire', 'medium',
 ARRAY['work for hire', 'assignment', 'all rights', 'intellectual property'],
 'Work-for-hire language may be too broad',
 'Clarify scope of work-for-hire. Ensure proper assignment language. Consider joint ownership.'),
('data_processing', 'medium',
 ARRAY['personal data', 'processing', 'GDPR', 'CCPA'],
 'Data processing language may need compliance review',
 'Ensure compliance with applicable data protection laws. Add data processing agreements.'),
('governing_law', 'low',
 ARRAY['governing law', 'jurisdiction', 'venue', 'courts'],
 'Governing law clause detected',
 'Verify jurisdiction is appropriate for both parties. Consider choice of law implications.');
