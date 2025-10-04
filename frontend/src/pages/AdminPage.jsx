import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// step570: import the needed icons from lucide react here below.
import { BarChart, PlusCircle, ShoppingBasket } from 'lucide-react'
import CreateProductForm from '../components/CreateProductForm'
import ProductsList from '../components/ProductsList'
import AnalyticsTab from '../components/AnalyticsTab'
import { useProductStore } from '../stores/useProductStore'

// step571: now lets create the three navigation tabs present on top of admin's dashboard there.
const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
]

const AdminPage = () => {
  // step572: lets have a state to decide which tab is active currently and let the "create" tab be active by default thus here below.
  const [activeTab, setActiveTab] = useState("create")

  // step658: lets now instead of fetching the producst , when clicked on products tab there ; instead lets fetch the products in backgorund automatically as soon as we go on AdminPage , so lets instead fetch the products here itself now instead of doing in ProductsList component there.
  const {fetchAllProducts} = useProductStore();

  // step659: as soon as the page is refreshed we should get products fetched , so lets use it in useEffect here below.

  // step660: see the next steps in ProductsList.jsx file now there.
  useEffect(()=> {
    fetchAllProducts()
  },[fetchAllProducts])

  return (
    // step573: now lets create the UI of the page here below.
    <div className='min-h-screen relative overflow-hidden'>
      <div className='relative z-10 container mx-auto px-4 py-16'>
        {/* step574: now lets have a motion to be there for the heading  below encloded within the motion.h1 here below. */}
        <motion.h1 
          className='text-4xl font-bold mb-8 text-cyan-400 text-center'
          // step575: same classes for animation like done in signup pages and all earlier there.
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        {/* step576: now lets have the three tabs here below the h1 heading here below. */}
        <div className="flex justify-center mb-8">
          {/* step577: lets have map to iterate through all the three tabs to be present there in the "tabs" array there. */}
          {tabs.map((tab) => (
            <button
              // step578: since map needs to have a key , so let the id of each tab , which is unique obviously be the key here below.
              key={tab.id}
              // step579: we now on clicking the tab , set it to the active tab here below.
              onClick={() => setActiveTab(tab.id)}

              // step580: so in each iteration , we check if that "tab" is active or not ; if yes then put cyan bg else we put gray bg to it thus here below.
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
            {/* step581: now inside the button we write the label of that tab which is in the current iteartion here below. */}
            <tab.icon className='mr-2 h-25 w-5' />
              {tab.label}
            </button>
          ))}
        </div>
        {/* step582: now depending on the active tab , we will render the corresponding component here below. */}
        {/* step583: see the next steps now in CreateProductForm.jsx file now there. */}
        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
        {activeTab === "analytics" && <AnalyticsTab />}

      </div>
    </div>
  )
}

export default AdminPage
