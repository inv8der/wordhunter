#!/usr/bin/env node --loader ts-node/esm

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MongoClient, ServerApiVersion } from 'mongodb'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const client = new MongoClient(process.env.MONGODB_URI || '', {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  // Read word list from file
  const filename = path.join(__dirname, './words.txt')
  const contents = await fs.readFile(filename, 'utf-8')
  const words = contents.split('\n')

  // Connect to MongoDB and populate wordlist.current with records
  await client.connect()

  console.log('Creating wordlist db and populating collection...')

  const collection = client.db('words').collection('current')
  await collection.drop()
  await collection.insertOne({ list: words })

  console.log(`Success!`)

  await client.close()
}

try {
  await run()
} catch (e) {
  process.exitCode = 1
  console.error(e)
} finally {
  process.exit()
}
