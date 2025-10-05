import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

// step115: now lets create the first middleware function here below.

// step116: we had "router.get("/", protectRoute, adminRoute, getAllProducts)" ; so : next() when called inside protectRoute means it will call the adminRoute function there written next after it ; and then if next() called in that adminRoute function , it means it will call the getAllProducts function there written next after it ; and so on.....
export const protectRoute = async(req, res, next) => {
    try {
        // step117: we will see the accessToken and check if the user is authenticated or not first here below.
        const accessToken = req.cookies.accessToken;

        // step118: if the accessToken is not provided , means the user is not authenticated , so return error here below.
        if(!accessToken){
            return res.status(401).json({message:"User not authenticated - No access token provided"});
        }

        // step119: now lets try to see if the token which is there is correct or not here below.
        try{

            // step120: when we created the token in auth.controller.js ; we had put {userId} as payload there ; so when decoding , we will get it in the decoded below.
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

            // step121: so now lets find the userId we got in the decoded object , in our database using that userId.

            // step122: we do not want to send the password in the response , so we will use select("-password") here below , so that it returns everything except the password.
            const user = await User.findById(decoded.userId).select("-password");

            // step123: now if it returns null , means the user is not found in the database , so return error here below.
            if(!user){
                return res.status(401).json({message:"User not authenticated - User not found"});
            }

            // step124: else if user is found with that id , then we will attach the user to the request object here below ; req.user will contain the full MongoDB user document that was returned by Mongoose, except the password field, because you excluded it with .select("-password") ; this done so that before calling the next function , we can store the user response we got in "req.user" so that : it can then be used by the next functions that are called after this middleware function, like the adminRoute middleware function that we will create now ; so the adminRoute middleware can access the authenticated logged in user's details using "req.user" there now.
            req.user = user;

            // step125: calling the next function written after this protectRoute middleware function, which will be the adminRoute middleware function as we had : "router.get("/", protectRoute, adminRoute, getAllProducts)" there.
            next();
        }
        catch(error){
            if(error.name === "TokenExpiredError" || error.name === "JsonWebTokenError"){
                return res.status(401).json({message:"User not authenticated - Invalid access token"});
            }
            throw error; // this done so that we can catch the error in the catch block below outside this there using "catch (error)" there.
        }

    } 
    catch (error) {
        console.log("Error in protectRoute middleware : " , error.message);
        res.status(500).json({message:"Something went wrong in protectRoute middleware : " + error.message})
    }
}

// step126: now we had : "router.get("/", protectRoute, adminRoute, getAllProducts)" : so now lets create the adminRoute middleware function here below which will be running after the protectRoute middleware function.

export const adminRoute = async (req, res, next) => {

    // step127: so we allow the calling of next function , which was "router.get("/", protectRoute, adminRoute, getAllProducts)" -> getAllProducts : only if req.user exists i.e. it was created successfully by previous middleware and also if the user is admin i.e. "req.user.role" is "admin" , then only we call the next function , else throw error here below.

    // step128: see the next steps in step129.txt file now there.
    if(req.user && req.user.role === "admin"){
        next();
    }
    else{
        res.status(403).json({message:"Access denied - Not an admin"}); // 403 means forbidden to access error.
    }
}