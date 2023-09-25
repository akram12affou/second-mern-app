import React , {useEffect , useState} from 'react'
import axios from 'axios'
import '../styles/Posts.scss'
import { useCookies } from "react-cookie";

function Posts() {
  const [cookie, setCookie, removeCookie] = useCookies(["accestoken"]);

    const [posts , setPosts] = useState([])
    useEffect(() => {
        axios.get('http://localhost:1258/post').then(res => {
            setPosts(res.data)
        })
    },[])
    const deletePost = (id) => {
      axios.delete('http://localhost:1258/post/delete-post/'+id,{
        headers : {
          token : cookie.accestoken
        }}).then((res) => {
        console.log(res)
      })
    }
    const showToUser = (post) => {
     return window.localStorage.getItem('userId')==post.userOwner
    }
  return (
    <div className='posts-container'>
         {posts.map(post => {
            return(
               <div key={post._id} className='post-container'>
                  <h2>{post.postTitle}</h2>
                  <span>{post.description}</span>
                  <code>By {post.userOwner}</code>
                   <center>-</center>
                 {showToUser(post)&&<button onClick={()=>deletePost(post._id)}>Delete</button>}
                </div>
            )
         }) }
    </div>
  )
}

export default Posts