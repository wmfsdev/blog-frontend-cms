import { useLoaderData } from 'react-router-dom'
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react'

const Article = () => {

	const editorRef = useRef(null)
	const article = useLoaderData()[0]
	const token = localStorage.getItem("token");

	function handleSubmit(e) {
		e.preventDefault()
		const data = new FormData(e.target)
		console.log(data.get('content'))
		const body = data.get('content')
		const title = data.get('title')
		submitArticle(title, body)
	}

	async function submitArticle(title, body) {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/articles/:id`, {
				method: 'PUT',
				body: JSON.stringify({
					title: title,
					body: body,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				}
			})

			if (response.status === 200) {
				const value = await response.json()
				console.log(value)
			}
		} catch(err) {
			console.log(err)
		}
	}
	
	// const log = () => {
	// 	if (editorRef.current) {
	// 	  console.log(editorRef.current.getContent());
	// 	}
	// };

	return (
		<div className="article">
			<h2>Update Article</h2>
			<form action="" onSubmit={handleSubmit}>
				<Editor
					textareaName='title'
					id="1"
					apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
					onInit={(_evt, editor) => editorRef.current = editor}
					initialValue={article.title}
					init={{
						height: 100,
						menubar: false,
						statusbar: false,
						contextmenu: false,
						toolbar: false,
						content_style: 'body { font-weight:800,font-family:Helvetica,Arial,sans-serif; font-size:16px }',
						forced_root_block: 'h1'
					}}
				/>
				<Editor
					//id="test"
					textareaName='content'
					apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
					onInit={(_evt, editor) => editorRef.current = editor}
					initialValue={article.body}
					init={{
					height: 500,
					menubar: false,
					plugins: [
						'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
						'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
						'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
					],
					toolbar: 'undo redo | blocks | ' +
						'bold italic forecolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help',
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
					}}
				/>
			{/* <button onClick={log}>Log editor content</button> */}
			<button type="submit">UPDATE</button>
			</form>
		</div>
	)
}

export default Article