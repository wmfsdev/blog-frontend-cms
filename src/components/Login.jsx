import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {

	const [ error, setError ] = useState(false)
	const navigate = useNavigate()

	function handleSubmit(e) {
		e.preventDefault()
		const data = new FormData(e.target)
		const username = data.get("username")
		const password = data.get("password")
		login(username, password)
	}

	async function login(username, password) {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/login-form`, {
				method: "POST",
				body: JSON.stringify({
					username: username,
					password: password,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
			if (response.status === 401) {
				const unauth = await response.json()
				setError(unauth[0].message)
				return
			}
			if (response.status === 200) {
				const token = await response.json()
				const key = Object.keys(token)
				const value = Object.values(token)
				localStorage.setItem(key, value)
				navigate("/articles")
			} else {
				const errors = await response.json()
				setError(errors[0].msg)
			}
		} catch(err) {
			console.log("catch err")
			console.log(err)
		}
	}

	return (
		<div className="login">
			<h1>Login</h1>
			<form method="post" onSubmit={handleSubmit}>
				<label htmlFor="username">Username
				<input name="username" type="text" required={true} /></label>
				<label htmlFor="password">Password
				<input name="password" type="password" required={true} /></label>
				<button type="submit">submit</button>
			</form>
			{ error && <p>{error}</p> }
		</div>    
	)
}

export default Login