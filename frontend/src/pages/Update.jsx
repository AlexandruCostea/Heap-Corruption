import { useParams, useNavigate } from "react-router-dom";
import PostEditForm from "../components/PostEditForm";
import { Button } from "@mui/material";
import { backButtonStyle } from '../materialui-styles/MUIStyles';
import '../App.css'
import { useContext } from "react";
import { PostsContext } from "../App";

const Update = () => {
    const { postList, _ } = useContext(PostsContext);
    const { id } = useParams();
    const post = postList.find(post => post.id == id);
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/posts');
    }
    return (
        <>
            <Button sx={backButtonStyle} onClick={() => handleBackClick()}>Back</Button>
            <PostEditForm post={post} id={id}/>
        </>
    );
}

export default Update