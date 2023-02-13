import mongoose from "mongoose";
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    amount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    paymentNetwork : {
        type: String,
        required: true
    },
    paymentDetails: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const PaymentModel = mongoose.model("payment", paymentSchema);

export default PaymentModel;
