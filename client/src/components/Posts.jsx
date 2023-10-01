import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Posts.scss";
import { useFetch } from "../hooks/useFetch";
import { useCookies } from "react-cookie";
import { useGetUserInfo } from "../hooks/getUserInfo";
function Posts() {
  const userId = JSON.parse(useGetUserInfo())?._id
  const [cookie, _] = useCookies(["accestoken"]);
  const [savedPostsIds, setSavedPostsIds] = useState([]);
  const {loading , data } = useFetch("http://localhost:1258/post")
  const deletePost = (id) => {
    axios
      .delete("http://localhost:1258/post/delete-post/" + id , {
        headers: {
          token: cookie.accestoken,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };
  const showToUser = (post) => {
    return userId == post.userOwner;
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
      setRun(!run)
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
  },[data])
  return (
    <div className="posts-container">
      {data.map((post) => {
        return (
          <div key={post._id} className="post-container">
            <h2>{post.postTitle}</h2>
            <span>{post.description}</span>
            <code>By {post.username}</code>
            <br />
            {showToUser(post) && (
              <>
                <button onClick={() => deletePost(post._id)}>Delete</button>
              </>
            )}{
              cookie.accestoken && ( savedPostsIds.indexOf(post._id) !== -1 ? (
              <button>ALREADY SAVED</button>
            ) : (
           <button onClick={() => savePost(post._id)}>Save Post</button>
            ))
            }
           
          </div>
        );
      })}
      {loading && ( 
        <center>
          <h2>loading ...</h2>
        </center>
      )}
       {(!loading && data.length==0 ) &&<center><h3>  0 posts  </h3></center>}
    </div>
  );
}

export default Posts;
