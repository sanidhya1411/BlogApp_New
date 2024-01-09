import React,{useEffect, useState} from "react";
import axios from "axios";
import Blog from "./Blog"

const Blogs = () => {

    const [blogs, setBlogs] = useState();;

    const sendRequest = async () => {
        const res = await axios.get(`https://blogapp-fci1.onrender.com/api/blog`).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }
    useEffect(() => {
        sendRequest().then(data=>setBlogs(data.blogs));
    }, []);

    return (
        <div>
            {blogs && blogs.map((blog, index) => (
                <Blog key={index} id={blog._id} isUser={localStorage.getItem("userId")===blog.user._id} title={ blog.title} description={blog.description} image={blog.image} userName={blog.user.name} />
            ))}
        </div>
    )
}

export default Blogs;