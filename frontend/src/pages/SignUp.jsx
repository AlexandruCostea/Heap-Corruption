import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CreateConfig from "../utils/CreateSignupConfig";
import Form from "../components/Form";
import { Button } from "@mui/material";
import { backButtonStyle } from "../materialui-styles/MUIStyles";
import { validateEntity } from "../services/EntityService";

const SignUp = () => {
    const { userList, setUserList, setToken } = useContext(AppContext);
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/posts');
    }

    const config = CreateConfig();
    return (
        <>
            <Button sx={backButtonStyle} onClick={() => handleBackClick()}>Back</Button>
            <Form entityList={userList} setEntityList={setUserList} parentEntityList={userList} validateEntity={validateEntity} config={config}/>
        </>
    )
}

export default SignUp