import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  source: { type: String, required: true },
  url: { type: String },
  image: { type: String },              // Article image URL
  tags: [String],
  bias: { type: Number, default: 0 },   // -1 to 1 arası bias score
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Article", articleSchema);
