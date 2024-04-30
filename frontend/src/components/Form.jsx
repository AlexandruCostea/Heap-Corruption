import { FormControl, InputLabel, Input, Box, Button } from "@mui/material";
import { useState } from "react";
import { fromFieldStyle } from "../materialui-styles/MUIStyles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = ({entityList, setEntityList, parentEntityList = null, updateEntity = null, validateEntity, id = null, config}) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(config.initialState);

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationResult = validateEntity("post", formData, parentEntityList);

        if (!validationResult.status) {
            alert(validationResult.message);
            return;
        }

        const data = validationResult.entity;
        
        if (config.requestType === 'POST') {
            axios.post(config.requestPath, data)
            .then(res => {
                setEntityList([...entityList, res.data]);
            })
            .catch(err => alert(err));
        } else {
            axios.put(config.requestPath, data)
            .then(res => (updateEntity(entityList, setEntityList, res.data, id)))
            .catch(err => alert(err));
        }
        navigate(config.redirectPath)
    };

    return (
        <form onSubmit={handleSubmit}>
            {config.fields.map( (field) => (
                <FormControl sx={fromFieldStyle} key={field}>
                    <InputLabel htmlFor={field}>{field}</InputLabel>
                    <Input id={field} aria-describedby="my-helper-text" defaultValue={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}/>
                    <Box mt={2}/>
                </FormControl>
            ))}
            <Button type="submit">Submit</Button>
        </form>
    )
}

export default Form