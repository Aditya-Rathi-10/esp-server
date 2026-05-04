import mongoose from "mongoose"

const TheftSchema = new mongoose.Schema({
    theft: { type: Boolean, required: true },

    inCurrent: Number,
    outCurrent: Number,
    status: { type: String, default: "PENDING" },

    poleId: { type: String, default: "P-101"},
    poleNumber: { type: Number, default: "101"},

    address: {type: String, default: "IIITDM Jabalpur"},
    area: {type: String, default: "Dumna Airport"},

    latitude: { type: Number, default: 23.18 },
    longitude: { type: Number, default: 79.97 },
}, {
    timestamps: true
});

export const Theft = mongoose.model("theft", TheftSchema)