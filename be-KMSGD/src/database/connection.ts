import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export const connection = async () => {
  try {
    // Menjalankan kueri mentah paling ringan untuk tes koneksi
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
