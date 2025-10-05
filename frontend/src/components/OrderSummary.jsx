// step822: lets get the required imports first here below.
import {motion} from 'framer-motion'
import { useCartStore } from '../stores/useCartStore'
import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
// step865: lets import the stripe package we installed for frontend earlier here below.
import {loadStripe} from '@stripe/stripe-js'
import axiosInstance from '../lib/axios';

// step866: lets now create the stripe promise with the publishable key in it here below ; in order to handle the payments through stripe here below.
const stripePromise = loadStripe("pk_test_51SCnaMA1UZXPBCNuyShgtdWqrJ1BdvrIgdZUD3bsCsupDGPpHbRpQAtmGnMmiWPvh6CaoV39CVIPl6UAuDwgVhJ100yOHmYLlv")

const OrderSummary = () => {
    // step825: now lets get some states and functions from the cart store here below.
    const {total, subtotal, coupon, isCouponApplied, cart} = useCartStore();

    // step826: by simple maths ; savings will be the difference between subtotal and total thus here below.
    const savings = subtotal - total

    // step827: lets show the formatted subtotal here below ; it will fixed to show only 2 decimal places thus here below.
    const formattedSubtotal = subtotal.toFixed(2);

    // step828: lets show the total and savings also in same format thus here below.
    const formattedTotal = total.toFixed(2);
    const formattedSavings = savings.toFixed(2);

    // step868: now lets create the handlePayment function here below.
    const handlePayment = async () => {
        // step869: lets get the stripe instance using the stripe promise we created earlier ; thus here below.
        const stripe = await stripePromise;
        // step870: now lets send a request to backend endpoint for creating a checkout session thus here below.

        // step871: we also wanted the products and the coupon in request for that endpoint there so lets send it also to that endpoint here below.

        // step872: so if we have a coupon ; we send it with the request thus here below ; else we will send null here below ; and the products to do payment with are in the cart , so send the cart items in the product here below ; REMEMBER : we should have the same name "products" and "coupon" that we had used in the backend endpoint too thus here below.
        const res = await axiosInstance.post("/payments/create-checkout-session" , {products: cart, coupon: coupon ? coupon.code : null});

        // step873: now lets extract the session id from the response we get thus here below ; since in backend we were returning just the id , so just get the whole data from the response thus here below.
        const session = res.data

        // step874: lets do a console log to check if we getting correct response or not thus here below.

        // step875: see the next steps in step876.txt file now there.
        // console.log("session is here", session);

        // step880: now lets get the result back from a function called redirectToCheckout from stripe thus here below.
        const result = await stripe.redirectToCheckout({
            // step881: it takes the session id we got from backend here below now ; we saw the session id was named as "id" in the object named session in console log above ; so extract using "." hence so thus here below.
            sessionId: session.id
        })

        // step882: if there is some error , we can show it here below.

        // step883: see the next steps in step884.txt file now there.
        if(result.error){
            console.error("Error:" , result.error)
        }
    }

    return (
        // step823: lets have a motion div here to show its components be rendered there on refreshing the page in some animation thus here below.
        <motion.div
            className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* step824: lets have a text saying order summary there ; here below. */}
            <p className='text-xl font-semibold text-cyan-400'>Order Summary</p>

            {/* step829: now lets display the subtotal , total and savings here below. */}
            <div className='space-y-4'>
                <div className="space-y-2">
                    {/* step830: now lets have definition list and definition terms and definition description ; which is by default identated parallel to the <td> always, thus here below. */}
                    <dl className='flex items-center justify-between gap-4'>
                        <dt className='text-base font-normal text-gray-300'>Original Price</dt>
                        <dd className='text-base font-medium text-white'>₹{formattedSubtotal}</dd>
                    </dl>

                    {/* step831: now if savings are there , we will show them here below. */}
                    {savings > 0 && (
                        <dl className='flex items-center justify-between gap-4'>
                            <dt className='text-base font-normal text-gray-300'>Savings</dt>
                            <dd className='text-base font-medium text-cyan-400'>-₹{formattedSavings}</dd>
                        </dl>
                    )}

                    {/* step832: if there is any coupon and we have applied it, we will show the respective component thus here below. */}
                    {coupon && isCouponApplied &&(
                        <dl className='flex items-center justify-between gap-4'>
                            <dt className='text-base font-normal text-gray-300'>Coupon ({coupon.code})</dt>
                            <dd className='text-base font-medium text-cyan-400'>-{coupon.discountPercentage}</dd>
                        </dl>
                    )}

                    {/* step833: now finally lets show the total and formatted total below all this , thus here below. */}
                    <dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
                        <dt className='text-base font-bold text-white'>Total</dt>
                        <dd className='text-base font-bold text-cyan-400'>₹{formattedTotal}</dd>
                    </dl>
                </div>

                {/* step834: now lets have a button to checkout here below. */}
                <motion.button
                    className='flex w-full items-center justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300'

                    // step835: added some scales to be there on hover and on tap thus here below.
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // step867: now on clicking this button lets call a function here below.
                    onClick={handlePayment}
                >
                    Proceed to checkout
                </motion.button>

                {/* step836: now lets have a link to continue shopping to homepage here below. */}
                <div className='flex items-center justify-center gap-2'>
                <span className='text-sm font-normal text-gray-400'>or</span>
                    <Link
                        to='/'
                        // inline-flex makes an element behave like an inline element while establishing a flex container for its children, allowing flex layout without breaking the line.
                        className='inline-flex items-center gap-2 text-sm font-medium text-cyan-400 underline hover:text-cyan-300 hover:no-underline'
                    >
                        Continue Shopping
                        {/* step837: now lets have a move right icon here below. */}
                        <MoveRight size={16} />

                        {/* step838: see the next steps in UserAlsoBought.jsx file now there. */}
                    </Link>
                </div>
            </div>
        
        </motion.div>
    )
}

export default OrderSummary
