import axios from 'axios';

const backend = 'https://boring-things-api.herokuapp.com/items/';

export async function likeObject(id: string) {
    return await axios.put(`${backend}/${id}/like`, {})
}

export async function dislikeObject(id: string) {
    return await axios.put(`${backend}/${id}/dislike`, {})
}

