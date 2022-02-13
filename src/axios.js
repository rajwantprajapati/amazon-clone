import axios from "axios";

const instance = axios.create({
    baseURL: 'https://us-central1-clone-e6a4b.cloudfunctions.net/api',
    //  'http://localhost:5001/clone-e6a4b/us-central1/api',
});

export default instance;