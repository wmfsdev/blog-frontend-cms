
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react'

const Compose = () => {

	const editorRef = useRef(null)
	const token = localStorage.getItem("token");

	function handleSubmit(e) {
		e.preventDefault()
		const data = new FormData(e.target)
		console.log(data.get('content'))
		// const body = data.get('content')
		const body = `<img src="" onError='alert("you were hacked")'/>`
		//console.log(editorRef.current.getContent())
		//console.log(e)
		submitArticle(body)
	}

	async function submitArticle(body) {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/test`, {
				method: 'POST',
				body: JSON.stringify({
                    body: body
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
	
	const log = () => {
		if (editorRef.current) {
		  console.log(editorRef.current.getContent());
		}
	};

	return (
		<div className="article">
            <h1>New Article</h1>
			<form action="" onSubmit={handleSubmit}>
				<Editor
					textareaName='content'
					apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
					onInit={(_evt, editor) => editorRef.current = editor}
					initialValue="<p>This is the initial content of the editor.</p>"
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
			<button onClick={log}>Log editor content</button>
			<button type="submit">submit</button>
			</form>
		</div>
	)
}

export default Compose