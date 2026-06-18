"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const adapter = new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new client_1.PrismaClient({ adapter });
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const connection = async () => {
    try {
        await prisma.$queryRaw `SELECT 1`;
        console.log("✅ [Prisma]: Sukses terhubung ke database Supabase PostgreSQL!");
    }
    catch (error) {
        console.error("❌ [Prisma]: Gagal konek ke database. Periksa DATABASE_URL kamu!");
        console.error(error);
    }
    try {
        const { data, error } = await supabase.storage.listBuckets();
        if (error)
            throw error;
        console.log("✅ [Supabase]: SDK sukses terhubung!");
    }
    catch (error) {
        console.error("❌ [Supabase]: Gagal konek. Periksa SUPABASE_URL atau SERVICE_KEY!");
        console.error(error);
    }
};
exports.connection = connection;
