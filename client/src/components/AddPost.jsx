import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "../styles/AddPost.scss";
function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cookie,_] = useCookies(["accestoken"]);

  const addPost = () => {
   
    axios
      .post(
        "http://localhost:1258/post/add-post",
        { title, description }, {
          headers : {
            token : cookie.accestoken
          }}
      )
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div className="add-post-container">
      <h3>Add Post</h3>
      <label htmlFor="">title :</label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <label htmlFor="">description :</label>
      <input
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
    {cookie.accestoken ? <button onClick={addPost}>Add Post</button> :
    <code>connect to add your posts</code>
    }
    </div>
  );
}

export default AddPost;
