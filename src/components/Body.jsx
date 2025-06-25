import { useParams } from "react-router-dom";
import Articles from "./Articles";

const Body = () => {
  const { name } = useParams();

  return (
    <>
      {name === "articles" ? (
        <Articles />
      ) : (
        <DefaultProfile />
      )}
    </>
  );
};

export default Body