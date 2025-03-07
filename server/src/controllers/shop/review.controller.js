import Review from "../../models/review.model.js";
import Order from "../../models/order.model.js";
import Product from "../../models/product.model.js";


export const addProductReview = async (req, res) =>{
    try {
        const { productId, userId, userName, reviewMessage, reviewValue } =  req.body;
        const order = await Order.findOne({ userId, "cartItems.productId": productId, });

        if (!order) {
            return res.status(403).json({
              success: false,
              message: "You need to purchase product to review it.",
            });
        }

        const checkExistingReview = await Review.findOne({
            productId,
            userId,
          });

          if (checkExistingReview) {
            return res.status(400).json({
              success: false,
              message: "You already reviewed this product!",
            });
          }

          const newReview = new Review({
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue,
          });
          
         await newReview.save();

         const reviews = await Review.find({ productId });
         const totalReviewsLength = reviews.length
         const averageReviews = reviews.reduce((sum, reviewItem) => sum + reviewItem.reviews, 0) / totalReviewsLength;

         await Product.findByIdAndUpdate(productId, {averageReviews})
        res.status(201).json({success: true, data: newReview})
    } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Server error", error: error.message });
      }
} 

export const getProductReview = async (req, res) =>{
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ productId });
        res.status(200).json({
          success: true,
          data: reviews,
        });

        res.status(200).json({ success: true, data: reviews });
        
    } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Server error", error: error.message });
      }
} 