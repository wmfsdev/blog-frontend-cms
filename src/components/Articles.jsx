
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import PubButton from './PubButton';   

const Articles = () => {

    const navigate = useNavigate()
    const articles = useLoaderData()
    const token = localStorage.getItem("token");

    function strip(html){
        let doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent.slice(0, 200) || "";
    }

    const handleSubmit = (e, method) => {
        const data = new FormData(e.target)
        const articleId = data.get("articleId")
        const pubStatus = data.get("pubStatus")
        handleArticle(method, articleId, pubStatus)
    }

    async function handleArticle(method, articleId, pubStatus) {
        if (pubStatus === "true") {
            pubStatus = true
        } else if (pubStatus === "false") {
            pubStatus = false
        } else pubStatus = undefined

        try {
            console.log("try article DELETE / UPDATE")
            const response = await fetch(`${import.meta.env.VITE_API_URL}/articles/${articleId}`, {
                method: method,
                body: JSON.stringify({
                  publish: pubStatus
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${token}`
                },
            })

        if (response.status === 200) {
            const data = await response.json()
            navigate(`/articles`) 
        }

        if (response.status === 401) {
            throw err
        }

        } catch(err) {
            console.log(err)
        }
    }
          
      return (
        <>
        <div className="new-post">
            <Link to={'compose'}>COMPOSE NEW POST</Link>
        </div>
        <div className='articles'>
            <ul>
                { articles.map((article) => 
                    <li key={article.id}>
                        <Link key={article.id} to={`${article.id}`}>
                        <div className='article-post'>
                            <h2>{strip(article.title.toUpperCase())}</h2>
                            <p>{strip(article.body)}</p>
                        </div>
                        </Link>
                        <div className='form-wrapper'>
                        <PubButton
                            handleSubmit={handleSubmit}
                            article={article}
                        />
                        <form method="POST" onSubmit={e => {e.preventDefault(); handleSubmit(e, "DELETE")}}>
                            <input type="hidden" name="articleId" value={article.id} />
                            <button name="delete">DELETE</button>
                        </form>
                        </div>
                    </li>
                )}
          </ul>
        </div>

        </>
      )
}

export default Articles