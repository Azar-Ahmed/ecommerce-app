import Product from '../../models/product.model.js'
import { imageUpload } from "../../helpers/cloudinary.js"

export const handleImageUpload = async (req, res) => {
    try {
        const base64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" + req.file.mimetype + ";base64," + base64
        const result = await imageUpload(url)
        res.json({success: true, result})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const addProduct = async (req, res) => {
    try {
        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body

        const newProduct = new Product({image, title, description, category, brand, price, salePrice, totalStock})
        await newProduct.save();
        res.status(201).json({
            success: true, message: "Product created successfully", data: newProduct
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}


export const editProduct = async (req, res) => {
    try {
        const { id } = req.params; 
        const updateData = req.body;

        
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
    
        Object.assign(product, updateData);
        await product.save(); // Saves and triggers schema validations
        res.status(200).json({ success: true, message: 'Product updated successfully', data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully'});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}