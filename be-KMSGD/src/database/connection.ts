import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export const connection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ [Prisma]: Sukses terhubung ke database Supabase PostgreSQL!");
  } catch (error) {
    console.error("❌ [Prisma]: Gagal konek ke database. Periksa DATABASE_URL kamu!");
    console.error(error);
  }

  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) throw error;
    console.log("✅ [Supabase]: SDK sukses terhubung!");
  } catch (error) {
    console.error("❌ [Supabase]: Gagal konek. Periksa SUPABASE_URL atau SERVICE_KEY!");
    console.error(error);
  }
};
