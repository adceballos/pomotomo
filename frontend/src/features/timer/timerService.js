import axios from "axios"

const API_URL = 'http://localhost:5001/api/timer/'

// start timer
const startTimer = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, {}, config)    // config contains token

    return response.data
}

// get users timer data
const getTimer = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// stop timer
const stopTimer = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL, {}, config)  // Send empty object as body since stop action doesn't require additional data

    return response.data
}

// reset timer
const resetTimer = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + 'reset', {}, config)

    return response.data
}

// full reset timer
const fullResetTimer = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + 'fullReset', {}, config)

    return response.data
}

// switch timer phase
const switchPhase = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + 'switch', {}, config)

    return response.data
}

const timerService = {
    startTimer,
    getTimer,
    stopTimer,
    resetTimer,
    fullResetTimer,
    switchPhase,
}

export default timerService
