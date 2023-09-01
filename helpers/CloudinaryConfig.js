import {v2 as cloudinary} from 'cloudinary';
import "dotenv/config";

const { 
        CLOUDINARY_CLOUD_KEY,
        CLOUDINARY_CLOUD_SECRET } = process.env;

cloudinary.config({
    cloud_name: "teamprojectavatar",
    api_key:"821778916524365",
    api_secret: "ADb53ua2XFEy-4wSZeIBWN1KHW4",
    API_base_URL:"https://api.cloudinary.com/v1_1/teamprojectavatar"
})

export default cloudinary;
// завантаження до клауда
// import { uploadAndLog } from './cloudinaryConfig.js';
// uploadAndLog(filepath/fileName); шлях до файлу.
// або
// const fileData = await cloudinary.uploader.upload(filePath[шлях до файлу], {folder: "teamProject",})

// вивантаження просто посиланням на файл з клауда