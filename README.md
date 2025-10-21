# Grubman Contract Assistant

AI-powered legal contract review and drafting platform built with Next.js, Supabase, and n8n.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Supabase account
- n8n instance (optional for Phase 1)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Run the SQL schema from `database/schema.sql` in your Supabase SQL Editor
4. Create a storage bucket called `contract-uploads` for file uploads

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# n8n Webhooks (optional for Phase 1)
N8N_WEBHOOK_URL=https://your-n8n-instance.app
N8N_DRAFT_WEBHOOK=/webhook/draft-contract
N8N_REVIEW_WEBHOOK=/webhook/review-contract

# OpenAI (for n8n)
OPENAI_API_KEY=sk-your-key-here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Architecture

### Phase 1: MVP (Current)
- **Frontend**: Next.js 15 with React 19
- **Database**: Supabase PostgreSQL
- **AI Processing**: Mock responses (ready for n8n integration)
- **File Handling**: Client-side file processing

### Phase 2: Production
- **Workflow Engine**: n8n for AI orchestration
- **AI Integration**: OpenAI GPT-4 for contract generation and analysis
- **File Processing**: Server-side PDF/DOCX text extraction
- **Real-time Updates**: Supabase subscriptions

## 📊 Database Schema

The application uses 7 main tables:

- `templates` - Contract templates with variables
- `firm_history` - Historical contracts for AI matching
- `clients` - Client information and preferences
- `contracts` - Generated contract drafts
- `reviews` - Contract analysis results
- `due_diligence_checklist` - Review checklist categories
- `risk_patterns` - Risk detection patterns

## 🔧 API Endpoints

### Contract Drafting
- `POST /api/draft-contract` - Generate contract draft
- `GET /api/contracts/[id]` - Get contract by ID

### Contract Review
- `POST /api/review-contract` - Analyze uploaded contract
- `GET /api/clients` - Get all clients

## 🎯 Features

### Draft Contract Tab
- Multi-step form for contract configuration
- AI-powered contract generation
- Template matching from firm history
- Monaco Editor for contract editing
- Export functionality (copy, download)

### Review Contract Tab
- File upload (PDF, DOCX, TXT)
- AI-powered risk analysis
- Due diligence checklist
- Risk pattern matching
- Comprehensive reporting

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure your hosting provider

## 🔮 Phase 2 Roadmap

- [ ] n8n workflow integration
- [ ] Real AI processing with OpenAI
- [ ] Advanced file processing
- [ ] Real-time collaboration
- [ ] User authentication
- [ ] Advanced analytics
- [ ] Mobile app

## 📝 Development

### Project Structure
```
├── app/                    # Next.js App Router
├── components/             # React components
├── lib/                    # Utility functions
├── types/                  # TypeScript types
├── database/               # Database schema
└── scripts/                # Setup scripts
```

### Key Dependencies
- `@supabase/supabase-js` - Database client
- `@monaco-editor/react` - Code editor
- `react-dropzone` - File uploads
- `axios` - HTTP client
- `zod` - Schema validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software for Grubman Shire Meiselas & Sacks, P.C.

## 🆘 Support

For technical support or questions, please contact the development team.

---

**Built with ❤️ for the future of legal contract management**
