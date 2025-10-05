import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import axiosInstance from '../lib/axios';
import { toast } from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';

const PeopleAlsoBought = () => {

  // step841: lets have a state of recommended products here below ; which will be an array of products thus here below ; initially empty for now thus here below.
  const [recommendations, setRecommendations] = useState([]);

  // step844: lets have a loading state here below ; which will be true by default thus here below.
  const [loading, setLoading] = useState(true);

  // step843: as soon as the page is refreshed we should get products fetched , so lets use it in useEffect here below.
  useEffect(() => {
    const fetchRecommendations = async () =>{
      try{

        // step844: now lets make a call to the backend to get the recommendedations thus here below.
        const res = await axiosInstance.get("/products/recommendations")

        // step845: set the recommendations array to the response we get back, thus here below.
        setRecommendations(res.data)
      }
      catch(error){
        // step846: if fails , show this message and det loading to false again as fetching done for now thus here below.
        toast.error(error?.response?.data?.error || "Failed to fetch recommendations")
      }
      finally{
        // step847: set loading to false as fetching done for now thus here below ; since in both success and failure cases we are setting loading to false thus here below.
        setLoading(false)
      }
    }

    // step848: call the function here below.
    fetchRecommendations()
  }, []);

  // step849: if loading is true , show the Loading spinner here below.

  // step850: see the next steps in GiftCouponCard.jsx file now there.
  if(loading) return <LoadingSpinner />
  
  // step839: lets build the UI here below.
  return (
    <div className='mt-8'>
      <h3 className='text-2xl font-semibold text-cyan-400'>
        You Might Also Like
      </h3>      

      {/* step840: now lets have some products here below in the form of a grid here below. */}
      <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>

        {/* step841: so we will map through the recommendedations array here below and render the ProductCard component for each product here below. */}
        {recommendations.map((product) => (
          // step842: we will have a prop sent to it as per the format of ProductCard component thus here below ; since it accepted a product as a prop , lets send it here below ; and for map in react we need a unique key for each iteration thus here below ; so lets use the id of the product as the key thus here below which is unique for each product obviously always thus here below.
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default PeopleAlsoBought
