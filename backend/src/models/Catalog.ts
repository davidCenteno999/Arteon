import mongoose from "mongoose";



const catalogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  artDesigns: [{ type: mongoose.Schema.Types.ObjectId, ref: "ArtDesign" }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  awards: [{ type: String }],
  socialMedia: {
    website: { type: String },
    socialMediaLinks: [{ name: String, url: String }]
  },
  likes: { type: Number, default: 0 },
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Catalog = mongoose.model("catalogs", catalogSchema);