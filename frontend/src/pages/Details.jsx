import { useParams } from 'react-router-dom'
import Post from '../components/Post';
import { Box, Button } from '@mui/material';
import { backButtonStyle } from '../materialui-styles/MUIStyles';
import { useNavigate } from 'react-router-dom';
import './../App.css'
import {useContext} from 'react';
import {PostsContext} from '../App';

const Details = () => {
    const {postList, _ } = useContext(PostsContext);
    const { id } = useParams()
    const post = postList.find(post => post.id == id);
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