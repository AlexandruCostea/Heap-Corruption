import PostSubmitForm from "../components/PostSubmitForm"
import { Button } from "@mui/material"
import { backButtonStyle } from "../materialui-styles/MUIStyles"
import { useNavigate } from "react-router-dom"

const Add = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/posts');
    }
    return (
        <> 
            <Button sx={backButtonStyle} onClick={() => handleBackClick()}>Back</Button>
            <PostSubmitForm/>
        </>
    )
}

export default Add