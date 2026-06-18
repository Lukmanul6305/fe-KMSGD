"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.logout = exports.refresh = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../config/prisma");
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const isProduction = process.env.NODE_ENV === "production";
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await prisma_1.prisma.admin.findUnique({ where: { username } });
        if (!admin) {
            return res.status(401).json({ message: "Username atau password salah" });
        }
        const isValid = await bcrypt_1.default.compare(password, admin.password);
        if (!isValid) {
            return res.status(401).json({ message: "Username atau password salah" });
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: "1d" });
        const refreshToken = jsonwebtoken_1.default.sign({ id: admin.id, username: admin.username }, REFRESH_SECRET, { expiresIn: "7d" });
        await prisma_1.prisma.refreshToken.create({
            data: {
                token: refreshToken,
                adminId: admin.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
        // Set httpOnly cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 hari
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
        });
        return res.status(200).json({
            message: "Login berhasil",
            admin: { id: admin.id, username: admin.username },
        });
    }
    catch {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.login = login;
const refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken; // dari cookie
    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token tidak ditemukan" });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(refreshToken, REFRESH_SECRET);
        const stored = await prisma_1.prisma.refreshToken.findUnique({
            where: { token: refreshToken },
        });
        if (!stored) {
            return res.status(401).json({ message: "Refresh token tidak valid" });
        }
        if (stored.expiresAt < new Date()) {
            await prisma_1.prisma.refreshToken.delete({ where: { token: refreshToken } });
            return res.status(401).json({ message: "Refresh token expired" });
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: payload.id, username: payload.username }, JWT_SECRET, { expiresIn: "1d" });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({ message: "Token diperbarui" });
    }
    catch {
        return res.status(401).json({ message: "Refresh token tidak valid" });
    }
};
exports.refresh = refresh;
const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        if (refreshToken) {
            await prisma_1.prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
        }
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        });
        return res.status(200).json({ message: "Logout berhasil" });
    }
    catch {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.logout = logout;
const getMe = async (req, res) => {
    return res.status(200).json({ admin: req.admin });
};
exports.getMe = getMe;
