// step273: now lets make a schema and model for order that is placed once payment is done.
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    // step274: so we first have in schema , the user who has placed the order ; so it will be taking the userId as its type , referencing to the User schema we had created earlier there.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    // step275: next we will be having an array of objects for the products , its quantity and price ; the product id will be coming by referencing to the Product Schema that we had created earlier there.
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },
            quantity: {
                type: Number,
                required: true,
                min:1
            },
            price: {
                type: Number,
                required: true,
                min:0,
            },
        },
    ],
    // step276: we will also be having total amount wirtten there by summing all the prices of the products.
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    // step277: then we will also be having a check property too for the STRIPE which we will be using for payments ; once we use this in further steps ahead this will be used there.
    stripSessionId: {
        type: String,
        unique: true,
    },
},

// step278: then we will be adding timestamps here below , so that it stores the date and time when the document was created and when it was last updated as "created_at" and "updated_at" respectively.
{timestamps: true}
)

// step279: finally we will have a model based on the above schema so that we can perform operations on the collection like creating, reading, updating, and deleting documents.
const Order = mongoose.model("Order" , OrderSchema)

// step280: now lets export the model so that we can use it in other files there.

// step281: see the next steps in server.js file now there.
export default Order