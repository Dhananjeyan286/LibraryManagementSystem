import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true,
    },
    emailOTP: { type: Number, required: true },
    phoneOTP: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
});

const TokenModel = mongoose.model("token", tokenSchema);

export default TokenModel