import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer'

cloudinary.config({
    cloud_name: 'dkxnbtu0z',
    api_key: '267282193413941', 
    api_secret: 'AFoJVe3ttAOpZxZODe_X_AKvah0'
    
})

const storage = new multer.memoryStorage();

async function imageUpload(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    });

    return result; 
}

const upload = multer({storage})

export { imageUpload, upload };