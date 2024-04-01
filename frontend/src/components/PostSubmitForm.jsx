import { FormControl, InputLabel, Input, Box, Button } from "@mui/material";
import { useState } from "react";
import { fromFieldStyle } from "../materialui-styles/MUIStyles";
import { useNavigate } from "react-router-dom";
import { useContext} from "react";
import { PostsContext } from "../App";
import { onAddPost } from "../services/PostService";

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
        const date = new Date(formData.date);
        if (isNaN(date.getTime())) {
            alert("Date must be a valid date");
            return;
        }
        onAddPost(postList, setPostList, formData)
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