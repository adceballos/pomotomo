import axios from "axios"

const API_URL = 'http://localhost:5001/api/shop/'

// create new goal
const purchaseItem = async (itemId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + 'purchase/' + itemId, {}, config)

    return response.data
}

export default { purchaseItem }
