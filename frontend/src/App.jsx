import { Route, Routes } from 'react-router-dom' 
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'

function App() {
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
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/login' element={<LoginPage />} />

          </Routes>
      </div>
    </div>
  )
}

export default App