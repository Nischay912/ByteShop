import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import {toast} from 'react-hot-toast'
import { useUserStore } from '../stores/useUserStore';

// step983: it was taking featuredProducts as a prop , so lets grab it here below.

const FeaturedProducts = ({featuredProducts}) => {

    // ste984: lets have the states for index here below ; initially first one will be 0 and how many items per page will be 4 here below.
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const {addToCart} = useCartStore();

    const {user} = useUserStore();

    // step985: lets have a function below to responsively handle the resize of screen when user clicks onleft or right in the slider , here below in a useEffect here below.
    useEffect(() => {
        const handleResize = () => {
            // step986: so the function here : Checks the width of the browser window ; Sets itemsPerPage depending on screen size.
            if(window.innerWidth < 640) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else if (window.innerWidth < 1280) setItemsPerPage(3);
            else setItemsPerPage(4);
        };

        handleResize();

        // step987: Runs handleResize whenever the browser window is resized.
        window.addEventListener("resize" , handleResize)

        // step988: Cleanup function to remove the event listener when the component is removed, preventing memory leaks.
        return () => window.removeEventListener("resize" , handleResize)
    }, []);

    // step989: now we will have functions to handle the slider here below.
    const nextSlide = () =>{
        // step990: so if we have 4 items in a page ; clicking on the button moves all 4 at a time and makes the next 4 to come there ; because we had value of items per page as 4 so shwos 4 items per page and when we click on the button , the next 4 items will come there.
        setCurrentIndex((prevIndex) => prevIndex + itemsPerPage )
    }

    const prevSlide = () => {
        // step991: vice-versa here if we click on this then the previous 4 items will come there.
        setCurrentIndex((prevIndex) => prevIndex - itemsPerPage )
    }

    // step992: now we will have a variable to check if we have more products in prev slide or not ; i.e if we are at 0th index product, we can't show more previous items ; so if current index is 0 , we can't show previous items ; so disable the start button of slider in that case here below.
    const isStartDisabled = currentIndex === 0;

    // step993: now lets have a variable to see if the “Next” button should be disabled.

    // step994: example : we have lets say 10 items in featured list i.e. featured.length is 10 ; we have items : 0 1 2 3 4 5 6 7 8 9 ; initially we are having currentIndex = 0 and items per page is 4 so : 0 1 2 3 are the current items visible in slider ; if now we press the next button ; it makes currentIndex to come at 4 now i.e. 0+4 = 4 ; so now 4 5 6 7 will be shown there ; now if we press next again 4+4 i..e now current index at 8 : so -> 8 9 will be shown with current index at 8 currently ; now if you try pressing next there ; we have currentIndex (8) >= 10 - 4 : so it will be false and button will be disabled thus here below and we can't press next button thus there, hence so thus here now below.
    const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

    return (
        // step995: now lets create the UI here below.
        <div className='py-12'>
            <div className='container mx-auto px-4'>
                <h2 className='text-center text-5xl sm:text-6xl font-bold text-cyan-400 mb-4'>
                    Featured Products
                </h2>
                <div className="relative">
                    <div className="overflow-hidden">

                        {/* step996: the below class : makes the element a flex container and applies smooth transitions to any transform changes over 0.3 seconds with an ease-in-out timing function for smooth animations. */}
                        <div className='flex transition-transform duration-300 ease-in-out'

                        // step997: so the below inline css now : moves your row of items horizontally based on currentIndex, showing the correct “page” of items in a smooth sliding animation ; When currentIndex = 0 → translateX(0%) → no movement, first items visible ; When currentIndex = 1 → translateX(-(100/itemsPerPage)%) → moves left by one item’s width and so on.... ; This creates the horizontal sliding effect for your carousel or slider.
                            style={{transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`}}
                        >

                            {/* step998: now lets map through the featured producst to show a card for each product there now, here below ; we use ?. to check if the featuredProducts array is not null or undefined as it might not be initialized yet then no need to run map in that case ; run only if the array is not null or undefined hence so thus here now below.*/}
                            {featuredProducts?.map((product) => (

                                // step999: during usage of map in react ; Each card must have a unique key — here it's product._id.

                                // step1000: the below classes : Makes each card responsive (full width on mobile, ½ on small, ⅓ on large, ¼ on extra-large screens) and prevents shrinking with padding on sides.
								<div key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2'>

                                    {/* step1001: the below classes: Styles each card with a translucent white backdrop, blur, rounded corners, shadow, full height, smooth hover transition, and a faint cyan border. */}
									<div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-cyan-500/30'>
                                    {/* overflow-hidden (inside image div) → Hides any part of the image that scales beyond the container. */}
										<div className='overflow-hidden'>
											<img
												src={product.image}
												alt={product.name}
                                                // Displays a product image covering its box, 12rem tall, smoothly zooming in on hover.
												className='w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110'
											/>
										</div>
                                        {/* p-4 → Adds 1rem padding around the card content. */}
										<div className='p-4'>

                                            {/* step1002: Styles the product name as large, semi-bold, white text with spacing below. */}
											<h3 className='text-lg font-semibold mb-2 text-white'>{product.name}</h3>

                                            {/* step1003: Displays the product price in medium-weight, light green text with spacing below. */}
											<p className='text-cyan-300 font-medium mb-4'>

                                                {/* step1004: toFixed(2) → Formats the number as a string with a fixed number of decimal places. */}
												₹{product.price.toFixed(2)}
											</p>
											<button
												onClick={() => {
                                                    if(!user) {
                                                        // set a unique id of your own here to prevent user to spam the button and get multiple errors toast there.
                                                        toast.error("Please login to add to cart", {id: "login-error-cart"})
                                                        return;
                                                    }
                                                    addToCart(product)}
                                                }

                                                // step1005: Styles the “Add to Cart” button full width with emerald color, hover effect, white text, rounded edges, and centered content.
												className='w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 
												flex items-center justify-center'
											>

                                                {/* step1006: Adds a shopping cart icon sized 1.25rem with right margin before the button text. */}
												<ShoppingCart className='w-5 h-5 mr-2' />
												Add to Cart
											</button>
										</div>
									</div>
								</div>
							))}

                        </div>  
                    </div>
                        {/* step1007: now lets place the button for left of slider here below. */}
                        <button
                            onClick={prevSlide}
                            disabled={isStartDisabled}

                            // step1008: so if its disabled show different color and else show different color , hence so thus here now below.
                            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${isStartDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-500"}`}
                        >
                            <ChevronLeft className='w-6 h-6' />
                        </button>

                        {/* step1009: similarly lets place the button for right of slider here below. */}

                        {/* step1010: see the next steps in step1011.txt file now there. */}
                        <button
                            onClick={nextSlide}
                            disabled={isEndDisabled}
                            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${isEndDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-500"}`}
                        >
                            <ChevronRight className='w-6 h-6' />
                        </button>
                </div>
            </div>

        </div>
    )
}

export default FeaturedProducts
