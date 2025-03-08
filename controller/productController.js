import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js';

const addProduct = async(req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestSeller,
            date,
        } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((img) => img != undefined)

        let imageUrl = await Promise.all(
            images.map(async(item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                return result.secure_url
            })
        )

        const newProduct = new productModel({
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: 'true' ? true : false,
            date: Date.now(),
            image: imageUrl

        })
        console.log(imageUrl)

        const product = await newProduct.save()

        res.status(200).json({ success: true, msg: 'products added successfully' })
        console.log(name, description, price, category, subCategory, sizes, bestSeller, date)

    } catch (error) {
        console.log(error)
    }
};

const listProducts = async(req, res) => {
    try {
        const products = await productModel.find({})
        res.status(201).json({ products: products })
    } catch (error) {
        console.log(error)
    }
};

const removeProducts = async(req, res) => {
    try {
        const deleteProduct = await productModel.findByIdAndDelete(req.body.id)
        if (deleteProduct) {
            res.json({ msg: 'this product deleted succesfully' })
        }
    } catch (error) {
        console.log(error)
    }
};

const singleProduct = async(req, res) => {
    try {
        const { productId } = req.body
        const singleProduct = await productModel.findById(productId)
        res.json({ msg: 'this product deleted succesfully', product: singleProduct })

    } catch (error) {
        console.log(error)
    }
};




export { addProduct, listProducts, removeProducts, singleProduct }