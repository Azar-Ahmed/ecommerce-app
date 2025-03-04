
import express from 'express'
import { getAllOrders, getOrderDetails } from '../../controllers/admin/order.controller.js';


const router = express.Router();


router.get('/get-all', getAllOrders)
router.get('/details/:id', getOrderDetails)



export default router   