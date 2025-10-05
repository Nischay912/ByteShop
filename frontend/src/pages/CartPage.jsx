import React from 'react'
import { useCartStore } from '../stores/useCartStore'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import CartItem from '../components/CartItem.jsx'
import PeopleAlsoBought from '../components/PeopleAlsoBought.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import GiftCouponCard from '../components/GiftCouponCard.jsx'

const CartPage = () => {
  // step777: lets get the states and functions needed from the cart store here below.

  // step778: lets get the cart array state here below.
  const {cart} = useCartStore();
  return (
    // step779: lets build the UI of the cartpage here below.
    <div className='py-8 md:py-16'>
      {/* step780: the classes below : centers the element horizontally (mx-auto), limits its maximum width to the extra-large breakpoint (max-w-screen-xl), adds 1rem horizontal padding (px-4) on most screens, and removes padding on 2XL screens and larger (2xl:px-0). */}
      <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
        <div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
          {/* step786: now lets have a motion div here below to render the components inside it with some motions thus here below. */}
          <motion.div
          // the below classes makes the components of div to make them such that it : centers the element horizontally (mx-auto), makes it take full width (w-full) without growing or shrinking in a flex container (flex-none), and constrains its maximum width to 2xl on large screens and 4xl on extra-large screens for responsive layout.
            className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >

            {/* step787: now if cart is empty , we will render the following component here below. */}
            {cart.length === 0 ? (
              <EmptyCart />  
            ) : (
              <div className='space-y-6'>
                {/* step788: else if cart not empty then we map through all the items in the cart and render them here below. */}
                {cart.map((item) => (
                  // step789: lets show the cartItem component here below if cart not empty for each of the cart-item and pass the item as props here below ; also since each cart item has a unique id , so pass the id of the cart item as the key here below because react needs a unique key for each element when using a "map" hence so thus here below.
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}

            {/* step790: now if cart length is greater than zero , we will render the following component here below. */}

            {/* step791: see the next steps in CartItem.jsx file now there. */}
            {cart.length > 0 && <PeopleAlsoBought />}

          </motion.div>
          {/* step820: now if cart has items present , then we will show the motion.div which will render the OrderSummary and GiftCouponCard components here below. */}

          {/* step821: see the next steps in OrderSummary.jsx file now there. */}
          {cart.length > 0 && (
              <motion.div
              // flex-1 makes an element grow and shrink as needed to fill available space in a flex container, taking up all remaining space proportionally.
                className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <OrderSummary />
                <GiftCouponCard />
              </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartPage

// step781: now if cart is empty , we will render the following component here below.
const EmptyCart = () => {
  return(
  // step782: lets have some motion to the components that render here below.
  <motion.div
    className='flex flex-col items-center justify-center space-y-4 py-16'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* step783: lets have a ShoppingCartIcon component here below. */}
    <ShoppingCart className='h-24 w-24 text-gray-300' />

    {/* step784: also lets show some other texts here below. */}
    <h3 className='text-2xl font-semibold'>Your cart is empty</h3>
    <p className='text-gray-400'>Add items to your cart to get started.</p>

    {/* step785: then lets have a link to the home page here below if user has no items in the cart , thus here below. */}
    <Link
      className='mt-4 rounded-md bg-cyan-500 px-6 py-2 text-white transition-colors hover:bg-cyan-600'
      to='/'
    >
      Start Shopping
    </Link>
  </motion.div>
  )
}