import axios from 'axios';

const backend = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:5000';

export async function likeObject(id: string) {
    return await axios.put(`${backend}/items/${id}/like`, {})
}

export async function dislikeObject(id: string) {
    return await axios.put(`${backend}/items/${id}/dislike`, {})
}

