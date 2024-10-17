import { Link, Outlet } from "react-router-dom"

const Navigation = () => {

    return (
      <>
      <h1>CMS</h1>
      <div className="navigation">
        {/* <Link to="/">Home</Link> */}
        <Link to="/">Login</Link>
      </div>
      <Outlet />
      </>
    )
}

export default Navigation