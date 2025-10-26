"use client"

import { useState, useEffect } from "react"
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx"
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

  const handleDownload = async () => {
    try {
      // Parse the content and create DOCX document
      const doc = createDocxDocument(editedContent)
      
      // Generate the DOCX file
      const buffer = await Packer.toBuffer(doc)
      
      // Create blob and download
      const blob = new Blob([buffer], { 
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
    })
      
      const element = document.createElement("a")
      const url = URL.createObjectURL(blob)
      element.href = url
      element.download = `contract-${new Date().toISOString().split('T')[0]}.docx`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
      
      // Clean up the URL object
      setTimeout(() => URL.revokeObjectURL(url), 100)
    } catch (error) {
      console.error("Error generating DOCX:", error)
      alert("Error generating DOCX file. Please try again.")
    }
  }

  // Helper function to create DOCX document from markdown content
  const createDocxDocument = (content: string) => {
    const paragraphs = parseMarkdownToDocx(content)
    
    return new Document({
      sections: [{
        properties: {},
        children: paragraphs
      }]
    })
  }

  // Helper function to parse markdown content into DOCX paragraphs
  const parseMarkdownToDocx = (markdown: string) => {
    const lines = markdown.split('\n')
    const paragraphs: Paragraph[] = []
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Skip empty lines
      if (line === '') {
        paragraphs.push(new Paragraph({ children: [new TextRun({ text: "" })] }))
        continue
      }
      
      // Handle headers
      if (line.startsWith('# ')) {
        paragraphs.push(new Paragraph({
          text: line.substring(2),
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 200, before: 200 }
        }))
      } else if (line.startsWith('## ')) {
        paragraphs.push(new Paragraph({
          text: line.substring(3),
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200, before: 200 }
        }))
      } else if (line.startsWith('### ')) {
        paragraphs.push(new Paragraph({
          text: line.substring(4),
          heading: HeadingLevel.HEADING_3,
          spacing: { after: 200, before: 200 }
        }))
      }
      // Handle horizontal rules
      else if (line === '---') {
        paragraphs.push(new Paragraph({
          children: [new TextRun({ text: "─".repeat(50) })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200, before: 200 }
        }))
      }
      // Handle list items
      else if (line.startsWith('- ')) {
        paragraphs.push(new Paragraph({
          text: `• ${line.substring(2)}`,
          spacing: { after: 100, before: 100 },
          indent: { left: 720 } // 0.5 inch
        }))
      } else if (/^\d+\. /.test(line)) {
        const match = line.match(/^(\d+)\. (.*)/)
        if (match) {
          paragraphs.push(new Paragraph({
            text: `${match[1]}. ${match[2]}`,
            spacing: { after: 100, before: 100 },
            indent: { left: 720 } // 0.5 inch
          }))
        }
      }
      // Handle regular paragraphs with formatting
      else {
        const textRuns = parseInlineFormatting(line)
        paragraphs.push(new Paragraph({
          children: textRuns,
          spacing: { after: 100, before: 100 },
          alignment: AlignmentType.JUSTIFIED
        }))
      }
    }
    
    return paragraphs
  }

  // Helper function to parse inline formatting (bold, italic)
  const parseInlineFormatting = (text: string) => {
    const textRuns: TextRun[] = []
    let currentText = text
    let position = 0
    
    // Handle bold text (**text**)
    while (currentText.includes('**')) {
      const boldStart = currentText.indexOf('**')
      const boldEnd = currentText.indexOf('**', boldStart + 2)
      
      if (boldEnd === -1) break
      
      // Add text before bold
      if (boldStart > 0) {
        textRuns.push(new TextRun({ text: currentText.substring(0, boldStart) }))
      }
      
      // Add bold text
      const boldText = currentText.substring(boldStart + 2, boldEnd)
      textRuns.push(new TextRun({ text: boldText, bold: true }))
      
      // Update current text
      currentText = currentText.substring(boldEnd + 2)
    }
    
    // Handle italic text (*text*)
    while (currentText.includes('*') && !currentText.includes('**')) {
      const italicStart = currentText.indexOf('*')
      const italicEnd = currentText.indexOf('*', italicStart + 1)
      
      if (italicEnd === -1) break
      
      // Add text before italic
      if (italicStart > 0) {
        textRuns.push(new TextRun({ text: currentText.substring(0, italicStart) }))
      }
      
      // Add italic text
      const italicText = currentText.substring(italicStart + 1, italicEnd)
      textRuns.push(new TextRun({ text: italicText, italics: true }))
      
      // Update current text
      currentText = currentText.substring(italicEnd + 1)
    }
    
    // Add remaining text
    if (currentText) {
      textRuns.push(new TextRun({ text: currentText }))
    }
    
    return textRuns.length > 0 ? textRuns : [new TextRun({ text: text })]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground font-serif">Generated Contract</h3>
        <div className="flex gap-2">
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
        key={contract} // Force re-render when contract changes
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
