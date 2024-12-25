import { useEffect, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom'
import axios from "axios"
import './Post.css'

function Post() {
    let { id } = useParams();
    const [post, setPost] = useState([]);
    const [comment, setComment] = useState([]);
    const [commentText, setCommentText] = useState('');

    
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/get/${id}`).then((res) => {
            setPost(res.data)
        })
        
        axios.get(`http://localhost:3001/comments/get/${id}`).then((res) => {
            setComment(res.data)
        })
    }, []);

    const onSubmit = () => {
        axios
            .post("http://localhost:3001/comments/add", {
                comment: commentText,
                postId: id
            }).then((res) => {
                const commentToAdd = { comment: commentText }
                setComment([...comment, commentToAdd])
                setCommentText('')
        })
    }
    return (
        <div className='genContainer1'>
            <div className='genContainer'>
                <div className='left'>
                    <div className="title1">{post.title}</div>
                    <div className="body1">{post.content}</div>
                    <div className="footer1">Posted by: {post.username}</div>
                </div>
                <div className='right'>
                    <div className="comments">
                        <input value={commentText} types="text" placeholder="comment..." onChange={(event) => setCommentText(event.target.value)}></input>
                        <button  onClick={onSubmit} type="submit">Add Comment</button>
                    </div>
                    <div className='listOfComments'>
                        {comment.map((comment, key) => {
                            return <div
                                className="listItems"
                                key={key}>
                                {comment.comment}
                            </div>
                        }
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;