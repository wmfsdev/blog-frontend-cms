import { useParams } from "react-router-dom";
import Login from "./Login";

const Body = () => {
    const { name } = useParams();
  
      return (
      <>
        {name === "login" ? (
          <Login />
        ) : (
          <DefaultProfile />
        )}
      </>
    );
};

export default Body