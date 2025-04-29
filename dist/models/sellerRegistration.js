"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sellerRegistrationSchema = new mongoose_1.default.Schema({
    sellerName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    dob: {
        type: Date,
    },
    citizenshipNumber: {
        type: String,
        unique: true
    },
    fathersName: {
        type: String,
    },
    mothersName: {
        type: String,
    },
    religion: {
        type: String,
    },
    language: {
        type: String,
    },
    // Business Information
    shopName: {
        type: String,
    },
    businessType: {
        type: String,
    },
    occupation: {
        type: String,
    },
    panNumber: {
        type: String,
    },
    gstNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    // Financial Information
    bankAccountNumber: {
        type: String,
    },
    ifscCode: {
        type: String,
    },
    accountHolderName: {
        type: String,
    },
    bankName: {
        type: String,
    },
    monthlyIncome: {
        type: Number,
    },
    annualIncome: {
        type: Number,
    },
    // Documents
    signature: {
        data: Buffer,
        contentType: String
    },
    idProof: {
        data: Buffer,
        contentType: String
    },
    addressProof: {
        data: Buffer,
        contentType: String
    }
});
const seller = mongoose_1.default.model("seller", sellerRegistrationSchema);
exports.default = seller;
