import Coupon from "../models/coupon.model.js";
import { stripe } from "../lib/stripe.js";
import Order from "../models/order.model.js";


export const createCheckoutSession = async(req, res) => {
    try{
        // step293: now the user will be sending some products as request which he added in cart ; and also the couponCode with it.
        const {products, couponCode} = req.body;

        // step294: now we check here below if products is an array and if it is empty or not ; so if its not an array or empty then we return an error message here below ; its important to check its array or not because, without this check, calling .length or .map() on a non-array would throw a runtime error and crash the request.
        if(!Array.isArray(products) || products.length===0){
            return res.status(400).json({message:"Invalid or empty products array."});
        }

        // step295: now lets calculate the total amount of all the items present in the products array added to the cart here below ; make it let , not const as we are doing += later to it.
        let totalAmount = 0;

        // step296: now we need to make each product's data as stripe compatible here below.
        const lineItems = products.map(product => {
            const amount = Math.round(product.price * 100); // Stripe accepts amount in cents/paise always.

            // step297: now we multiply each product's price to how much quantity of that product user has added there.
            totalAmount += amount * product.quantity;

            // step298: now : Stripe requires each product to be in a specific object structure called a line item ; so we return strip-understandable format here below ; Without this transformation, Stripe’s API will reject your request because it doesn’t understand your raw req.body product structure.
            return {
                price_data: {
                    currency:"inr",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: amount
                },
                // step877: now lets add quantity too in the line itmes here below ; so we save the product's quantity in the lineItems array of objects thus here below as STRIPE needs quantity too in its line item object and if its null due to some reason lets keep it as "1" by default thus here below.

                // step878: see the next steps in step879.txt file now there.
                quantity: product.quantity || 1,
            }
        });

        // step299: now lets also check for the coupon here below.
        let coupon = null; // we set it to null because we will update it later if the coupon is valid or not.

        // step300: if the coupon code was sent in request by user , then we get thta coupon's details from coupon model we made earlier , here below.
        if(couponCode){
            coupon = await Coupon.findOne({code: couponCode, userId: req.user._id, isActive: true});

            // step301: if that coupon exists correctly in the database and is active too ; then apply the discount percentage to the total amount here below.
            if(coupon){

                // step302: we did math.round() so that : it will round off the total amount to the nearest integer ; and we divide by 100 because coupon.discountPercentage is in percentage ; and we subtract the discount amount from the total amount here below.
                totalAmount -= Math.round(totalAmount * (coupon.discountPercentage / 100));
            }
        }

        // step303: now lets create the stripe session using stripe.js we made earlier there.
        const session = await stripe.checkout.sessions.create({

            // step304: we can put many options for payment options here below.
            payment_method_types: ["card"],

            // step305: stripe wants the line_items which is the array containing the format we created above in lineItems array of objects there , so pass it here below.
            line_items: lineItems,

            // step306: now set that the payment will be one time or subscription , etc here below.
            mode: "payment",

            // step307: if everything goes well , we will take the user to success page here below ; the checkout_session_id is where STRIPE puts the actual session id in the url parameter when taken to the success page there.
            success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,

            // step308: similarly if the payment is cancelled it will take to the below url there now.
            cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,

            // step309: now lets create the discounts that stripe takes here below.
            discounts: coupon
            // step310: if we have a coupon then we return the array here below ; so lets use ternary operator for that here below.
            ? [
                {
                    // step311: Here createStripeCoupon(...) is a helper function we will be defining in the fuurther steps ahead , that calls the Stripe API to create/retrieve a coupon with the discount percentage passed as its argument here below.
                    coupon: await createStripeCoupon(coupon.discountPercentage)
                }
            ]

            // step312: if we don't have a coupon then just return an empty array here below.
            : [],

            // step316: now we will also having a field here below which will be used later in further steps to be extracted from the stripe session being created here below.
            metadata: {

                // step317: convert to string because by default its an object id coming from mongoDB and also have the coupon code if it exists or "" empty string if not here below ; so this metadata will be used further ahead in the code steps there.
                userId: req.user._id.toString(),
                couponCode: couponCode || "",

                // FOR EACH PRODUCT , WE ARE STORING ITS ID , QUANTITY AND PRICE HERE ; WHICH WILL BE USED LATER IN THE FURTHER STEPS AHEAD THERE ; AND STRINGIFY IT BECAUSE STRIPE TAKES IT AS STRING.
                products: JSON.stringify(
                    products.map((p) => ({
                        id: p._id,
                        quantity: p.quantity,
                        price: p.price,
                    }))
                ),
            },
        });

        // step325: lets now create the coupon here in the database below , but only if the user is buying items of worth $200 or more here below.
        if(totalAmount >= 20000){ // entering in paise/cents as stripe accepts amount in cents/paise always.
            await createNewCoupon(req.user._id)
        }

        // step326: finally if everything is correct , return a response here below back to the user.

        // step327: lets return the session id of stripe to be able to display the payment page there ; and also return the total amount / 100 so that we can display the total amount purchased for in dollars/rupees and not in paise/cents here below ; the session id will be used by the frontend to display the payment page there.

        // step328: see the next steps now in payment.route.js file now there.
        res.status(200).json({id: session.id, totalAmount: totalAmount/100})
    }
    catch(error){
        console.log("Error creating checkout session : " , error.message);
        res.status(500).json({message:"Something went wrong in creating checkout session : " + error.message})
    }
}

