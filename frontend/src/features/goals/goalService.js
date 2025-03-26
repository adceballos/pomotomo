import axios from "axios"

const API_URL = 'http://localhost:5001/api/goals/'

// create new goal
const createGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`    // send in as a bearer token because it gets sent as 'bearer token'
        }
    }

    const response = await axios.post(API_URL, goalData, config)    // config contains token

    return response.data
}

// get user goals
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`    // send in as a bearer token because it gets sent as 'bearer token'
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// delete user goal
const deleteGoal = async (goalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + goalId, config)

    return response.data
}

const goalService = {
    createGoal,
    getGoals,
    deleteGoal,
}

export default goalService
