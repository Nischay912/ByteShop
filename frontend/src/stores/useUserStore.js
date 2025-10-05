// step491: now lets get the create function from zustand store which will be used to create a store here below.
import {create} from "zustand"

// step492: lets get the axios instance from axios.js file here below.
import axiosInstance from "../lib/axios.js"

// step493: lets get the toast to be used from its package too here below.
import { toast } from "react-hot-toast"

// step494: lets create a store for states related to user using the "create" function thus here below ; it takes "set" and "get" as parameteres ; set is used to change the state's value and get is used to get the current value of the state.

// step495: we will be able to use all these states and functions below in any of the components and pages of our app there ; by importing them from here below and then destructuring them there , like : const { user , loading , checkingAuth } = useUserStore() and so on....
export const useUserStore = create((set,get) => ({
    // step495: lets say initially the user state is null and loading state is false ; checkingAuth state will be true by default.
    user: null,
    loading: false,
    checkingAuth: true,

    // step496: now lets create a signup function to signup the user here below ; by taking the following arguments as input there , thus here below.
    signup: async ({name, email, password, confirmPassword}) => {
        // step497: as they click on signup , lets say the loading state will be true now to show the loader there for a short time there ; so set its value to be true using the "set" function thus here below.
        set({loading: true})

        // step498: now if the password and confirm password do not match , show an error message there and before returning make the loading state to false because we are returning from signup method so it will not be loading anymore there ; so set its value to false using the "set" function thus here below.
        if (password !== confirmPassword) {
            set({loading: false})
            return toast.error("Passwords do not match") 
        }

        // step499: if user passes the above check then lets send the data entered by user as a POST request to the backend server at the "/api/auth/signup" endpoint using axios instance thus here below.
        try{
            // step500: we will also have a res variable to get the response from the backend server thus here below.
            const res = await axiosInstance.post("/auth/signup", {name, email, password})
            // step501: now we will set the user state with the data of user we get in response from the backend server thus here below.

            // step502: also we will set the loading state to false now because we are returning from signup method so it will not be loading anymore there ; so set its value to false using the "set" function thus here below.
            set({user: res.data , loading: false})
            // step503: now we will show a success message to the user that he has signed up successfully thus here below.
            toast.success(res.data.message)
        }
        catch(error){
            // step504: we will set the loading state to false now because we are returning from signup method so it will not be loading anymore there ; so set its value to false using the "set" function thus here below.
            set({loading: false})

            // step505: now we will show an error message coming from the backend to the user that he has not signed up successfully thus here below ; and if no message comes from backend show the || or thing written thus here below ; put ?. so that if there is no message then it will not throw an error there in order to prevent the app to crash there.

            // step506: see the next steps in SignUpPage.jsx file now there.
            toast.error(error?.response?.data?.message || "Something went wrong in signing up")
        }
    },

    // step515: now lets create the login function , which will obviously be similar to the signup function thus here below.

    // step516: we now are taking email and password from LoginPage.jsx file independently each and not in an object { } like in signup ; so dont put { } thus here below.

    // step517: rest all is similar to the signup function thus here below.

    // step518: see the next steps in LoginPage.jsx file now there.
    login: async(email, password) => {
        set({loading: true})

        try{
            const res = await axiosInstance.post("/auth/login", {email, password})
            set({user: res.data , loading: false})
            toast.success(res.data.message)
        }
        catch(error){
            set({loading: false})
            toast.error(error?.response?.data?.message || "Something went wrong in logging in")
        }
    },

    // step530: now lets create a function to check if user is authenticated or not when we refresh a page ; so that if he is authenticated , keep him on homepage , no need to take back to login or signup page again.
    checkAuth: async() => {
        // step531: set the checkingAuth state to true as we are checking if the user is currently authenticated or not , hence so thus here below.
        set({checkingAuth: true})
        try{
            // step532: now we make a request to the profile endpoint using axios instance thus here below.
            const response = await axiosInstance.get("/auth/profile")

            // step533: if we get a non-null response from the backend server then we will set the user state with the data of user we get in response from the backend server thus here below and also make the checkingAuth state to false now because we are returning from checkAuth method so it will not be checking anymore there ; so set its value to false using the "set" function thus here below.
            if (response.data) {
                set({user: response.data, checkingAuth: false})
            }
        }
        catch(error){
            console.log(error?.message)
            // step534: now here we can say that user is not authenticated as we are returning from checkAuth method so it will not be checking anymore there ; so set its value to false using the "set" function thus here below.

            // step535: see the next steps in App.jsx file now there.
            set({user: null, checkingAuth: false})

        }
    },

    // step548: now lets create the logout function here below.
    logOut: async() => {
        try{
        // step549: make a request to the logout endpoint using axios instance thus here below.
        await axiosInstance.post("/auth/logout")

        // step550: set user to null to make it log out thus here below.
        set({user: null})

        // step551: lets show a success message to the user that he has logged out successfully thus here below.
        toast.success("Logged out successfully")
        }
        catch(error){
            // step552: if something error came , show as toast error thus here below ; use ?. so that if there is no message then it will not throw an error there in order to prevent the app to crash there.

            // step553: see the next steps in step554.txt file now there.
            toast.error(error?.response?.data?.message || "Something went wrong in logging out")
        }
    }
}))
