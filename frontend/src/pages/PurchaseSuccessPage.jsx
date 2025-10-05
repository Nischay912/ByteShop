import { ArrowRight, CheckCircle, HandHeart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../stores/useCartStore'
import axiosInstance from '../lib/axios'
// step910: lets import the confetti package import here below ; confetti is used to show some Confetti which falls down the screen (or bursts) to celebrate an action like a successful checkout, form submission, or achievement.
import Confetti from 'react-confetti'

const PurchaseSuccessPage = () => {
    // step894: lets have the processing state to be true by default because as soon a sthis page loads, it will be processing here below.
    const [isProcessing, setIsProcessing] = useState(true)

    // step895: also lets have a function to clear the cart here below from the zustand store.
    const {clearCart} = useCartStore()

    // step904: lets create an error state to show the error clearly to the user there.
    const [error, setError] = useState(null)

    const [orderId, setOrderId] = useState(null)

    // step896: now lets have a useEffect to clear the cart UI as soon as the page loads here below.
    useEffect(() => {
        // step897: lets now have a function here below taking the session id as its parameter from the URL that we get in payment-success page like seen earlier too, here below.
        const handleCheckoutSuccess = async (sessionId) => {
            try{
                // step898: lets make a call to the endpoint here below , with the sessionId sent to it here below.
                const res = await axiosInstance.post("/payments/checkout-success" , {
                    sessionId
                })

                if (res.data?.orderId) {
                    setOrderId(res.data.orderId); // store the real order ID
                }

                // step899: once the call made , clear the cart here below.
                clearCart()
            }
            catch(error){
                console.log(error)
                setError("Failed to complete the payment.")
            }
            finally{
                setIsProcessing(false) // this done because as soon as the call amde to endpoint means processing is done , so set it to false now here below.
            }
        }

        // step900: now call the function only if we have a session id in the url , as if its not there , means: we have purchase-cancel page there.

        // step901: so first lets get the session id from the URL here below ; it extracts the value of a query parameter (session_id) from the current page URL
        const session = new URLSearchParams(window.location.search).get("session_id")

        // step902: now if session id is there , then call the cart clear function here below.
        if(session) handleCheckoutSuccess(session)
        
        else{
            // step903: else if session id is not there , means: we have purchase-cancel page there so set the processing state to false here below.
            setIsProcessing(false)

            // step905: if some error occurs while clearing the cart , set the error state here below.
            setError("No session id found in the URL , unable to process the payment.")
        }

    },[clearCart])

    // step906: now if isProcessing state is true , we can do the following , else show the following if error there too , here below.

    // step907: see the next steps in useCartStore.js file now there.
    if (isProcessing)
    return (


        <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-cyan-400 mb-4"></div>
            <p className="text-lg font-semibold text-cyan-400">Processing your order...</p>
            <p className="text-gray-400 text-sm mt-2">Please wait a moment.</p>
        </div>
        </div>
    );

    if (error)
    return (
        <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <p className="text-red-400 text-lg font-bold mb-2">Error Occurred</p>
            <p className="text-gray-300 text-sm mb-4">{error}</p>
            <Link
            to="/"
            className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
            Go Back Home
            </Link>
        </div>
        </div>
    );

  return (
      // step887: lets build the UI of the purchasesuccesspage here below.
      <div className='h-screen flex items-center justify-center px-4 '>

    {/* step911: lets add the confetti here below to show a success animation using confetti here below. */}
            <Confetti 
                width={window.innerWidth}
                height={window.innerHeight}
                // step912: gravity tells how fast it will fall below ; and z-index will tell it to lie above all here below.
                gravity={0.1}
                style={{zIndex:9999}}

                // step913: The total number of confetti pieces that will be displayed. More pieces → denser/confetti-heavy effect.
                numberOfPieces={700}

                // step914: recycle={false} → Confetti falls only once and then disappears; it won’t loop or keep generating new pieces.

                // step915: see the next steps in App.jsx file now there.
                recycle={false}
            />

      <div className='max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10 '>
        <div className='p-6 sm:p-8'>
            <div className='flex justify-center'>
                {/* step888: lets have a checkCircle icon from lucide here below */}
                <CheckCircle className='text-cyan-400 w-16 h-16 mb-4' />
            </div>
            {/* step889: now lets show the purchase successful line here below. */}
            <h1 className='text-2xl sm:text-3xl font-bold text-center text-cyan-400 mb-2'>
                Purchase Successfully Done!
            </h1>
            <p className='text-gray-300 text-center mb-2'>
                Thank you for choosing us. We look forward to serving you again.
            </p>
            <p className='text-cyan-400 text-center text-sm mb-6'>
                Check your email for your order confirmation.
            </p>
            {/* step890: now lets give the order details here below there. */}
            <div className='bg-gray-700 rounded-lg p-4 mb-6'>
                <div className='flex items-center justify-between mb-2'>
                    <span className='text-sm text-gray-400'>Order Id</span>
                    <span className='text-sm font-semibold text-cyan-400'>
                        {/* generate the order id here below using the response we got from Order model of database here below. */}
                        {orderId ? `#${orderId.slice(-6).toUpperCase()}` : "Generating..."}
                    </span>
                </div>
                <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-400'>Estimatd Delivery</span>
                    <span className='text-sm font-semibold text-cyan-400'>3-5 business days</span>
                </div>
            </div>
            {/* step891: now lets give link to home page here below */}
            <div className="space-y-4">
                <button className='w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center'>
                    {/* step892: lets have lucide react icon here below too now. */}
                    <HandHeart className='mr-2' size={18} />
                    Thanks for trusting us!
                </button>
                <Link to={"/"} className='w-full bg-gray-700 hover:bg-gray-600 text-cyan-400 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center'>
                    Continue Shopping
                    {/* step893: lets have lucide react icon here below too now. */}
                    <ArrowRight className='ml-2' size={18} />
                </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PurchaseSuccessPage
