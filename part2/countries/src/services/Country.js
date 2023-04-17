import axios from 'axios';

const getAll = () => {
    const request = axios.get('https://restcountries.com/v3.1/all')
    return request.then((response) => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll}