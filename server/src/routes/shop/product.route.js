import express from 'express'
import { getFilterProducts, getProductDetails } from '../../controllers/shop/product.controller.js';



const router = express.Router();


router.get('/fetch', getFilterProducts)
router.get('/fetch/:id', getProductDetails)


export default router