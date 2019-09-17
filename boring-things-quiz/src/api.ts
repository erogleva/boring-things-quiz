import axios from 'axios';

const backend: string = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:1337';

export async function likeObject(id: string) {
    return await axios.put(`${backend}/museumobjects/${id}/like`, {})
}

export async function dislikeObject(id: string) {
    return await axios.put(`${backend}/museumobjects/${id}/dislike`, {})
}

export async function getObjects() {
    const res = await axios.get(`${backend}/museumobjects`);
    const data = res.data;

    return data.map((obj: any) => {
        return {...obj, src: `${backend}${obj.image.url}`}
    });
}

