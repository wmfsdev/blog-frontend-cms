import { Link, useLoaderData, useNavigate } from 'react-router-dom'

import DOMPurify from 'dompurify';

const Articles = () => {

    const navigate = useNavigate()
    const articles = useLoaderData()
    const token = localStorage.getItem("token");

    function strip(html){
        let doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

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
                            <h2>{strip(article.title)}</h2>
                            <p>{strip(article.body)}</p>
                        </div>
                        </Link>
                        <form method="POST" onSubmit={e => {e.preventDefault(); handleSubmit(e, "PUT")}}>
                            <input type="hidden" name="articleId" value={article.id} />
                            <button name="button-test">PUBLISH STATUS</button>
                        </form>
                        <form method="POST" onSubmit={e => {e.preventDefault(); handleSubmit(e, "DELETE")}}>
                            <input type="hidden" name="articleId" value={article.id} />
                            <button name="button-test">DELETE</button>
                        </form>
                    </li>
                )}
          </ul>
        </div>
        <div className="">
            <Link to={'compose'}>New Article</Link>
        </div>
        </>
      )
}

export default Articles