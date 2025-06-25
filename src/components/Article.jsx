import { useLoaderData, useParams } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react'

const Article = () => {

	const [ saveStatus, setSaveStatus ] = useState(false)

	const editorRef = useRef(null)
	const article = useLoaderData()[0]
	const token = localStorage.getItem("token");
	const { id } = useParams()

	function handleSubmit(e) {
		e.preventDefault()
		const data = new FormData(e.target)
		console.log(data.get('content'))
		const body = data.get('content')
		const title = data.get('title')
		submitArticle(title, body)
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
		  setSaveStatus(false);
		}, 3000);
		return () => clearInterval(intervalId);
	}, [saveStatus]); 

	async function submitArticle(title, body) {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/articles/${id}`, {
				method: 'PUT',
				body: JSON.stringify({
					title: title,
					body: body,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${token}`
				}
			})

			if (response.status === 200) {
				setSaveStatus(true)
				const value = await response.json()
				console.log("UPDATE title/body", value)
			}
		} catch(err) {
			console.log(err)
		}
	}

		const filePickerCallback = (callback, value, meta) => {

		if (meta.filetype === 'image') {
			const input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.setAttribute('accept', 'image/*');
	
			input.onchange = async function () {
				const file = this.files[0];

				if (file) {
					const formData = new FormData();
					formData.append('file', file);
					formData.append('upload_preset', 'upload_test');
					try {
						const response = await fetch(
						`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
						{
							method: 'POST',
							body: formData
						}
						);
		
						if (!response.ok) {
							throw new Error('Network response was not ok');
						}
		
						const data = await response.json();
						const imageUrl = data.secure_url;
						// Insert the uploaded image URL into TinyMCE
						callback(imageUrl, { title: file.name });
					} catch (error) {
						console.error('Error uploading image to Cloudinary:', error);
					}
				}
			};
			input.click();
		}
	}
	console.log(import.meta.env.VITE_TINYMCE_API_KEY)
	return (
		<div className="article">
			<h2>Update Article</h2>
			<form action="" onSubmit={handleSubmit}>
				<div className="title-container">
					<Editor
						textareaName='title'
						id="1"
						apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
						onInit={(_evt, editor) => editorRef.current = editor}
						initialValue={article.title}
						init={{
							height: 150,
							width: "70%",
							menubar: false,
							statusbar: false,
							contextmenu: false,
							toolbar: false,
							content_style: 'body { font-weight:800,font-family:Helvetica,Arial,sans-serif; font-size:16px }',
							forced_root_block: 'h1'
						}}
					/>
					<Editor
						textareaName='blog-thumbnail'
						apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
						onInit={(_evt, editor) => editorRef.current = editor}
						initialValue={""}  // article.thumbnail
						init={{
							image_dimensions: false,
							height: "150px",
							width: "30%",
							menubar: false,
							statusbar: false,
							contextmenu: false,
							object_resizing: false,
							resize_img_proportional: false,
							highlight_on_focus: false,
							plugins: [ 'image', 'visualblocks' ],
							visualblocks_default_state: false,
							toolbar: 'image',
							newline_behavior: 'linebreak',
							image_advtab: true,
							content_style: 'body { overflow-y:hidden; font-family:Helvetica,Arial,sans-serif; font-size:14px;  margin: 0px; }' + 'body img { outline: white; max-height: 80px; max-width: 80px;}' + '.mce-content-body img[data-mce-selected] { outline: white; }',
							file_picker_callback: filePickerCallback,
						}}
					/>
				</div>
				<Editor
					textareaName='content'
					apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
					onInit={(_evt, editor) => editorRef.current = editor}
					initialValue={article.body}
					init={{
					image_dimensions: false,
					height: 700,
					width: 900,
					menubar: false,
					plugins: [
						'image', 'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
						'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
						'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
					],
					toolbar: 'undo redo | link image | blocks | ' +
						'bold italic forecolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help',
					newline_behavior: 'default',
					image_advtab: true,
					content_style: 'body { overflow:hidden; font-family:Helvetica,Arial,sans-serif; font-size:14px; overflow-y:scroll; }' + 'img {max-width: 95%;}',
					file_picker_callback: filePickerCallback,
					}}
				/>
			<button type="submit">SAVE</button>
			{ saveStatus ? <div className='save-prompt'>SAVED</div> : null }
			
			</form>
		</div>
	)
}

export default Article