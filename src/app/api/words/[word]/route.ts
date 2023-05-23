import { NextResponse, type NextRequest } from 'next/server'
import client from '@/lib/mongodb'
import type { WordList } from '../types'

type RouteParams = {
  params: { word: string }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const wordToDelete = params.word
  const words = client.db('words')

  const current = await words.collection('current').findOne<WordList>()
  const archived = await words.collection('archived').findOne<WordList>()
  const currentWords = new Set(current?.list ?? [])
  const archivedWords = new Set(archived?.list ?? [])

  currentWords.delete(wordToDelete)
  archivedWords.add(wordToDelete)

  const session = client.startSession()

  try {
    session.startTransaction()
    await words
      .collection('current')
      .updateOne(
        { _id: current?._id },
        { $set: { list: Array.from(currentWords) } },
        { session }
      )
    await words
      .collection('archived')
      .updateOne(
        { _id: archived?._id },
        { $set: { list: Array.from(archivedWords) } },
        { session }
      )
    await session.commitTransaction()
  } catch (e) {
    console.error(
      'An error occured in the transaction, performing a data rollback...\n',
      e
    )
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }

  return
}
