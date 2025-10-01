import Product from "../models/product.model.js";
import {redis} from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

// step111: now lets create the function here below named getAllProducts.
export const getAllProducts = async (req, res) => {
    try {
        // step112: lets try to fetch all the products in the database first here below ; so used {} which means without any filter just get all the products.
        const products = await Product.find({});

        // step113: now lets return all the products in response back to the user as user is admin , so should get back all products in response.

        // step114: see the next steps in auth.middleware.js file now there.
        res.status(200).json({products})
    } 
    catch (error) {
        console.log("Error getting all products : " , error.message);
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}

// step132: now lets create the function to get all the featured products here below.
export const getFeaturedProducts = async (req, res) => {
    try {
        // step133: we can get the featured products stored in mongodb database and even also in redis database , because its faster to access it from there too.
        
        // step134: first lets check if there is anything in redis db under fetaured_products there.
        let featuredProducts = await redis.get("featured_products");

        // step135: if we have it there ; we can just return it in response immediately from there ; and we will have to parse it to json because it is a string in redis database.
        if(featuredProducts){
            return res.status(200).json(JSON.parse(featuredProducts));
        }

        // step136: if its not in redis we need to fetch it from mongodb database.

        // step137: we use lean() here below so that : it returns the document without any additional properties like __v , _id etc ; so instead of returning whole mongodb format obects it returns javascript objects without _id and all , making the performance better and easier to work with.

        // step138: so overall : lean() returns a plain javascript object without any additional properties like __v , _id etc i.e. instead of a mongodb document ; which is good for performance.
        featuredProducts = await Product.find({isFeatured: true}).lean();

        // step139: if no featured products found in mongodb database then we can return it as error here below.
        if(!featuredProducts){
            return res.status(404).json({message: "No featured products found in database"});
        }

        // step140: but if we have it there , then we can store it in redis database which acta as a "cache" from where we can store it , for future quick access of the featured products ; and since redis stores it as a string we will have to convert it to string first before storing it in redis database ; so use JSON.stringify() here below.
        await redis.set("featured_products" , JSON.stringify(featuredProducts));

        // step141: now we can return the featured products in response back to the user.

        // step142: see the next steps in product.route.js file now there.
        res.status(200).json(featuredProducts);
    }
    catch (error) {
        console.log("Error getting featured products : " , error.message);
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}

// step151: now lets create a function to create a product here below.
export const createProduct = async (req, res) => {
    try {
        // step152: get the request user sent , all the details lets extract from the request here below.
        const {name , description, price, image, category} = req.body;

        // step153: now lets initially set cloudinary's response to null because we will update it later if the image is uploaded successfully.
        let cloudinaryResponse = null;

        // step154: if image has been sent in request for product ; we upload it to cloudinary using the cloudinary package here below.
        if(image){
            // step155: we can save it in a folder named "products" in cloudinary cloud.
            cloudinaryResponse = await cloudinary.uploader.upload(image, {folder: "products"});
        }

        // step155: now lets create the product as a document in the mongodb database here below , with the following properties in it.
        const product = await Product.create({
            name,
            description,
            price,
            // step156: we use ?. below because cloudinaryResponse could be null if no image has been sent in request for product ; so if its null , calling secure_url can be invalid , so check using ?. first there ; if its not null , then call secure_url on it i.e. store the image's url from cloudinary in the mongodb database there ; else store an empty string there.
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "" ,
            category
        });

        // step157: now we can return a status code of 201 indicating something created in response back to the user.

        // step158: see the next steps in product.route.js file now there.
        res.status(201).json(product);
    } 
    catch (error) {
        console.log("Error creating product : " , error.message);
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}

// step162: now lets create a function to delete a product here below.
export const deleteProduct = async (req, res) => {
    try {
        // step163: find the id of the product in the database using the req.params value which was :id set in the previous step there.
        const product = await Product.findById(req.params.id);

        // step164: if product is not found in database then we can return a status code of 404 indicating not found in response back to the user.
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        // step165: but if image is there, we first get id of that image from cloudinary and delete it from cloudinary using the syntax to do so here below.
        if(product.image){
            const publicId = product.image.split("/").pop().split(".")[0];
            try{

                // step166: we stored it there in a folder , so provide that folder name here below to delete it from cloudinary from that exact path here below.
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("Image deleted from cloudinary successfully.");
            }
            catch(error){
                console.log("Error deleting image from cloudinary : " , error.message);
            }
        }

        // step167: now lets delete the product from the database here below using the findByIdAndDelete() method ; using the req.params value which was :id set in the previous steps there.

        // step168: see the next steps in product.route.js file now there.
        await Product.findByIdAndDelete(req.params.id);
    }
    catch(error){
        console.log("Error deleting product : " , error.message);
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}

// step171: now lets create a function to list the recommended products here below.
export const getRecommendedProducts = async (req, res) => {
    try{
        // step172: now lets try to fetch some products using aggregate pipeline here below.
        const products = await Product.aggregate([
            {
                // step173: we Randomly selects 3 documents from the Product collection ; Ensures results are different on each execution.
                $sample: {size: 3}
            },
            {
                // step174: now the below lines Controls which fields should be included in the result ; "1" means include it and all other fields should be excluded.
                $project: {
                    _id: 1,
                    name:1,
                    description:1,
                    image:1,
                    price:1
                }
            }
        ])

        // step175: now lets return all the products in response back to the user as user is admin , so should get back all products in response.

        // step176: see the next steps in product.route.js file now there.
        res.status(200).json({products})
    }
    catch(error){
        console.log("Error getting recommended products : " , error.message);
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}

// step180: now lets create a function to get products based on category here below.
export const getProductsByCategory = async (req,res) =>{
    // step181: get category from req.params here below ; i.e. the category which is passed along with the / in the endpoint there , like : GET request to /api/products/category/123 → req.params.category will be "123" and so on.....
    const {category} = req.params;

    try{
        // step182: now lets find the products from the database here below ; based on category here below.
        const products = await Product.find({category});

        // step183: we can get the response back as all the products of that category here below.

        // step184: see the next steps in product.route.js file now there.
        res.status(200).json(products);
    }
    catch(error){
        console.log("Error getting products by category : " , error.message);
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}

// step189: now lets create a function to toggle between if a product has to be set as featured product or not here below.
export const toggleFeaturedProduct = async (req, res) => {
    // step190: lets get id from req.params here below ; i.e. the id which is passed along with the / in the endpoint there , like : PATCH request to /api/products/123 → req.params.id will be "123" and so on.....
    const {id} = req.params;
    try{
        // step191: now lets find the product from the database here below ; based on id here below.
        const product = await Product.findById(id);

        // step192: if id is correct , we can update the product in database here below.
        if(product){

            // step193: use ! so that if its already featured product then it will be set as not featured product and if not featured product then it will be set as featured product here below ; i.e. true to false and false to true.
            product.isFeatured = !product.isFeatured;

            // step194: we use save() method to update the product in database here below and return the updated product in the updatedProduct variable here below.
            const updatedProduct = await product.save();

            // step195: now we will also update it in REDIS database where we had stored it there too using the updateFeaturedProductsCache() function here below.
            await updateFeaturedProductsCache();

            // step196: now we can get the response back as updated product here below.
            res.status(200).json(updatedProduct);
        }
        else{
            res.status(404).json({message:"Product not found"});
        }
    }
    catch(error){
        console.log("Error toggling featured product : " , error.message);
        res.status(500).json({message:"Something went wrong : " + error.message})
    }
}

// step197: lets create the async function to update the featured products in REDIS database here below.
async function updateFeaturedProductsCache() {
    try{
        // step198: again use lean() with the find method below ; because lean() is used to get the plain javascript objects without any additional properties like __v , _id etc i.e. instead of a mongodb document ; which is good for performance.
        const featuredProducts = await Product.find({isFeatured: true}).lean();

        // step199: update the cache i.e. the temporary database redis being used here below too.

        // step200: since redis stores it as a string we will have to convert it to string first before storing it in redis database ; so use JSON.stringify() here below.

        // step201: see the next steps in server.js file now there.
        await redis.set("featured_products" , JSON.stringify(featuredProducts));
    }
    catch(error){
        console.log("Error updating featured products cache : " , error.message);
    }
}