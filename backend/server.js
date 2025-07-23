import express from "express";
import authRoutes from "./routes/auth.route.js";
import connectToDB from "./utils/connectToDB.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blog.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Re-create __dirname and __filename in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectToDB();
});
