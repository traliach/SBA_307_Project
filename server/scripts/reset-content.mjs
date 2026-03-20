import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(scriptDir, '..', '.env')

dotenv.config({ path: envPath })

const uri = process.env.MONGODB_URI

if (!uri) {
  console.error('MONGODB_URI is not set in server/.env')
  process.exit(1)
}

const COLLECTIONS = ['profiles', 'projects', 'skillgroups']

console.log('Connecting to MongoDB...')
await mongoose.connect(uri)
console.log('Connected.')

for (const name of COLLECTIONS) {
  const exists = await mongoose.connection.db
    .listCollections({ name })
    .hasNext()

  if (exists) {
    await mongoose.connection.db.dropCollection(name)
    console.log(`  Dropped: ${name}`)
  } else {
    console.log(`  Skipped (not found): ${name}`)
  }
}

await mongoose.disconnect()
console.log('\nDone. Restart the server — it will re-seed from the updated data files.')
