
import App from "./App"
import Body from "./components/Body"
import Login from "./components/Login"


const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/:name", element: <Body /> },
        ]
    }
]

export default routes