import { Button, Box } from '@mui/material'
import EntityTable from '../components/EntityTable'
import { updateButtonStyle } from '../materialui-styles/MUIStyles'
import { useNavigate } from 'react-router-dom'
import MostUpvotesChart from '../components/MostUpvotesChart'
import { useContext } from 'react'
import { AppContext } from '../App'
import CreateConfig from '../utils/CreateDisplayConfig'


const DisplayPosts = () => {
    const {postList, setPostList } = useContext(AppContext);
    const navigate = useNavigate();
    const handleAddClick = () => {
        navigate('/add/post');
    }

    const config = CreateConfig('title', '/update/post/', '/details/post/', 'http://localhost:8080/api/posts/', 'post')
    return (
        <>
            <Button sx={updateButtonStyle} onClick={() => handleAddClick()}>Create a new post</Button>
            <Box mt={2}/>
            {
                postList.length > 0 ?
                    <>
                        <EntityTable entityList={postList} setEntityList={setPostList} config={config}/>
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