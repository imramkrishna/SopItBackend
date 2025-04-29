"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectDB_1 = __importDefault(require("../../connectDB"));
const sellerRegistration_1 = __importDefault(require("../../models/sellerRegistration"));
const products_1 = __importDefault(require("../../models/products"));
const router = express_1.default.Router();
(0, connectDB_1.default)();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone } = req.body;
    console.log(email, phone);
    try {
        const user = yield sellerRegistration_1.default.findOne({
            email,
            phone
        });
        console.log(user);
        if (user) {
            console.log("User found: ", user.sellerName);
            res.status(202).json({
                user
            });
        }
        else {
            console.log("User not found");
            res.send("Invalid credentials.");
        }
    }
    catch (e) {
        res.send("Error while finding seller.");
        console.log("Error while finding user: ", e);
    }
}));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerName, email, phone, dob, citizenshipNumber, fathersName, mothersName, religion, language, shopName, businessType, occupation, panNumber, gstNumber, address, city, state, pincode, bankAccountNumber, ifscCode, accountHolderName, bankName, monthlyIncome, annualIncome, } = req.body;
    try {
        const newSeller = new sellerRegistration_1.default({
            sellerName,
            email,
            phone,
            dob,
            citizenshipNumber,
            fathersName,
            mothersName,
            religion,
            language,
            shopName,
            businessType,
            occupation,
            panNumber,
            gstNumber,
            address,
            city,
            state,
            pincode,
            bankAccountNumber,
            ifscCode,
            accountHolderName,
            bankName,
            monthlyIncome,
            annualIncome,
        });
        yield newSeller.save();
        res.send("Seller Registration successful.");
        console.log("New Seller Saved.");
    }
    catch (e) {
        res.send("Could create your seller account.");
        console.log("Error creating seller", e);
    }
}));
router.post("/addProducts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerId, productName, productBrand, productDimension, productType, productImages, productWeight, productPrice } = req.body;
    console.log(sellerId, productName, productBrand, productDimension, productType, productImages, productWeight, productPrice);
    try {
        const newProduct = new products_1.default({
            sellerId, productName, productBrand, productDimension, productType, productImages, productWeight, productPrice
        });
        yield newProduct.save();
        res.status(202).send("New Product Added.");
        console.log("New Product Added.");
    }
    catch (e) {
        res.send("Couldnot add new product.");
        console.log("There was a issue while adding new Product....\n", e);
    }
}));
router.put("/modifyProducts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateProduct = req.body;
        const { id } = req.params;
        const { sellerId } = req.body;
        const existingProduct = yield products_1.default.findById(id);
        if (!existingProduct) {
            res.status(404).send("No such product was found.");
        }
        else if (existingProduct.sellerId.toString() !== sellerId) {
            res.status(202).send("You dont have permission to modify this product.");
        }
        else if (existingProduct.sellerId.toString() === sellerId) {
            const updatedProduct = yield products_1.default.findByIdAndUpdate(id, updateProduct, {
                new: true,
                runValidators: true
            });
            res.status(200).send("Updated");
            console.log(updatedProduct);
        }
        else {
            res.status(402).send("Cant process your request now.");
        }
    }
    catch (e) {
        res.status(400).send("Error while modifying products.");
    }
}));
exports.default = router;
