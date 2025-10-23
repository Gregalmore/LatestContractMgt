"use client"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical"
import { $setBlocksType } from "@lexical/selection"
import { $createHeadingNode, HeadingNode } from "@lexical/rich-text"
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list"
import { $createQuoteNode, QuoteNode } from "@lexical/rich-text"
import { INSERT_TABLE_COMMAND } from "@lexical/table"
import { useState } from "react"

const LowPriority = 1

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)

  const formatText = (format: string) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
  }

  const formatHeading = (headingSize: string) => {
    if (headingSize === "paragraph") {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode("h1"))
        }
      })
    } else {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize))
        }
      })
    }
  }

  const formatBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
  }

  const formatNumberedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
  }

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode())
      }
    })
  }

  const insertTable = () => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns: "3",
      rows: "3",
      includeHeaders: true,
    })
  }

  const insertHorizontalRule = () => {
    // Horizontal rule functionality to be implemented
    console.log("Horizontal rule not yet implemented")
  }

  return (
    <div className="contract-editor-toolbar">
      <div className="toolbar-group">
        <button
          type="button"
          className={`toolbar-button ${isBold ? "active" : ""}`}
          onClick={() => formatText("bold")}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          className={`toolbar-button ${isItalic ? "active" : ""}`}
          onClick={() => formatText("italic")}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          className={`toolbar-button ${isUnderline ? "active" : ""}`}
          onClick={() => formatText("underline")}
          title="Underline"
        >
          <u>U</u>
        </button>
        <button
          type="button"
          className={`toolbar-button ${isStrikethrough ? "active" : ""}`}
          onClick={() => formatText("strikethrough")}
          title="Strikethrough"
        >
          <s>S</s>
        </button>
      </div>

      <div className="toolbar-group">
        <select
          className="toolbar-select"
          onChange={(e) => formatHeading(e.target.value)}
          defaultValue="paragraph"
        >
          <option value="paragraph">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
        </select>
      </div>

      <div className="toolbar-group">
        <button
          type="button"
          className="toolbar-button"
          onClick={formatBulletList}
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          className="toolbar-button"
          onClick={formatNumberedList}
          title="Numbered List"
        >
          1. List
        </button>
        <button
          type="button"
          className="toolbar-button"
          onClick={formatQuote}
          title="Quote"
        >
          " Quote
        </button>
        <button
          type="button"
          className="toolbar-button"
          onClick={insertTable}
          title="Insert Table"
        >
          ⊞ Table
        </button>
        <button
          type="button"
          className="toolbar-button"
          onClick={insertHorizontalRule}
          title="Horizontal Rule"
        >
          — Rule
        </button>
      </div>
    </div>
  )
}
