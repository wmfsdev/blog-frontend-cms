import { Link, Outlet } from "react-router-dom"

const Navigation = () => {

    return (
      <>
      <div className="navigation">
        <Link to="/articles">DASHBOARD</Link>
        <Link to="/logout">LOGOUT</Link>
      </div>
      <Outlet />
      </>
    )
}

export default Navigation