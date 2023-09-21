import React from 'react'
import AddPost from '../components/AddPost'
import Posts from '../components/Posts'
function Home() {
  return (
    <div>
    <AddPost/>
    <hr />
    <Posts/>
    </div>
  )
}

export default Home