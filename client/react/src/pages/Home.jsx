import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react" 
import {useNavigate} from 'react-router-dom'

function Home() {

    const [posts, setPosts] = useState([]) // create a state variable to store the fetched posts
    let navigate = useNavigate() // useHistory hook to handle navigation
  useEffect(() => {
    axios.get("http://localhost:3001/posts/get").then((res) => { 
      setPosts(res.data);  // log the fetched posts to the console
    })
  }, [])
  return (
      <div>
          {posts.map((value, key) => {
        return (
            <div
            className="container"
            key={key}
            onClick={() => navigate(`post/${value._id}`)}
          >
            <div className="title">{value.title}</div>
            <div className="body">{value.content}</div>
            <div className="footer">Posted by: {value.username}</div>
          </div>
        )
      } )}
    </div>
  )
}

export default Home