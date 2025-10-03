import React, { useState } from 'react'
// step440: now lets import icons to be used here and also the Link to be used to create links to other pages ; its a substitute of anchor tag and is better because it navigates us to different pages without reloading the page.
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
// step441: we will be using framer motion too for the animations here below.
import {motion} from 'framer-motion'

const SignUpPage = () => {
  // step442: we will be having many states thus here ; lets have the loading state for now hardcode to false , but will later take it from backend APIs.
  const loading = false;

  // step443: we will also be having state for the formdata for the form user submits when signing in.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:""
  });

  // step444: now lets create the function to handle form submission for signup here below.
  const handleSubmit = (e) => {

    // step445: we do not want the page to reload on form submission , so we will use preventDefault here.
    e.preventDefault();
    console.log(formData); //for debugging purposes
  }

  return (
    // step446: now lets have classes to form the signup page here below.
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      {/* step447: now we can also have motion.div here below which comes from framer motion package here below. */}
      <motion.div
      // the below classes means that on small screens (sm) and above, the element will be centered horizontally (mx-auto), take up the full available width (w-full), but never exceed a maximum width of 28rem (max-w-md), keeping it neatly constrained.
      className='sm:mx-auto sm:w-full sm:max-w-md'

      // step448: initially its invisible and slightly below and after 0.2 sec ,it smoothly fades in and slides up to its normal position over 0.8s.
        initial={{ opacity: 0, y: -20 }}  // 20 : so will be coming from the top now
        animate={{ opacity: 1, y: 0 }}  
        // transition={{duration: 0.8, delay: 0.2}}
        transition={{duration: 0.8 }} // no delay now
      >

        {/* step449: so this below is the text which will be animated using the framer motion defined above. */}
        <h2 className='mt-6 text-center text-3xl font-extrabold text-cyan-400'>Create your account</h2>
      </motion.div>

      {/* step450: now lets also have a motion frame for form below too. */}
      <motion.div
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.8, delay:0.2}}
      >
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* step451: now lets have the form here below now. */}
          <form 
            onSubmit={handleSubmit}
            className='space-y-6'
          >
            <div>
              {/* step452: label is the description for an input fiels ; clicking it focuses the cursor in its linked input field automatically there. */}
              <label htmlFor="name" className='block text-sm font-medium text-gray-300'>Full Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">

                {/* step453: now the below classes : positions the element absolutely on the left edge, stretched vertically (inset-y-0), adds left padding of 0.75rem, makes it a flex container with vertically centered items, and applies pointer-events-none so it doesn’t capture mouse/touch events, letting clicks pass through to underlying elements. */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                  {/* step454: lets place icon first there below. */}

                  {/* aria-hidden="true" is an accessibility attribute that tells screen readers and assistive technologies to ignore the element and not announce it, even though it is still visible on the page ; for blind users when they are using a screen reader then it will not be read out this icon, since we are using aria-hidden="true here below. */}
                  <User className='h-5 w-5 text-gray-400' aria-hidden="true" />
                </div>

                {/* step455: now we can have an input field for the input there for the form here below. */}
                <input

                // step456: this gives the input an ID (name), so it can be linked to a <label> with htmlFor="name".
                  id="name"
                  type="text"

                  // step457: marking as required so that form can't be submitted without this field.
                  required

                  // step458: The value displayed in the input always comes from formData.name (a state variable) ; whatever the value of the state named "formData.name" is, it will be displayed in the input field.
                  value={formData.name}

                  // step459: this line below Updates state whenever the user types ; so we use "..." to list the current state and then add the new value to it ; so : it updates only the name field to the new value entered by user inside formData, while keeping other fields unchanged ; example : If formData = { name: "", email: "" } and user types "Nischay", then state becomes: { name: "Nischay", email: "" } ; thats why we need to list current state first using "..." and then add the new value to it ; as react does not allow us to update state directly.
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'

                  // step460: This is the hint text shown when the input is empty.
                  placeholder='Nischay Kumar'
                 />
              </div>
            </div>

            {/* step461: now similarly for email here below. */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-300'>Email address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className='h-5 w-5 text-gray-400' aria-hidden="true" />
                </div>
                <input
                  id='email'
                  // step462: using type='email' : Browser automatically checks if the typed value is a valid email format (e.g., abc@xyz.com).
                  type='email'
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                  placeholder='you@example.com'
                />
              </div>
            </div>

            {/* step463: similarly now for password here below. */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-300'>Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className='h-5 w-5 text-gray-400' aria-hidden="true" />
                </div>
                <input
                  id='password'
                  // step464: using type='password' : Whatever the user types shows as dots or asterisks instead of plain text.
                  type='password'
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                  placeholder='••••••••'
                />
              </div>
            </div>

            {/* step465: similarly now for confirm password here below. */}
            <div>
              <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300'>Confirm Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='h-5 w-5 text-gray-400' aria-hidden="true" />
                </div>
                <input
                  id='confirmPassword'
                  type='password'
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                  placeholder='••••••••'
                />
              </div>
            </div>

            {/* step466: now lets add a submit button here below. */}
            <button
              type='submit'

              // step467: "ring" refers to a visual outline (like a border glow) drawn around an element, often used to indicate focus or selection.
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'

              // step468: we disable the button if loading is true ; i.e. if we are in the loading state.
              disabled={loading}
            >

              {/* step469: if we are in the loading state then show the loading spinner here below. */}
              {loading ? (
                <>
                  <Loader className='mr-2 h-5 w-5 animate-spin text-white' aria-hidden="true" />
                  Processing...
                </>
              ) : (
                <>
                  {/* step470: if we are not in the loading state then show the text here below. */}
                  <UserPlus className='mr-2 h-5 w-5 text-white' aria-hidden="true" />
                  Sign Up
                </>
              )}
            </button>
          </form>

          {/* step471: now below the from we will have a link to login page. */}
          <p className='mt-8 text-center text-sm text-gray-400'>

            {/* step472: we use {' '} to add a space between the text here below. */}
            Already have an account?{' '}
            <Link to="/login" className='font-medium text-cyan-600 hover:text-cyan-500 transition duration-300 ease-in-out'>
              Login here <ArrowRight className='inline h-4 w-4 text-cyan-600' aria-hidden="true" />
            </Link>
          </p>
        </div>
      </motion.div>
      {/* step473: now try dummy values now and see the form object in console there now. */}

      {/* step474: see the next steps in LoginPage.jsx file now there. */}
    </div>
  )
}

export default SignUpPage
