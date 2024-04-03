import { FormControl, InputLabel, Input, Box, Button } from "@mui/material";
import { useState } from "react";
import { fromFieldStyle } from "../materialui-styles/MUIStyles";
import { useNavigate } from "react-router-dom";
import { useContext} from "react";
import { PostsContext } from "../App";
import axios from "axios";

const PostSubmitForm = ({pos}) => {
    const { postList, setPostList } = useContext(PostsContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: pos,
        username: "",
        title: "",
        description: "",
        upvotes: "",
        date: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        for (const key in formData) {
            if (formData[key] === "") {
                alert("All fields are required");
                return;
            }
        }
        if (isNaN(formData.upvotes)) {
            alert("Upvotes must be a number");
            return;
        }
        formData.upvotes = parseInt(formData.upvotes);
        const date = new Date(formData.date);
        if (isNaN(date.getTime())) {
            alert("Date must be a valid date");
            return;
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date) || date > new Date() || date.getFullYear() < 2022) {
            alert("Date must be in the format YYYY-MM-DD, not in the future, and not before 2022");
            return;
        }
        axios.post('http://localhost:3000/posts', formData)
            .then(setPostList([...postList, formData]))
            .catch(err => console.log(err));
        navigate('/posts')
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl sx={fromFieldStyle}>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="username" aria-describedby="my-helper-text"
                 onChange={(e) => setFormData({ ...formData, username: e.target.value })}/>
            </FormControl>
            <Box mt={2}/>
            <FormControl sx={fromFieldStyle}>
                <InputLabel htmlFor="title">Post title</InputLabel>
                <Input id="title" aria-describedby="my-helper-text"
                onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </FormControl>
            <Box mt={2}/>
            <FormControl sx={fromFieldStyle}>
                <InputLabel htmlFor="description">Post description</InputLabel>
                <Input id="description" aria-describedby="my-helper-text"
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </FormControl>
            <Box mt={2}/>
            <FormControl sx={fromFieldStyle}>
                <InputLabel htmlFor="upvotes">Upvotes</InputLabel>
                <Input id="upvotes" aria-describedby="my-helper-text"
                onChange={(e) => setFormData({ ...formData, upvotes: e.target.value })} />
            </FormControl>
            <Box mt={2}/>
            <FormControl sx={fromFieldStyle}>
                <InputLabel htmlFor="date">Date</InputLabel>
                <Input id="date" aria-describedby="my-helper-text"
                 onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </FormControl>
            <Box mt={2}/>
            <Button type="submit">Submit</Button>
        </form>
    )
}

export default PostSubmitForm;