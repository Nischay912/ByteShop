// step103: now lets create schema for the products here below.
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    // step104: so we will have all the properties which all products will have here below in the schema below.
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    description: {
        type: String,
        required: [true, "Please add a description"]
    },
    price: {
        type: Number,
        min: 0, // price can't be negative so min is set to 0
        required: [true, "Please add a price"]
    },
    image: {
        type: String,
        required: [true, "Please add an image"]
    },
    category: {
        type: String,
        required: [true, "Please add a category"]
    },
    isFeatured: {
        type: Boolean, // boolean value tells if the product will be shown in the featured products section or not
        default: false // by default isFetaured will be false ; only the admin will be able to update this
    },
    },
    {timestamps: true} // so that it stores the date and time when the document was created and when it was last updated as "created_at" and "updated_at" respectively
);    

// step105: now lets create a model for the products here below ; reason why models needed is that schema gives what all properties each document under products collection will have , but to perform operations on the collection like creating, reading, updating, and deleting documents , we need a model.

// step106: so it will create a collcetion named products by default , lowercase + plural in the database.
const Product = mongoose.model("Product", productSchema);

// step107: now lets export the model so that we can use it in other files there.

// step108: see the next steps in product.route.js file now there.
export default Product 