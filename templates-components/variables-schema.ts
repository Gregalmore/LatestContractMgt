import { LegalDocumentVariables } from './legal-document-base';

export type TemplateKey = 'producer-agreement' | 'management-agreement' | 'form-producer-agreement';

export interface FieldDef {
  name: keyof LegalDocumentVariables;
  label: string;
  placeholder?: string;
  required?: boolean;
  section?: string;
}

const COMMON_FIELDS: FieldDef[] = [
  { name: 'date', label: 'Agreement Date', required: true, section: 'General' },
  { name: 'artist', label: 'Artist/Company Name', required: true, section: 'Parties' },
  { name: 'company', label: 'Company (if different)', section: 'Parties' },
  { name: 'companyAddress', label: 'Company Address', section: 'Parties' },
  { name: 'companyContact', label: 'Company Contact', section: 'Parties' },
  { name: 'companyEmail', label: 'Company Email', section: 'Parties' },
  { name: 'companyPhone', label: 'Company Phone', section: 'Parties' },
  { name: 'producer', label: 'Producer Name', required: true, section: 'Parties' },
  { name: 'producerCompany', label: 'Producer Company (Loan-out)', section: 'Parties' },
  { name: 'producerAddress', label: 'Producer Address', section: 'Parties' },
  { name: 'producerContact', label: 'Producer Contact', section: 'Parties' },
  { name: 'producerEmail', label: 'Producer Email', section: 'Parties' },
  { name: 'producerPhone', label: 'Producer Phone', section: 'Parties' },
];

const PRODUCER_FIELDS: FieldDef[] = [
  { name: 'recordCompany', label: 'Record Company', section: 'Deal Terms' },
  { name: 'compositionTitle', label: 'Composition Title', required: true, section: 'Masters' },
  { name: 'numberOfMasters', label: 'Number of Masters', section: 'Masters' },
  { name: 'coProducer', label: 'Co-Producer', section: 'Masters' },
  { name: 'projectDescription', label: 'Project Description', section: 'Masters' },
  { name: 'advance', label: 'Advance (currency)', section: 'Financial' },
  { name: 'royaltyRate', label: 'Producer Royalty Rate (%)', section: 'Financial' },
  { name: 'territory', label: 'Territory', section: 'Legal' },
  { name: 'governingLaw', label: 'Governing Law', section: 'Legal' },
  // Notices / counsel
  { name: 'ourCounselAttention', label: 'Our Counsel Attention', section: 'Notices' },
  { name: 'yourCounselFirm', label: 'Your Counsel Firm', section: 'Notices' },
  { name: 'yourCounselCO', label: 'Your Counsel c/o', section: 'Notices' },
  { name: 'yourCounselAttention', label: 'Your Counsel Attention', section: 'Notices' },
  // Periods
  { name: 'objectionPeriodMonths', label: 'Objection Period (months)', section: 'Accounting' },
  { name: 'lawsuitPeriodMonths', label: 'Lawsuit Period (months)', section: 'Accounting' },
  { name: 'auditWindowMonths', label: 'Audit Window (months)', section: 'Accounting' },
  // Inducement & signatures
  { name: 'inducementLenderName', label: 'Inducement Lender Name', section: 'Inducement' },
  { name: 'inducementProductionsName', label: 'Inducement Productions Name', section: 'Inducement' },
  { name: 'collectivePkaName', label: 'Collectively p/k/a Name', section: 'Inducement' },
  { name: 'signature1Name', label: 'Signature Block 1 - Name', section: 'Signatures' },
  { name: 'signature1Title', label: 'Signature Block 1 - Title', section: 'Signatures' },
  { name: 'signature2Name', label: 'Signature Block 2 - Name', section: 'Signatures' },
  { name: 'signature2Title', label: 'Signature Block 2 - Title', section: 'Signatures' },
  { name: 'federalTaxId', label: 'Federal Tax ID', section: 'Signatures' },
  // Exhibit A LoD
  { name: 'lodAddresseeName', label: 'LoD Addressee Name', section: 'Exhibit A - LoD' },
  { name: 'lodAddresseeCo', label: 'LoD Addressee c/o', section: 'Exhibit A - LoD' },
  { name: 'lodAddresseeAddress', label: 'LoD Addressee Address', section: 'Exhibit A - LoD' },
  { name: 'lodYouName', label: 'LoD "You" Name', section: 'Exhibit A - LoD' },
  { name: 'lodYouAddress1', label: 'LoD "You" Address 1', section: 'Exhibit A - LoD' },
  { name: 'lodYouAddress2', label: 'LoD "You" Address 2', section: 'Exhibit A - LoD' },
  { name: 'lodProductionsName', label: 'LoD Productions Name', section: 'Exhibit A - LoD' },
  // Exhibit B Composer
  { name: 'composerPartyName', label: 'Composer/Writer Party Name', section: 'Exhibit B - Composer' },
  { name: 'composerAddress1', label: 'Composer Address 1', section: 'Exhibit B - Composer' },
  { name: 'composerAddress2', label: 'Composer Address 2', section: 'Exhibit B - Composer' },
  { name: 'composerAddress3', label: 'Composer Address 3', section: 'Exhibit B - Composer' },
  { name: 'composerAttention', label: 'Composer Attention', section: 'Exhibit B - Composer' },
  { name: 'composerSignerName', label: 'Composer Signer Name', section: 'Exhibit B - Composer' },
  { name: 'composerSignerTitle', label: 'Composer Signer Title', section: 'Exhibit B - Composer' },
];

