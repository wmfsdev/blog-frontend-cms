
import App from "./App"
import Body from "./components/Body"
import Login from "./components/Login"
import Articles from "./components/Articles"
import { articlesLoader } from "./util/loader"


const routes = [
    {
        path: "/",
        element: <App />,
        children: [
        //  { path: "/", element: <Login /> },
        //  { path: "/:name", element: <Body /> },
           
        ]
    },
     { path: "/articles", loader: articlesLoader, element: <Articles /> }
]

export default routes