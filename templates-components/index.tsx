export { ProducerAgreementTemplate } from './producer-agreement';
export { ManagementAgreementTemplate } from './management-agreement';
export { FormProducerAgreementTemplate } from './form-producer-agreement';

export const TEMPLATE_TYPES = {
  PRODUCER_AGREEMENT: 'producer-agreement',
  MANAGEMENT_AGREEMENT: 'management-agreement',
  FORM_PRODUCER_AGREEMENT: 'form-producer-agreement'
} as const;

export type TemplateType = typeof TEMPLATE_TYPES[keyof typeof TEMPLATE_TYPES];

export const TEMPLATE_NAMES = {
  [TEMPLATE_TYPES.PRODUCER_AGREEMENT]: 'Producer Agreement',
  [TEMPLATE_TYPES.MANAGEMENT_AGREEMENT]: 'Management Agreement',
  [TEMPLATE_TYPES.FORM_PRODUCER_AGREEMENT]: 'Form Producer Agreement'
} as const;
