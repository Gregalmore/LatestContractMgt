# Grubman Contract Assistant

AI-powered legal contract review and drafting platform for Grubman Shire Meiselas & Sacks, P.C.

## What This Project Does

This application provides two main features for legal contract management:

### 1. Contract Drafting
- **Multi-step form** to configure contract parameters (client, industry, contract type, etc.)
- **AI-powered generation** using n8n workflows and OpenAI
- **Template matching** from firm's historical contracts
- **Monaco Editor** for contract editing and customization
- **Export functionality** (copy to clipboard, download as file)

### 2. Contract Review & Analysis
- **File upload** for existing contracts (PDF, DOCX, TXT)
- **AI-powered risk analysis** using n8n workflows
- **Due diligence checklist** with automated scoring
- **Risk pattern matching** against known legal issues
- **Comprehensive reporting** with recommendations

## Technology Stack

- **Frontend**: Next.js 15 with React 19
- **Database**: Supabase PostgreSQL
- **AI Processing**: n8n workflows with OpenAI GPT-4
- **File Processing**: Server-side PDF/DOCX text extraction
- **UI Components**: Radix UI with Tailwind CSS

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create `.env.local` with your Supabase and n8n credentials

3. **Run the application**:
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000)

## Key Features

- **Contract Generation**: AI-powered contract drafting with firm-specific templates
- **Risk Analysis**: Automated contract review with legal risk detection
- **File Processing**: Support for PDF, DOCX, and TXT file uploads
- **Real-time AI**: Integration with n8n workflows for AI processing
- **Professional UI**: Clean, modern interface for legal professionals

## Project Structure

```
├── app/                    # Next.js App Router
├── components/             # React components
│   ├── draft/             # Contract drafting components
│   ├── review/            # Contract review components
│   └── tabs/              # Main tab components
├── lib/                   # Utility functions and API clients
├── types/                 # TypeScript type definitions
└── database/              # Database schema
```

## Integration

The application integrates with:
- **n8n workflows** for AI processing
- **OpenAI GPT-4** for contract analysis
- **Google Sheets** for risk patterns and market standards
- **Supabase** for data storage and file management

---

**Built for Grubman Shire Meiselas & Sacks, P.C.**
