import { useLoaderData } from 'react-router-dom'

const Article = () => {

	const article = useLoaderData()[0]
	const token = localStorage.getItem("token");
	console.log(article)
	return (
		<div className="article">
			<h2>{article.title}</h2>
			<p>{article.body}</p>
		</div>
	)
}

export default Article