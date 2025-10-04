import React from 'react'
// step655: get the imports needed for this page here below.
import {motion} from 'framer-motion'
import {Trash, Star} from 'lucide-react'
import { useProductStore } from '../stores/useProductStore'

const ProductsList = () => {
  // step656: lets get the required states and functions from the useProductStore here below.

  // step657: see the next steps in AdminPage.jsx file now there.
  const {deleteProduct, toggleFeaturedProduct, products} = useProductStore();

  // step661: now if we try for testing console log the products here below ; we will be having the products there in console log ; as soon as we refresh the page there and come in producst tab there ; this prevents having a loaidng state to be there when we click on the producst tab explicitly there ; isntead load the products in background even before we open the products tab there , here below ; WE MAY GET IT TWICE THERE IN CONSOLE : DUE TO STRICT MODE OF REACT.
  // console.log("products: ", products)
  return (
    // step662: now lets build the UI thus here below.

    // step663: again lets have the motion here below for the animations of content placed inside it thus here below.
    <motion.div
      className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
      initial={{opacity:0, y:20}}
      animate={{opacity:1, y:0}}
      transition={{duration:0.8}}
    >

      {/* step664: lets have a table to be there in the UI there ; so the below line of code : makes the <table> take at least the full width of its container (min-w-full) and adds horizontal dividing lines between rows (divide-y) with a dark gray color (divide-gray-700).*/}
      <table className='min-w-full divide-y divide-gray-700'>

        {/* The <thead> element in HTML is used to group the header content of a table. It’s usually placed at the top of a table and contains one or more <tr> rows with <th> (header) cells. */}
        <thead className='bg-gray-700'>
        {/* step665: now lets have the table structured here below ; we have ONLY ONE tr HERE BELOW AND ALL THE HEADERS IN ONE ROW HERE THUS BELOW UNDER THIS ONE tr PRESENT HERE BELOW.*/}
        <tr>
          {/* step666: By default, text inside <th> is bold and center-aligned ; it represents the header of the column. */}
          <th
          // step667: scope col Indicates that this <th> is a column header, not a row header.
            scope='col'
            // step668: tracking-wider → increases letter spacing ; uppercase → converts text to uppercase ; due to text-left : The word “Product” will appear aligned to the left of the <th> cell
            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
          >
            Product
          </th>
        
        {/* step669: similarly lets have columns for the rest of the data here below */}
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
          >
            Price
          </th>
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
          >
            Category
          </th>
          <th
            scope='col'
            className='px-6 py-3 text-xs text-left font-medium text-gray-300 uppercase tracking-wider'
          >
            Featured
          </th>
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
          >
            Actions
          </th>
        </tr>
        </thead>

        {/* step670: now in the body of the table lets have the following UI here below ; the classes to it : styles the <tbody> with a dark gray background and horizontal dividing lines between each row (divide-y) in a slightly lighter gray (divide-gray-700). */}
        <tbody className='bg-gray-800 divide-y divide-gray-700'>
          {/* step671: now lets use map function to map throught the products array here below ; we use ?. as if initially products array is empty doing map on it may crash the app ; so we run this map only if products array is not null ,thus here below. */}
          {products?.map((product) => (

            // step672: since react needs map to have a unique key for each iteration , so let the _id be the key as its unique for every product thus here below
            <tr key={product._id} className='hover:bg-gray-700'>
              {/* step673: the below style : styles the table cell <td> with horizontal padding of 1.5rem, vertical padding of 1rem, and prevents the text from wrapping to the next line, keeping content on a single line. */}
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='flex items-center'>

                  {/* step674: the below class : makes the <div> a flex container with a fixed height and width of 2.5rem (10 × 0.25rem) and prevents it from shrinking when the parent flex container resizes */}
                  <div className='flex shrink-0 h-10 w-10'>
                    <img 
                    className='h-10 w-10 rounded-full object-cover'
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className='text-sm font-medium text-white'>
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              {/* step675: now lets define other td now here below ; each td in a column represents one column value ; like if we have 3 td in a tr , then : the first td represents the first column value , the second td represents the second column value and the third td represents the third column value .... so on : in the same "tr" .... */}
              <td className='px-6 py-4 whitespace-nowrap'>
                {/* step676: toFixed means : returns a string representation of a number rounded to a specified number of decimal places */}
                <div className='text-sm text-gray-300'>{product.price.toFixed(2)}</div>
              </td>
              {/* step677: similarly lets have other column values of each row now here below. */}
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-300'>{product.category}</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-1 rounded-full ${

                    // step678: now if the product is made featured , it has different class ; els eit has different class here below.
                    product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
                  } hover:bg-teal-500 transition-colors duration-200`}
                >
                  <Star className='h-5 w-5' />
                </button>
              </td>
              {/* step679: now lets have the delete button now here below. */}

              {/* step680: see the next steps in useProductStore.js file now there */}
              <td>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className='text-red-400 hover:text-red-600 transition-colors duration-200'
                >
                  <Trash className='h-5 w-5' />
                </button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </motion.div>
  )
}

export default ProductsList
