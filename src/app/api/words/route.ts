import { NextResponse, type NextRequest } from 'next/server'
import client from '@/lib/mongodb'
import type { WordList } from './types'

export async function GET(request: NextRequest) {
  let result: string[] = []
  const words = client.db('words')

  const current = await words.collection('current').findOne<WordList>()
  result = current?.list ? result.concat(current.list) : result

  const { searchParams } = request.nextUrl
  if (searchParams.get('includeArchived') === 'true') {
    const archived = await words.collection('archived').findOne<WordList>()
    result = archived?.list ? result.concat(archived?.list) : result
  }

  return NextResponse.json(Array.from(new Set(result)))
}
