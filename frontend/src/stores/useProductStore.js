// step620: now we will be having global states and functions for products to be used anywhere in our application there.

// step621: lets get the create function to create the zustand store here below and also the toast from react-toast package here below.
import { create } from 'zustand'
import toast from 'react-hot-toast'

// step622: also lets get the axiosInstance we made earlier to make calls and requests to the backend server , thus here below.
import axiosInstance from '../lib/axios'

// step623: now lets create the zustand store using the create function here below.
export const useProductStore = create((set,get) =>({
    // step624: lets create a state for products here below ; which initially is empty for now here below.
    products: [],

    // step625: also a loading state currently hardcoded to false , will update it later dynamically here below.
    loading: false,

    // step625: now lets create a function to update the products state here below.
    setProducts: (products) => set({products}),

    // step636: now lets have a function to craete products here below.
    createProduct: async(productData) => {
        // step637: since the producst currently is being created , we set loading state to be true here below.
        set({loading: true})
        try{
            // step638: now lets send a request to the products endpoint here below using axios ; and send the productData in it which will be coming from the admin dashboard.
            const res = await axiosInstance.post("/products", productData)

            // step639: now lets append the new product we got in the products state here below.
            set((prevState) => ({
                // step640: prevState.products gives the current products, and ... spreads them into a new array with the new product appended.
                products: [...prevState.products, res.data],
                // step641: product got added so now set loading state again back as false here below.
                loading: false,
            }));
            toast.success("Product added successfully")
        }
        catch(error){
            toast.error(error.response.data.error);
            // step642: adding product failed so now set back loading to false as now we are no longer adding the product here below.
            set({loading: false})

            // step643: see the next steps in CreateProductForm.jsx file there now.
        }
    },

    // step648: now lets make a function to fetch all the producta here below.
    fetchAllProducts: async() => {
        // step649: when we are loading the producst , lets make laoding true here below.
        set({loading: true})
        try{
            // step650: make a request to the products endpoint to get all the producst in the repsonse here below.
            const res = await axiosInstance.get("/products")

            // step651: in backend we had returned products as object so take it here below from data of response here below.

            // step652: once loading done , set loading false too here below.
            set({products: res.data.products, loading: false})
        }
        catch(error){
            // step653: if fails , show this message and det loading to false again as fetching done for now here below.

            // step654: see the next steps in ProductsList.jsx file now there.
            set({error: "Failed to get the products", loading: false})
            toast.error(error.response.data.error || "Failed to fetch the products")
        }
    },

    // step692: now lets define the function to delete a product from the product list there now , here below ; here also : we take the product we targetted there where function was called , and pass its id here below.
    deleteProduct: async(productId) => {
        // step693: lets set the loading state to be true when we do click to delete a product there.
        set({loading: true})
        try{
            // step694: then lets send the delete request to backend here below for the product id here below.
            await axiosInstance.delete(`/products/${productId}`)
            // step695: now lets remove the product from the products state here below.
            set((prevProducts) => ({

                // step696: so we set the products state to be the current products minus the product we deleted here below as we now will only be including the products whose id not matches the one we deleted here below.
                products: prevProducts.products.filter((product) => product._id !== productId),

                // step697: also now since deleting done ; set back loading state to false here below.
                loading: false,
            }));
            toast.success("Product deleted successfully")
        }
        catch(error){
            // step698: if delete fails , show this message and set loading to false again as deleting done for now here below.

            // step699: see the next steps in App.jsx file now there.
            set({loading: false})
            toast.error(error?.response?.data?.error || "Failed to delete the product")
        }
    },

    // step681: so we take the product we targetted there where function was called , and pass its id here below.
    toggleFeaturedProduct: async(productId) => {
        // step682: lets set the loading state to be true when we do click to feature a product there.
        try{
            // step683: lets send the request to endpoint in backend server now here below ; patch is used when we want to update only a part of the data there ; and put is used when we want to update the entire data there.
            const res = await axiosInstance.patch(`/products/${productId}`)

            // step684: in zustand store ; if we write a variable name like we took it as "prevProducts" here below ; so it will be an object containg all the states and functions in it like -
            /*
            {
            products: [],
            loading: false,
            createProduct: ...,
            fetchAllProducts: ...,
            toggleFeaturedProduct: ...
            }
            */

            // step685: so we pass all of them inside the setter function of zustand here below.
            set((prevProducts) =>({

                // step686: then we access the current state named "products" present in it here below and iterate through each product in that state using "map" here below ; and then we compare and find that which is the product there which is equal to the productId we got from the function call ; and then we update only the isFeatured property of that product based on what response we got from backend whether it was a featured product or not there.

                // step687: and in backend we had the ogic of flipping or toggling there ; so when this functions runs on clicking the star icon there ; it send response to backend , backend uses ! to make it true if it was false OR makes it false if it was true and sends the negation of it to frontend in response ; and we thus by clicking change the color of star in backend ; and it looks like we are making it featured or not featured thus here below.
                products: prevProducts.products.map((product) => 
                    product._id === productId ? {...product, isFeatured: res.data.isFeatured} : product
                ),
                // step688: also now since featuring done ; set back loading state to false here below.
                loading: false,
            }));
        }
        catch(error){
            // step689: if something went wrong ; first stop the featuring thing , so make loading false and then show a toast to the admin thus here below.

            // step690: see the next steps in step691.txt file now there.
            set({loading: false})
            toast.error(error?.response?.data?.error || "Something went wrong in toggling featured product")
        }
    },

    // step702: lets now create a function to fetch the products by category here now below.
    fetchProductsByCategory: async(category) => {
        // step703: when we are loading the producst , lets make laoding true here below.
        set({loading: true})
        
        // step704: now send a request to the endpoint to get the category using the category name recieved in input parameter and rest all toast and setting back loading back to false has same logic like done in the functions above here now.
        try{
            const res = await axiosInstance.get(`/products/category/${category}`)

            // step705: now we will set the products state with the data of products we get in response from the backend server thus here below i.e. we will be getting all the products of that category ; but also set loading to false as fetching done for now here below ; we have "res.data.products" that we are doing here below ; its because the backend will be sending in response : res.send({products}) and not res.send(products) i.e. if backend is sending an object , we access using "." here below.

            // step706: see the next steps in CategoryPage.jsx file now there.
            set({products: res.data.products , loading: false})
        }
        catch(error){
            set({error:"Something went wrong in fetching products by category" , loading: false})
            toast.error(error?.response?.data?.error || "Something went wrong in fetching products by category")
        }
    },
}))