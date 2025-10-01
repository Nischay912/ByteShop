// step147: lets write the code to configure the cloudinary package to be used here below.
import {v2 as cloudinary} from "cloudinary"

// step148: now we need to use environment variables , so lets import the dotenv package here below too.
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// step149: now lets export this so that we can use it in other files there.

// step150: see the next steps in product.controller.js file now there.
export default cloudinary

