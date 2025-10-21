#!/usr/bin/env node

/**
 * Database Setup Script for Grubman Contract Assistant
 * 
 * This script helps set up the Supabase database with the required schema and sample data.
 * 
 * Usage:
 * 1. Set up your Supabase project at https://supabase.com
 * 2. Copy your project URL and anon key to .env.local
 * 3. Run: node scripts/setup-database.js
 */

const fs = require('fs')
const path = require('path')

console.log('🚀 Grubman Contract Assistant - Database Setup')
console.log('===============================================\n')

console.log('📋 Setup Instructions:')
console.log('1. Create a new Supabase project at https://supabase.com')
console.log('2. Copy your project URL and anon key to .env.local file')
console.log('3. Run the SQL schema from database/schema.sql in your Supabase SQL Editor')
console.log('4. Configure your environment variables\n')

console.log('📁 Files created:')
console.log('✅ database/schema.sql - Complete database schema with sample data')
console.log('✅ lib/supabase/client.ts - Supabase client configuration')
console.log('✅ lib/supabase/server.ts - Server-side Supabase client')
console.log('✅ types/database.ts - TypeScript types for database')
console.log('✅ types/contract.ts - Contract-related types')
console.log('✅ types/review.ts - Review-related types\n')

console.log('🔧 Environment Variables needed in .env.local:')
console.log('NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co')
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key')
console.log('SUPABASE_SERVICE_ROLE_KEY=your-service-role-key')
console.log('N8N_WEBHOOK_URL=https://your-n8n-instance.app')
console.log('N8N_DRAFT_WEBHOOK=/webhook/draft-contract')
console.log('N8N_REVIEW_WEBHOOK=/webhook/review-contract')
console.log('OPENAI_API_KEY=sk-your-key-here\n')

console.log('📊 Database Tables:')
console.log('• templates - Contract templates')
console.log('• firm_history - Historical contracts for matching')
console.log('• clients - Client information')
console.log('• contracts - Generated contracts')
console.log('• reviews - Contract analysis results')
console.log('• due_diligence_checklist - Review checklist items')
console.log('• risk_patterns - Risk detection patterns\n')

console.log('🎯 Next Steps:')
console.log('1. Set up Supabase project and run schema.sql')
console.log('2. Configure environment variables')
console.log('3. Set up n8n workflows (optional for Phase 1)')
console.log('4. Run: npm install')
console.log('5. Run: npm run dev')
console.log('6. Test the application!\n')

console.log('✨ Ready to build the future of legal contract management!')
