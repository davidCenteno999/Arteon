import mongoose from "mongoose";



const catalogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  artDesigns: [{ type: mongoose.Schema.Types.ObjectId, ref: "ArtDesign" }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  awards: [{ type: String }],
  socialMedia: {
    website: { type: String },
    socialMediaLinks: [{ type: String }]
  },
  likes: { type: Number, default: 0 },
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Catalog = mongoose.model("catalogs", catalogSchema);