import mongoose from "mongoose"

const TheftSchema = new mongoose.Schema({
    theft: { type: Boolean, required: true },

    input: Number,
    output: Number,

    poleId: String,
    poleNumber: Number,

    latitude: Number,
    longitude: Number,
}, {
    timestamps: true
});

export const Theft = mongoose.model("theft", TheftSchema)