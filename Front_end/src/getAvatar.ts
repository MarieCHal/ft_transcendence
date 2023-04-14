import axios from 'axios';
import router from './router';


export async function getAvatar(store: any, id: any) {//params token pas obligatoire, il se trouve dans le store
    try {
        const headers = { Authorization: `Bearer ${store.getters.getToken}` };
        const response = await axios.get(`/users/avatar/${id}`, {
            headers,
            responseType: 'arraybuffer'
          });
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;    
    } catch (error) {
        store.commit('setError', error);
        router.push('/error');
    }
}

export default getAvatar;