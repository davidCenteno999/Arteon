import mongoose from "mongoose";

/*
art-design:
-name

-imagen

-descripcion

-categorias

-author

-reviews*/ 

const  artDesignSchema = new mongoose.Schema({
  name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{ type: String, required: true }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
});

export const ArtDesign = mongoose.model("ArtDesign", artDesignSchema);
