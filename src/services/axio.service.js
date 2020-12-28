import axios from 'axios'

const API_URL = "https://randomuser.me/api"

class AxioService {
    getParticipantRandon() {
        return axios.get(API_URL)
    }
}

export default new AxioService();
