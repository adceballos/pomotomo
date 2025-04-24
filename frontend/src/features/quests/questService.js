import axios from "axios"

const API_URL = 'http://localhost:5001/api/quests/'

// create new goal
const claimQuest = async (questId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + 'claim/' + questId, {}, config)

    return response.data
}

export default { claimQuest }