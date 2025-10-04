import React from 'react'
// step584: lets have the required imports here below.
import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlusCircle, Upload, Loader, SpaceIcon } from 'lucide-react'
import { useProductStore } from '../stores/useProductStore'

// step585: now lets list the categories we had there in homepage here below ; so that we cna tell while creating the product to put it in which category there.
const categories = ["jeans", "t-shirts", "shoes", "glasses", "watches", "jackets", "suits", "bags"]

const CreateProductForm = () => {
    // step586: now lets have the state with all the values we want to have in the form here below.
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
    })

    // step608: now lets get the loading state here below ; for now lets harcode it to false ; will get it dynamically further in the later steps here below.

    // step645: now comment out this here below as now loading state will come from product store and not be hardcoded here below.
    // const loading = false;

    // step646: now lets get the required states and functions here below.
    const {createProduct, loading} = useProductStore();

    // step589: lets have a function to submit the form here below.
    const handleSubmit = async (e) => {
        // step590: lets have preventDefault to not reload the page on form submission here below.
        e.preventDefault();
        // console.log(newProduct); // for debugging

        // step644: lets call the function from zustand store here below now.
        await createProduct(newProduct);

        // step645: once the submission done ; we clear the input fields there thus here below ; as the value of input dields depended on the value of states , so lets empty the state itself to indirectly clear the input fields too there , hence so thus here below.

        // step646: see the next steps in step647.txt file now there.
        try{
            setNewProduct({name: "", description: "", price: "", category: "", image: "" })
        }
        catch(error){
            console.log("Error creating a product")
        }
    }

    // step613: lets now create the handleImageChange function here below.
    const handleImageChange = (e) =>{
        // step614: out of selected files we get the 1st file only , not supporting all files uploading but only the 1st selected file uploads here below.
        const file = e.target.files[0];

        // step615: if a file was actually selected : the below line of code : Creates a new FileReader object, which allows you to read the contents of a file (like an image) as a data URL or text.
        if(file){
            const reader = new FileReader();

            // step616: reader.onloadend is an event listener that runs after the file is completely read ; reader.result contains the file data as a Base64 string (since we’ll use readAsDataURL below) ; Base64 is a way to encode binary data (like an image file) into plain text characters (letters, numbers, +, /, =) ; so conversion to base64 url si needed in order to store the entire image in React state as text thus here below.
            reader.onloadend = () =>{
                // step617: we also update the image field of newProduct state here below with the url now here below.
                setNewProduct({...newProduct, image: reader.result})
            }
            // step618: now the below line of code : Starts reading the file as a Data URL (Base64 string) ; This is useful because you can directly use this value in an <img src={...} /> to preview the image.

            // step619: see the next steps in useProductStore.js file now there.
            reader.readAsDataURL(file);
        }
    }

  return (
    // step587: lets have a motion div here below for making the div there appear in motion there below.
    <motion.div
        className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.8}}
    >
        <h2 className="text-2xl font-semibold mb-6 text-cyan-300">Create a New Product</h2>

        {/* step588: now we will have a form here below there. */}
        <form onSubmit={handleSubmit} className='space-y-4'>
            {/* step589: now lets have the first input tag and its associated label here below. */}
            <div>
                <label htmlFor="name" className='block text-sm font-medium text-gray-300'>
                    Product Name
                </label>
                <input 
                // step590: we keep the id same as used in the label , so that the input and the label can be associated with each other thus here below ; on clicking the label , we thus can focus on the associated input tag thus here below.
                    id='name'
                    name='name'
                    // step591: so the value of the input tag will always be equal to the value of "name" of newProduct state thus here below.
                    value={newProduct.name}

                    // step592: everytime user types in the input tag , we use "..." to list the current array of object {name:"", description:"", price:"", category:"", image:""} thus here below and then add the new value of "name" to it thus here below ; so if user typed : rolex-300 : the new state value becomes : {name:"rolex-300", description:"", price:"", category:"", image:""} ; so since react doesn't support changing the state value directly , but instead we create a new updated copy of the previous state using the spread operator and then set it again using setFormData() here below.
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500'
                    required
                />
            </div>

            {/* step593: similarly we can have the input tags for other fields too here below. */}
            <div>
                <label htmlFor="description" className='block text-sm font-medium text-gray-300'>
                    Product Description
                </label>
                <textarea 
                    id='description'
                    name='description'
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    // step594: since its a textarea , so we here set the number of rows to 3 thus here below ; i.e. the textarea now will be 3 rows high thus here below.
                    rows={3}
                    className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500'
                    required
                />
            </div>

            <div>
                <label htmlFor='price' className='block text-sm font-medium text-gray-300'>
                    Product Price
                </label>
                <input
                // step595: since type is number , we will have a increase-decrease button there to increase or decrease the value by step-size mentioned below as step={0.01} thus here below.
                    type='number'
                    id='price'
                    name='price'
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    // step596: we do : step={0.01} to tell that the input should accept decimal values up to two places (like 0.01, 10.25, 99.99 etc) instead of restricting it to whole numbers.
                    step='0.01'
                    className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500'
                    required
                />
            </div>

            <div>
                <label htmlFor="category" className='block text-sm font-medium text-gray-300'>
                    Category
                </label>
                {/* step597: now we will have the select tag here below which is used to create a dropdown menu, allowing the user to choose one option (like category) from multiple predefined options. */}
                <select 
                    name='category'
                    id='category'
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500'
                    required
                >
                    {/* step598: the first option with empty value for option here below , tells that a real category must be chosen ; and the text "Select a category" is what the user sees in the placeholder there. */}
                    <option value=''>
                        Select a category
                    </option>
                    {/* step599: now lets map through the category array to set them as options in the dropdown menu thus here below. */}
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {/* step600: This displays the text inside the dropdown (same as the category name). */}
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* step601: now lets have an uploadImage option here below. */}
            <div className='mt-1 flex items-center'>
                {/* step602: we have the type as "file" so that the user can upload a file when clicked on this input tag here below. */}

                {/* step603: we keep it sr-only so that its not visible on the screen ; as if its visible , it looks very ugly like choose file : no file chosen and all ; so hide visually but for blind people screen readers can read them to let them know its there ; also keep it to accept only image files: The * means “any image type” (like .png, .jpg, .jpeg, .gif, etc.). */}
                <input 
                    type="file" 
                    id='image' 
                    className='sr-only' 
                    accept='image/*'
                    // step612: now on selecting an image we will be calling the function here below.
                    onChange={handleImageChange}
                />
                <label 
                    htmlFor="image"
                    // the below line now : styles the element as a clickable button with a dark gray background, padding, border, rounded corners, subtle shadow, medium gray text, slightly taller line height, changes background on hover, and shows a cyan focus ring with offset for accessibility when focused ; leading-4 sets the line height of text to 1rem (16px), controlling the vertical spacing between lines of text.
                    className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focuse:ring-offset-2 focus:ring-cyan-500'
                >
                    {/* step604: show the Upload icon and text now here below. */}
                    <Upload className='h-5 w-5 inline-block mr-2'/>
                    Upload Image
                </label>
                {/* step605: now if image is selected by user from the button ; then show that image name here below using span , else show nothing there ; thus : It shows the name of the uploaded file there thus , here below. */}
                {/* {newProduct.image && <span>{newProduct.image}</span>} */}
                {newProduct.image && <span className='ml-3 text-sm text-gray-400'>Image Uploaded Successfully</span>}
            </div>

            {/* step606: now lets have a submit button here below. */}
            <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed'

                // step607: so this will be diabled when the laoding state is true here below.
                disabled={loading}
            >

                {/* step609: now lets show the loading written there if loading state is true , else create product written there. */}
                {loading ? (
                    <>
                        {/* step610: lets show th eloader icon and the text here below. */}
                        <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                        Loading....
                    </>
                ) : (
                    <>
                        <PlusCircle className='mr-2 h-5 w-5' />
                        Create Product
                    </>
                )}
                {/* step611: now we can see the product submitted in console log that we had in handleSubmit there ; but image not coming for now there , so lets fix that now. */}
            </button>

        </form>
    </motion.div>
  )
}

export default CreateProductForm
