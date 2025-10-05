// step734: lets import the needed packages first here below.

// step735: the create function imported in order to create a zustand store for the card thus here below ; which is a store for all the states and functions related to the cart that can be used globally anywhere in our application here below across all the components and pages thus here below.
import {create} from 'zustand'
import axiosInstance from '../lib/axios'
import {toast} from 'react-hot-toast'

// step736: lets create a store using the create function , thus here below.
export const useCartStore = create((set,get) => ({
    // step737: the cart state in it will be initially empty here below.
    cart: [],

    // step738: lets then have a coupon state in cart initially null.
    coupon: null,

    // step739: and lets say the total amount of the cart is initially 0 here below.
    total: 0,

    // step740: also we will have subtotal here below ; initially 0 : "Subtotal" is the sum of item prices, while "total" is the final amount including taxes, fees, and discounts.
    subtotal: 0,

    isCouponApplied: false,
    
    // step741: now we will be having a function to get all the cart items here below.
    getCartItems: async () => {
        try{
            // step742: lets send a request to the backend server using the axios instance here below.
            const res = await axiosInstance.get("/cart");

            // step743: update the cart state with whatever response object we got from the backend server here below.
            set({cart: res.data})

            // step763: here also we will call the function to calculate the total amount of the cart here below.

            // step764: see the next steps in Navbar.jsx file now there.
            get().calculateTotal()
        }
        catch(error){
            // step744: if something goes wrong , we can show a toast error thus here below ; use ?. so that if there is no message then it will not throw an error there in order to prevent the app to crash there ; and also make the cart state to be empty thus here below.
            set({cart: []})
            toast.error(error?.response?.data?.message || "Something went wrong in getting cart items")
        }
    },

    // step745: now lets make a function to add items to the cart here below.
    addToCart: async(product) => {
        try{
            // step746: lets send a request to the backend server using the axios instance here below with the product id as a parameter there.

            // step747: since the cartController of backend had code to take {productId} as request , so pass the term as it is below "productId" and in it we pass the id of the targetted product thus here below ; So the key name must match between frontend and backend.
            await axiosInstance.post("/cart", {productId: product._id})

            // step748: after adding the product to the cart , we can show a toast success message thus here below.
            toast.success("Product added to cart successfully")

            // step749: now we will update the cart state with the new cart items thus here below.

            // step750: we know that whatever we write in this set below ; contains the current all the states and functions of the store thus here below ; so prevState is an object with all the states and functions of the zustand store thus here below.
            set((prevState) => {

                // step751: we check if the item we are adding now is already in the cart or not here below.

                // step752: since we had prevState as array of all things of store , so access it using the "." here below.
                const existingItem = prevState.cart.find((item) => item._id === product._id)

                // step753: if we have it in cart already , then we just update its quantity by 1 in the cart ; but if we don't have it , then we add that product with quantity 1 freshly new in the cart here below.
                const newCart = existingItem ?
                // step754: so if item exists , we find which object in the array of objects named "cart" matches to it , and then using "..." we spread the properties of that object and then update the quantity of that object by 1 , thus here below ; and save the new array in the newCart variable thus here below.
                    prevState.cart.map((item) => item._id === product._id ? {...item, quantity: item.quantity + 1} : item)
                    :
                    [...prevState.cart, {...product, quantity: 1}]

                    // step755: then return the new cart thus here below i.e. the cart state gets updated with the new cart thus here below.
                    return {cart: newCart}
            });
            // step762: we will call the function to calculate the total amount of the cart here below everytime a product is added to the cart thus here below.
            get().calculateTotal()
        }
        catch(error){
            toast.error(error?.response?.data?.error || "Something went wrong in adding to cart")
        }
    },

    // step756: now lets make a function to calculate the total amount of the products in the cart here below.
    calculateTotal: () => {
        // step757: get() contains object with all the states and functions of the zustand store thus here below ; but we need to get the cart and coupon states thus here below.
        const {cart, coupon} = get()

        // step757: now lets get the subtotal here below ; reduce() : It reduces an array to a single value ; it takes a callback function that we have below and a starting value that we have "0" here below.
        /*
        so, if we have : 
            const cart = [
                { id: 1, price: 100, quantity: 2 }, // total = 100*2 = 200
                { id: 2, price: 50, quantity: 1 }   // total = 50*1 = 50
            ];
        // ; then : it will start with : sum = 0 ; first item : sum = 0+(100*2) ; then sum = 200 +(50*1) ; then subtotal = 200 + 50 = 250 : we get thus here below.

        */

        // step758: so: reduce() loops through all cart items, calculates price * quantity for each, and adds it all together to get the subtotal.
        const subtotal = cart.reduce((sum,item) => sum + item.price * item.quantity, 0)

        // step759: now we have "total" as let and not const because : we will update it later thus here below ; let the initial value of "total" be the subtotal thus here below.
        let total = subtotal;

        // step760: now: if we have a non-null coupon , then we calculate the total amount after applying the discount thus here below.
        if(coupon){
            const discount = subtotal * (coupon.discountPercentage / 100);
            total = subtotal - discount;
        }

        // step761: finally update the states with the new value thus here below.
        set({subtotal, total})
    },

    // step807: lets create the function to remove an item from the cart here below ; which takes the product id as a parameter thus here below.
    removeFromCart: async(productId) => {
        try{
            // step808: lets send a request to the backend server using the axios instance here below with the product id as a parameter there ; because in the backend th esyntax of route was "/cart/:id" thus here below so send request in same format here below too.

            // await axiosInstance.delete(`/cart/${productId}`)

            // step809: but we in backend did'nt have the "/cart/:id" , but we in cart.route.js ; instead had only "/" for removefromcart ; and in the controller of it we took data from req.body ; so we need to send the product id as data here below ; thus here below ; thats why the above code is not working, hence so thus here below.
            await axiosInstance.delete(`/cart`, {data: { productId }})

            // step810: now lets update the cart state with the new cart items thus here below ; by using the filter option to now have all items except the one that we deleted i.e. all that don't match the deleted item's id will be there only in the cart thus here below and thus indirectly the product we deleted gets removed from the cart state , thus here below.
            set((prevState) => ({
                cart: prevState.cart.filter((item) => item._id !== productId)
            }))

            // step811: and since we are deleting somthing , it will affect the total amount of the cart thus here below ; so we will call the function to calculate the total amount of the cart here below.
            get().calculateTotal()
        }
        catch(error){
            toast.error(error?.response?.data?.error || "Something went wrong in removing from cart")
        }
    },

    // step812: lets create a function to update the quantity of a product in the cart here below ; which takes the product id and quantity as parameters thus here below.
    updateQuantity: async(productId, quantity) => {
        // step813: we saw that we passed quantity-1 when we did Minus in the function where it was called ; so if it was quantity 1 showing ; we did minus click ; and it sends quantity (1) (-1) i.e. (0) is sent here ; so we check there if it became 0 on doing minus ; we call the remove from cart function and remove it directly from there now.
        if(quantity === 0){
            get().removeFromCart(productId)
            return;
        }

        // step814: but if quantity is != 0 then : we can make a call to the backend endpoint to update the quantity , where it had the productId as /:id parameter in syntax there and took quantity as req.body ; so send accordingly here below.
        try{
            await axiosInstance.put(`/cart/${productId}`, {quantity})

            // step815: now update the state as well here below.
            set((prevState) => ({

                // again we know whatever we keep in set above i.e. "prevState" it will contain all the states and functions of the store thus here below ; so prevState is an object with all the states and functions of the zustand store thus here below ; so we access the cart state using the "." from the array of all states "prevState" thus here below i.e. : prevState.cart ; hence so thus here below.

                // step816: so we find the item with the id that we are updating ; and then update its quantity thus here below ; and for items that don't match the updating item , we leave it as it is "item" itself in the cart state here below.

                // step817: we sent quantity-1 and quantity+1 from there in this function because that will be the final quantity we want now to be shown ; like if user clicked + then 2 will be sent as 3 int his function and we set the quantity here to be 3 now for that product ; same for "-" too as well , hence so thus here below.
                cart: prevState.cart.map((item) => item._id === productId ? {...item, quantity} : item)
            }))
            // step818: and since we are updating somthing , it will affect the total amount of the cart thus here below ; so we will call the function to calculate the total amount of the cart here below.
            get().calculateTotal()

            // step819: see the next steps in CartPage.jsx file now there.
        }
        catch(error){
            toast.error(error?.response?.data?.error || "Something went wrong in updating quantity")
        }
    },
    // step908: lets now create the "clearCart" function here below ; where we set everything to 0 and null here below.

    // step909: see the next steps in PurchaseSuccessPage.jsx file now there.
    clearCart: async () => {
        set({cart: [], coupon: null, total:0, subtotal:0})
    },
}))