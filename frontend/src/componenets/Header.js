import React,{useState} from "react";
import EditNoteIcon from '@mui/icons-material/EditNote';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import "./Header.css";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { Link } from "react-router-dom";

const Header = () => {

    const dispatch = useDispatch();
    const [Icon, setIcon] = useState(false); 
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    console.log(isLoggedIn);

    return (
        <div>
            <nav className="main">
                <div className="logo">
                    <EditNoteIcon fontSize="large"/>
                </div>
                 
                <div className={Icon ? "m-link" : "link"}>
                    <ul onClick={()=>setIcon(false)}>
                        {isLoggedIn && <li ><Link to="/blogs" className="style" >All Blogs</Link></li>}
                        {isLoggedIn && <li><Link to="/myblogs" className="style" >My Blogs</Link></li>}
                        {isLoggedIn && <li><Link to="/blogs/add" className="style" >Add Blog</Link></li>}
                        {isLoggedIn && <li onClick={()=>dispatch(authActions.logout())}><Link to="/auth"  className="style">Logout</Link></li>}
                        {!isLoggedIn && <li><Link to="/auth" className="style" >Enter</Link></li>}
                    </ul>
                </div>
                <div className="menu" onClick={()=>setIcon(!Icon)}>
                    { Icon?<CloseIcon/>:<MenuIcon/>}
                </div>
            </nav>
        </div>
    )

}; 

export default Header;
