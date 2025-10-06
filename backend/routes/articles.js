import express from "express";
import Article from "../model/Article.js";

const router = express.Router();

// Yeni haber ekle
router.post("/", async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Haberleri listele
router.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 }).limit(20);
  res.json(articles);
});

// Tek haber
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: "Not found" });
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
