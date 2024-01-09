import React,{useState} from "react";
import { Box, InputLabel, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: "bold" };
const AddBlog = () => {
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: "",
        user:""
    });

    const navigate = useNavigate();

    const sendRequest = async () => {
        const res = await axios.post(`https://blogapp-fci1.onrender.com/api/blog/add`, {
            title: inputs.title,
            description: inputs.description,
            image: inputs.image,
            user: localStorage.getItem("userId"),
        }).catch(err => console.log(err));

        const data = await res.data;
        return data;
    }

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(inputs);
        sendRequest().then(()=>navigate("/blogs")).then((data)=>console.log(data));
      
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box border={3} borderColor="red" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin="auto" marginTop="30px" display="flex" flexDirection="column" width={"80%"}>
                    <Typography textAlign="center" variant="h5">Post Your Blog</Typography>
                    <InputLabel>Title</InputLabel>
                    <TextField name="title" value={inputs.title} onChange={handleChange} sx={labelStyles} />
                    <InputLabel>Description</InputLabel>
                    <TextField name="description" value={inputs.description } onChange={handleChange} sx={labelStyles} />
                    <InputLabel>Image Url</InputLabel>
                    <TextField name="image" value={inputs.image} onChange={handleChange} sx={labelStyles} />
                    <Button variant="contained" type="submit">Submit</Button>
                </Box>
            </form>
        </div>)
}

export default AddBlog;