
import App from "./App"
import Articles from "./components/Articles"
import Article from "./components/Article"
import Compose from "./components/Compose"
import Navigation from "./components/Navigation"
import { articlesLoader, articleLoader } from "./util/loader"


const routes = [
    {
        path: "/",
        element: <App />,
    },
    { 
        path: "/articles", 
        element: <Navigation />,
        children: [
            { path: "/articles", loader: articlesLoader, element: <Articles /> },
            { path: "/articles/:id", loader: articleLoader, element : <Article /> },
            { path: "/articles/compose", element: <Compose /> }
        ]
    },
]

export default routes