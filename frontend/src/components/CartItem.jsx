import React from 'react'
// step792: lets get the necessary imports of packages and icons first here below.
import { Minus, Plus, Trash } from 'lucide-react'
import { useCartStore } from '../stores/useCartStore'

// step793: so since we had passed the cart array as props there , lets accept it as parameter here below.
const CartItem = ({item}) => {
    // step794: lets get the required data from the store here below.
    const {removeFromCart, updateQuantity} = useCartStore();
    return (
        // step795: lets design the UI now here thus below.
        <div className='rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6'>
            <div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>

                {/* the class below : prevents the element from shrinking in a flex container (shrink-0) and on medium screens (md) and larger, moves it to display after other flex items (order-1) for responsive reordering. */}
                <div className='shrink-0 md:order-1'>

                    {/* step796: lets show the image of the product here below ; object-cover makes an image or video scale to completely cover its container while maintaining its aspect ratio, potentially cropping parts of the content that overflow ; so it may crop the image but will provide a good view of the content by providing the actual quality and aspect ratio hence so thus here below. */}
                    <img className='h-20 md:h-32 rounded object-cover' src={item.image} alt="item image" />
                </div>

                {/* step797: now lets have a label which will be for screen readers only and not for normal users ; for us it will be just the adjust quantity buttons there , but blind people who use screen readers will read them loud as whats written in label , hence so thus here below. */}
                <label className='sr-only'>Choose quantity: </label>

                {/*  we have order-3 here and order-1 and order-2 were somewhere else in this page ; its like : Lower numbers come first, higher numbers come later ; so in smaller screens whihc component will be present befor ewhich won't dpeend on the way they are written in code , but will depend on the order- number , here below. */}
                <div className='flex items-center justify-between md:order-3 md:justify-end'>
                    <div className="flex items-center gap-2">

                        {/* step798: now lets put the plus and minus buttons for adjusting the quantity here below ; and in between we will have the quantity of the item , here below. */}
                        <button
                            // the below classes : creates a small 1.25rem square inline flex container that does not shrink in its flexbox OR in its container by no amount there, centers its content, has rounded corners, a gray border, and dark gray background, changes background on hover, and shows a 2px cyan focus ring when focused.
                            className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500'

                            // step799: onClicking the button we call the following function with the item's id which item was clicked and also the quantity of the item "-1" , thus here below.
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        >
                            <Minus className='text-gray-300' />
                        </button>

                        {/* step800: show the quantity in between the buttons here below. */}
                        <p>{item.quantity}</p>

                        {/* step801: now similarly we will have the Plus icon here below. */}
                        <button 
                            className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500'
                            // step802: onClicking the button we call the following function with the item's id which item was clicked and also the quantity of the item "+1" , thus here below.
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        >
                            <Plus 
                                className='text-gray-300'
                            />
                        </button>
                    </div>

                    {/* step803: now lets show the price of the item here below ; aligns the text to the right edge of its container (equivalent to text-align: right). */}
                    <div className='text-end md:order-4 md:w-32'>
                        <p className='text-base font-bold text-emerald-400'>₹{item.price}</p>
                    </div>
                </div>

                {/* step804: now lets also show the item's name there and the trash icon of lucide-react here below. */}
                <div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
                    <p className='text-base font-medium text-white hover:text-cyan-400 hover:underline'>
                        {item.name}
                    </p>
                    <p className='text-sm text-gray-400'>{item.description}</p>

                    <div className='flex items-center gap-4'>
                        <button
                            className='inline-flex items-center text-sm font-medium text-red-400 hover:text-red-300 hover:underline'

                            // step805: onClicking the button we call the following function with the item's id which item was clicked , thus here below.

                            // step806: see the next steps in useCartStore.js file now there.
                            onClick={() => removeFromCart(item._id)}
                        >
                            <Trash />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CartItem
