import {v2 as cloudinary} from 'cloudinary';
import "dotenv/config";

const { CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_CLOUD_KEY,
        CLOUDINARY_CLOUD_SECRET } = process.env;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key:CLOUDINARY_CLOUD_KEY,
    api_secret:CLOUDINARY_CLOUD_SECRET,
})
const apiSecret = cloudinary.config().api_secret;
export const generateCloudinarySignature = () => {
    const timestamp = Math.round((new Date()).getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request({
        folder: 'teamProject/avatar',
        timestamp: timestamp,
       
    },apiSecret);

    return {
        timestamp,
        signature
    }
};


export default cloudinary;
// завантаження до клауда
// import { uploadAndLog } from './cloudinaryConfig.js';
// uploadAndLog(filepath/fileName); шлях до файлу.
// або
// const fileData = await cloudinary.uploader.upload(filePath[шлях до файлу], {folder: "teamProject",})

// вивантаження просто посиланням на файл з клауда