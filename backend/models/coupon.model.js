// step247: lets create a schema and model for coupons now , same as we made all other models too.
import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({

    // step248: so each coupon will have a code which will be unique.
    code:{
        type:String,
        required:[true, "Please add a code"],
        unique:true
    },

    // step249: we can set the % of discount we will give to the user here below.
    discountPercentage:{
        type: Number,
        required:[true, "Please add a discount percentage"],
        min: 0,
        max: 100
    },

    // step250: we can set the expiry date of the coupon here below.
    expiryDate:{
        type: Date,
        required:[true, "Please add an expiry date"]
    },

    // step251: now we will have if coupon is still active or not here below ; once the user uses the coupon , it will be set to false.
    isActive:{
        type: Boolean,
        default: true
    },

    // step252: we will have the userId of the user who is associated with the coupon here below ; and this userId we will be getting from the User model , thats why we are referencing the User model here below.
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:[true, "Please add a user id"],
        unique: true
    },
},

// step253: we can add timestamps for each document of the collection , so that it stores the date and time when the document was created and when it was last updated as "created_at" and "updated_at" respectively.
{timestamps: true}
)

// step254: we will now be creating  amodel based on the above schema so that we can perform operations on the collection like creating, reading, updating, and deleting documents.
const Coupon = mongoose.model("Coupon", couponSchema)

// step255: now lets export the model so that we can use it in other files there.
export default Coupon