"use client"

import { useState, useEffect } from "react"
import RichTextEditor from "./rich-text-editor"

interface ContractEditorProps {
  contract: string
  onReset: () => void
}

export default function ContractEditor({ contract, onReset }: ContractEditorProps) {
  const [editedContent, setEditedContent] = useState(contract)

  // Update content when contract prop changes
  useEffect(() => {
    setEditedContent(contract)
  }, [contract])

  const handleCopy = () => {
    navigator.clipboard.writeText(editedContent)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([editedContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "contract.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground font-serif">Generated Contract</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setEditedContent(contract)}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Edit Draft
          </button>
          <button
            onClick={handleCopy}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={handleDownload}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Download as DOCX
          </button>
        </div>
      </div>

      <RichTextEditor
        value={editedContent}
        onChange={setEditedContent}
        placeholder="Contract content will appear here..."
        className="shadow-sm"
      />

      <div className="flex gap-2">
        <button
          onClick={onReset}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  )
}
