"use client"

import { useState } from "react"
import { TEMPLATE_TYPES, TEMPLATE_NAMES, type TemplateType } from "@/templates-components"

interface DraftFormProps {
  onSubmit: (data: any) => void
  isLoading: boolean
  loadingStage: string
}

interface FormErrors {
  [key: string]: string
}

export default function DraftForm({ onSubmit, isLoading, loadingStage }: DraftFormProps) {
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState({
    // Contract Template Selection
    templateType: "",
    
    // Party Information
    artistName: "",
    artistAddress: "",
    artistPhone: "",
    artistEmail: "",
    
    producerName: "",
    producerCompany: "",
    producerAddress: "",
    producerPhone: "",
    producerEmail: "",
    producerTitle: "",
    
    // Company Information
    companyContact: "",
    companyTitle: "",
    
    // Contract Terms
    contractTitle: "",
    effectiveDate: new Date().toLocaleDateString(),
    termYears: "",
    
    // Financial Terms
    advanceAmount: "",
    royaltyRate: "",
    commissionRate: "",
    
    // Additional Terms
    territory: "Worldwide",
    governingLaw: "New York",
    disputeResolution: "Arbitration"
  })

  const renderInput = (name: string, label: string, type: string = "text", placeholder: string = "", required: boolean = false) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name as keyof typeof formData] || ""}
        onChange={handleChange}
        disabled={isLoading}
        className={`w-full rounded-lg border px-4 py-3 text-gray-900 disabled:opacity-50 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          errors[name] ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
        }`}
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  )

  const renderSelect = (name: string, label: string, options: { value: string; label: string }[], required: boolean = false) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={formData[name as keyof typeof formData] || ""}
        onChange={handleChange}
        disabled={isLoading}
        className={`w-full rounded-lg border px-4 py-3 text-gray-900 disabled:opacity-50 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          errors[name] ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
        }`}
      >
        <option value="">Select {label.toLowerCase()}...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  )

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    // Template selection validation
    if (!formData.templateType || formData.templateType === "") {
      newErrors.templateType = "Please select a contract template"
    }
    
    // Artist information validation
    if (!formData.artistName?.trim()) {
      newErrors.artistName = "Artist name is required"
    }
    
    if (!formData.artistAddress?.trim()) {
      newErrors.artistAddress = "Artist address is required"
    }
    
    if (!formData.artistEmail?.trim()) {
      newErrors.artistEmail = "Artist email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.artistEmail)) {
      newErrors.artistEmail = "Please enter a valid email address"
    }
    
    // Producer information validation
    if (!formData.producerName?.trim()) {
      newErrors.producerName = "Producer/Manager name is required"
    }
    
    if (!formData.producerCompany?.trim()) {
      newErrors.producerCompany = "Producer company is required"
    }
    
    if (!formData.producerEmail?.trim()) {
      newErrors.producerEmail = "Producer email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.producerEmail)) {
      newErrors.producerEmail = "Please enter a valid email address"
    }
    
    if (!formData.producerTitle?.trim()) {
      newErrors.producerTitle = "Producer title is required"
    }
    
    if (!formData.companyContact?.trim()) {
      newErrors.companyContact = "Company contact is required"
    }
    
    if (!formData.companyTitle?.trim()) {
      newErrors.companyTitle = "Company title is required"
    }
    
    // Contract terms validation
    if (!formData.contractTitle?.trim()) {
      newErrors.contractTitle = "Contract title is required"
    }
    
    if (!formData.termYears?.trim()) {
      newErrors.termYears = "Term duration is required"
    }
    
    // Financial terms validation based on template type
    if (formData.templateType === TEMPLATE_TYPES.PRODUCER_AGREEMENT || formData.templateType === TEMPLATE_TYPES.FORM_PRODUCER_AGREEMENT) {
      if (!formData.advanceAmount?.trim()) {
        newErrors.advanceAmount = "Advance amount is required"
      }
      
      if (!formData.royaltyRate?.trim()) {
        newErrors.royaltyRate = "Royalty rate is required"
      }
    }
    
    if (formData.templateType === TEMPLATE_TYPES.MANAGEMENT_AGREEMENT) {
      if (!formData.commissionRate?.trim()) {
        newErrors.commissionRate = "Commission rate is required"
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    
    if (validateForm()) {
    onSubmit(formData)
    } else {
      // Scroll to first error
      const firstError = Object.keys(errors)[0]
      if (firstError) {
        const element = document.querySelector(`[name="${firstError}"]`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }
  }

  const templateOptions = [
    { value: TEMPLATE_TYPES.PRODUCER_AGREEMENT, label: TEMPLATE_NAMES[TEMPLATE_TYPES.PRODUCER_AGREEMENT] },
    { value: TEMPLATE_TYPES.MANAGEMENT_AGREEMENT, label: TEMPLATE_NAMES[TEMPLATE_TYPES.MANAGEMENT_AGREEMENT] },
    { value: TEMPLATE_TYPES.FORM_PRODUCER_AGREEMENT, label: TEMPLATE_NAMES[TEMPLATE_TYPES.FORM_PRODUCER_AGREEMENT] }
  ]

  const territoryOptions = [
    { value: "Worldwide", label: "Worldwide" },
    { value: "United States", label: "United States" },
    { value: "North America", label: "North America" },
    { value: "Europe", label: "Europe" },
    { value: "Asia", label: "Asia" }
  ]

  const governingLawOptions = [
    { value: "New York", label: "New York" },
    { value: "California", label: "California" },
    { value: "Tennessee", label: "Tennessee" },
    { value: "Florida", label: "Florida" },
    { value: "Texas", label: "Texas" }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contract Generation Form</h1>
        <p className="text-gray-600">Complete the form below to generate your legal contract</p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="mb-6 rounded-lg bg-blue-50 p-4 border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            <span className="text-sm font-medium text-gray-900">{loadingStage}</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-1/3 bg-blue-600 transition-all duration-500"></div>
        </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contract Template Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Contract Template</h2>
          <div className="grid grid-cols-1 gap-6">
            {renderSelect("templateType", "Contract Template", templateOptions, true)}
            <p className="text-sm text-gray-500">
              Select the type of contract you need. Each template is optimized for specific legal requirements and industry standards.
            </p>
          </div>
        </div>

        {/* Artist Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Artist Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("artistName", "Artist Name", "text", "Enter full legal name", true)}
            {renderInput("artistAddress", "Artist Address", "text", "Enter full address", true)}
            {renderInput("artistPhone", "Artist Phone", "tel", "Enter phone number")}
            {renderInput("artistEmail", "Artist Email", "email", "Enter email address", true)}
          </div>
          </div>

        {/* Producer/Manager Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Producer/Manager Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("producerName", "Producer/Manager Name", "text", "Enter full legal name", true)}
            {renderInput("producerCompany", "Company Name", "text", "Enter company name", true)}
            {renderInput("producerAddress", "Company Address", "text", "Enter company address")}
            {renderInput("producerPhone", "Company Phone", "tel", "Enter phone number")}
            {renderInput("producerEmail", "Company Email", "email", "Enter email address", true)}
            {renderInput("producerTitle", "Title/Position", "text", "e.g., President, CEO, Producer", true)}
            {renderInput("companyContact", "Company Contact Person", "text", "Enter company contact name", true)}
            {renderInput("companyTitle", "Company Contact Title", "text", "e.g., President, CEO, Manager", true)}
          </div>
                  </div>

        {/* Contract Terms */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Contract Terms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("contractTitle", "Contract Title", "text", "Enter contract title", true)}
            {renderInput("effectiveDate", "Effective Date", "date", "", true)}
            {renderInput("termYears", "Term Duration (Years)", "text", "e.g., 4", true)}
            {renderSelect("territory", "Territory", territoryOptions)}
            {renderSelect("governingLaw", "Governing Law", governingLawOptions)}
          </div>
                  </div>

        {/* Financial Terms */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Financial Terms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("advanceAmount", "Advance Amount", "text", "e.g., $10,000", formData.templateType === TEMPLATE_TYPES.PRODUCER_AGREEMENT || formData.templateType === TEMPLATE_TYPES.FORM_PRODUCER_AGREEMENT)}
            {renderInput("royaltyRate", "Royalty Rate", "text", "e.g., 3%", formData.templateType === TEMPLATE_TYPES.PRODUCER_AGREEMENT || formData.templateType === TEMPLATE_TYPES.FORM_PRODUCER_AGREEMENT)}
            {renderInput("commissionRate", "Commission Rate", "text", "e.g., 20%", formData.templateType === TEMPLATE_TYPES.MANAGEMENT_AGREEMENT)}
          </div>
          </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>📄</span>
            Generate Contract
          </button>
          <p className="text-sm text-gray-500 mt-3">
            AI will generate a professional contract based on your inputs
          </p>
        </div>
        </form>
    </div>
  )
}