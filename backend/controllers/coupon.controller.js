import Coupon from "../models/coupon.model.js";

// step259: now lets create the function to get the coupons for the current user here below.
export const getCoupon = async (req, res) => {
    try{
        // step260: try to get the coupon for the user from the coupon model here below ; and find such a coupon which is for the current user and that coupon should be currently active.
        const coupon = await Coupon.findOne({userId:req.user._id, isActive:true});

        // step261: we can return that coupon as response back to the user here below and if no coupon is found then return null.

        // step262: see the next steps in coupon.route.js file now there.
        res.json(coupon || null)
    }
    catch(error){
        console.log("Error getting coupons : " , error.message);
        res.status(500).json({message:"Something went wrong in getting coupons : " + error.message})
    }
}

// step265: lets create a function to validate the coupon here below.
export const validateCoupon = async (req, res) => {
    try{
        // step266; lets get the coupon code that the user sends as request when he clicks on ApplyCoupon button here below.
        const {code} = req.body;

        // step267: now lets get the coupon from the database if the coupon code matches with the actual code of the coupon in the database here below ; also if the user associated with the coupon is valid or not ; and if the coupon is still active or not.
        const coupon = await Coupon.findOne({code, userId:req.user._id, isActive:true});

        // step268: if the coupon above shows null means that the coupon is not valid for the user.
        if(!coupon){
            return res.status(404).json({message:"Coupon not found"})
        }

        // step269: also check if it is expired or not.
        if(coupon.expirationDate < new Date()){

            // step270: if its expired , then we can set it as inactive here below and save it to the database.
            coupon.isActive = false;
            await coupon.save();
            return res.status(404).json({message:"Coupon is expired"})
        }

        // step271: but if after all checks it still comes here , then send a success response to the user with message and coupon code and the discount percentage as well.

        // step272: see the next steps in order.model.js file now there.
        res.json({
            message:"Coupon is valid",
            code:coupon.code,
            discountPercentage:coupon.discountPercentage
        })
    }
    catch(error){
        console.log("Error validating coupon : " , error.message);
        res.status(500).json({message:"Something went wrong in validating coupon : " + error.message})
    }
}