import React from 'react';

export interface LegalDocumentVariables {
  // Common fields
  date: string;
  company: string;
  companyAddress: string;
  companyContact: string;
  companyTitle?: string;
  companyEmail: string;
  companyPhone: string;
  
  // Artist/Client fields
  artist: string;
  artistAddress?: string;
  artistContact?: string;
  artistEmail?: string;
  artistPhone?: string;
  
  // Producer/Manager fields
  producer: string;
  producerAddress?: string;
  producerContact?: string;
  producerTitle?: string;
  producerEmail?: string;
  producerPhone?: string;
  
  // Financial terms
  advance?: string;
  royaltyRate?: string;
  commissionRate?: string;
  termYears?: string;
  
  // Legal terms
  territory?: string;
  governingLaw?: string;
  
  // Project details
  compositionTitle?: string;
  projectDescription?: string;
}

export const formatLegalDocument = (content: string, variables: LegalDocumentVariables): string => {
  let formatted = content;
  
  // Replace all variable placeholders
  Object.entries(variables).forEach(([key, value]) => {
    if (value) {
      const placeholder = `{{${key.toUpperCase()}}}`;
      formatted = formatted.replace(new RegExp(placeholder, 'g'), value);
    }
  });
  
  return formatted;
};

export const LegalDocumentHeader = ({ title, date }: { title: string; date: string }) => `
# ${title}

**AGREEMENT** made and entered into as of this **${date}** between the parties listed below.

---

`;

export const LegalDocumentFooter = (variables?: LegalDocumentVariables) => `
---

**IN WITNESS WHEREOF**, the parties have executed this Agreement as of the date first above written.

**COMPANY:**

By: ${variables?.companyContact || '_____________________________'}
Title: ${variables?.companyTitle || '___________________________'}

**PRODUCER/MANAGER:**

By: ${variables?.producerContact || '_____________________________'}
Title: ${variables?.producerTitle || '___________________________'}

---

*This agreement is governed by the laws of the State of California and any disputes shall be resolved through binding arbitration.*
`;
