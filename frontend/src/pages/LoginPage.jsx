import React from 'react'
// step475: first lets get the imports to be used here below.
import { useState } from 'react'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'
import {LogIn, Mail, Lock, ArrowRight, Loader} from 'lucide-react'
import { set } from 'mongoose'

const LoginPage = () => {
  // step476: now lets get the states to be used here below.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // step477: for now lets hardcode the loading state to false, will later take it from backend APIs.
  const loading = false

  // step478: again have handleSubmit like we had in SignUpPage.jsx here below.
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password) //for debugging
  }
  return (
    // step479: now copy paste the email and password form from SignUpPage.jsx here below ; change some things rest all copy pasted from signup page thus here below.
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <motion.div
      className='sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}  
        transition={{duration: 0.8 }} 
      >
        <h2 className='mt-6 text-center text-3xl font-extrabold text-cyan-400'>Login to your account</h2>
      </motion.div>

      <motion.div
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.8, delay:0.2}}
      >
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form 
            onSubmit={handleSubmit}
            className='space-y-6'
          >
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-300'>Email address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className='h-5 w-5 text-gray-400' aria-hidden="true" />
                </div>
                <input
                  id='email'
                  type='email'
                  required
                  // step480: so now we will be having the value of input tag equal to whatever is the value of email state here above ; and when the user types in the email , we will update the email state here below.

                  // step481: see the next steps in step482.txt file now there.
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                  placeholder='you@example.com'
                />
              </div>
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-300'>Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className='h-5 w-5 text-gray-400' aria-hidden="true" />
                </div>
                <input
                  id='password'
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
                  placeholder='••••••••'
                />
              </div>
            </div>

            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className='mr-2 h-5 w-5 animate-spin text-white' aria-hidden="true" />
                  Processing...
                </>
              ) : (
                <>
                  <LogIn className='mr-2 h-5 w-5 text-white' aria-hidden="true" />
                  Login
                </>
              )}
            </button>
          </form>

          <p className='mt-8 text-center text-sm text-gray-400'>

            Not have an account?{' '}
            <Link to="/signup" className='font-medium text-cyan-600 hover:text-cyan-500 transition duration-300 ease-in-out'>
              Sign up now <ArrowRight className='inline h-4 w-4 text-cyan-600' aria-hidden="true" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
