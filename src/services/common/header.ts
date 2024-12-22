import axios from 'axios'

export default function getAxios() {
    const instance: any = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        withCredentials: false,
    })

    // set common headers
    instance.defaults.headers.common['Content-Type'] = 'application/json'

    return instance
}
