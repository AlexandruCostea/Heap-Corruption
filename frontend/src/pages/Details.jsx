import { useParams } from 'react-router-dom'
import Post from '../components/Post';
import { Box, Button } from '@mui/material';
import { backButtonStyle } from '../materialui-styles/MUIStyles';
import { useNavigate } from 'react-router-dom';
import './../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

const Details = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then(res => setPost(res.data))
            .catch(err => console.log(err))
    }, [id]);

    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/posts');
    }
    return (
        post ?
            <>
                <Button sx={backButtonStyle} onClick={() => handleBackClick()}>Back</Button>
                <Post post={post} />
            </>
        :
        <h2 className='page_title'>Post not found</h2>
    );
}

export default Details;