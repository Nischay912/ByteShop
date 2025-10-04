import React from 'react'

// step724: lets import the necessary packages here below.
import toast from 'react-hot-toast'
import { ShoppingCart } from 'lucide-react'
import { useUserStore } from '../stores/useUserStore'

// step725: so the function takes the product passed as a prop where it was called , hence so thus here below.
const ProductCard = ({product}) => {
    // step730: now lets get the current user from the useUserStore here below.
    const {user} = useUserStore();
    const handelAddCart = () => {
        // step731: now if user is not logged in , then we can show the below toast here below.
        if(!user){
            // step732: we can add id as any unique string or number here below so that : This is useful to avoid multiple identical messages stacking up on the screen when the user clicks repeatedly.

            // step733: see the next steps in useCartStore.js file now there.
            toast.error("Please login to add to cart", {id: "login"})
            return
        }
        else{
            toast.success("Product added to cart successfully")
        }
    }
  return (
    <div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg'>
        {/* step726: now lets show the image and name of the product thus here below ; where the classes given : creates a flex container with relative positioning, margin on top and sides, fixed height of 15rem, rounded corners, and hides overflowing content; inside it, the <img> stretches to cover the container fully, and the absolute inset-0 bg-black bg-opacity-20 overlay adds a semi-transparent black layer on top for a subtle darkening effect.*/}
        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
            <img className="object-cover w-full" src={product.image} alt="product image" />
            <div className='absolute inset-0 bg-black bg-opacity-20' />
        </div>

        {/* step727: now lets show the product's name , product's price and a button to add it to the cart here below. */}
        <div className='mt-4 px-5 pb-5'>

            {/* step728: the below classes for the name of each product now : styles the element with extra-large (xl) semi-bold white text and tighter letter spacing for a compact, prominent heading. */}
            <h5 className='text-xl font-semibold tracking-tight text-white'>{product.name}</h5>
            <div className='mt-2 mb-5 flex items-center justify-between'>
                <p>
                    <span className='text-3xl font-bold text-cyan-400'>₹{product.price}</span>
                </p>
            </div>
            <button
            // in the below classes : focus:outline-none focus:ring-4 focus:ring-cyan-300 removes the default focus outline (outline-none) and instead adds a 4px thick cyan ring around the element when it is focused, improving accessibility with a custom visual indicator.
                className='flex items-center justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300'
                onClick={handelAddCart}
            >
                {/* step729: now lets show the add to cart text and the shopping cart icon here below. */}
                <ShoppingCart size={22} className='mr-2' />
                Add to Cart
            </button>
        </div>

    </div>
  )
}

export default ProductCard
