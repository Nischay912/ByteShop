// step100: now lets make the router here below.
import express from "express"
import { getAllProducts , getFeaturedProducts, createProduct, deleteProduct, getRecommendedProducts, getProductsByCategory, toggleFeaturedProduct } from "../controllers/product.controller.js"
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

// step101: now if we visit the "/" we want to run the getAllProducts method there.

// step102: see the next step in product.model.js file now there.

// step109: now only the admin should be able to see all the producst list and so he can either fetaure them or delete them and so on .. so put two middlewares in between , so that only after passing through those checks of middleware the function can be called to get all the products , so that only admin can be allowed to see all the products list there.

// step110: see the next steps in product.controller.js file now there.
router.get("/", protectRoute, adminRoute, getAllProducts)

// step130: now the next route is to get all featured products from the database which even the logged out users can see on home page there ; so no need to have middlewares here below.

// step131: see the next steps in product.controller.js file now there.
router.get("/featured" , getFeaturedProducts)

// step169: now lets create a route to show the recommended products there below.

// step170: see the next steps in product.controller.js file now there.
router.get("/recommendations" , getRecommendedProducts)

// step177: now lets make a route to take user to a page where only that category products are listed there.

// step178: we have :category in the route parameter which is passed along with the / in the endpoint there , like : GET request to /api/products/category/123 → req.params.category will be "123" and so on..... ; so it tells basically which category products to show there.

// step179: see the next steps in product.controller.js file now there.
router.get("/category/:category", getProductsByCategory)

// step143: now we can create a route to create a product there below.

// step144: since only admins can create a product , so we need to add middlewares here below like done earlier too.

// step145: see the next steps in step146.txt file now there.
router.post("/" , protectRoute, adminRoute, createProduct)

// step185: now we can have a route to toggle between if a product has to be set as featured product or not ; and since only admin can see that , so lets put middlewares here below like done earlier too.

// step186: "patch" is also used for update like "put" ; but "patch" is preferred to be used if we want to update only a part of the data there like here we want to update only the featured field there ; but if entire data has to be updated then use "put" there.

// step187: we use :id here below so that : the ":id" is the route parameter which is passed along with the / in the endpoint there , like : PATCH request to /api/products/123 → req.params.id will be "123" and so on ; so it means which product has to be toggled there.

// step188: see the next steps in product.controller.js file now there.
router.patch("/:id" , protectRoute, adminRoute, toggleFeaturedProduct)

// step159: now admin will also be able to delete a product , so we need to add middlewares here below like done earlier too.

// step160: the ":id" is the route parameter which is passed along with the / in the endpoint there , like : DELETE request to /api/products/123 → req.params.id will be "123" and so on.

// step161: see the next steps in product.controller.js file now there.
router.delete("/:id" , protectRoute, adminRoute, deleteProduct)

export default router