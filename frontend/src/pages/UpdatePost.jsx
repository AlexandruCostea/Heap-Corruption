import { useParams, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { Button } from "@mui/material";
import { backButtonStyle } from '../materialui-styles/MUIStyles';
import '../App.css'
import { useContext } from "react";
import { AppContext } from "../App";
import CreateConfig from "../utils/UpdatePostConfig";
import { validateEntity } from "../services/EntityService";
import { updateEntity } from "../services/EntityService";

const UpdatePost = () => {
    const { postList, setPostList, userList } = useContext(AppContext);
    const navigate = useNavigate();

    const { id } = useParams();
    const post = postList.find(post => post.id === parseInt(id));

    const handleBackClick = () => {
        navigate('/posts');
    }

    const config = CreateConfig(id, post);

    return (
        <>
            <Button sx={backButtonStyle} onClick={() => handleBackClick()}>Back</Button>
            <Form entityList={postList} setEntityList={setPostList} parentEntityList={userList} updateEntity={updateEntity} validateEntity={validateEntity} config={config} entity={post} id={id}/>
        </>
    )
}

export default UpdatePost;