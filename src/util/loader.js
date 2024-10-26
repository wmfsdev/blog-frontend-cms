
// get all articles
export async function articlesLoader() {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/articles`, { 
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${token}`
            },
        })
        const data = await response.json()
        return data
    } catch(err) {
        return err
    }
}