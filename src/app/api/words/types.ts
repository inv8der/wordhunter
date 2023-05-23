import type { Document, WithId } from 'mongodb'

export interface WordList extends WithId<Document> {
  list: string[]
}
