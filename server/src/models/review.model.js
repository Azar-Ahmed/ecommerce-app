import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
    productId: { type: String },
    userId: { type: String, },
    userName: { type: String },
    reviewMessage: { type: String },
    reviewValue: { type: Number }
}, { timestamps: true })


const Review = mongoose.model('Review', ReviewSchema);
export default Review;