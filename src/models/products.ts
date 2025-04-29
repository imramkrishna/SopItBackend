import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
   
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
})

const productModel = mongoose.model("productModel", productSchema)
export default productModel;