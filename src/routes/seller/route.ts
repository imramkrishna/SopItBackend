import express, { Request, Response } from "express";
import connectDB from "../../connectDB";
import seller from "../../models/sellerRegistration";
import product from "../../models/products"
import multer from "multer"
const router = express.Router();

connectDB();
router.post("/login", async (req, res) => {
    const { email, phone } = req.body;
    console.log(email, phone)
    try {
        const user = await seller.findOne({
            email,
            phone
        })
        console.log(user);
        if (user) {
            console.log("User found: ", user.sellerName);
            res.status(202).json({
                user
            });

        } else {
            console.log("User not found")
            res.send("Invalid credentials.")
        }
    } catch (e) {
        res.send("Error while finding seller.")
        console.log("Error while finding user: ", e)

    }

})
router.post("/register", async (req, res) => {
    const {
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
    } = req.body
    try {
        const newSeller = new seller({
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
        })
        await newSeller.save();
        res.send("Seller Registration successful.")
        console.log("New Seller Saved.")
    } catch (e) {
        res.send("Could create your seller account.")
        console.log("Error creating seller", e)

    }


})

router.post("/addProducts", async (req, res) => {
    const { sellerId, productName, productBrand, productDimension, productType, productImages, productWeight, productPrice } = req.body;
    console.log(sellerId, productName, productBrand, productDimension, productType, productImages, productWeight, productPrice);
    try {
        const newProduct = new product({
            sellerId, productName, productBrand, productDimension, productType, productImages, productWeight, productPrice
        })
        await newProduct.save();
        res.status(202).send("New Product Added.")
        console.log("New Product Added.")
    } catch (e) {
        res.send("Couldnot add new product.")
        console.log("There was a issue while adding new Product....\n", e)
    }
})
router.put("/modifyProducts/:id", async (req, res) => {
    try {
        const updateProduct = req.body;
        const { id } = req.params;
        const { sellerId } = req.body;
        const existingProduct = await product.findById(id)
        if (!existingProduct) {
            res.status(404).send("No such product was found.")
        } else if (existingProduct.sellerId.toString() !== sellerId) {
            res.status(202).send("You dont have permission to modify this product.")
        } else if (existingProduct.sellerId.toString() === sellerId) {
            const updatedProduct = await product.findByIdAndUpdate(id, updateProduct, {
                new: true,
                runValidators: true
            })
            res.status(200).send("Updated")
            console.log(updatedProduct)
        } else {
            res.status(402).send("Cant process your request now.")
        }

    } catch (e: any) {
        res.status(400).send("Error while modifying products.")
    }

})
router.get("/productList", async (req, res) => {
    try {
        console.log("request on /productList route.")
        const productlist=await product.find({});
        res.send(productlist)
    }
    catch (e) {
        res.send("Error found while finding productlist")
        console.log("Error found while processing your request")
    }
})
export default router;