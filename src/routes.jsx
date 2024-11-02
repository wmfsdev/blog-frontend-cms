
import App from "./App"
import Body from "./components/Body"
import Login from "./components/Login"
import Articles from "./components/Articles"
import Article from "./components/Article"
import Compose from "./components/Compose"
import { articlesLoader, articleLoader } from "./util/loader"


const routes = [
    {
        path: "/",
        element: <App />,
        children: [
        //  { path: "/", element: <Login /> },
        //  { path: "/:name", element: <Body /> }, 
        ]
    },
    { path: "/articles", loader: articlesLoader, element: <Articles /> },
    { path: "/articles/:id", loader: articleLoader, element : <Article /> },
    { path: "/articles/compose", element: <Compose /> }
]

export default routes