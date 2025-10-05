import { Route, Routes, Navigate } from 'react-router-dom' 
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './stores/useUserStore.js'
import { useEffect } from 'react'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import AdminPage from './pages/AdminPage'
import CategoryPage from './pages/CategoryPage'
import { useCartStore } from './stores/useCartStore'
import CartPage from './pages/CartPage'

function App() {

  // step526: lets get the user state from useUserStore.js file here below.
  const { user, checkAuth, checkingAuth } = useUserStore();

  const {getCartItems} = useCartStore();

  // step536: now as soon as user visits the app OR refresh the page, we will run the checkAuth method thus here below , using useEffect hook.

  // step537: we see the loginPage or signUp page for a split second if we are logged in , but type in url : localhost:5173/login or localhost:5173/signup , so we will have a loading spinner there instead of that split second view of the loginPage or signUp page there.

  // step538: see the next steps in LoadingSpinner.jsx file now there.
  useEffect(() => {
    checkAuth(); 
  },[checkAuth]);

  // step771: as soon as the user logs in ; they should be able to see the number in cart icon of navbar there ; so lets have a useEffect here below.

  // step772: now see the next steps in Navbar.jsx file now there.
  useEffect(() => {
    if(!user) return
    getCartItems();
  },[getCartItems, user]);

  // step542: if we are checking for user authentication then we will show the loading spinner thus here below ; can type : "  if(true) return <LoadingSpinner />" to see how the loading spinner looks like there ; hence so thus here below.

  // step543: see the next steps in Navbar.jsx file now there.
  if(checkingAuth) return <LoadingSpinner />

  return (
    // step412: now lets give some classes to the below div , which makes the element take at least the full viewport height, apply a dark gray background, set all text to white, position it relative for child positioning, and hide any overflowing content ; we have made this parent RELATIVE , so that the children below with ABSOLUTE class can be positioned w.r.t to these here below.
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'> 

      {/* step413: now lets make a gradient to be there in the background here below. */}

      {/* step414: now the div below stretches to cover the entire parent (because inset-0 = top/right/bottom/left = 0) and hides anything that overflows ; we use inset-0 with absolute so that : It makes the element stick to all four edges of its positioned parent. */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">

          {/* step415: then we applied the gradient here below. */}
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
        </div>
      </div>

      {/* step416: now lets wrap the content with another div here below.  */}

      {/* step417: now , the below classes makes the element positioned relative (so its absolutely positioned children use it as a reference), sets its stacking order very high (z-index: 50) to appear above most other elements, and adds top padding of 5rem (pt-20) inside the element. */}

      {/* step418: see the next steps now in Navbar.jsx file now there. */}
      <div className='relative z-index-50 pt-20'>

          {/* step411: now we can have a Navbar here so that it will be common to all the pages here below. */}
          <Navbar />

          {/* step404: now lets wrap the content of the App.jsx file in the router here , so that we can have different pages in our react application */}

          {/* step405: Routes = holds all possible routes (like a router switch). */}
          <Routes>
            {/* step406: Route = defines the mapping between a URL and a page (component) ; so If the browser URL is http://localhost:3000/ → React Router renders the <HomePage /> component and so on... for all teh routes listed here below. */}

            {/* step407: see the next steps in HomePage.jsx file now there. */}
              <Route path='/' element={<HomePage />} />

              {/* step410: lets create some more routes here below */}

              {/* step528: same as login route below , do for signup route too thus here below. */}

              {/* step529: see the next steps in useUserStore.js file now there */}

              {/* <Route path='/signup' element={<SignUpPage />} /> */}
              <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to="/" />} />

              {/* step527: now if user has signed up or logged in ; the user state must be not null as per the zustand store code we had where we set the user state from null to non-null value upon signup or login ; so here below , if user is not null on LoginPage then navigate user to the homepage i.e. once user has logged in navigate user to homepage. */}
              {/* <Route path='/login' element={<LoginPage />} /> */}
              <Route path='/login' element={!user ? <LoginPage /> : <Navigate to="/" />} />

              {/* step566: now lets create a route for the admin dashboard here below ; so check if user is admin or not thus here below , then only show the admin dashboard thus here below ; else : navigate user to login page thus here below. */}

              {/* step567: we use ?. so that if user is null then user?.role will be undefined thus here below; so put user?.role === "admin" so that it doesn't crash the app if user is null , but just don't show the admin dashboard there. */}

              {/* step568: we have made this to take to /login else , because if a user is logged in , even if he tries to visit /login , they will be redirected to homepage anyways ; but if a user is not logged in , they will be redirected to /login page thus here below ; else if we dont do that , they may get a 404 error if they try to visit the /secret-dashboard route thus here below. */}

              {/* step569: see the next steps in AdminPage.jsx file now there. */}
              <Route path='/secret-dashboard' element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />} />

              {/* step700: now lets create a route for the category route that will show to corresponding products present of a particular category there, here below ; it will be like /category/glasses OR /category/sunglasses and so on ... thats why we have :category in the route parameter which is passed along with the / in the endpoint there , like : GET request to /api/products/category/123 → req.params.category will be "123" and so on..... */}

              {/* step701: see the next steps in useProductStore.js file now there */}
              <Route path='/category/:category' element={ <CategoryPage /> } />

              {/* step775: lets now have a route for the cart page here below ; but only logged in users can see it ; so if user is not logged in , navigate user to login page thus here below. */}

              {/* step776: see the next steps in CartPage.jsx file now there */}
              <Route path='/cart' element={ user ? <CartPage /> : <Navigate to="/login" />} />

          </Routes>
      </div>

      {/* to use toasts we need to put <Toaster /> at end in the App.jsx file below <Routes /> here below. */}
      <Toaster />
    </div>
  )
}

export default App