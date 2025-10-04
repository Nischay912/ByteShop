import React from 'react'
// step419: lets import some icons from lucide-react here below ; found on : https://lucide.dev/icons/ there.
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from 'lucide-react'

// step420: lets import Link now which will be used to create links to other pages ; its a substitute of anchor tag and is better because it navigates us to different pages without reloading the page.
import { Link } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'

const Navbar = () => {

  // step427: for now lets hardcode it as user is true , will later take it from backend APIs.
  // const user = false;

  // step544: now instead of getting user like this here above ; we will be getting it from the useUserStore zustand store now, thus here below.
  const {user, logOut} = useUserStore();
  
  // step431: now lets hardcode for now if user is admin , will later take it from backend APIs.
  // const isAdmin = false;

  // step545: to check if admin or not ; lets check it from "role" of user object we got above in previous tep up there now ; instead of hardcoing it like done here above thus there.
  const isAdmin = user?.role === "admin";

  return (
    // step421: lets first have a class for the navbar here below in header.

    // step422: so the below class : creates a full-width header fixed at the top of the viewport, with a semi-transparent dark background, blurred backdrop, shadow for depth, a bottom emerald border, smooth transitions for all properties over 0.3s, and a high stacking order (z-40) to appear above most content.
    <header className='fixed top-0 left-0 w-full bg-gray-900 backdrop-blur-md shadow-lg z-50 transition-all duration-300 border-b border-cyan-600'>

      {/* step423: now lets have another div here below which : creates a centered content wrapper with automatic horizontal margins (mx-auto), horizontal padding of 1rem (px-4) and vertical padding of 0.75rem (py-3) for spacing inside the container, and ensures it resizes responsively based on the screen width. */}
      <div className="container mx-auto px-4 py-3">

        {/* step438: now lets have another div here to place the items of navbar i.e. the logo on left and other on right side ; so that it looks like a proper navbar there. */}

        {/* step439: see the next steps in SignUpPage.jsx file now there. */}
        <div className='flex flex-wrap justify-between items-center'>

          {/* step424: now lets create a Link to take us to homepage if clicked ; and it will basically be the logo for the navbar on the left here below. */}
          <Link to='/' className='text-2xl font-bold text-cyan-400 items-center space-x-2 flex'>
            ByteShop
          </Link>

          {/* step425: now lets have nav here below for the other elements there in the navbar which makes : the <nav> into a flex container that wraps its children onto multiple lines if needed, vertically centers them, and adds a 1rem gap between each child element.*/}
          <nav className='flex flex-wrap items-center gap-4'>
            <Link to={"/"} className='text-gray-300 hover:text-cyan-400 transition duration-300 ease-in-out'>Home</Link>

            {/* step426: then if user is logged in , we will be having cart link here to take to the cart page here below ; so use && here below , which will render the element if the condition is true. */}
            {user && (
              <Link to={"/cart"} className='relative group text-gray-300 hover:text-cyan-400 transition duration-300 ease-in-out'>
                {/* step427: now lets use the ShoppingCart icon here below with some size and classes here below. */}

                {/* step428: now group is used to enable styling of child elements based on the parent’s state ; so the parent that has group is when hovered then this below hover will work too. */}
                <ShoppingCart className='inline-block mr-1 group-hover:text-cyan-400' size={20} />

                {/* step429: the below div now : makes the <span> invisible on very small screens (hidden) and display inline starting from small screens (sm) and larger, enabling responsive text visibility. */}
                <span className='hidden sm:inline'>Cart</span>

                {/* step430: now when user adds items in the cart , we will be showing that number on top of cart too ; thats why we had the Link of cart as relative & now will have the number below plcaed absolute w.r.t to it here below. */}
                <span className='absolute -top-2 -left-2 bg-cyan-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-cyan-400 transition duration-300 ease-in-out'>
                  3
                </span>
              </Link>
            )}

            {/* step432: now if the user is admin, then only show the admin dashboard button here below. */}
            {isAdmin && (
              <Link className='bg-cyan-700 hover:bg-cyan-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center' to={"/secret-dashboard"}>
                {/* step433: we will have a lock icon here with the Dashboard written next to it here below ; inline-block mr-1 makes the element behave like an inline element but still accept width/height (inline-block) and adds a right margin of 0.25rem (mr-1) to create spacing from the next element. */}
                <Lock className='inline-block mr-1' size={18} />
                <span className='hidden sm:inline'>Dashboard</span>
              </Link>
            )}

            {/* step434: now if the user is logged in, then show the logout button here below ; else show the login and signup buttons here below. */}

            {/* step546: now on clicking this logout button , we will be calling the logout function coming from the useUserStore zustand store thus here below. */}

            {/* step547: see the next steps now in useUserStore.jsx file now there. */}
            {user ? (
              <button className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'
              
              onClick={logOut}

              >
              {/* step435: now lets have a logout button and a text here below in this button */}
              <LogOut size={18} />
              <span className='hidden sm:inline ml-2'>Log Out</span>

              </button>
            ) : (
              // step436: put react fragments here below ; they are used since we will have multiple elements inside them , but react can only render one element at a time ; so put them in <> </> here below so that its considered as a single element to render.
              <>
                <Link to={"/signup"} className='bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'>
                {/* step437: put a user icon here below. */}
                <UserPlus className='mr-2' size={18} />
                Sign Up
                </Link>

                {/* step437: similarly we will have a login button here below. */}
                <Link to={"/login"} className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'>
                  <LogIn className='mr-2' size={18} />
                  Log In
                </Link>
              </>
            )}

          </nav>
        </div>
      </div>
      
    </header>
  )
}

export default Navbar
