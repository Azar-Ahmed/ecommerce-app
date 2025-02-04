import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database Connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(`Database Error : ${error.message}`)
        process.exit(1);        
    }
}

export default connectDB;