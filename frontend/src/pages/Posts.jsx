import { Button, Box } from '@mui/material'
import PostTable from '../components/PostTable'
import { updateButtonStyle } from '../materialui-styles/MUIStyles'
import { useNavigate } from 'react-router-dom'
import MostUpvotesChart from '../components/MostUpvotesChart'
import { useContext } from 'react'
import { PostsContext } from '../App'


const Posts = () => {
    const {postList, _ } = useContext(PostsContext);
    const navigate = useNavigate();
    const handleAddClick = () => {
        navigate('/add/post');
    }
    return (
        <>
            <Button sx={updateButtonStyle} onClick={() => handleAddClick()}>Create a new post</Button>
            <Box mt={2}/>
            {
                postList.length > 0 ?
                    <PostTable/>
                :
                    <h2 className='page_title'>Womp Womp</h2>
            }
            <Box mt={2}/>
            <h2 className='page_title'>Users with the most upvotes</h2>
            <MostUpvotesChart/>
        </>
    )
}
export default Posts