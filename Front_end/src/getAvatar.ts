

export async function getAvatar(store: any, id: any) {//params token pas obligatoire, il se trouve dans le store
    try {
        const headers = { Authorization: `Bearer ${store.getters.getToken}` };
        const response = await fetch(`http://c1r2s3:4000/users/avatar/${id}`, {headers});
        const arrayBuffer = await response.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;    
    } catch (error) {
        alert(error)
    }
}

export default getAvatar;