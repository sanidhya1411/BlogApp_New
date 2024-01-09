import React, { useEffect,useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const UserBlog = () => {

    const id = localStorage.getItem("userId");
    const [user, setUser] = useState();

    const sendRequest = async () => {
        const res = await axios.get(`https://blogapp-fci1.onrender.com/api/blog/user/${id}`).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }

    useEffect(() => {
        sendRequest().then((data) => setUser(data.user));
    },[])

    return (
        <div>
            {user && user.blogs && user.blogs.map((blog, index) => (
                <Blog key={index} id={blog._id} title={ blog.title} description={blog.description} image={blog.image} userName={user.name} isUser={true} />
            ))}
        </div>
    )
}

export default UserBlog;