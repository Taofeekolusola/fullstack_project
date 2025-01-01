import { useEffect, useState, useContext } from 'react';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Post.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './helpers/AuthContext';

function Post() {
    let { id } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);  // Renamed to comments
    const [commentText, setCommentText] = useState('');
    const { authState } = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (!authState.status) {
          navigate("/login");
        } else {
          // Fetch data
          axios.get(`http://localhost:3002/posts/get/${id}`).then((res) => {
            setPost(res.data);
          });
      
          axios.get(`http://localhost:3002/comments/get/${id}`).then((res) => {
            setComments(res.data);
          });
        }
      }, [id, authState.status]); // Ensure this includes authState.status
      
    const onSubmit = () => {
        axios
            .post(
                "http://localhost:3002/comments/add",
                {
                    comment: commentText,
                    postId: id,
                },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            )
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.error);
                } else {
                    // Use the response to get the full comment object (including _id)
                    const newComment = {
                        comment: commentText,
                        username: res.data.username,
                        _id: res.data._id, // Ensure _id is returned and added to the comment
                    };
                    setComments([...comments, newComment]); // Add the new comment with _id
                    setCommentText(''); // Clear the input field
                }
            })
            .catch((error) => {
                console.error("Error adding comment:", error);
                alert("An error occurred while adding the comment.");
            });
    };

    const deleteComment = (commentId) => {
        // Ensure commentId is valid before attempting deletion
        if (!commentId) {
            console.error('No comment ID provided');
            return;
        }

        // Optimistically update the state before making the API call
        const updatedComments = comments.filter((comment) => comment._id !== commentId);
        setComments(updatedComments); // Update state immediately

        axios
            .delete(`http://localhost:3002/comments/del/${commentId}`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                if (res.data.error) {
                    // If deletion failed, revert state to previous state
                    alert(res.data.error);
                    setComments(comments); // Revert to previous state
                }
            })
            .catch((error) => {
                console.error("Error deleting comment:", error);
                alert("An error occurred while deleting the comment.");
                // Revert to previous state if error occurs
                setComments(comments);
            });
    };

    return (
        <div className='genContainer'>
            <div className='left'>
                <div className="title1">{post.title}</div>
                <div className="body1">{post.content}</div>
                <div className="footer1">Posted by: {post.username}</div>
            </div>
            <div className='right'>
                <div className="comments">
                    <input
                        value={commentText}
                        type="text"
                        placeholder="comment..."
                        onChange={(event) => setCommentText(event.target.value)}
                    />
                    <button onClick={onSubmit} type="submit" className='addComment'>
                        Add Comment
                    </button>
                </div>
                <div className='listOfComments'>
    {comments.length === 0 ? (
        <p>No comments added yet</p>  // Display message when no comments
    ) : (
        comments.map((comment, key) => (
            <div className="listItems" key={key}>
                <label className='username'>{comment.username}'s comment</label>
                "{comment.comment}"
                {/* Ensure _id is valid and available */}
                {authState.username === comment.username && (
                    <button
                        onClick={() => deleteComment(comment._id)}
                        className="delete"
                    >
                        X
                    </button>
                        )}
                    </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}

export default Post;