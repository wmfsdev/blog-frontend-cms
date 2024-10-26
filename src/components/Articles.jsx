import { Link, useLoaderData, useNavigate } from 'react-router-dom'

const Articles = () => {

    const navigate = useNavigate()
    const articles = useLoaderData()
    const token = localStorage.getItem("token");

    const handleSubmit = (e, method) => {
        const data = new FormData(e.target)
        const articleId = data.get("articleId")
        handleArticle(method, articleId)
    }

    async function handleArticle(method, articleId) {
        console.log("in article handler: ", method, articleId)
        console.log(typeof method)
        try {
            console.log("try comment DELETE")
            const response = await fetch(`${import.meta.env.VITE_API_URL}/articles/${articleId}`, {
                method: method,
                body: JSON.stringify({
                    article: articleId,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${token}`
                },
            })

        if (response.status === 200) {
            const data = await response.json()
            console.log(data)
            navigate(`/article/${articleId}`)
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
        <div className='articles'>
            <ul>
                { articles.map((article) => 
                    <li key={article.id}>
                        <Link key={article.id} to={`${article.id}`}>
                        <div className='article-post'>
                            <h2>{article.title}</h2>
                            <p>{article.body}</p>
                        </div>
                        </Link>
                        <form method="POST" onSubmit={e => {e.preventDefault(); handleSubmit(e, "PUT")}}>
                            <input type="hidden" name="articleId" value={article.id} />
                            <button name="button-test">update</button>
                        </form>
                        <form method="POST" onSubmit={e => {e.preventDefault(); handleSubmit(e, "DELETE")}}>
                            <input type="hidden" name="articleId" value={article.id} />
                            <button name="button-test">delete</button>
                        </form>
                    </li>
                )}
          </ul>
        </div>
        <div className="">
            <h1>New Post</h1>
        </div>
        </>
      )
}

export default Articles