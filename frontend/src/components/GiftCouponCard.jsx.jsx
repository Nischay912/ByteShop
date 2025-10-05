import React, { useEffect, useState } from 'react'
// step851: lets import the needed packages and icons from lucide-react here below.
import {motion} from 'framer-motion'
import { useCartStore } from '../stores/useCartStore'
import toast from 'react-hot-toast'

const GiftCouponCard = () => {
    
    // step856: now lets have the states and functions to be used here below.
    const [userInputCode, setUserInputCode] = useState('')
    const {coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon} = useCartStore();

    // step927: now as soon as the page loads , we will use the useEffect to show all the coupons there , hence so thus here below.
    useEffect(() => {
        getMyCoupon()
    },[getMyCoupon])

    // step928: also if user has a coupon, put it in the input there directly i.e. update the value fo the input tag immediately by that coupon code thus here below.
    useEffect(() => {
        if(coupon){
            // step929: so if user has input , set the input tag's value to be the coupon code thus here below.

            // step930: now we can see the coupon there if its there for the user in the database.
            setUserInputCode(coupon.code)
        }
    },[coupon])
    
    const handleApplyCoupon = () => {
        // step931: now when we click on the apply coupon button, we will call the function to apply the coupon here below.

        // step932: but for that also check if the input box for coupon should not be empty thus here below.
        if(!userInputCode) return;

        applyCoupon(userInputCode);
    }

    const handleRemoveCoupon = async () => {
        // step933: same done for removing coupon too , hence so thus here below.
        await removeCoupon();
        // step934: once removed , update the input tag to be empty thus here below.

        // step935: see the next steps in step936.txt file now there.
        setUserInputCode('');
    }
    
    return (

    // step852: now lets have some motion to the components that render here below.
    <motion.div
        className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
    >
        {/* step853: lets have the gift coupon box UI here below. */}
        <div className="space-y-4">
            <div>
                {/* step854: lets have the label for the input tag of id "voucher" here below ; we sue the htmlFor for the id of the input tag its associated with ; so that clicking on this input tag will focus automatically on the associated input tag thus here below. */}
                <label htmlFor="voucher" className='mb-2 block text-sm font-medium text-gray-300'>
                    Do you have a gift voucher code?
                </label>
                <input
                    type="text"
                    id='voucher'
                    // the below classes : styles the input as a full-width block element with rounded corners, gray border, dark gray background, small white text, and gray placeholder, adds padding of 0.625rem, and highlights the border and adds a cyan focus ring when focused.
                    className='block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500'
                    placeholder='Enter your voucher code'

                    // step855: so the value of the input tag will always be equal to the value of the userInputCode state thus here below ; and on changing i.e. on typing the input tag , we will update the value of the userInputCode state thus here below too parallely as you type there too , hence so thus here below.
                    value={userInputCode}
                    onChange={(e) => setUserInputCode(e.target.value)}
                    required
                />
        </div>

        {/* step857: now lets have a button to submit the voucher code thus here below. */}
        <motion.button
            type="button"
            className="flex w-full items-center justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleApplyCoupon}
        >
            Apply Coupon
        </motion.button>
        </div>

        {/* step858: if we have a coupon present and it is applied , we will show it here below. */}
        {isCouponApplied && coupon && (
            <div className="mt-4">
                <h3 className='text-lg font-medium text-gray-300'>
                    Applied Coupon
                </h3>
                <p className='mt-2 text-sm text-gray-400'>
                    {coupon.code} - {coupon.discountPercentage}% off applied
                </p>

                {/* step859: now lets have a button to remove the coupon thus here below. */}
                <motion.button
                    type="button"
                    className='mt-2 flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRemoveCoupon}
                >
                    Remove Coupon
                </motion.button>
            </div>
        )}

        {/* step860: now lets show the available coupon list and their discount Percentages here below ; will show it only if user has available coupons hence so thus here below. */}

        {/* step861: so use the && belwo to render the component only if the coupon is present thus here below for the user , hence so thus here below. */}

        {/* step863: see the next steps in step864.txt file now there. */}
        {coupon && (
            <div className='mt-4'>
                <h3 className='text-lg font-medium text-gray-300'>Your Available Coupons</h3>
                <p className='mt-2 text-sm text-gray-400'>
                    {coupon.code} - {coupon.discountPercentage}% off
                </p>
            </div>
        )}
      
    </motion.div>
  )
}

export default GiftCouponCard
