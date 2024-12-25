import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import './Createpost.css'
import * as Yup from 'yup'
import axios from "axios"
import { useState } from "react"
import {useNavigate} from'react-router-dom'

function CreatePosts() {
    const [posts, setPosts] = useState([])
    let navigate = useNavigate() // useHistory hook to handle navigation
    const initialValues = {
        title: '',
        content: '',
        username: ''
    }
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((res) => { 
            setPosts(res.data);
          })
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content is required'),
        username: Yup.string().min(3).max(15).required('Name is required')
    });

    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='form'>
                    <ErrorMessage name="title" component="span" className="error" />
                    <label>Title: </label>
                    <Field
                        id="title"
                        name="title"
                        placeholder="(Ex. Title....)" />
                    <ErrorMessage name="content" component="span" className="error" />
                    <label>Content: </label>
                    <Field
                        id="content"
                        name="content"
                        placeholder="(Ex. ....)" />
                    <ErrorMessage name="username" component="span" className="error" />
                    <label>Name: </label>
                    <Field
                        id="username"
                        name="username"
                        placeholder="(Ex. Taofeek....)" />
                    <button onClick={() => navigate("/")} type="submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreatePosts;