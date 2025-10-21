"use client"

import type React from "react"

import { useCallback } from "react"

interface FileUploadProps {
  onFileUpload: (file: File) => void
  uploadedFile: File | null
}

export default function FileUpload({ onFileUpload, uploadedFile }: FileUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const files = e.dataTransfer.files
      if (files.length > 0) {
        const file = files[0]
        if (
          [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
          ].includes(file.type)
        ) {
          onFileUpload(file)
        }
      }
    },
    [onFileUpload],
  )

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileUpload(files[0])
    }
  }

  return (
    <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-12 text-center">
      {uploadedFile ? (
        <div className="space-y-2">
          <div className="text-2xl">📄</div>
          <div className="font-medium text-foreground">{uploadedFile.name}</div>
          <div className="text-sm text-muted-foreground">{(uploadedFile.size / 1024).toFixed(2)} KB</div>
        </div>
      ) : (
        <>
          <div className="mb-4 text-4xl">📤</div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Drop your contract here or click to upload</h3>
          <p className="mb-4 text-sm text-muted-foreground">Supports PDF and DOCX files</p>
          <label className="inline-block cursor-pointer rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            Choose File
            <input type="file" accept=".pdf,.docx,.txt" onChange={handleClick} className="hidden" />
          </label>
        </>
      )}
      <input
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="hidden"
      />
    </div>
  )
}
