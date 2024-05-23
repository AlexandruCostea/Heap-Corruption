import { Button, FormControl } from "@mui/material";
import { AppContext } from "../App";
import { useContext } from "react";
import { backButtonStyle, fromFieldStyle } from "../materialui-styles/MUIStyles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
    const navigate = useNavigate();
    const { token, userList, setUserList } = useContext(AppContext);
    const user = userList.find(user => user.id === token.id);
    const handleBackClick = () => {
        navigate('/posts');
    }

    const data = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password
    }

    const handleSubmit = (event) => {
        const expirationDate = new Date(token.expirationDate);
        const currentDate = new Date();
        if(expirationDate > currentDate) {
            event.preventDefault();
            axios.put('https://heapcorruptionapi-7sgauzwsja-uc.a.run.app/users/' + token.id, data)
            .then(res => {
                axios.get('https://heapcorruptionapi-7sgauzwsja-uc.a.run.app/users')
                .then(res => {
                    setUserList(res.data);
                    navigate('/posts');
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err);
            });
        }
        else {
            setToken(null);
            alert('Login expired');
        }
    }
    return (
        <>
            <Button sx={backButtonStyle} onClick={() => handleBackClick()}>Back</Button>
            <form onSubmit={handleSubmit}>
                <FormControl sx={fromFieldStyle}>
                    <label htmlFor='firstName'>First Name</label>
                    <input id='firstName' aria-describedby='my-helper-text' defaultValue={data.firstName}
                    onChange={(e) => data.firstName = e.target.value}/>
                </FormControl>
                <FormControl sx={fromFieldStyle}>
                    <label htmlFor='lastName'>Last Name</label>
                    <input id='lastName' aria-describedby='my-helper-text' defaultValue={data.lastName}
                    onChange={(e) => data.lastName = e.target.value}/>
                </FormControl>
                <Button type="submit">Submit</Button>
            </form>
        </>
    );
}

export default UserDetails;