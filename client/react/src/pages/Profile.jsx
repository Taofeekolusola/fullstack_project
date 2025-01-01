import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from './helpers/AuthContext';

function Profile() {
    let { id } = useParams();
    const [username, setUsername] = useState("");
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3002/users/get/${id}`)
            .then((res) => {
                setUsername(res.data.user.username);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });
    }, [id]);
    
  return (
      <div className='profileContainer'>
          <div className='basicInfo'>
              {""}
              <h1>Username: {username} </h1>
              { authState.username === username && <button>Change Password</button>}
          </div>
          <div className='listOfPosts'></div>
    </div>
  )
}

export default Profile