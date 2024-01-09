import React,{useState} from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import { toast} from 'react-toastify';

const Auth = () => {

    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const [isSignup, setisSignup] = useState(true);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });

    const sendRequest = async (type = 'login') => {
        
        try {
            const res = await axios.post(`https://blogapp-fci1.onrender.com/api/user/${type}`, {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password
            })
            const data = await res.data;
            localStorage.setItem("userId", data.user._id);
            dispatch(authActions.login());
            navigate("/blogs");


        }
        catch (err) {
            const data = err.response.data.message;
            if (data === "Incorrect Password" || data==="Couldn't Find User") {
                toast.error('Wrong Credentials', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
            if (data === "User Already Exist") {
                toast.info('User Already Exist', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        }

    
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
        if (isSignup) {
            sendRequest("signup");
        }
        else {
            sendRequest();
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box maxWidth={ 400} display="flex" flexDirection="column" alignItems="center" justifyContent="center" boxShadow="10px 10px 20px #ccc" padding={3} margin="auto" marginTop={5} borderRadius={5}> 
                <Typography variant="h2" padding={3} textAlign="center">{isSignup?"Signup":"Login" }</Typography>
                {isSignup && <TextField placeholder="Name" name="name" onChange={handleChange} value={inputs.name} margin="normal" />}
                <TextField placeholder="Email" name="email" onChange={handleChange} value={inputs.email} type="email" margin="normal" /> 
                <TextField placeholder="Password" name="password" onChange={handleChange} value={inputs.password} type="password" margin="normal" />
                <Button sx={{borderRadius:3,marginTop:3}} type="submit" variant="contained" color="warning">Submit</Button>
                <Button sx={{borderRadius:3,marginTop:3}} onClick={() => setisSignup(!isSignup)}>Change to {isSignup?"Login":"Signup" }</Button>
                </Box>
            </form>
        </div>
    )

}

export default Auth;
