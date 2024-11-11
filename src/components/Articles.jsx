import { Link, useLoaderData, useNavigate } from 'react-router-dom'

const Articles = () => {

    const navigate = useNavigate()
    const articles = useLoaderData()
    const token = localStorage.getItem("token");
//  console.log(articles)

    function strip(html){
        let doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

    const handleSubmit = (e, method) => {
        const data = new FormData(e.target)
        const articleId = data.get("articleId")
        const pubStatus = data.get("pubStatus") 
        handleArticle(method, articleId, pubStatus)
    }

    async function handleArticle(method, articleId, pubStatus) {
        console.log("in article handler: ", method, articleId, pubStatus)

        // turn into function??
        if (pubStatus === "true") {
            pubStatus = false
        } else if (pubStatus === "false") {
            pubStatus = true
        } else pubStatus = undefined

        try {
            console.log("try article DELETE / UPDATE")
            const response = await fetch(`${import.meta.env.VITE_API_URL}/articles/${articleId}`, {
                method: method,
                body: JSON.stringify({
                  publish: pubStatus // || undefined
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${token}`
                },
            })

        if (response.status === 200) {
            const data = await response.json()
          //  console.log(data)
         //   navigate(`/article/${articleId}`)
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
                            <input type="hidden" name="pubStatus" value={article.publish}/>
                            <button name="publish">PUBLISH STATUS</button>
                        </form>
                        <form method="POST" onSubmit={e => {e.preventDefault(); handleSubmit(e, "DELETE")}}>
                            <input type="hidden" name="articleId" value={article.id} />
                            <button name="delete">DELETE</button>
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