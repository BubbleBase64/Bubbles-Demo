import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import articlesRouter from "./routes/articles.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Error:", err));

// Sağlık kontrolü
app.get("/ping", (req, res) => res.json({ message: "Backend alive 🚀" }));

// Haber router
app.use("/articles", articlesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
