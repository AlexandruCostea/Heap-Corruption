import { Button, FormControl, InputLabel, Input, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { backButtonStyle } from "../materialui-styles/MUIStyles";
import { fromFieldStyle } from "../materialui-styles/MUIStyles";
import CryptoJS from "crypto-js";
import axios from 'axios'
import { AppContext } from "../App";
import { useContext } from "react";

const Login = () => {
    const {token, setToken} = useContext(AppContext);
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/posts');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        const hashedPassword = CryptoJS.SHA256(password).toString();

        axios.post('http://localhost:8080/api/auth/' + username + '/' + hashedPassword)
        .then(res => {
            if(res.data.authenticated) { 
                const token = JSON.parse(res.data.token);
                token.id = parseInt(token.id);
                setToken(token);
                navigate('/posts');
            } else {
                alert('Invalid username or password');
            }
        })
        .catch(err => alert('Invalid password'));
    }

    return (
        <>
            <Button sx={backButtonStyle} onClick={() => handleBackClick()}>Back</Button>
            <form onSubmit={handleSubmit}>
                <FormControl sx={fromFieldStyle}>
                    <InputLabel htmlFor='username'>Username</InputLabel>
                    <Input id='username' aria-describedby='my-helper-text'/>
                </FormControl>
                <Box mt={2}/>
                <FormControl sx={fromFieldStyle}>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input id='password' aria-describedby='my-helper-text'/>
                </FormControl>
                <Button type="submit">Login</Button>
            </form>
        </>
    )
}

export default Login