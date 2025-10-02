// step284: lets create the route for payments now here below.
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import dotenv from "dotenv";
dotenv.config();
import { createCheckoutSession, checkoutSuccess } from "../controllers/payment.controller.js";

const router = express.Router();

// step285: lets define the routes that we will be having here below.

// step286: so we will be having a route where the checkout page using STRIPE will be coming there before user does the payment there.

// step287: see the next steps in step288.txt file now there.

// step292: lets make it to be available for logged in users only , so we need to add middlewares here below like done earlier too.

//  THE "CREATECHECKOUT SESSION" STEPS CONTINUE IN STEP293 IN THE PAYMENT.CONTROLLER.JS FILE THERE NOW.   
router.post("/create-checkout-session", protectRoute, createCheckoutSession);

// step329: now lets create another route to check if the checkout was successfully done or not here below.

//  THE "CHECKOUT SUCCESS" STEPS CONTINUE IN STEP330 IN THE PAYMENT.CONTROLLER.JS FILE THERE NOW.
router.post("/checkout-success", protectRoute, checkoutSuccess);

export default router