const MGMT_FIELDS: FieldDef[] = [
  { name: 'commissionRate', label: 'Commission Rate (%)', section: 'Financial' },
  { name: 'termYears', label: 'Term (years)', section: 'Term' },
  { name: 'artistAddress', label: 'Artist Address', section: 'Parties' },
  { name: 'artistContact', label: 'Artist Contact', section: 'Parties' },
  { name: 'artistEmail', label: 'Artist Email', section: 'Parties' },
  { name: 'artistPhone', label: 'Artist Phone', section: 'Parties' },
];

const FORM_PRODUCER_FIELDS: FieldDef[] = [
  { name: 'professionalArtistName', label: 'Professional Artist Name', section: 'Parties' },
  { name: 'distributionAgreementDate', label: 'Distribution Agreement Date', section: 'General' },
  { name: 'lenderAddress', label: 'Lender Address', section: 'Parties' },
  { name: 'lenderContact', label: 'Lender Contact', section: 'Parties' },
  { name: 'lenderEmail', label: 'Lender Email', section: 'Parties' },
  { name: 'lenderPhone', label: 'Lender Phone', section: 'Parties' },
  { name: 'compositionTitle', label: 'Composition Title', section: 'Masters' },
  { name: 'numberOfMasters', label: 'Number of Masters', section: 'Masters' },
  { name: 'advance', label: 'Advance (currency)', section: 'Financial' },
  { name: 'royaltyRate', label: 'Producer Royalty Rate (%)', section: 'Financial' },
  // Schedule 1 (writers & credits)
  { name: 'writersAndSplits', label: 'Writers and Splits', section: 'Schedule 1' },
  // Signature blocks
  { name: 'companySignTitle', label: 'Company Signer Title', section: 'Signatures' },
  { name: 'companySignName', label: 'Company Signer Printed Name', section: 'Signatures' },
  { name: 'lenderSignTitle', label: 'Lender Signer Title', section: 'Signatures' },
  { name: 'lenderSignName', label: 'Lender Signer Printed Name', section: 'Signatures' },
  // SoundExchange / LOD
  { name: 'payeeId', label: 'Payee ID', section: 'SoundExchange' },
  { name: 'payeeAddress', label: 'Payee Address', section: 'SoundExchange' },
  { name: 'payeePhone', label: 'Payee Phone', section: 'SoundExchange' },
  { name: 'payeeEmail', label: 'Payee Email', section: 'SoundExchange' },
  { name: 'lodPaymentPercentage', label: 'LOD Payment Percentage (%)', section: 'SoundExchange' },
  { name: 'lodTrackName', label: 'LOD Track Name', section: 'SoundExchange' },
  { name: 'lodEffectiveDate', label: 'LOD Effective Date', section: 'SoundExchange' },
  { name: 'lodTrackVersion', label: 'LOD Track Version', section: 'SoundExchange' },
  { name: 'lodIsrc', label: 'LOD ISRC', section: 'SoundExchange' },
  { name: 'lodAlbum', label: 'LOD Album', section: 'SoundExchange' },
  { name: 'lodLabel', label: 'LOD Label', section: 'SoundExchange' },
  { name: 'lodReleaseDate', label: 'LOD Release Date', section: 'SoundExchange' },
  { name: 'lodOtherArtists', label: 'LOD Other Artists', section: 'SoundExchange' },
  // Performer/Signatures SoundExchange
  { name: 'performerSignature', label: 'Performer Signature', section: 'SoundExchange Signatures' },
  { name: 'performerPrintedName', label: 'Performer Printed Legal Name', section: 'SoundExchange Signatures' },
  { name: 'authorizedSignatory', label: 'Authorized LOD Signatory', section: 'SoundExchange Signatures' },
  { name: 'authorizedSignatoryPrintedName', label: 'Authorized LOD Signatory Printed Name', section: 'SoundExchange Signatures' },
  { name: 'signatureDate', label: 'Date of Signature', section: 'SoundExchange Signatures' },
  { name: 'additionalPerformerSignature', label: 'Additional Performer Signature', section: 'SoundExchange Signatures' },
  { name: 'additionalPerformerPrintedName', label: 'Additional Performer Printed Legal Name', section: 'SoundExchange Signatures' },
  { name: 'additionalAuthorizedSignatory', label: 'Additional Authorized LOD Signatory', section: 'SoundExchange Signatures' },
  { name: 'additionalAuthorizedSignatoryPrintedName', label: 'Additional Authorized LOD Signatory Printed Name', section: 'SoundExchange Signatures' },
  { name: 'additionalSignatureDate', label: 'Additional Date of Signature', section: 'SoundExchange Signatures' },
];

export function getFieldsForTemplate(template: TemplateKey): FieldDef[] {
  switch (template) {
    case 'producer-agreement':
      return [...COMMON_FIELDS, ...PRODUCER_FIELDS];
    case 'management-agreement':
      return [...COMMON_FIELDS, ...MGMT_FIELDS];
    case 'form-producer-agreement':
      return [...COMMON_FIELDS, ...FORM_PRODUCER_FIELDS];
    default:
      return COMMON_FIELDS;
  }
}


