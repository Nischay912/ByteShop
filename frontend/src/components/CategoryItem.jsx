import React from 'react'
import { Link } from 'react-router-dom'

// step564: lets get the category that we passed as prop in last step and use it here below.

// step565: see the next steps in App.jsx file now there.

const CategoryItem = ({ category }) => {
	return (
		// Outer container div that wraps everything
		// relative → makes this box a positioning reference for absolutely positioned children
		// overflow-hidden → hides any part of child elements that go outside this box (e.g. zoomed image edges)
		// h-96 → sets the height to 24rem (96 * 0.25rem)
		// w-full → makes width 100% of the parent
		// rounded-lg → adds large rounded corners
		// group → enables "group-hover" so children can change style when this parent is hovered
		<div className='relative overflow-hidden h-96 w-full rounded-lg group'>
			
			{/* React Router Link → makes the whole box clickable and navigates to a category page */}
			{/* "to" prop builds the URL by combining "/category" with category.href */}
			<Link to={"/category" + category.href}>
				
				{/* Inner container for the clickable area */}
				{/* w-full h-full → takes full width and height of parent */}
				{/* cursor-pointer → shows pointer cursor when hovering, making it feel clickable */}
				<div className='w-full h-full cursor-pointer'>
					
					{/* Gradient overlay div placed above the image */}
					{/* absolute → positioned relative to the outer "relative" parent */}
					{/* inset-0 → sets top, right, bottom, left = 0 (fills the entire parent box) */}
					{/* bg-gradient-to-b → gradient going from top to bottom */}
					{/* from-transparent → top is transparent */}
					{/* to-gray-900 → bottom fades into dark gray (almost black) */}
					{/* opacity-50 → makes the gradient 50% transparent */}
					{/* z-10 → ensures it sits above the image but below the text */}
					<div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10' />
					
					{/* The category image */}
					{/* src → image URL from the category object */}
					{/* alt → accessibility text (shows if image doesn't load) */}
					{/* Tailwind classes: */}
					{/* w-full h-full → image fills the box */}
					{/* object-cover → crops the image to completely fill container while keeping aspect ratio */}
					{/* transition-transform duration-500 ease-out → smooth animation for transform effects (like scaling) */}
					{/* group-hover:scale-110 → when parent "group" is hovered, image scales up to 110% (zoom effect) */}
					{/* loading='lazy' → browser delays loading this image until it's almost in view (performance boost) */}
					<img
						src={category.imageUrl}
						alt={category.name}
						className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'
						loading='lazy'
					/>
					
					{/* Text container placed on top of the image (over the gradient) */}
					{/* absolute bottom-0 left-0 right-0 → sticks to the bottom and spans full width */}
					{/* p-4 → adds padding inside */}
					{/* z-20 → higher than z-10 so text shows above the gradient */}
					<div className='absolute bottom-0 left-0 right-0 p-4 z-20'>
						
						{/* Category title */}
						{/* text-white → white text */}
						{/* text-2xl → large font size */}
						{/* font-bold → bold weight */}
						{/* mb-2 → margin-bottom for spacing */}
						<h3 className='text-white text-2xl font-bold mb-2'>{category.name}</h3>
						
						{/* Category subtitle */}
						{/* text-gray-200 → slightly lighter gray text */}
						{/* text-sm → small font size */}
						<p className='text-gray-200 text-sm'>Discover trending {category.name}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};


export default CategoryItem
