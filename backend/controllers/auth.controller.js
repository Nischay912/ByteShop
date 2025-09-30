// step12: so now we will write the contents for each route here in this file below and export it to be used using import in that routes file there now.

import {redis} from "../lib/redis.js"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

// step55: now lets create the function to generate tokens here below , using the jwt package here below.
const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        { userId },                        // Payload: { userId } → means the token will contain the user’s id.
        process.env.ACCESS_TOKEN_SECRET,   // secret key
        { expiresIn: "15m" }               // Options: expiry time for the token.
    );

    const refreshToken = jwt.sign(
        { userId },                    
        process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: "7d" }            
    );

    return { accessToken, refreshToken };
}

// step56: now lets save the refresh tokens to the REDIS database here below ; no need to store access tokens as they will expire anyhow in 15m , so no risk , but not with refresh tokens as they will be used to refresh the access token by them after the 15m expiry time.
const storeRefreshToken = async(refreshToken, userId) => {

    // step57: now we will be storing the refresh token in the REDIS database here below ; the "set" method of redis will be used to store the refresh token in the redis database with the key as "refresh_token:${userId}" and value as the refresh token itself.

    // step58: we also will be using the "EX" option to set the expiry time of the refresh token to 7 days.
    await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 60 * 60 * 24 * 7);
}

// step61: lets create a function to set the cookie here below.
const setCookies = (res, accessToken, refreshToken) => {

    // step62: "res.cookie" is the express method to set the cookies ; accessToken is name of token and accessToken is value of it.

    // step63: see the next steps in step64.txt file now there.
    res.cookie("accessToken", accessToken, {

        httpOnly: true, // Protects against XSS attacks (Cross-Site Scripting attacks) ; Cookie cannot be accessed via JavaScript (document.cookie).

        secure: process.env.NODE_ENV === "production", // Cookie is sent only over HTTPS, not plain HTTP ; Important for production/deployment security ; so make it true only in production as there only we have https , in development we don't have https , but we have http.

        sameSite: "strict", // used along with secure:true always : Cookie is only sent in requests originating from the same site (same domain) ; Cross-site requests will NOT include the cookie ; use this if : Your frontend and backend are on the same domain & You want maximum protection against CSRF attacks (Cross-Site Request Forgery).

        maxAge: 15 * 60 * 1000 // expires in 15 minutes ; in milliseconds format put as per syntax of "maxAge"
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000 // expires in 7 days
    });
}

// step13: see the next steps in step14.txt file now there.
export const signup = async (req,res) => {

    // step44: now the user will be sending name , email and password when he signs up as a request in "req.body" , so lets use that here below.

    // step45: see the next step in server.js file now there.
    const {email, password, name} = req.body

    try{

        // step48: now lets first check if the user with this email already exists in database or not.
        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({message:"User already exists"})
        }

        // step49: but if its new user , we can create a new user in database now.
        const user = await User.create({
            name,
            email,
            password
        })

        // step54: lets now create two tokens to authenticate the user here below ; which will be taking the user's id from database document here below.
        const {accessToken , refreshToken} = generateTokens(user._id)

        // step59: now we can store the refresh token to the redis database here below.
        await storeRefreshToken(refreshToken, user._id)

        // step60: now we will store the token in cookie too so that we can check at any time from the cookie if the user is authenticated or not.
        setCookies(res, accessToken, refreshToken)

        // step50: and once the user is created , we can send back status code of 201 and user details in response there ; to indicate that user is created successfully ; 201 is used to indicate that something is created successfully.

        // step51: see the next steps in step52.txt file now there.

        // SENDING ONLY SOME THINGS IN RESPONSE AS ITS NOT WISE TO SEND ALL THE DATA OF USER IN RESPONSE AS IT MAY LEAD TO SECURITY ISSUES LIKE PASSWORD ETC.
        res.status(201).json({user:{_id:user._id, name:user.name, email:user.email, role:user.role}, message:"User created successfully"})

        // res.send("signup route called")
    }
    catch(error){
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}

export const login = async (req,res) => {
    res.send("login route called")
}

export const logout = async (req,res) => {
    res.send("logout route called")
}