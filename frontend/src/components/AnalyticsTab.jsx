import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import axiosInstance from '../lib/axios';
import {Users, Package, ShoppingCart, DollarSign} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsTab = () => {
  // step948: lets first have a state for the 4 tabs to be shown there on the analytics page ; and let it be of 0 value initially, here below.
  const [analyticsData, setAnalayticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0
  });

  // step949: now lets have the loading state to initially be true here below as we will be initially loading the data here below.
  const [loading, setLoading] = useState(true);

  // step950: lets have an array for the daily sales data here below ; initially empty for now thus here below.
  const [dailySalesData, setDailySalesData] = useState([]);

  // step951: now lets have a useEffect to load the data here below.
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try{
        // step952: lets make a call to the backend to get the analytics data here below.
        const res = await axiosInstance.get("/analytics");

        // step953: update the states here below with the data we got from the backend ; it return a json object with the analytics data & daily sales data there which we access here below using "." operator here below.
        setAnalayticsData(res.data.analyticsData)
        setDailySalesData(res.data.dailySalesData)

        // step954: set loading to false as fetching done for now thus here below.
        // setLoading(false)
      }
      catch(error){
        console.log("Error getting analytics : " , error);

        // step955: here also once error comes, set loading to false as fetching done for now thus here below.
        // setLoading(false)
      }
      finally{
        // step956: instead of having setLoading(false) in both try and catch cases , we can have it in finally case thus here below.
        setLoading(false)
      }
    }

    // step956: call the function here below.
    fetchAnalyticsData()
  },[])

  // step957: if loading is true , show a loading message here below.
  if (loading) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <motion.div
        className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="text-cyan-400 mt-4 text-lg font-medium">
        Loading analytics...
      </p>
    </div>
  );
}

  return (
    // step958: now lets have the UI for the analytics page here below.
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* step959: now lets show the cards there in form of grid and decrease the number of cols in smaller devices to make it responsive , hence so thus here below. */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {/* step960: now call the AnalyticsCard component for the 4 cards we want here with the title, value and other props here below. */}
        <AnalyticsCard
          title='Total users'
          // You use toLocaleString() to format numbers with commas for readability
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color='from-indigo-500 to-purple-700'
        />
        <AnalyticsCard
          title='Total products'
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          color='from-rose-400 to-pink-600'
        />
        <AnalyticsCard
          title='Total sales'
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
          color='from-emerald-400 to-teal-600'
        />
        <AnalyticsCard
          title='Total revenue'
          // we use ` ` because we want to have a ₹ too thus here below.
          value={`₹${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color='from-yellow-400 to-orange-500'
        />
      </div>
      {/* step961: now lets have the daily sales chart here below. */}
      <motion.div
        className='bg-gray-800/60 rounded-lg p-6 shadow-lg'
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5, delay:0.25}}
      >
        {/* step962: now lets use "recharts" package we had installed to show the chart here below. */}

        {/* step963: the below component : Makes the chart responsive and ensures it resizes with the screen width */}
        <ResponsiveContainer width='100%' height={400}>

          {/* step964: the below component takes an array of objects as input. Each object represents data for one day ; It Connects your data with the chart. */}
          <LineChart data={dailySalesData}>

            {/* step965: the below component : This draws grid lines behind the chart (like graph paper) ; strokeDasharray='3 3' → Makes the lines dashed instead of solid. */}
            <CartesianGrid strokeDasharray='3 3' />

            {/* step966: X-axis: Horizontal axis of the chart ; dataKey='date' → Uses the date property from your data for labels ; stroke='#D1D5DB' → Color of the axis line and labels (a light gray) ; Shows which day each point corresponds to. */}
            <XAxis dataKey='date' stroke='#D1D5DB' />

            {/* step967: Y-axis: Vertical axis of the chart ; yAxisId='left' → Left Y-axis ; yAxisId='right' → Right Y-axis ; stroke='#D1D5DB' → Color of the axis line and labels (a light gray) */}

            {/* step968: so we have 2 y axis one on right and one on left ; have two metrics with different scales, e.g., sales and revenue. */}
            <YAxis yAxisId='left' stroke='#D1D5DB' />
            <YAxis yAxisId='right' orientation='right' stroke='#D1D5DB' />

            {/* step969: Tooltip Shows a popup box when you hover over points ; Gives users exact numbers without cluttering the chart ; cluttering means without much information on the chart. */}
            <Tooltip />

            {/* steo970: Legend : Displays a legend box showing which color corresponds to which metric (Sales vs Revenue) ; so we see the color and label below there which : Helps users identify lines. */}
            <Legend />

            {/* step971: Line Draws a line on the chart for sales and revenue here below.  */}

            {/* step972: now see the next steps in useProductStore.js file now there. */}
            <Line
              yAxisId='left' // Uses the left Y-axis.
              type='monotone' // Smooth line (curved between points).
              dataKey='sales' // Uses the sales value from your data.
              stroke='#10B981' // Green line color.
              activeDot={{ r: 8 }} // Makes the dot bigger when hovered.
              name='Sales' // Name shown in the tooltip and legend.
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='revenue'
              stroke='#3B82F6'
              activeDot={{ r: 8 }}
              name='Revenue'
            />
          </LineChart>
        </ResponsiveContainer>

      </motion.div>
    </div>
  )
}

export default AnalyticsTab

// step941: now lets create the Analytics Card component here below ; which takes some props too & we have renamed the icon prop to Icon here below.
const AnalyticsCard = ({title, value, icon: Icon, color}) => {
  return (
  <motion.div
  // step942: so color will be provided dynamically based on the color prop here below.
    className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className='flex justify-between items-center'>
      <div className='z-10'>
        {/* step943: so title will be provided dynamically based on the title prop here below. */}
        <p className='text-cyan-300 text-sm mb-1 font-semibold'>{title}</p>

        {/* step944: so value will be provided dynamically based on the value prop here below. */}
        <h3 className='text-white text-3xl font-bold'>{value}</h3>
      </div>
    </div>
    {/* step945: the below classes : positions the element absolutely to cover its parent fully (inset-0) and applies a diagonal gradient background from cyan-600 to cyan-900 with 30% opacity, creating a subtle overlay effect. */}
    <div className='absolute inset-0 bg-gradient-to-br font-cyan-600 to-cyan-900 opacity-30' />

    {/* step946: now the below classes : positions the element absolutely 1rem below and 1rem to the right of its parent’s bottom-right corner, sets the text color to dark cyan, and makes it 50% transparent. */}
      <div className='absolute -bottom-4 -right-4 text-cyan-800 opcaity-50'>

        {/* step947: now lets place a icon component here below.  */}
        <Icon className='w-32 h-32' />
      </div>
  </motion.div>
  )
}