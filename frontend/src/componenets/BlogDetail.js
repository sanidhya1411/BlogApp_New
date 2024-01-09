import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography,InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: "bold" };

const BlogDetail = () => {

    const id = useParams().id;
    const [blog, setBlog] = useState();
    const navigate = useNavigate();

    const fetchDetails = async () => {
        const res = await axios.get(`https://blogapp-fci1.onrender.com/api/blog/${id}`).catch(err => console.log(err));
        const data = await res.data;
        return data;
    };

    const [inputs, setInputs] = useState({});

    useEffect(() => {
        fetchDetails().then((data) => {
            setBlog(data.blog)
            setInputs({ title: data.blog.title, description: data.blog.description, image:data.blog.image})
        });
    }, [id]);

    const sendRequest = async () => {
        const res = await axios.put(`https://blogapp-fci1.onrender.com/api/blog/update/${id}`, {
            title: inputs.title,
            description: inputs.title,
            image: inputs.image
        }).catch(err=>console.log(err));
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
        console.log(inputs);
        sendRequest().then((data)=>console.log(data)).then(()=>navigate(`/myBlogs`));
      
    }


    return (
        <div>
            {inputs && <form onSubmit={handleSubmit}>
                <Box border={3} borderColor="green" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin="auto" marginTop="30px" display="flex" flexDirection="column" width={"80%"}>
                    <Typography textAlign="center" variant="h5">Post Your Blog</Typography>
                    <InputLabel>Title</InputLabel>
                    <TextField name="title" value={inputs.title} onChange={handleChange} sx={labelStyles} />
                    <InputLabel>Description</InputLabel>
                    <TextField name="description" value={inputs.description} onChange={handleChange} sx={labelStyles} />
                    <InputLabel>Image Url</InputLabel>
                    <TextField name="image" value={inputs.image} onChange={handleChange} sx={labelStyles} />
                    <Button variant="contained" type="submit">Submit</Button>
                </Box>
            </form>}
        </div>
    )
}

export default BlogDetail;