import Cookies from 'js-cookie';

export async function fetchAvatar(store: any) {
    const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
    const response = await fetch(`http://c1r2s3:3000/users/avatar/${store.getters.getId}`, {headers});
    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    store.commit('setAvatar', url);
    store.dispatch('initWebSocket');
}

export default fetchAvatar;