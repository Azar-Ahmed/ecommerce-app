import express from 'express'
import { addToCart, fetchCartItems, updateCartItemQty, deleteCartItem } from '../../controllers/shop/cart.controller.js';


const router = express.Router();


router.post('/add', addToCart)
router.get('/fetch/:userId', fetchCartItems)
router.put('/update-cart', updateCartItemQty)
router.delete('/:userId/:productId', deleteCartItem)


export default router