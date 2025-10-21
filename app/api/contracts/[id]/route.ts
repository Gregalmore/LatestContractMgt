import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    if (!id) {
      return NextResponse.json(
        { error: 'Contract ID is required' },
        { status: 400 }
      )
    }
    
    const { data: contract, error } = await supabaseAdmin
      .from('contracts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching contract:', error)
      return NextResponse.json(
        { error: 'Contract not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ contract })
    
  } catch (error: any) {
    console.error('Get contract error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch contract' },
      { status: 500 }
    )
  }
}
