"use client"

import { useState } from "react"
import { TEMPLATE_TYPES, TEMPLATE_NAMES, type TemplateType } from "@/templates"

interface DraftFormProps {
  onSubmit: (data: any) => void
  isLoading: boolean
  loadingStage: string
}

interface FormErrors {
  [key: string]: string
}

export default function DraftForm({ onSubmit, isLoading, loadingStage }: DraftFormProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([0])
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState({
    templateType: "",
    partyOverview: "",
    partyName: "",
    contractType: "Service Agreement",
    clientName: "NorthBridge Capital",
    industry: "Consulting Law",
    financialServices: "New York",
    partyA: "",
    firstPartyProvider: "CloudMarkesh Technologies, Inc.",
    secondPartyClient: "NorthBridge Capital Partners LLC",
    termDuration: "36 months",
    effectiveTime: "Recurring: Enter Events",
    rateProfile: "Standard - Partial reduction",
    keyNegotiationFocus:
      "Minimum 12-month holding commitment; acceptance of SOC 2 Type II reporting cadence; high-breach notification at 36 hours.",
    businessPurpose: "Provision of cloud-based analytics platform and managed reporting service.",
    // Template-specific fields
    artist: "",
    producer: "",
    company: "",
    companyAddress: "",
    companyContact: "",
    companyEmail: "",
    companyPhone: "",
    lenderAddress: "",
    lenderContact: "",
    lenderEmail: "",
    lenderPhone: "",
    compositionTitle: "",
    advance: "",
    royaltyRate: "",
    commissionRate: "",
    termYears: "",
    date: new Date().toLocaleDateString()
  })

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const renderInput = (name: string, label: string, type: string = "text", placeholder: string = "") => (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name as keyof typeof formData] || ""}
        onChange={handleChange}
        disabled={isLoading}
        className={`w-full rounded-lg border px-4 py-2 text-foreground disabled:opacity-50 text-sm ${
          errors[name] ? 'border-red-500 bg-red-50' : 'border-border bg-background'
        }`}
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  )

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    // Template-specific validation
    if (!formData.templateType || formData.templateType === "") {
      newErrors.templateType = "Please select a contract template"
    }
    
    if (!formData.artist?.trim()) {
      newErrors.artist = "Artist name is required"
    }
    
    if (!formData.producer?.trim()) {
      newErrors.producer = "Producer/Manager name is required"
    }
    
    if (!formData.company?.trim()) {
      newErrors.company = "Company name is required"
    }
    
    if (!formData.companyAddress?.trim()) {
      newErrors.companyAddress = "Company address is required"
    }
    
    if (!formData.companyEmail?.trim()) {
      newErrors.companyEmail = "Company email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
      newErrors.companyEmail = "Please enter a valid email address"
    }
    
    if (!formData.companyPhone?.trim()) {
      newErrors.companyPhone = "Company phone is required"
    }
    
    // Template-specific field validation
    if (formData.templateType === TEMPLATE_TYPES.PRODUCER_AGREEMENT || formData.templateType === TEMPLATE_TYPES.FORM_PRODUCER_AGREEMENT) {
      if (!formData.compositionTitle?.trim()) {
        newErrors.compositionTitle = "Composition/Song title is required"
      }
      
      if (!formData.advance?.trim()) {
        newErrors.advance = "Advance amount is required"
      }
      
      if (!formData.royaltyRate?.trim()) {
        newErrors.royaltyRate = "Royalty rate is required"
      }
    }
    
    if (formData.templateType === TEMPLATE_TYPES.MANAGEMENT_AGREEMENT) {
      if (!formData.commissionRate?.trim()) {
        newErrors.commissionRate = "Commission rate is required"
      }
      
      if (!formData.termYears?.trim()) {
        newErrors.termYears = "Term duration is required"
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

  return (
    <div className="space-y-6">
      {/* Hero Section */}
        <div className="rounded-xl bg-linear-to-br from-blue-50 to-blue-25 p-10 border border-blue-100">
        <div className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 uppercase tracking-wide">
          Quality Assurance
        </div>
        <h1 className="mb-4 text-4xl font-bold text-foreground leading-tight font-serif">
          Intelligent contract drafting built for deal velocity.
        </h1>
        <p className="mb-8 max-w-2xl text-base text-muted-foreground leading-relaxed">
          High intake, guardrails, and playbooks before the first draft validates the complexity. Keep partners informed
          and minimize rework while staying compliant.
        </p>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
            <span>✨</span>
            Generate negotiation brief
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
            <span>👥</span>
            Schedule partner review
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="rounded-lg border border-border bg-card p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground font-serif">Configure the brief</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Gather all represented parties, contracts, and claims data aligned for the Op draft.
            </p>
          </div>
          <a href="#" className="text-sm font-medium text-primary hover:underline whitespace-nowrap">
            Edit details
          </a>
        </div>

        {isLoading && (
          <div className="mb-6 rounded-lg bg-blue-50 p-4 border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <span className="text-sm font-medium text-foreground">{loadingStage}</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-1/3 bg-primary transition-all duration-500"></div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* STEP 0: Template Selection */}
          <div className="border border-border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection(-1)}
              className="w-full flex items-center justify-between px-6 py-4 bg-muted/50 hover:bg-muted transition-colors"
            >
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">STEP 1: Template Selection</h3>
              <span
                className={`text-muted-foreground transition-transform ${expandedSections.includes(-1) ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>
            {expandedSections.includes(-1) && (
              <div className="px-6 py-6 bg-card border-t border-border">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Contract Template
                    </label>
                    <select
                      name="templateType"
                      value={formData.templateType}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full rounded-lg border px-4 py-2 text-foreground disabled:opacity-50 text-sm ${
                        errors.templateType ? 'border-red-500 bg-red-50' : 'border-border bg-background'
                      }`}
                    >
                      <option value="">Select a template...</option>
                      <option value={TEMPLATE_TYPES.PRODUCER_AGREEMENT}>{TEMPLATE_NAMES[TEMPLATE_TYPES.PRODUCER_AGREEMENT]}</option>
                      <option value={TEMPLATE_TYPES.MANAGEMENT_AGREEMENT}>{TEMPLATE_NAMES[TEMPLATE_TYPES.MANAGEMENT_AGREEMENT]}</option>
                      <option value={TEMPLATE_TYPES.FORM_PRODUCER_AGREEMENT}>{TEMPLATE_NAMES[TEMPLATE_TYPES.FORM_PRODUCER_AGREEMENT]}</option>
                    </select>
                    {errors.templateType && (
                      <p className="text-red-500 text-xs mt-1">{errors.templateType}</p>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Select the contract template that best matches your needs. Each template has specific fields and formatting optimized for different types of agreements.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 1: Party Details */}
          <div className="border border-border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection(0)}
              className="w-full flex items-center justify-between px-6 py-4 bg-muted/50 hover:bg-muted transition-colors"
            >
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">STEP 2: Party Details</h3>
              <span
                className={`text-muted-foreground transition-transform ${expandedSections.includes(0) ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>
            {expandedSections.includes(0) && (
              <div className="px-6 py-6 bg-card border-t border-border">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Party
                    </label>
                    <select
                      name="partyOverview"
                      value={formData.partyOverview}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-50 text-sm"
                    >
                      <option>Enter overview</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Contract Type
                    </label>
                    <select
                      name="contractType"
                      value={formData.contractType}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-50 text-sm"
                    >
                      <option>NorthBridge Capital</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Client Name
                    </label>
                    <select
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-50 text-sm"
                    >
                      <option>NorthBridge Capital</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-50 text-sm"
                    >
                      <option>Consulting Law</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Financial Services
                    </label>
                    <select
                      name="financialServices"
                      value={formData.financialServices}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-50 text-sm"
                    >
                      <option>New York</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: Parties & Commercial Terms */}
          <div className="border border-border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection(1)}
              className="w-full flex items-center justify-between px-6 py-4 bg-muted/50 hover:bg-muted transition-colors"
            >
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                STEP 3: Parties & Commercial Terms
              </h3>
              <span
                className={`text-muted-foreground transition-transform ${expandedSections.includes(1) ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>
            {expandedSections.includes(1) && (
              <div className="px-6 py-6 bg-card border-t border-border">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      First Party (Provider) *
                    </label>
                    <input
                      type="text"
                      name="firstPartyProvider"
                      value={formData.firstPartyProvider}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Second Party (Client) *
                    </label>
                    <input
                      type="text"
                      name="secondPartyClient"
                      value={formData.secondPartyClient}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Term Duration
                    </label>
                    <input
                      type="text"
                      name="termDuration"
                      value={formData.termDuration}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Party A: Effective Time & Events
                    </label>
                    <select
                      name="effectiveTime"
                      value={formData.effectiveTime}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-50 text-sm"
                    >
                      <option>Recurring: Enter Events</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 3: Strategy & Scope */}
          <div className="border border-border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection(2)}
              className="w-full flex items-center justify-between px-6 py-4 bg-muted/50 hover:bg-muted transition-colors"
            >
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                STEP 4: Strategy & Scope
              </h3>
              <span
                className={`text-muted-foreground transition-transform ${expandedSections.includes(2) ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>
            {expandedSections.includes(2) && (
              <div className="px-6 py-6 bg-card border-t border-border">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Rate Profile
                    </label>
                    <select
                      name="rateProfile"
                      value={formData.rateProfile}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-50 text-sm"
                    >
                      <option>Standard - Partial reduction</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Key Negotiation Focus
                    </label>
                    <textarea
                      name="keyNegotiationFocus"
                      value={formData.keyNegotiationFocus}
                      onChange={handleChange}
                      disabled={isLoading}
                      rows={4}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Business Purpose
                    </label>
                    <textarea
                      name="businessPurpose"
                      value={formData.businessPurpose}
                      onChange={handleChange}
                      disabled={isLoading}
                      rows={4}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-50 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: Template Variables */}
          <div className="border border-border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection(3)}
              className="w-full flex items-center justify-between px-6 py-4 bg-muted/50 hover:bg-muted transition-colors"
            >
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                STEP 5: Template Variables
              </h3>
              <span
                className={`text-muted-foreground transition-transform ${expandedSections.includes(3) ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>
            {expandedSections.includes(3) && (
              <div className="px-6 py-6 bg-card border-t border-border">
                <div className="grid grid-cols-2 gap-6">
                  {renderInput("artist", "Artist Name", "text", "Enter artist name")}
                  {renderInput("producer", "Producer/Manager Name", "text", "Enter producer/manager name")}
                  {renderInput("company", "Company Name", "text", "Enter company name")}
                  {renderInput("companyAddress", "Company Address", "text", "Enter company address")}
                  {renderInput("companyEmail", "Company Email", "email", "Enter company email")}
                  {renderInput("companyPhone", "Company Phone", "tel", "Enter company phone")}
                  {renderInput("compositionTitle", "Composition/Song Title", "text", "Enter song/composition title")}
                  {renderInput("advance", "Advance Amount", "text", "e.g., $10,000")}
                  {renderInput("royaltyRate", "Royalty Rate", "text", "e.g., 3%")}
                  {renderInput("commissionRate", "Commission Rate", "text", "e.g., 20%")}
                  {renderInput("termYears", "Term (Years)", "text", "e.g., 4")}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity mt-6 flex items-center justify-center gap-2"
          >
            <span>📄</span>
            Generate Contract
          </button>
          <p className="text-xs text-muted-foreground text-center">
            Let's auto-determine the delegation. AI generates the suitable next set of alerts, questions or tasks.
          </p>
        </form>
      </div>
    </div>
  )
}
