// step2: lets create a basic express app here below ; and we can run it using "npm run dev" as we had included the script under "dev" in package.json file there.
import express from "express";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js"
import couponRoutes from "./routes/coupon.route.js"
import paymentRoutes from "./routes/payment.route.js"
import cookieParser from "cookie-parser";

// step4: import the dotenv package and then call its config method in order to be able to use the variables of the .env file there.
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
dotenv.config();

const app = express();
// step3: lets make a variable for PORT , so that we don't hardcode it in code there ; and just in case its undefined lets say it will be 5000
const PORT = process.env.PORT || 5000;

// step46: to use the body of the request , we will use the express.json middleware here below, so that : we can access the body of the request there using "req.body".

// step47: see the next steps now in auth.controller.js file now there.
app.use(express.json());

// step68: so we need to use the cookie parser package , so that we can access the contents of cookies in the form of req.cookies there.

// step69: see the next steps in auth.controller.js file now there.
app.use(cookieParser());

// step5: now lets say if user visits "/api/auth" , then we will mount the authRoutes there.

// step6: see the next steps now in auth.route.js file now there.
app.use("/api/auth", authRoutes)

// step99: now lets build the product routes here below.
app.use("/api/products", productRoutes)

// step202: now lets create a route for the carts here below ; so that user can add products to the card , update its quantity , remove from cart, etc.
app.use("/api/cart", cartRoutes)

// step245: now lets create a route for coupons here below ; to verify if user is valid for a coupon or not.

// step246: see the next steps in coupon.model.js file now there.
app.use("/api/coupons", couponRoutes)

// step282: now lets create a route for payments here below.

// step283: see the next steps in payment.route.js file now there.
app.use("/api/payments", paymentRoutes)

app.listen(PORT, () => {
    console.log("server is running on http://localhost:" + PORT);
    // step17: lets call the connectDB function here below.

    // step18: see the next steps in user.model.js file now there.
    connectDB();
});