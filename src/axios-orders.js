import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-build-50d0a-default-rtdb.firebaseio.com/'
});

export default instance;