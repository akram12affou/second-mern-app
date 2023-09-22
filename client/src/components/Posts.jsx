import React , {useEffect , useState} from 'react'
import axios from 'axios'
import '../styles/Posts.scss'
function Posts() {
    const [posts , setPosts] = useState([])
   //  useEffect(() => {
   //      axios.get('http://localhost:1258/post').then(res => {
   //          setPosts(res.data)
   //          console.log(res.data)
   //      })
   //  },[])
   
  return (
    <div className='posts-container'>
         {posts.map(post => {
            return(
               <div key={post._id} className='post-container'>
                  <h2>{post.title}</h2>
                  <span>{post.description}</span>
                  <code>By {post.userOwner}</code>
               </div>
            )
         }) }
    </div>
  )
}

export default Posts