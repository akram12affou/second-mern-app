import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
function savedPosts() {
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie, removeCookie] = useCookies(["accestoken"]);
  const [savedPost, setSavedPosts] = useState([]);
  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:1258/post/saved-posts", {
        headers: {
          token: cookie.accestoken,
        },
      })
      .then((res) => {
        setSavedPosts(res.data);
        setLoading(false)
      });
  }, []);
  const removeSavedPost = (id) => {
    axios.delete('http://localhost:1258/post/delete-saved-post/' + id, {
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
      
      {savedPost.map((post) => {
        return (
          <div key={post._id} className="post-container">
            <h2>{post.postTitle}</h2>
            <span>{post.description}</span>
            <code>By {post.userOwner}</code>
            <center>-</center>
            <button onClick={() => removeSavedPost(post._id)}>remove</button>
          </div>
        );
      })}
      {loading && <center><h2>loading...</h2></center>}
      {(!loading && savedPost.length==0 ) &&<center><h3>  0 posts  </h3></center>}
    </>
  );
}

export default savedPosts;
