import { Link, Outlet } from "react-router-dom"

const Navigation = () => {

  function logOut() {
    localStorage.clear()
  }

    return (
      <>
      <div className="navigation">
        <Link to="/articles">DASHBOARD</Link>
        <Link to="/" onClick={logOut}>LOGOUT</Link>
      </div>
      <Outlet />
      </>
    )
}

export default Navigation