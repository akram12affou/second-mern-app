import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useFetch } from "../hooks/useFetch";
import axios from "axios";
import '../styles/SavedPost.scss'
function savedPosts() {
  const {loading , data } = useFetch("http://localhost:1258/post/saved-posts")
  const [cookie, _] = useCookies(["accestoken"]);
  const removeSavedPost = (id) => {
    axios.delete(`http://localhost:1258/post/delete-saved-post/${id}`, {
      headers: {
        token: cookie.accestoken,
      },
    }).then(res => {
      console.log(res)
    })
  }
  return (
    <>
    <center><h2>Saved Posts</h2></center>
    <div className="savedPost-container">   
      
      {data.map((post) => {
        return (
          <div key={post._id} className="post-container">
            <h2>{post.postTitle}</h2>
            <span>{post.description}</span>
            <code>By {post.userOwner}</code>
            <br />
            <button onClick={() => removeSavedPost(post._id)}>remove</button>
          </div>
        );
      })}
      {loading && <center><h2>loading...</h2></center>}
      {(!loading && data.length==0 ) &&<center><h3>  0 posts  </h3></center>}
    </div>
    </>

  );
}

export default savedPosts;
