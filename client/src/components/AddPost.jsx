import React, { useEffect, useState } from "react";
import axios from "axios";
import { PostContext } from "../Context/PostContext";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import "../styles/AddPost.scss";
function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cookie,_] = useCookies(["accestoken"]);
  const {posts , dispatch } = useContext(PostContext)
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
        dispatch({type:'ADD_POST',payload:res.data})
      }).catch(err => {
        console.log(err.response.data.message)
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
