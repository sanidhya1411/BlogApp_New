import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box ,IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



const Blog = ({ id,isUser,title, description, image, userName}) => {
    
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/myBlogs/${id}`);
    }

    const deleteRequest = async () => {
        const res = await axios.delete(`https://blogapp-fci1.onrender.com/api/blog/${id}`).catch(err => console.log(err));
        const data=res.data;
        return data;
    }

    const handleDelete = () => {
        deleteRequest().then(() => window.location.reload(false));
    }

    return (
        <Card sx={{ width: 340, margin: 'auto', mt: 2, padding: 2, boxShadow: "5px 5px 10px #ccc" }}>
            
            {isUser && (<Box display="flex">
                <IconButton sx={{ marginRight:"auto" }} onClick={handleEdit}> <EditIcon color="warning" /></IconButton>
                <IconButton sx={{ marginLeft:"auto" }} onClick={handleDelete}> <DeleteIcon color="error"/></IconButton>
            </Box>)}
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                        {userName.charAt(0)}
                    </Avatar>
                }
        
                title=<b>{title}</b>
                subheader=<b>{ userName}</b>
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Paella dish"
            />
            <CardContent>
                <hr></hr>
                <br></br>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Blog;