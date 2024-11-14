import { useState } from "react";

const PubButton = ({ handleSubmit, article }) => { // 

  const [ pubStatus, setPubStatus ] = useState(article.publish)

  return (
    <form method="POST" onSubmit={e => {e.preventDefault(); handleSubmit(e, "PUT")}}>
      <input type="hidden" name="articleId" value={article.id} />
      <input type="hidden" name="pubStatus" value={pubStatus}/>
      <button name="publish" onClick={() => setPubStatus(!pubStatus)}>{pubStatus ? "UN-PUBLISH" : "PUBLISH"}</button>
    </form>
  ) 
}

export default PubButton