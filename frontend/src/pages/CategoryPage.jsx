import React, { useEffect } from 'react'
import { useProductStore } from '../stores/useProductStore'
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard.jsx'

const CategoryPage = () => {
  // step707: lets get the required states and functions from useProductStore.js file here below.
  const {fetchProductsByCategory, products} = useProductStore();

  // step710: lets now get the category name from URL using the useParams hook here below ; we destructure it by name of "category" because on App.jsx where we made this Router we had there : path as /:category ; so we will have the parameter in URL by the name of "category" here below ; so : If the URL is /category/shoes, then category will be 'shoes' , and so on.....
  const {category} = useParams();

  // step708: now lets use "useEffect" to fetch all the products by category when the page is refreshed thus here below.
  useEffect(() => {

    // step711: now we pass the category from URL to the fetchProductsByCategory function thus here below.
    fetchProductsByCategory(category)

    // fetchProductsByCategory("shoes") // for testing purpose , lets fetch shoes products here for now.

    // step712: whenever category changes , we want to fetch the products again thus here below.
  },[fetchProductsByCategory , category])

//   step709: now can go on shoes page and see the shoes products here below in the console there ; hence the route is working correctly , hence so thus there.

//   console.log("products: ", products) // for debugging purposes here

  return (
    // step713: now lets design the UI for the CategoryPage thus here below.
    <div className='min-h-screen'>
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* step714: lets have a motion frame here below to show the category name at the top there in some animation thus here below. */}
            <motion.h1
                className='text-center text-4xl sm:text-5xl font-bold text-cyan-400 mb-8'
                initial={{ opacity: 0 , y: -20 }}
                animate={{ opacity: 1 , y: 0 }}
                transition={{ duration: 0.8 }}
            >   
            {/* step715: we show the category name on top with the 1st character always in upper case thus here below. */}
            {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.h1>

            {/* step716: now lets have motion for the category items to come in some animation when page is refreshed thus here below. */}
            <motion.div
            // step717: so the contents of the div will have the styles below which : creates a responsive CSS grid with 1 column by default, 2 on small screens, 3 on large, 4 on extra-large screens, a 1.5rem gap between items, and centers each grid item horizontally.
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
                // step718: then have some animations here below to show the category items in some animation thus here below when the page is refreshed.
                initial={{ opacity: 0 , y: 20 }}
                animate={{ opacity: 1 , y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >

                {/* step719: if the products list for the category is empty , then show a message thus here below saying that "No products available in this category" */}

                {/* step720: we have used ?. because if products is empty then checking products.length will throw an error thus here below so when we use products?.length it will return undefined thus here below if producst array is not defined ; but if producst array is defined but empty it will run and length is 0 so will shwo the message below , hence so thus here below. */}
                {products?.length === 0 && (

                    //  the below classes : styles the element with extra-large (3xl) semi-bold gray text, centers it horizontally, and makes it span the full width of its grid container.
                    <h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
                        No products available in this category
                    </h2>
                )}

                {/* step721: but if its not empty , we will show a product card for each of them using a component thus here below. */}
                {products.map((product) => (
                    // step722: so since map needs a unique id in each item thus here below we use _id thus here below and also we are passing the product as a prop thus here below.

                    // step723: see the next steps in ProductCard.jsx file now there.
                    <ProductCard key={product._id} product={product} />
                ))}

            </motion.div>

        </div>
    </div>
  )
}

export default CategoryPage
