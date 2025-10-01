// step256: now lets create the router for the coupon routes now below.
import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js"

const router = express.Router()

// step257: lets create a route to get the coupons for the current user here below ; since only logged in users can get the coupons there , so we need to add middlewares here below like done earlier too.

// step258: see the next steps in coupon.controller.js file now there.
router.get("/", protectRoute, getCoupon)

// step263: now lets create a route to validate if a coupon is valid or not here below.

// step264: see the next steps in coupon.controller.js file now there.
router.get("/validate" , protectRoute, validateCoupon)

export default router