// step313: now lets create the helper function here below.
async function createStripeCoupon(discountPercentage){
    // step314: so we will be creating a one-time useable coupon here below ; with the discount percentage as taken from the coupon earlier above and will be one time useable coupon i.e. will expire after one use.
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once",
    })

    // step315: we return finally the coupon id which the stripe will be using to apply the coupon there above.
    return coupon.id;
}

// step318: now lets create a function to create a coupon collection in the database here below ; where : it takes userId as an argument → the coupon will be linked to a specific user.
async function createNewCoupon(userId){

    // step319: using the Coupon model of mongoose here below to create a new document for the database here below.
    const newCoupon = new Coupon({

        // step320: to generate a random coupon code starting with GIFT here below.
        code: "GIFT" + Math.random().toString(36).substring(2,8).toUpperCase(),

        // step321: making the discount to be fixed to 10% here below.
        discountPercentage:10,

        // step322: coupon will be expired after 30 days from now here below ; put the name "expiryDate" same as you had used in "coupon.model.js" too there.
        expiryDate: new Date(Date.now() + 30*24*60*60*1000),

        // step323: now the below line of code : Associates the coupon with the specific user who it was created for.
        userId: userId,
    })

    // step324: now save the new coupon to the database here below.
    await newCoupon.save();

    return newCoupon;
}

export const checkoutSuccess = async (req, res) => {
    try{
        // step330: so user will send us the session id from the frontend here , when they click on payment option and create a session there.
        const {sessionId} = req.body;


        // Check if order already exists , to prevent duplicate orders.
        const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
        if (existingOrder) {
            return res.status(200).json({
                success: true,
                message: "Order already created.",
                orderId: existingOrder._id,
            });
        }

        // step331: now lets use the same sessionId in stripe to retrieve that session from stripe here below.
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // step332: now lets see if payment was successfully done or not here below.
        if(session.payment_status === "paid"){
            // step333: now from the metadata property we created earlier , lets try to check if coupon code was applied or not here below.
            if(session.metadata.couponCode){

                // step334: then we find that coupon in the Coupon model using this coupon code for that user and set it to false active ; so that it can be used only once ; thus this : Prevents the same coupon from being reused again, enforcing a one-time discount.
                await Coupon.findOneAndUpdate({code:session.metadata.couponCode, userId:session.metadata.userId},
               {isActive: false});
            }
        // step335: now lets create a new order after the payment was done ; so lets create a order for what the payment was done , thus here below.

        // step336: lets get the products from the metadata we used earlier ; and convert back to javascript object using parse as we stored it there as string because there Stripe does not accept objects or array.
        const products = JSON.parse(session.metadata.products)

        // step337: now lets create the order for the products above ; using the Order model we had created earlier there.
        const newOrder = new Order({

            // step338: Order model had userId first so use the metadata to get that.
            user: session.metadata.userId,

            // step339: Order model had products as an array of objects , so in same order put these here below using the products we got from the metadata.
            products: products.map(product => ({
                product: product.id,
                quantity: product.quantity,
                price: product.price
            })),

            // step340: Order model then had totalAmount , so use the session that STRIPE knows to get that.
            totalAmount: session.amount_total / 100, //converted to rupees/dollars as its in cents/paise by default in stripe session there.

            // step341: now lets get the stripe session id here below , which is coming from req.body above.
            stripeSessionId: sessionId
        })

        // step342: now lets save the new order made to the database here below.
        await newOrder.save();

        // step343: now lets create a response back for success here below.

        // step344: now see the next steps in server.js file now there.
        res.status(200).json({
            success: true,
            message: "Payment was successful, order created successfully, coupon deactivated if was used.",
            orderId: newOrder._id,
        })
        }
    }
    catch(error){
        console.log("Error in checkout-success route : " , error.message);
        res.status(500).json({message:"Something went wrong in checkout-success route : " + error.message});
    }
}