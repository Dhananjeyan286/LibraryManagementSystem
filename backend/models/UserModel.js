import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false//putting it to false so when querying from db password does'nt come automatically you need to externally mention it to get the password
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        ageCategory: {
            type:String,
            enum:["kids","teen","middle aged","old aged"]//0-12 kids, 13-22 teen, 23-45 middle aged, above 45 old aged
        },
        isVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
