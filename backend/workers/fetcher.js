import dotenv from "dotenv";
import mongoose from "mongoose";
import Article from "../model/Article.js";
import Parser from "rss-parser";

dotenv.config();
const parser = new Parser();

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ Worker connected to MongoDB");

  // Örnek RSS feed
  const feed = await parser.parseURL("https://www.hurriyet.com.tr/rss/anasayfa");
  for (let item of feed.items) {
    try {
        const summary = item.contentSnippet || item.content || item.title;
        if (!summary) {
        console.warn("⏭️ Skipped article with no summary:", item.link);
        continue;
        }
        
        // Image URL extraction from various RSS fields
        let imageUrl = null;
        if (item.enclosure && item.enclosure.url) {
          imageUrl = item.enclosure.url;
        } else if (item['media:content'] && item['media:content']['$'] && item['media:content']['$'].url) {
          imageUrl = item['media:content']['$'].url;
        } else if (item['media:thumbnail'] && item['media:thumbnail']['$'] && item['media:thumbnail']['$'].url) {
          imageUrl = item['media:thumbnail']['$'].url;
        } else if (item.content) {
          // Extract image from content using regex
          const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch) {
            imageUrl = imgMatch[1];
          }
        }
        
        const article = new Article({
        title: item.title,
        summary,
        source: feed.title,
        url: item.link,
        image: imageUrl,
        tags: ["unprocessed"],
        });
        await article.save();
        console.log("📌 Saved:", article.title, imageUrl ? "✅ with image" : "❌ no image");
    } catch (err) {
        console.error("❌ Error saving article:", err.message);
    }
}

  process.exit(0); // İş bittiğinde servis kapansın
}

main().catch(err => console.error(err));
