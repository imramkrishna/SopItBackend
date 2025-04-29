"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    sellerId: {
        type: String,
        required: true
    },
    productImages: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    productBrand: {
        type: String
    },
    productWeight: {
        type: Number
    },
    productDimension: {
        type: String
    }
});
const productModel = mongoose_1.default.model("productModel", productSchema);
exports.default = productModel;
