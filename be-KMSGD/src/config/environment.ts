import dotenv from "dotenv";

dotenv.config();

// Database
export const DATABASE_URL: string = process.env.DATABASE_URL || "";

// Supabase
export const SUPABASE_URL: string = process.env.SUPABASE_URL || "";
export const SUPABASE_KEY: string = process.env.SUPABASE_KEY || "";

// JWT
export const JWT_SECRET: string = process.env.JWT_SECRET || "";
export const REFRESH_SECRET: string = process.env.REFRESH_SECRET || "";

// Cloudinary
export const CLOUDINARY_CLOUD_NAME: string = process.env.CLOUDINARY_CLOUD_NAME || "";
export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || "";
export const CLOUDINARY_API_SECRET: string = process.env.CLOUDINARY_API_SECRET || "";

// App
export const PORT: number = Number(process.env.PORT) || 3000;
export const HOST: string = process.env.HOST || "localhost";
export const NODE_ENV: string = process.env.NODE_ENV || "development";
export const CORS_ORIGIN: string = process.env.CORS_ORIGIN || "http://localhost:5173";
