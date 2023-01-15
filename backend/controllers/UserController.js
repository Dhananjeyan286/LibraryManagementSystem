import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/UserModel.js";

const authUser = asyncHandler(async (req, res) => {
    const { email, phone, password } = req.body;

    let user = null;

    if( !phone ) {
        user = await User.findOne({ email });
    } else {
        user = await User.findOne({ phone });
    }

    if (user && (await user.matchPassword(password)) && user.isVerified) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            age: user.age,
            ageCategory: user.ageCategory,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password or the account is not verified");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone, age, ageCategory } = req.body;

    const emailExists = await User.findOne({ email });
    const phoneExists = await User.findOne({ phone });

    if (emailExists) {
        res.status(400);
        throw new Error("Email already exists");
    } else if (phoneExists) {
        res.status(400);
        throw new Error("Phone number already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        phone,
        age,
        ageCategory
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            age: user.age,
            ageCategory: user.ageCategory,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            age: user.age,
            ageCategory: user.ageCategory,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.age = req.body.age || user.age;
        user.ageCategory = req.body.ageCategory || user.ageCategory;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            age: updatedUser.age,
            ageCategory: updatedUser.ageCategory,
            isAdmin: updatedUser.isAdmin,
            isVerified: updatedUser.isVerified,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: "User removed" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.age = req.body.age || user.age;
        user.ageCategory = req.body.ageCategory || user.ageCategory;
        user.isAdmin = req.body.isAdmin
        
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            age: updatedUser.age,
            ageCategory: updatedUser.ageCategory,
            isAdmin: updatedUser.isAdmin,
            isVerified: updatedUser.isVerified,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser };