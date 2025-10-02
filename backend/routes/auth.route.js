// step7: lets now make our router here below.
import express from "express"
import { login, logout, signup, refreshToken, getProfile} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// step8: if user visits the signup endpoint , then we call the signup controller there ; so now when user visits "/api/auth/signup" , then we call the signup controller there.

// step9: but writing each route's content in this single file will make this very large , so we will create a separate file for each route there in controllers folder there.

// router.get("/signup", async (req,res)=>{
//     res.send("signup route called")
// })

// step11: now see the next steps in the auth.controller.js file now there , from which we will be importing the content for each of the below routes here below.

// step42: changed all requests from "get" to "post" as get was for testing purpose only initially , but now we will be using it for real requests there in which we will be sending the data to the server there , and not getting the data from the server there ; so we know for sending data to the server , we will be using "post" there and not "get".

// step43: see the next steps in auth.controller.js file now there.

router.post("/signup", signup)

// step10: similarly we can do for login and logout routes there.
router.post("/login", login)
router.post("/logout", logout)

// step87: now lets create an endpoint for refreshing the token here below ; which will call the method named "refreshToken" in auth.controller.js file there.

// step88: see the next steps in auth.controller.js file now there.
router.post("/refresh-token" , refreshToken)

// step398: now lets create a route to get the profile of the current user here below ; since only logged in users can get their profile there , so we need to add middlewares here below like done earlier too.

// step399: see the next steps in auth.controller.js file now there.
router.get("/", protectRoute, getProfile)

export default router