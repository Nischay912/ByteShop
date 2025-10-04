// step408: get the boilerplate first by typing rafce there.

// step409: see the next steps in App.jsx file now there.
import React from 'react'
import CategoryItem from '../components/CategoryItem.jsx';

// step555: lets have an array of categories that we will be showing on the homepage there now, here below ; where href refers to the link they will be navigated to when clicked on, here below.

// step556: since images are in publci folder , so use "/" before the image name there.
const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/watches", name: "Watches", imageUrl: "/watches.jpg" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
  return (
    // step557: lets build the UI fir the homepage now here below.
    <div className='relative min-h-screen text-white overflow-hidden'>
      {/* step558: lets have another wrapper div to give maximum width to the content here below. */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {/* step559: now lets have a h1 and a p tag for top of the page there now, here below. */}
        <h1 className='text-center text-5xl sm:text-6xl font-bold text-cyan-400 mb-4'>Explore the world of fashion</h1>
        <p className='text-center text-xl text-gray-300 mb-12'>Discover the latest trends and styles from around the world</p>

        {/* step560: now lets have a grid which will be having all the categories cards in it there, here below here ; creates a CSS grid layout with 1 column by default, 2 columns on small screens (sm), 3 columns on large screens (lg), and a 1rem gap between all grid items. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* step561: now lets use map to loop through the categories array and render a CategoryItem component there , which will be taking the category and key as props there now, here below. */}
          {categories.map(category => (
            <CategoryItem
            // step562: so we pass the current iteration of category to the CategoryItem component thus here below so it can be used there and also map needs a unique key for iteration , so let the names be the key as its unique for every category thus here below.

            // step563: see the next steps in CategoryItem.jsx file now there.
              category={category}
              key={category.name}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
