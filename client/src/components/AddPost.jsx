import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AddPost.scss";
function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addPost = () => {
    console.log("e");
  };

  return (
    <div className="add-post-container">
      <h3>Add Post</h3>

      <label htmlFor="" >title :</label>
      <input type="text" value={title} onChange={(e) => {
        setTitle(e.target.value)
      }}/>

      <label htmlFor="">description :</label>
      <input type="text" />
      <br />
      <button onClick={addPost}>Add Post</button>
    </div>
  );
}

export default AddPost;
