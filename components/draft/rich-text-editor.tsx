"use client"

import { useState, useRef, useEffect } from "react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({ value, onChange, placeholder = "Enter your contract content...", className = "" }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  const parseMarkdownToHTML = (markdown: string) => {
    let html = markdown
      // Headers (must be first to avoid conflicts)
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
      
      // Bold text (handle both **text** and **text** patterns)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      
      // Italic text (only single asterisks not already part of bold)
      .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
      
      // Horizontal rules
      .replace(/^---$/gim, '<hr>')
      
      // Lists - handle both bullet and numbered
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>')
      
      // Tables - more robust parsing
      .replace(/\|(.+?)\|/g, (match, content) => {
        const cells = content.split('|').map(cell => cell.trim()).filter(cell => cell)
        if (cells.length > 0) {
          return `<tr>${cells.map(cell => `<td>${cell}</td>`).join('')}</tr>`
        }
        return match
      })
      
      // Wrap consecutive list items in ul
      .replace(/(<li>.*?<\/li>)(\s*<li>.*?<\/li>)*/gs, (match) => {
        const items = match.match(/<li>.*?<\/li>/g) || []
        if (items.length > 0) {
          return `<ul>${items.join('')}</ul>`
        }
        return match
      })
      
      // Wrap table rows in table
      .replace(/(<tr>.*?<\/tr>)(\s*<tr>.*?<\/tr>)*/gs, (match) => {
        const rows = match.match(/<tr>.*?<\/tr>/g) || []
        if (rows.length > 0) {
          return `<table class="border-collapse border border-gray-300 w-full">${rows.join('')}</table>`
        }
        return match
      })
      
      // Convert line breaks to paragraphs (handle single and double newlines)
      .replace(/\n\n+/g, '</p><p>')
      .replace(/^(.*)$/gm, '<p>$1</p>')
      
      // Clean up empty paragraphs
      .replace(/<p><\/p>/g, '')
      .replace(/<p>\s*<\/p>/g, '')
      
      // Clean up nested elements
      .replace(/<li><p>(.*?)<\/p><\/li>/g, '<li>$1</li>')
      .replace(/<td><p>(.*?)<\/p><\/td>/g, '<td>$1</td>')
      .replace(/<h[1-4]><p>(.*?)<\/p><\/h[1-4]>/g, (match, content, offset, string) => {
        const headerMatch = string.match(/<h([1-4])><p>(.*?)<\/p><\/h[1-4]>/)
        if (headerMatch) {
          return `<h${headerMatch[1]}>${headerMatch[2]}</h${headerMatch[1]}>`
        }
        return match
      })
      
      // Clean up extra whitespace but preserve structure
      .replace(/>\s+</g, '><')
      .trim()
    
    return html
  }

  useEffect(() => {
    if (editorRef.current) {
      const htmlContent = parseMarkdownToHTML(value)
      // Only update if content is different to avoid cursor jumping
      if (editorRef.current.innerHTML !== htmlContent) {
        // Store current cursor position
        const selection = window.getSelection()
        let cursorPosition = 0
        let isEditing = false
        
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          if (editorRef.current.contains(range.startContainer)) {
            cursorPosition = range.startOffset
            isEditing = true
          }
        }
        
        editorRef.current.innerHTML = htmlContent
        
        // Restore cursor position only if user was editing
        if (isEditing && selection) {
          try {
            const walker = document.createTreeWalker(
              editorRef.current,
              NodeFilter.SHOW_TEXT,
              null
            )
            
            let currentPos = 0
            let node = walker.nextNode()
            
            while (node && currentPos < cursorPosition) {
              const nodeLength = node.textContent?.length || 0
              if (currentPos + nodeLength >= cursorPosition) {
                const newRange = document.createRange()
                newRange.setStart(node, cursorPosition - currentPos)
                newRange.setEnd(node, cursorPosition - currentPos)
                selection.removeAllRanges()
                selection.addRange(newRange)
                break
              }
              currentPos += nodeLength
              node = walker.nextNode()
            }
          } catch (e) {
            // If cursor restoration fails, just focus the editor
            editorRef.current.focus()
          }
        }
      }
    }
  }, [value])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const insertText = (text: string) => {
    document.execCommand('insertText', false, text)
    editorRef.current?.focus()
  }

  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden shadow-sm ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => execCommand('bold')}
            className="p-2 hover:bg-gray-200 rounded text-sm font-bold transition-colors border border-transparent hover:border-gray-300"
            title="Bold"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => execCommand('italic')}
            className="p-2 hover:bg-gray-200 rounded text-sm italic transition-colors border border-transparent hover:border-gray-300"
            title="Italic"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => execCommand('underline')}
            className="p-2 hover:bg-gray-200 rounded text-sm underline transition-colors border border-transparent hover:border-gray-300"
            title="Underline"
          >
            U
          </button>
          <div className="w-px h-4 bg-gray-300 mx-2"></div>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h1')}
            className="p-2 hover:bg-gray-200 rounded text-xs font-bold transition-colors border border-transparent hover:border-gray-300"
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h2')}
            className="p-2 hover:bg-gray-200 rounded text-xs font-bold transition-colors border border-transparent hover:border-gray-300"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h3')}
            className="p-2 hover:bg-gray-200 rounded text-xs font-bold transition-colors border border-transparent hover:border-gray-300"
            title="Heading 3"
          >
            H3
          </button>
          <div className="w-px h-4 bg-gray-300 mx-2"></div>
          <button
            type="button"
            onClick={() => execCommand('insertUnorderedList')}
            className="p-2 hover:bg-gray-200 rounded text-sm transition-colors border border-transparent hover:border-gray-300"
            title="Bullet List"
          >
            •
          </button>
          <button
            type="button"
            onClick={() => execCommand('insertOrderedList')}
            className="p-2 hover:bg-gray-200 rounded text-sm transition-colors border border-transparent hover:border-gray-300"
            title="Numbered List"
          >
            1.
          </button>
          <div className="w-px h-4 bg-gray-300 mx-2"></div>
          <button
            type="button"
            onClick={() => insertText('\n\n---\n\n')}
            className="p-2 hover:bg-gray-200 rounded text-sm transition-colors border border-transparent hover:border-gray-300"
            title="Horizontal Rule"
          >
            —
          </button>
          <div className="w-px h-4 bg-gray-300 mx-2"></div>
          <button
            type="button"
            onClick={() => execCommand('justifyLeft')}
            className="p-2 hover:bg-gray-200 rounded text-sm transition-colors border border-transparent hover:border-gray-300"
            title="Align Left"
          >
            ⬅
          </button>
          <button
            type="button"
            onClick={() => execCommand('justifyCenter')}
            className="p-2 hover:bg-gray-200 rounded text-sm transition-colors border border-transparent hover:border-gray-300"
            title="Align Center"
          >
            ↔
          </button>
          <button
            type="button"
            onClick={() => execCommand('justifyRight')}
            className="p-2 hover:bg-gray-200 rounded text-sm transition-colors border border-transparent hover:border-gray-300"
            title="Align Right"
          >
            ➡
          </button>
        </div>
        
        <div className="text-xs text-gray-500 font-medium">
          {value.length} characters
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="w-full h-96 p-8 border-0 resize-none focus:outline-none overflow-y-auto rich-text-editor"
          style={{ 
            minHeight: '400px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0'
          }}
          data-placeholder={placeholder}
          suppressContentEditableWarning={true}
        />
      </div>
    </div>
  )
}
