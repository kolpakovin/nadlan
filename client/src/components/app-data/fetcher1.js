import axios from 'axios';

const fetcher1 = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

export default fetcher1;