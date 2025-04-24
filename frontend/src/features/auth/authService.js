// AuthService handles HTTP requests (register, login, logout) and manages local storage

// make http request and send back data from local storage
import axios from 'axios'

// base URL for user-related API endpoints
const API_URL = 'http://localhost:5001/api/users/'

// register user
// takes in userData, which contains data like email, password, etc
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)    // make a post request and put response in response variable accessed through .data

    // stores user data in local storage so the user stays logged in even after refreshing
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    // return user data to be used in redux 
    return response.data
}

// login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// get users data
const getMe = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + 'me', config)

    return response.data
}

// logout user
const logout = () => {
    localStorage.removeItem('user')
}

// put any functions we want to export here
const authService = {
    register,
    logout,
    login,
    getMe,
}

export default authService