// step483: lets import axios to be used here below.
import axios from 'axios'

// step484: lets create an axios instance to be used here below.
const axiosInstance = axios.create({
    // step485: baseUrl will be the base url of the backend server ; and everything there started with /api ; so lets also add that here below.

    // step486: if not in development mode ; then use the production url with '/api' at its end there ; else use the development url.
    baseURL: import.meta.mode === 'development' ? 'http://localhost:5000/api' : '/api',

    // step487: now to send cookies on every request to the backend server ; we need to set withCredentials to true here below ; and sending cookies is needed for authentication there seen in the backend folder earlier there.
    withCredentials: true,
})

// step488: now lets export the axios instance here below so that it can be used in other pages that we have in the frontend to make requests to the backend server from there.

// step489: see the next steps in step490.txt file now there.
export default axiosInstance