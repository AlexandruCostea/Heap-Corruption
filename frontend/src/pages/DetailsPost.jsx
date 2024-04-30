import { useParams } from 'react-router-dom'
import Details from '../components/Details';
import { Box, Button } from '@mui/material';
import { backButtonStyle } from '../materialui-styles/MUIStyles';
import { useNavigate } from 'react-router-dom';
import './../App.css';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { AppContext } from '../App';

const DetailsPost = () => {
    const {userList} = useContext(AppContext);
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [displayedPost, setDisplayedPost] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:8080/api/posts/${id}`)
            .then(res => {
                setPost(res.data)
                setDisplayedPost(
                    {
                        title: res.data.title,
                        username: userList.find(user => user.id === res.data.userId).username,
                        datePosted: res.data.datePosted,
                        description: res.data.description,
                        upvotes: res.data.upvotes
                    }
                )
            })
            .catch(err => console.log(err))
    }, [id]);

    const navigate = useNavigate();
    const colSpanList = [2, 1, 1, 2, 1];
    const handleBackClick = () => {
        navigate('/posts');
    }
    return (
        post ?
            <>
                <Button sx={backButtonStyle} onClick={() => handleBackClick()}>Back</Button>
                <Details entity={displayedPost} colSpanList={colSpanList} />
            </>
        :
        <h2 className='page_title'>Post not found</h2>
    );
}

export default DetailsPost;