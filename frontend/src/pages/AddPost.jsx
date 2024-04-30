import  Form from "../components/Form"
import { Button } from "@mui/material"
import { backButtonStyle } from "../materialui-styles/MUIStyles"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../App"
import { validateEntity } from "../services/EntityService"
import { useContext } from "react"
import  CreateConfig  from "../utils/CreatePostConfig"

const AddPost = () => {
    const { postList, setPostList, userList } = useContext(AppContext);
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/posts');
    }

    const config = CreateConfig();

    return (
        <> 
            <Button sx={backButtonStyle} onClick={() => handleBackClick()}>Back</Button>
            <Form entityList={postList} setEntityList={setPostList} parentEntityList={userList} validateEntity={validateEntity} config={config}/>
        </>
    )
}

export default AddPost