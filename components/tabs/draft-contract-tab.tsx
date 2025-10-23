"use client"

import { useState } from "react"
import DraftForm from "@/components/draft/draft-form"
import RightSidebar from "@/components/draft/right-sidebar"
import ContractEditor from "@/components/draft/contract-editor"
import { ContractDraftResponse } from "@/types/contract"
import {
  ProducerAgreementTemplate,
  ManagementAgreementTemplate,
  FormProducerAgreementTemplate,
  TEMPLATE_TYPES
} from "@/templates-components"
import { 
  FIRM_HISTORY, 
  DEMO_SCENARIOS, 
  LOADING_STAGES,
  type FirmHistoryContract 
} from "@/lib/demo-data"

// Helper function to get template content as string
const getTemplateContent = (templateType: string, variables: any): string => {
  // Create a temporary component instance to extract the templateContent
  let templateComponent;
  if (templateType === TEMPLATE_TYPES.PRODUCER_AGREEMENT) {
    templateComponent = ProducerAgreementTemplate({ variables });
  } else if (templateType === TEMPLATE_TYPES.MANAGEMENT_AGREEMENT) {
    templateComponent = ManagementAgreementTemplate({ variables });
  } else if (templateType === TEMPLATE_TYPES.FORM_PRODUCER_AGREEMENT) {
    templateComponent = FormProducerAgreementTemplate({ variables });
  } else {
    return "";
  }
  
  // The template components return the templateContent string
  // We need to extract it from the component
  return templateComponent as any;
};

export default function DraftContractTab() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ContractDraftResponse | null>(null)
  const [loadingStage, setLoadingStage] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleGenerateDraft = async (formData: any) => {
    setIsLoading(true)
    setError(null)

    try {
      // Log the form data to debug
      console.log('Form data received:', formData)
      console.log('Template type:', formData.templateType)
      
      if (!formData.templateType || formData.templateType === "") {
        throw new Error("Please select a contract template")
      }

      // Simulate AI processing with loading stages
      const stages = LOADING_STAGES.contract_generation
      for (let i = 0; i < stages.length; i++) {
        setLoadingStage(stages[i])
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400))
      }

      // Search firm history for matches
      const matchedContracts = FIRM_HISTORY.filter(contract => {
        if (formData.templateType === TEMPLATE_TYPES.PRODUCER_AGREEMENT) {
          return contract.contract_type === 'producer_agreement' || 
                 contract.contract_type === 'comprehensive_producer_agreement'
        } else if (formData.templateType === TEMPLATE_TYPES.MANAGEMENT_AGREEMENT) {
          return contract.contract_type === 'management_agreement'
        }
        return false
      })

      // Generate template based on selected type with form data
      const variables = {
        artist: formData.artistName || "Taylor Martinez",
        producer: formData.producerName || "Taylor Martinez Productions",
        company: formData.producerCompany || "Republic Records",
        companyAddress: formData.producerAddress || "1755 Broadway, New York, NY 10019",
        companyContact: formData.companyContact || "John Smith",
        companyTitle: formData.companyTitle || "President",
        companyEmail: formData.producerEmail || "contracts@republicrecords.com",
        companyPhone: formData.producerPhone || "(212) 555-0123",
        producerAddress: formData.producerAddress || "123 Music Row, Nashville, TN 37203",
        producerContact: formData.producerName || "Taylor Martinez",
        producerTitle: formData.producerTitle || "Producer",
        producerEmail: formData.producerEmail || "taylor@martinproductions.com",
        producerPhone: formData.producerPhone || "(615) 555-0456",
        compositionTitle: formData.contractTitle || "New Hit Single",
        advance: formData.advanceAmount || "$25,000",
        royaltyRate: formData.royaltyRate || "3%",
        commissionRate: formData.commissionRate || "20%",
        artistAddress: formData.artistAddress || "456 Artist Street, Nashville, TN 37203",
        artistEmail: formData.artistEmail || "taylor@artist.com",
        artistPhone: formData.artistPhone || "(615) 555-0123",
        termYears: formData.termYears || "4",
        territory: formData.territory || "Worldwide",
        governingLaw: formData.governingLaw || "California",
        date: formData.effectiveDate || new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      }

      const templateContent = getTemplateContent(formData.templateType, variables)

      // Log the generated template content
      console.log('Generated template content:', templateContent.substring(0, 200) + '...')
      
      // Create mock response with template content and matched contracts
      const mockResult: ContractDraftResponse = {
        success: true,
        draft: templateContent,
        matched_contracts: matchedContracts.map(contract => ({
          client: contract.client_name,
          type: contract.contract_type.replace('_', ' ').toUpperCase(),
          match_reason: `Similar ${contract.client_industry} agreement from ${contract.date_created}`
        })),
        id: `contract_${Date.now()}`,
        format: 'markdown'
      }

      setResult(mockResult)
    } catch (err: any) {
      console.error('Error generating contract:', err)
      setError(err.message || 'Failed to generate contract')
    } finally {
    setIsLoading(false)
    setLoadingStage("")
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <DraftForm onSubmit={handleGenerateDraft} isLoading={isLoading} loadingStage={loadingStage} />

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 border border-red-200 p-4">
              <div className="flex">
                <div className="text-red-600 mr-3">⚠️</div>
                <div>
                  <h3 className="text-sm font-medium text-red-800">Error generating contract</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-8">
              <ContractEditor contract={result.draft} onReset={() => setResult(null)} />
            </div>
          )}
        </div>

        <div className="col-span-1">
          <RightSidebar matchedContracts={result?.matched_contracts} />
        </div>
      </div>
    </div>
  )
}
