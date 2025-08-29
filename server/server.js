import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pkg from 'pg'

const { Pool } = pkg

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Postgres pool
const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('Missing DATABASE_URL in .env')
}
const pool = new Pool({ connectionString: DATABASE_URL, ssl: DATABASE_URL?.includes('supabase.co') ? { rejectUnauthorized: false } : false })

// Ensure table exists (safe to run on startup)
async function ensureSchema() {
  const createSql = `
    create table if not exists contacts (
      id uuid primary key default gen_random_uuid(),
      firstName text not null,
      lastName text not null,
      email text not null,
      phone text,
      serviceType text not null,
      message text,
      termsAccepted boolean not null,
      createdAt timestamp with time zone default now()
    );
  `
  try {
    await pool.query(createSql)
  } catch (err) {
    // If gen_random_uuid isn't available, fallback to uuid-ossp
    try {
      await pool.query('create extension if not exists "uuid-ossp";')
      await pool.query(createSql.replace('gen_random_uuid()', 'uuid_generate_v4()'))
    } catch (e) {
      console.error('Failed ensuring schema:', e)
    }
  }
}
ensureSchema()

// Routes
app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('select 1')
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ ok: false })
  }
})

app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, serviceType, message, termsAccepted } = req.body
    if (!firstName || !lastName || !email || !serviceType || termsAccepted !== true) {
      return res.status(400).json({ success: false, message: 'Invalid input.' })
    }

    const { rows } = await pool.query(
      `insert into contacts (firstName, lastName, email, phone, serviceType, message, termsAccepted)
       values ($1,$2,$3,$4,$5,$6,$7)
       returning id`,
      [firstName, lastName, email, phone, serviceType, message, termsAccepted]
    )

    return res.json({ success: true, message: "Your request has been received. We’ll contact you within 24 hours.", id: rows?.[0]?.id })
  } catch (err) {
    console.error('POST /api/contact error', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))


