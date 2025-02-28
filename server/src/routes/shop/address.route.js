import express from 'express'
import { addAddress, fetchAddress, updateAddress, deleteAddress } from '../../controllers/shop/address.controller.js';


const router = express.Router();


router.post('/add', addAddress)
router.get('/fetch/:userId', fetchAddress)
router.put('/update/:userId/:addressId', updateAddress)
router.delete('/delete/:userId/:addressId', deleteAddress)

export default router