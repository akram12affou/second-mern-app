import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Posts.scss";
import { useCookies } from "react-cookie";

function Posts() {
  const [cookie, setCookie, removeCookie] = useCookies(["accestoken"]);
  const [loading , setLoading] = useState(false)
  const [posts, setPosts] = useState([]);
  const [savedPostsIds, setSavedPostsIds] = useState([]);
  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:1258/post").then((res) => {
      setLoading(false)
      setPosts(res.data);
    });
  }, []);

  const deletePost = (id) => {
    axios
      .delete("http://localhost:1258/post/delete-post/" + id, {
        headers: {
          token: cookie.accestoken,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };
  const showToUser = (post) => {
    return window.localStorage.getItem("userId") == post.userOwner;
  };
  const savePost = async (id) => {
    await axios
      .post(
        "http://localhost:1258/post/save-post/" + id,
        {},
        {
          headers: {
            token: cookie.accestoken,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const fetchUserSavedPosts = () => {
      axios
        .get("http://localhost:1258/post/saved-posts-ids", {
          headers: {
            token: cookie.accestoken,
          },
        })
        .then((res) => {
          setSavedPostsIds(res.data);
        });
    };
    if (cookie.accestoken) fetchUserSavedPosts();
  }, [savePost]);

  return (
    <div className="posts-container">
 
      {posts.map((post) => {
        return (
          <div key={post._id} className="post-container">
            <h2>{post.postTitle}</h2>
            <span>{post.description}</span>
            <code>By {post.username}</code>
            <center>-</center>
            {showToUser(post) && (
              <>
                <button onClick={() => deletePost(post._id)}>Delete</button>
              </>
            )}
            {savedPostsIds.indexOf(post._id) !== -1 ? (
              <button>ALREADY SAVED</button>
            ) : (
              <button onClick={() => savePost(post._id)}>Save Post</button>
            )}
          </div>
        );
      })}
      {loading && ( 
        <center>
          <h2>loading ...</h2>
        </center>
      )}
       {(!loading && posts.length==0 ) &&<center><h3>  0 posts  </h3></center>}
    </div>
  );
}

export default Posts;
