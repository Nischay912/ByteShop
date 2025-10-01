import Product from "../models/product.model.js";

// step235: now lets create a function to get all the cart products here below.
export const getCartProducts = async(req,res) => {
    try{
        // step236: now in the User model we had made the cartItems , where we stored productId of the products there as type of it there , which referred to the product id of that product stored in the Products collection ; so now we can use that productId to get the product details from the Products collection here below.

        // step237: so the below find , will find all the products from the Products collection , where the id of the product is present in the cartItems array of the user here below ; so we will get all the products in the cart , using their ids compared to products in the Product collection there.
        const products = await Product.find({ _id: { $in: req.user.cartItems } });

        // step238: and then we will add a quantity for each product in the cart here below.

        // step239: we iterate over each product we got from the above find i.e. all the products in cart , we iterate through them.
        const cartItems = products.map(product => {

            // step240: we look for the cart item in req.user.cartItems , where the id of the product is equal to the id of the product we just got from the above find ; thus we get that item here below.
            const item = req.user.cartItems.find(cartItem => cartItem.id === product._id);

            // step241: we then update the quantity of the product here below with the quantity of the item we got from the above find ; so we use "..." spread operator to first list all current key-value pairs of properties of product as a new JSON object and then add the quantity key-value pair here below with the value as the quantity that user had for that item in its schema , thats why we had product's id in user schema there in cartitems property of UserSchema earlier there.

            // step242: so product schema was not having a quantity property , we added it based on how much quantity the user had for that item in its schema , so now we can get that quantity here below.
            return {...product.toJSON(), quantity:item.quantity};
        });

        // step243: now we return the cart items as response back to the user here below.

        // step244: see the next steps in server.js file now there.
        res.status(200).json(cartItems);
    }
    catch(error){
        console.log("Error getting cart products : " , error.message);
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}

// step208: now lets define the addToCart function here below.
export const addToCart = async (req, res) => {
    try{
        // step209: we can get the product id from the request sent by user here below.
        const {productId} = req.body;

        // step210: now in the protectRoute middleware we had defined it such that , it returns the user object in req.user , so we can get the user id from there , here below.
        const user = req.user;

        // step211: now lets check if the item already exists in the user's cart or not here below.
        const existingItem = user.cartItems.find(item => item.id === productId);

        // step212: if it exists , then increment its quantity by 1 here below.
        if(existingItem){
            existingItem.quantity += 1;
        }
        else{
            // step213: if it doesn't exist , then add the item to the user's cart here below.
            user.cartItems.push(productId);
        }

        // step214: now save the updated user in the database here below.
        await user.save();

        // step215: finally return the updated cart items in the response back to the user here below.
        res.status(200).json(user.cartItems);
    }
    catch(error){
        console.log("Error adding to cart : " , error.message);
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}

// step216: now lets create a function to remove all the items from the cart here below.
export const removeAllFromCart = async (req, res) => {
    try{
        // step217: we can get the product id from the request sent by user here below.
        const {productId} = req.body;

        // step218: now in the protectRoute middleware we had defined it such that , it returns the user object in req.user , so we can get the user id from there , here below.
        const user = req.user;

        // step219: if productId not exists , we return the cart items as it is ; else we filter out the product id from the cart items here below.
        if(!productId){
            user.cartItems = [];
        }
        else{
            // step220: this filter will return in cartItems array , all the items except the one with the id we want to remove here below ; thus we will update the cartItems array here below with all items except the one with the id we want to remove ; thus eventually the item got removed from the cart.
            user.cartItems = user.cartItems.filter(item => item.id !== productId);
        }

        // step221: now save the updated user in the database here below.
        await user.save();

        // step222: finally return the updated cart items in the response back to the user here below.
        res.status(200).json(user.cartItems);
    }
    catch(error){
        console.log("Error removing from cart : " , error.message);
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}

// step223: now lets create a function to update the quantity by 1 increased or 1 decreased here below.
export const updateQuantity = async (req, res) => {
    try{
        // step224: lets get the id of the selected product from req.params here below ; i.e. the id which is passed along with the / in the endpoint there , like : PATCH request to /api/cart/123 → req.params.id will be "123" and so on.....

        // step225: we can also rename that id to productId here below for clarity.
        const {id:productId} = req.params;

        // step226: now we will be getting the quantity from the request sent by user here below.
        const {quantity} = req.body;

        // step227: now in the protectRoute middleware we had defined it such that , it returns the user object in req.user , so we can get the user id from there , here below.
        const user = req.user;

        // step228: now we can get the existing item from the user's cart here below.
        const existingItem = user.cartItems.find(item => item.id === productId);

        // step229: if the item exists , then update its quantity here below.
        if(existingItem){
            // step230: if the quantity is 0 , then we can filter it out from the cart here below ; i.e. if the user has made the quantity of the item 0 , then we can remove it from the cart here below.
            if(quantity === 0){
                // step231: use the same logic for filter like used earlier above there.
                user.cartItems = user.cartItems.filter(item => item.id !== productId);

                // step232: and then save it to the database and return the updated cart items in the response back to the user here below.
                await user.save();
                res.status(200).json(user.cartItems);
            }
            else{
                // step233: now if the quantity is not 0 , then we can update the quantity here below ; based on what user has sent in the request here below ; like if user on shopping pagemade quantity by doing + to 4 then did - to make it 3 ; then in cart , update the quantity to 3 here below and so on.....
                existingItem.quantity = quantity;

                // step234: and then save it to the database and return the updated cart items in the response back to the user here below.
                await user.save();
                res.status(200).json(user.cartItems);
            }
        }
        else{
            res.status(404).json({message:"Product not found"});
        }
    }
    catch(error){
        console.log("Error updating quantity : " , error.message);
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}