import { Button, Box, TableBody, TableRow } from '@mui/material'
import EntityTable from '../components/EntityTable'
import { deleteButtonStyle, updateButtonStyle } from '../materialui-styles/MUIStyles'
import { useNavigate } from 'react-router-dom'
import MostUpvotesChart from '../components/MostUpvotesChart'
import { useContext } from 'react'
import { AppContext } from '../App'
import CreateConfig from '../utils/CreateDisplayConfig'
import axios from 'axios'


const DisplayPosts = () => {
    const {postList, setPostList, token, setToken, userList, setUserList} = useContext(AppContext);
    const navigate = useNavigate();
    const handleAddClick = () => {
        const expirationDate = new Date(token.expirationDate);
        const currentDate = new Date();
        console.log(expirationDate);
        console.log(currentDate);
        if(expirationDate > currentDate) {
            navigate('/add/post');
        }
        else {
            setToken(null);
            alert('Login expired');
        }
    }

    const handleAccountClick = () => {
        const expirationDate = new Date(token.expirationDate);
        const currentDate = new Date();
        if(expirationDate > currentDate) {
            navigate('/account');
        }
        else {
            setToken(null);
            alert('Login expired');
        }
    }

    const handleDeleteAccount = () => {
        const expirationDate = new Date(token.expirationDate);
        const currentDate = new Date();
        if(expirationDate > currentDate) {
            if(window.confirm('Are you sure you want to delete your account?')) {
                const userId = token.id;
                axios.delete('http://localhost:8080/api/users/' + userId)
                .then(res => {
                    setToken(null);
                    alert('Account deleted');
                    axios.get('http://localhost:8080/api/posts')
                    .then(res => {
                        setPostList(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    axios.get('http://localhost:8080/api/users')
                    .then(res => {
                        setUserList(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                })
                .catch(err => {
                    console.log(err);
                    alert('Account not deleted');
                });
            }
        }
        else {
            setToken(null);
            alert('Login expired');
        }
    }


    const checkPostOwner = (post, token) => {
        return post.userId === token.id;
    }

    const config = CreateConfig('title', '/update/post/', '/details/post/', 'http://localhost:8080/api/posts/', 'post')
    return (
        <>
            {
                    !token ?
                        <>
                            <Button sx={updateButtonStyle} onClick={() => navigate('/login')}>Login</Button>
                            <Box mt={2}/>
                            <Button sx={updateButtonStyle} onClick={() => navigate('/signup')}>Signup</Button>
                            <Box mt={2}/>
                        </>
                    :
                        <>
                            <Button sx={updateButtonStyle} onClick={() => setToken(null)}>Logout</Button>
                            <Box mt={2}/>
                            <Button sx={updateButtonStyle} onClick={() => handleAddClick()}>Create a new post</Button>
                            <Box mt={2}/>
                            <Button sx={updateButtonStyle} onClick={() => handleAccountClick()}>Account Details</Button>
                            <Box mt={2}/>
                            <Button sx={deleteButtonStyle} onClick={handleDeleteAccount}>Delete Account</Button>
                        </>
            }
            {
                postList.length > 0 ?
                    <>
                        <EntityTable entityList={postList} setEntityList={setPostList} config={config} checkFunction={checkPostOwner}/>
                        <Box mt={2}/>
                        <h2 className='page_title'>Users with the most upvotes</h2>
                        <MostUpvotesChart/>
                    </>
                :
                    <h2 className='page_title'>No posts found</h2>
            }
        </>
    )
}
export default DisplayPosts