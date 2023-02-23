import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/UserModel.js";
import TokenModel from "../models/TokenModel.js";
import SendEmail from "../utils/SendEmail.js";
import SendSms from "../utils/SendSms.js";
import PaymentModel from "../models/PaymentModel.js";

const authUser = asyncHandler(async (req, res) => {
    const { email, phone, password } = req.body;

    let user = null;

    if( !phone ) {
        user = await User.findOne({ email });
    } else {
        user = await User.findOne({ phone });
    }

    if (user && (await user.matchPassword(password)) && user.isVerified && user.isUserCredentialsVerified) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            department: user.department,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password or the account is not verified or the email and phone number are not verified");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone, department } = req.body;

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
        department
    });

    const token = await new TokenModel({
        userId: user._id,
        emailOTP: Math.floor(Math.random() * 1000000),
        phoneOTP: Math.floor(Math.random() * 1000000)
    }).save();

    await SendEmail(user.email, "Verify your mail-id", `The verification code is ${token.emailOTP}`);
    SendSms(user.phone, `The verification code is ${token.phoneOTP}`);

    res.status(201).send({
        message: "Verification code sent, please enter the OTP recieved to your phone number and email-id.",
    });
    // console.log("email sent from usercontroller.js")
})

export const verifyCredentials = asyncHandler(async (req, res) => {

    let {email, phone, emailOTP, phoneOTP} = req.body
    let user = await User.findOne({email: email, phone: phone})
    phoneOTP = Number(phoneOTP)
    emailOTP = Number(emailOTP)

    if (user) {

        let token = await TokenModel.findOne({userId: user._id})

        if(token) {
            if(token.phoneOTP === phoneOTP && token.phoneOTP === phoneOTP) {
                user.isUserCredentialsVerified = true
                let updatedUser = await user.save()
                res.status(201).json({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    phone: updatedUser.phone,
                    department: updatedUser.department,
                    isAdmin: updatedUser.isAdmin,
                    isVerified: updatedUser.isVerified,
                    isUserCredentialsVerified: updatedUser.isUserCredentialsVerified,
                    token: generateToken(updatedUser._id),
                });
            } else {
                res.status(400).json({
                    message: "OTP does not match"
                })
            }
        } else {
            res.status(404)
            throw new Error("Please click resend OTP option")
        }

    } else {
        res.status(404);
        throw new Error("Invalid user data");
    }
});

export const resendOTP = asyncHandler(async (req, res) => {
    const { email, phone } = req.body;
    let user = await User.findOne({email: email, phone: phone})
    if(user) {
        let oldToken = await TokenModel.findOne({userID: user._id})
        if(oldToken) {
            await oldToken.delete()
        }
        const token = await new TokenModel({
            userId: user._id,
            emailOTP: Math.floor(Math.random() * 1000000),
            phoneOTP: Math.floor(Math.random() * 1000000)
        }).save();

        await SendEmail(user.email, "Verify your mail-id", `The verification code is ${token.emailOTP}`);
        SendSms(user.phone, `The verification code is ${token.phoneOTP}`);

        res.status(201).send({
            message: "Verification code sent, please enter the OTP recieved to your phone number and email-id.",
        });
    } else {
        res.status(404)
        throw new Error("Invalid user data")
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
            department: user.department,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            fineAmount: user.fineAmount
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
        user.department = req.body.department || user.department;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            department: updatedUser.department,
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
        user.department = req.body.department || user.department;
        user.isAdmin = req.body.isAdmin
        user.isVerified = req.body.isVerified
        user.rfid = req.body.rfid 
        
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            department: updatedUser.department,
            isAdmin: updatedUser.isAdmin,
            isVerified: updatedUser.isVerified,
            rfid: updatedUser.rfid,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const savePaymentDetails = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const paymentData = req.body.paymentData
    const user = await User.findById(userId)

    const { paymentMethodData } = paymentData
    const { info: { cardNetwork: paymentNetwork, cardDetails: paymentDetails }, type: paymentType } = paymentMethodData

    await new PaymentModel({
        userId: userId,
        amount: user.fineAmount,
        paymentType: paymentType,
        paymentNetwork: paymentNetwork,
        paymentDetails: paymentDetails
    }).save()

    user.fineAmount = 0
    await user.save()
    res.status(200).json({
        message: "Payment has been done successfully"
    })
});

export { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser, savePaymentDetails };