import { Link, useLoaderData } from 'react-router-dom'

const Articles = () => {
  
    const articles = useLoaderData()

      return (
        <>
        <div className='articles'>
            <ul>
                { articles.map((article) => 
                    <li key={article.id}>
                        <Link key={article.id} to={`article/${article.id}`}>
                        <div className='article-post'>
                            <h2>{article.title}</h2>
                            <p>{article.body}</p>
                        </div>
                        </Link>
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