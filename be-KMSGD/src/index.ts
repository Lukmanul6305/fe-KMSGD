import express from 'express'
import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const prisma = new PrismaClient()
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

app.use(express.json())

// Contoh route — ambil semua user via Prisma
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

// Contoh route — buat user baru
app.post('/users', async (req, res) => {
  const { email, name } = req.body
  const user = await prisma.user.create({
    data: { email, name }
  })
  res.status(201).json(user)
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})