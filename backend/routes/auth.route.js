// step7: lets now make our router here below.
import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

// step8: if user visits the signup endpoint , then we call the signup controller there ; so now when user visits "/api/auth/signup" , then we call the signup controller there.

// step9: but writing each route's content in this single file will make this very large , so we will create a separate file for each route there in controllers folder there.

// router.get("/signup", async (req,res)=>{
//     res.send("signup route called")
// })

// step11: now see the next steps in the auth.controller.js file now there , from which we will be importing the content for each of the below routes here below.

router.get("/signup", signup)

// step10: similarly we can do for login and logout routes there.
router.get("/login", login)
router.get("/logout", logout)

export default router