// step203: now first put up the boiler plate of expres routes and then define all the routes we want here below.
/*import express from "express"

const router = express.Router()

export default router*/

import express from "express"
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

// step204: now lets create a route to add a product to the cart here below ; and since only logged in users can do that , so we need to add middlewares here below like done earlier too.

// step207: see the next steps in cart.controller.js file now there.
router.post("/", protectRoute, addToCart)

// step206: also lets declare a route to get all the carts products here below.
router.get("/", protectRoute, getCartProducts)

// step205: now lets also add routes to either remove all quantity at once from the cart OR delete the quantity one by one from the cart using + or - there.
router.post("/", protectRoute, removeAllFromCart)
router.post("/:id", protectRoute, updateQuantity)

export default router