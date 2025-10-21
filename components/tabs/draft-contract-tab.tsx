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
} from "@/templates"
import { 
  FIRM_HISTORY, 
  DEMO_SCENARIOS, 
  LOADING_STAGES,
  type FirmHistoryContract 
} from "@/lib/demo-data"

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
      let templateContent = ""

      if (formData.templateType === TEMPLATE_TYPES.PRODUCER_AGREEMENT) {
        templateContent = ProducerAgreementTemplate({
          variables: {
            artist: formData.artist || "Taylor Martinez",
            producer: formData.producer || "Taylor Martinez Productions",
            company: formData.company || "Republic Records",
            companyAddress: formData.companyAddress || "1755 Broadway, New York, NY 10019",
            companyContact: formData.companyContact || "John Smith",
            companyEmail: formData.companyEmail || "contracts@republicrecords.com",
            companyPhone: formData.companyPhone || "(212) 555-0123",
            producerAddress: formData.producerAddress || "123 Music Row, Nashville, TN 37203",
            producerContact: formData.producerContact || "Taylor Martinez",
            producerEmail: formData.producerEmail || "taylor@martinproductions.com",
            producerPhone: formData.producerPhone || "(615) 555-0456",
            compositionTitle: formData.compositionTitle || "New Hit Single",
            advance: formData.advance || "$25,000",
            royaltyRate: formData.royaltyRate || "3%",
            date: new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })
          }
        })
      } else if (formData.templateType === TEMPLATE_TYPES.MANAGEMENT_AGREEMENT) {
        templateContent = ManagementAgreementTemplate({
          variables: {
            artist: formData.artist || "Taylor Martinez",
            producer: formData.producer || "Management Company",
            producerAddress: formData.producerAddress || "123 Management Ave, Los Angeles, CA 90210",
            producerContact: formData.producerContact || "Manager Name",
            producerEmail: formData.producerEmail || "manager@management.com",
            producerPhone: formData.producerPhone || "(323) 555-0789",
            artistAddress: formData.artistAddress || "456 Artist Street, Nashville, TN 37203",
            artistContact: formData.artistContact || "Taylor Martinez",
            artistEmail: formData.artistEmail || "taylor@artist.com",
            artistPhone: formData.artistPhone || "(615) 555-0123",
            commissionRate: formData.commissionRate || "20%",
            termYears: formData.termYears || "4",
            date: new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })
          }
        })
      } else if (formData.templateType === TEMPLATE_TYPES.FORM_PRODUCER_AGREEMENT) {
        templateContent = FormProducerAgreementTemplate({
          variables: {
            artist: formData.artist || "Taylor Martinez",
            producer: formData.producer || "Taylor Martinez Productions",
            company: formData.company || "Republic Records",
            companyAddress: formData.companyAddress || "1755 Broadway, New York, NY 10019",
            companyContact: formData.companyContact || "John Smith",
            companyEmail: formData.companyEmail || "contracts@republicrecords.com",
            companyPhone: formData.companyPhone || "(212) 555-0123",
            producerAddress: formData.producerAddress || "123 Music Row, Nashville, TN 37203",
            producerContact: formData.producerContact || "Taylor Martinez",
            producerEmail: formData.producerEmail || "taylor@martinproductions.com",
            producerPhone: formData.producerPhone || "(615) 555-0456",
            compositionTitle: formData.compositionTitle || "New Hit Single",
            advance: formData.advance || "$25,000",
            royaltyRate: formData.royaltyRate || "3%",
            date: new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })
          }
        })
      } else {
        throw new Error("Invalid template type selected")
      }

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
        }))
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
