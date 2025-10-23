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
    // Create a proper DOCX file using a different approach
    // We'll create an HTML file with proper styling that can be opened in Word
    const htmlContent = createStyledHtml(editedContent)
    
    const element = document.createElement("a")
    const file = new Blob([htmlContent], { 
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
    })
    element.href = URL.createObjectURL(file)
    element.download = "contract.docx"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Helper function to create styled HTML that can be opened in Word
  const createStyledHtml = (content: string) => {
    const htmlContent = convertMarkdownToHtml(content)
    
    return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <meta name="ProgId" content="Word.Document">
  <meta name="Generator" content="Microsoft Word 15">
  <meta name="Originator" content="Microsoft Word 15">
  <style>
    body {
      font-family: 'Times New Roman', serif;
      line-height: 1.6;
      margin: 1in;
      color: #000;
    }
    h1 {
      font-size: 18pt;
      font-weight: bold;
      margin-top: 12pt;
      margin-bottom: 6pt;
    }
    h2 {
      font-size: 16pt;
      font-weight: bold;
      margin-top: 12pt;
      margin-bottom: 6pt;
    }
    h3 {
      font-size: 14pt;
      font-weight: bold;
      margin-top: 12pt;
      margin-bottom: 6pt;
    }
    p {
      margin-bottom: 6pt;
      text-align: justify;
    }
    strong {
      font-weight: bold;
    }
    em {
      font-style: italic;
    }
    ul, ol {
      margin-left: 0.5in;
      margin-bottom: 6pt;
    }
    li {
      margin-bottom: 3pt;
      list-style-type: disc;
    }
    ul li {
      list-style-type: disc;
    }
    ol li {
      list-style-type: decimal;
    }
    hr {
      border: none;
      border-top: 1pt solid #000;
      margin: 12pt 0;
    }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`
  }

  // Helper function to convert markdown to HTML
  const convertMarkdownToHtml = (markdown: string) => {
    let html = markdown
      // Convert headers first
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      
      // Convert bold and italic text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // Convert horizontal rules
      .replace(/^---$/gim, '<hr>')
      
      // Convert lists - handle both bullet and numbered lists
      .replace(/^(\s*)- (.*$)/gim, '<li>$2</li>')
      .replace(/^(\s*)\d+\. (.*$)/gim, '<li>$2</li>')
      
      // Split into lines and process each line
      .split('\n')
      .map(line => {
        // Skip empty lines
        if (line.trim() === '') return ''
        
        // If it's already a header, list item, or hr, return as is
        if (line.match(/^<(h[1-6]|li|hr)/)) return line
        
        // If it's a list item, wrap in ul
        if (line.match(/^<li>/)) return `<ul>${line}</ul>`
        
        // Otherwise, wrap in paragraph
        return `<p>${line}</p>`
      })
      .join('\n')
      
      // Clean up multiple ul tags
      .replace(/<\/ul>\s*<ul>/g, '')
      
      // Clean up multiple paragraph tags
      .replace(/<\/p>\s*<p>/g, '<br>')
      
      // Clean up empty paragraphs
      .replace(/<p>\s*<\/p>/g, '')
      
      // Clean up extra whitespace
      .replace(/\n\s*\n/g, '\n')
      
    return html
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
