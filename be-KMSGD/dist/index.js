"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connection_1 = require("./database/connection");
const route_1 = __importDefault(require("./routes/route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use((0, cors_1.default)({
    origin: (process.env.CORS_ORIGIN ?? "http://localhost:5173").split(",").map((origin) => origin.trim()),
    credentials: true,
}));
app.use((_, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
});
app.use(express_1.default.json({ limit: "1mb" }));
const PORT = process.env.PORT ?? 3000;
const HOST = process.env.HOST;
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Server Running ");
});
app.use("/api", route_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${HOST}:${PORT}`);
    (0, connection_1.connection)();
});
