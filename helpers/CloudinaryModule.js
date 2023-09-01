import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config";

const apiSecret = cloudinary.config().api_secret;
const generateCloudinarySignature = () => {
const timestamp = Math.round((new Date()).getTime() / 1000);
// const queryString = `'folder=teamProject/avatar&timestamp=${signatureData.timestamp}'`;

const signature = cloudinary.utils.api_sign_request({
    folder: 'teamProject/avatar',
    timestamp: timestamp,
    },apiSecret);
console.log(signature)
 return {
     signature,
     timestamp
       }
};

export default generateCloudinarySignature;