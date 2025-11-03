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
  recordCompany?: string;
  
  // Artist/Client fields
  artist: string;
  artistAddress?: string;
  artistContact?: string;
  artistEmail?: string;
  artistPhone?: string;
  professionalArtistName?: string;
  
  // Producer/Manager fields
  producer: string;
  producerAddress?: string;
  producerContact?: string;
  producerTitle?: string;
  producerEmail?: string;
  producerPhone?: string;
  producerCompany?: string;
  coProducer?: string;
  
  // Financial terms
  advance?: string;
  royaltyRate?: string;
  commissionRate?: string;
  termYears?: string;
  
  // Legal terms
  territory?: string;
  governingLaw?: string;
  distributionAgreementDate?: string;
  
  // Project details
  compositionTitle?: string;
  projectDescription?: string;
  numberOfMasters?: string;
  lenderAddress?: string;
  lenderContact?: string;
  lenderEmail?: string;
  lenderPhone?: string;

  // Schedule / Writers & SoundExchange (Form template)
  writersAndSplits?: string;
  payeeAddress?: string;
  payeePhone?: string;
  payeeEmail?: string;
  lodTrackName?: string;
  lodPaymentPercentage?: string;
  lodEffectiveDate?: string;
  lodTrackVersion?: string;
  lodIsrc?: string;
  lodAlbum?: string;
  lodLabel?: string;
  lodReleaseDate?: string;
  lodOtherArtists?: string;
  ourCounselAttention?: string;
  yourCounselFirm?: string;
  yourCounselCO?: string;
  yourCounselAttention?: string;
  federalTaxId?: string;
  inducementLenderName?: string;
  inducementProductionsName?: string;
  reLineLeft?: string;
  reLineRight?: string;
  objectionPeriodMonths?: string;
  lawsuitPeriodMonths?: string;
  auditWindowMonths?: string;

  // SoundExchange signatures (Form template)
  performerSignature?: string;
  performerPrintedName?: string;
  authorizedSignatory?: string;
  authorizedSignatoryPrintedName?: string;
  signatureDate?: string;
  additionalPerformerSignature?: string;
  additionalPerformerPrintedName?: string;
  additionalAuthorizedSignatory?: string;
  additionalAuthorizedSignatoryPrintedName?: string;
  additionalSignatureDate?: string;
  payeeId?: string;
  lodPaymentPercentage?: string;

  // Signature blocks
  companySignTitle?: string;
  companySignName?: string;
  lenderSignTitle?: string;
  lenderSignName?: string;

  // Producer Agreement signatures
  signature1Name?: string;
  signature1Title?: string;
  signature2Name?: string;
  signature2Title?: string;

  // Misc placeholders
  collectivePkaName?: string;
  lodProductionsName?: string;
  composerSignerName?: string;
  composerSignerTitle?: string;
  inducementSignerLine2?: string;

  // Exhibit A Letter of Direction (addresses)
  lodAddresseeName?: string;
  lodAddresseeCo?: string;
  lodAddresseeAddress?: string;
  lodYouName?: string;
  lodYouAddress1?: string;
  lodYouAddress2?: string;

  // Exhibit B Composer/Writer header
  composerPartyName?: string;
  composerAddress1?: string;
  composerAddress2?: string;
  composerAddress3?: string;
  composerAttention?: string;
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

By: ${variables?.companyContact || 'To be provided'}
Title: ${variables?.companyTitle || 'To be provided'}

**PRODUCER/MANAGER:**

By: ${variables?.producerContact || 'To be provided'}
Title: ${variables?.producerTitle || 'To be provided'}

---

*This agreement is governed by the laws of the State of California and any disputes shall be resolved through binding arbitration.*
`;
