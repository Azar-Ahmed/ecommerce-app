import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'


export const register = async (req, res) => {
    const {userName, email, password} = req.body
    try {
        const hashedPwd = await bcrypt.hash(password, 12);
        const newUser = new User ({userName, email, password: hashedPwd})
        await newUser.save();
        res.status(201).json({success: true, message: "User Registered Successfully!"}) 
    } catch (error) {
        console.log(error)  
        res.status(500).json({success: false, message: "Internal Server Error"}) 
    }
}

