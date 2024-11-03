
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react'

const Compose = () => {

	const editorRef = useRef(null)
	const token = localStorage.getItem("token");

	function handleSubmit(e) {
		e.preventDefault()
		const data = new FormData(e.target)
		console.log(data)
		const body = data.get('content')
		const title = data.get('title')
		submitArticle(title, body)
	}

	async function submitArticle(title, body) {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/test`, {
				method: 'POST',
				body: JSON.stringify({
					title: title,
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
			//   formData.append("api_key", "");
			//   formData.append("timestamp", "");
			//   formData.append("signature", "");
			//   formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
				
			  try {
				const response = await fetch(
				  `https://api.cloudinary.com/v1_1/${import.meta.env.CLOUD_NAME}/image/upload`,
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
	}}

	return (
		<div className="article">
            <h1>New Article</h1>
			<form action="" onSubmit={handleSubmit}>
				<Editor
					textareaName='title'
					id="1"
					apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
					onInit={(_evt, editor) => editorRef.current = editor}
					initialValue="This is the initial content of the editor"
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
					textareaName='content'
					id="2"
					apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
					onInit={(_evt, editor) => editorRef.current = editor}
					initialValue="<p>This is the initial content of the editor.</p>"
					init={{
						height: 500,
						menubar: false,
						plugins: [
							'image code', 'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
							'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
							'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
						],
						toolbar: 'undo redo code | link image | blocks ' +
							'bold italic forecolor | alignleft aligncenter ' +
							'alignright alignjustify | bullist numlist outdent indent | ' +
							'removeformat | help',
						content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
						file_picker_callback: filePickerCallback,
					}}
				/>
			<button onClick={log}>Log editor content</button>
			<button type="submit">submit</button>
			</form>
		</div>
	)
}

export default Compose