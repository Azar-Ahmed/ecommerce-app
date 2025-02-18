import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    image: { type: String,required: true },
    title: { type: String, required: true, unique : true },
    description: { type: String, required: true},
    category: { type: String},
    brand: { type: String},
    price: { type: String},
    salePrice: { type: String},
    totalStock: { type: String},
    category: { type: String},

}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema);
export default Product;