
// get all articles
export async function articlesLoader() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/articles`, { mode: 'cors' }) 
        const data = await response.json()
        return data
    } catch(err) {
        return err
    }
}