"use client"

import { useState, useEffect, useRef } from "react"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"
import { TablePlugin } from "@lexical/react/LexicalTablePlugin"
import { ListItemNode, ListNode } from "@lexical/list"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { ToolbarPlugin } from "./lexical-toolbar"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { EditorState } from "lexical"
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html"
import { $getRoot, $insertNodes } from "lexical"
import { $convertFromMarkdownString, $convertToMarkdownString } from "@lexical/markdown"
import { TRANSFORMERS } from "@lexical/markdown"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Enter your contract content...", 
  className = "" 
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false)
  const [hasLoadedContent, setHasLoadedContent] = useState(false)
  const [editedContent, setEditedContent] = useState(value)
  const isEditingRef = useRef(false)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update editedContent when value prop changes
  useEffect(() => {
    setEditedContent(value)
  }, [value])

  // Reset content loading when value changes (new contract generated)
  useEffect(() => {
    if (value) {
      setHasLoadedContent(false)
    }
  }, [value])

  const initialConfig = {
    namespace: "ContractEditor",
    theme: {
      root: "contract-editor-root",
      paragraph: "contract-editor-paragraph",
      heading: {
        h1: "contract-editor-h1",
        h2: "contract-editor-h2",
        h3: "contract-editor-h3",
        h4: "contract-editor-h4",
        h5: "contract-editor-h5",
        h6: "contract-editor-h6",
      },
      text: {
        bold: "contract-editor-bold",
        italic: "contract-editor-italic",
        underline: "contract-editor-underline",
        strikethrough: "contract-editor-strikethrough",
      },
      list: {
        nested: {
          listitem: "contract-editor-nested-listitem",
        },
        ol: "contract-editor-list-ol",
        ul: "contract-editor-list-ul",
        listitem: "contract-editor-listitem",
      },
      link: "contract-editor-link",
      quote: "contract-editor-quote",
      code: "contract-editor-code",
      table: "contract-editor-table",
      tableCell: "contract-editor-tableCell",
      tableCellHeader: "contract-editor-tableCellHeader",
      codeHighlight: {
        atrule: "contract-editor-tokenAttr",
        attr: "contract-editor-tokenAttr",
        boolean: "contract-editor-tokenBoolean",
        builtin: "contract-editor-tokenBuiltin",
        cdata: "contract-editor-tokenCdata",
        char: "contract-editor-tokenChar",
        class: "contract-editor-tokenClass",
        "class-name": "contract-editor-tokenClassName",
        comment: "contract-editor-tokenComment",
        constant: "contract-editor-tokenConstant",
        deleted: "contract-editor-tokenDeleted",
        doctype: "contract-editor-tokenDoctype",
        entity: "contract-editor-tokenEntity",
        function: "contract-editor-tokenFunction",
        important: "contract-editor-tokenImportant",
        inserted: "contract-editor-tokenInserted",
        keyword: "contract-editor-tokenKeyword",
        number: "contract-editor-tokenNumber",
        operator: "contract-editor-tokenOperator",
        prolog: "contract-editor-tokenProlog",
        property: "contract-editor-tokenProperty",
        punctuation: "contract-editor-tokenPunctuation",
        regex: "contract-editor-tokenRegex",
        selector: "contract-editor-tokenSelector",
        string: "contract-editor-tokenString",
        symbol: "contract-editor-tokenSymbol",
        tag: "contract-editor-tokenTag",
        url: "contract-editor-tokenUrl",
        variable: "contract-editor-tokenVariable",
      },
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
    editorState: value ? undefined : null,
    onError: (error: Error) => {
      console.error("Lexical error:", error)
    },
  }

  const handleChange = (editorState: EditorState) => {
    isEditingRef.current = true
    editorState.read(() => {
      try {
        const markdownString = $convertToMarkdownString(TRANSFORMERS)
        setEditedContent(markdownString)
        onChange(markdownString)
      } catch (error) {
        console.error("Error converting to markdown:", error)
        // Fallback to text content
        const root = $getRoot()
        const textContent = root.getTextContent()
        setEditedContent(textContent)
        onChange(textContent)
      }
    })
    // Reset editing flag after a short delay
    setTimeout(() => {
      isEditingRef.current = false
    }, 100)
  }

  // Enhanced markdown to HTML parser with table support
  const parseMarkdownToHTML = (markdown: string) => {
    if (!markdown) return ""

    let html = markdown
      // Headers
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
      .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
      .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Underline
      .replace(/__(.*?)__/g, '<u>$1</u>')
      // Tables - Enhanced table parsing
      .replace(/\|(.+)\|\n\|[-\s|:]+\|\n((?:\|.+\|\n?)*)/g, (match, header, rows) => {
        const headerCells = header.split('|').map(cell => cell.trim()).filter(cell => cell)
        const rowLines = rows.trim().split('\n').filter(line => line.trim())
        
        let tableHTML = '<table class="contract-editor-table"><thead><tr>'
        headerCells.forEach(cell => {
          tableHTML += `<th class="contract-editor-tableCellHeader">${cell}</th>`
        })
        tableHTML += '</tr></thead><tbody>'
        
        rowLines.forEach(row => {
          const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell)
          if (cells.length > 0) {
            tableHTML += '<tr>'
            cells.forEach(cell => {
              tableHTML += `<td class="contract-editor-tableCell">${cell}</td>`
            })
            tableHTML += '</tr>'
          }
        })
        
        tableHTML += '</tbody></table>'
        return tableHTML
      })
      // Lists
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      // Horizontal rules
      .replace(/^---$/gim, '<hr>')
      .replace(/^\*\*\*$/gim, '<hr>')
      // Line breaks
      .replace(/\n/g, '<br>')
      .trim()

    return html
  }

  // Plugin to load initial content without cursor jumping
  const LoadContentPlugin = () => {
    const [editor] = useLexicalComposerContext()
    
    useEffect(() => {
      if (value && editor && !isEditingRef.current) {
        // Load content whenever value changes
        editor.update(() => {
          // Use direct markdown conversion for better performance
          try {
            $convertFromMarkdownString(value, TRANSFORMERS)
          } catch (error) {
            console.error("Error converting markdown:", error)
            // Fallback to simple text insertion
            const root = $getRoot()
            root.clear()
            const paragraph = root.createParagraph()
            paragraph.append(root.createTextNode(value))
            root.append(paragraph)
          }
        })
        setHasLoadedContent(true)
      }
    }, [editor, value])
    
    return null
  }

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className={`border border-gray-200 rounded-lg overflow-hidden shadow-sm ${className}`}>
        <div className="h-96 bg-gray-50 animate-pulse rounded-lg flex items-center justify-center">
          Loading editor...
        </div>
      </div>
    )
  }

  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden shadow-sm ${className}`}>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="contract-editor-container">
          <ToolbarPlugin />
          <div className="contract-editor-wrapper">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="contract-editor-content"
                />
              }
              placeholder={
                <div className="contract-editor-placeholder">
                  {placeholder}
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <TablePlugin />
            <OnChangePlugin onChange={handleChange} />
            <LoadContentPlugin />
            <HistoryPlugin />
            <AutoFocusPlugin />
          </div>
        </div>
      </LexicalComposer>
    </div>
  )
}