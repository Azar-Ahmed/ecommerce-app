import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'


export const register = async (req, res) => {
    const {userName, email, password} = req.body
    try {
        const checkUser = await User.findOne({email});
        if(checkUser) return res.json({success: false, message: "User Already Exist!"})
        
        const hashedPwd = await bcrypt.hash(password, 12);
        const newUser = new User ({userName, email, password: hashedPwd})
        await newUser.save();
        res.status(201).json({success: true, message: "User Registered Successfully!"}) 
    } catch (error) {
        console.log(error)  
        res.status(500).json({success: false, message: "Internal Server Error"}) 
    }
}


export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email});
        if(!user) return res.json({success: false, message: "User doesn't Exist! Please Register First"})
        
        const checkPwd = await bcrypt.compare(password, user.password)
        if(!checkPwd) return res.json({success: false, message: "Invalid Credential!"})
        
         const token = jwt.sign({
            id: user._id, role:user.role, email: user.email
         }, process.env.JWT_SECRET_KEY, {expiresIn: '60min'})   
         
         res.cookie('token', token, {httpOnly: true, secure: false}).json({success: true, message: "User Sign In Successfully!", user: {
            id: user._id,
            email: user.email,
            role: user.role
         }})

    } catch (error) {
        console.log(error)      
        res.status(500).json({success: false, message: "Internal Server Error"}) 
    }
}


export const logout = async (req, res) => {
    try {
        res.clearCookie('token').json({success: true, message: "User Logout!"}) 
    } catch (error) {
        console.log(error)      
        res.status(500).json({success: false, message: "Internal Server Error"}) 
    }
}


export const authMiddleware = async (req, res, next) => {
           const token = req.cookies.token; 
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized User!"
            })
        }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized User!"
        })
    }
}