// step12: so now we will write the contents for each route here in this file below and export it to be used using import in that routes file there now.

import {redis} from "../lib/redis.js"
import User from "../models/user.model.js"
import jwt, { decode } from "jsonwebtoken"

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
        res.status(201).json({_id:user._id, name:user.name, email:user.email, role:user.role, message:"User created successfully"})

        // res.send("signup route called")
    }
    catch(error){
        console.log("Error in signup : " , error.message);
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}

export const login = async (req,res) => {
    // res.send("login route called")
    try {
        // step79: now we will get the email and password that user would have entered and sent as request here below.
        const {email, password} = req.body
        // step80: find the user with this email in the database now.
        const user = await User.findOne({email})

        // step81: now using the comparepassword function that we had created in the user model , there we compared this.password which is the password of the user in database ; to the password user sent in the request ; so if both are same , then password is correct , else not.
        if(user && (await user.comparePassword(password))){
            // step82: generate the tokens like we did in signup then now here below and save in redis and cookies too here below using the functions created and used in signup earlier too.
            const {accessToken, refreshToken} = generateTokens(user._id)
            await storeRefreshToken(refreshToken, user._id)
            setCookies(res, accessToken, refreshToken)

            // step83: send a success response back as a response to the user here below.

            // step84: see the next steps now in step85.txt file now there.
            res.status(200).json({_id:user._id, name:user.name, email:user.email, role:user.role, message:"User logged in successfully"})
        }
        else{
            res.status(401).json({message:"Invalid email or password"})
        }
    } 
    catch (error) {
        console.log("Error logging in : " , error.message);
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}

export const logout = async (req,res) => {
    // res.send("logout route called")

    try {
        // step66: lets get the refresh token which will be there in cookie on each request made by user like seen when making a request on postman there.

        // step67: see the next steps in server.js file now there.

        // step70: so we access the refreshToken from cookie here below ; as we had named the refreshToken as this name only when adding it to the user during sign up.
        const refreshToken = req.cookies.refreshToken;

        if(refreshToken){
        // step71: now if user has sent a refresh token in a request , we need to decode it first as the token is a unreadable format as seen on clicking it in postman to see its value.

        // step72: jwt.verify is used to decode the token and validate it against the secret key ; and decoded now will have Whatever you put in the payload when signing the toke ; so we had put userid as "payload" when uding jwt.sign earlier ; so : we will get it in the decoded below when using jwt.verify now below.
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            // step73: now we will be deleting the refresh token entry from Redis for that specific user ; and name of key "refresh_token:${userId}" is exactly same as the one we had used while storing the refresh token earlier ; so we can use it to delete the refresh token from redis database here below.
            await redis.del(`refresh_token:${decoded.userId}`);
        }

        // step74: now once they have been deleted from redis , we can delete from cookie as well now below ; using the name of the cookie that we had set it up with earlier there.
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        // step75: finally send a response with success message to indicate that user has logged out successfully.

        // step76: see the next steps in step77.txt file now there.
        res.status(200).json({message:"User logged out successfully"})
    } 
    catch (error) {
        console.log("Error logging out : " , error.message);
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}

// step88: now lets create the refreshToken method to be called in the refresh-token endpoint now below.

// step89: so this method will re-create the access token when it expires.
export const refreshToken = async (req,res) => {
    try {
        // step90: now to create a new access token , we need to have the refresh token because it will be acting as proof that the user is still authenticated ; Using the refresh token, the server can validate the user and issue a new access token without making the user log in again.
        const refreshToken = req.cookies.refreshToken;
        
        // step91: if the refreshToken is not provided from cookie , means no need to create access Token again as he may be a hacker who doesn't have any refreshToken , but has stolen accessToken , so no need to create access token again.
        if(!refreshToken){
            return res.status(401).json({message:"No refresh token provided"})
        }

        // step92: but if we get the refreshToken , then we decode and get the userId from it , which we had stored as key in it , with the value as the userId of the logged in user there.
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        
        // step93: now we will compare it with the stored refreshToken of redis to verify if it is valid or not.
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
        if(storedToken !== refreshToken){
            return res.status(401).json({message:"Invalid refresh token"}) //user may be trying to cheat us ; The user copied someone else’s refresh token and is trying to use it ; The refresh token was tampered with or altered ; The token is stale (server already revoked it) ; any of this may be the possibilities there.
        }

        // step94: now if none of the above is the case , we can safely generate a new access token for the user here below ; same as done in signup too earlier.
        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

        // step95: now set it in cookie too as previous accessToken in cookie has been expired ; so save in same syntax used in signup earlier.
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000
        });

        // step96: can send a success response back as a response to the user here below.

        // step97: see the next steps in step98.txt file now there.
        res.json({message: "New access token created successfully"});
    } 
    catch (error) {
        console.log("Error refreshing access token : " , error.message);
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}