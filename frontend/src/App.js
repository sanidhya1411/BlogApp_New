import React,{useEffect} from 'react';
import './App.css';
import Header from "./componenets/Header";
import Auth from "./componenets/Auth";
import Blogs from "./componenets/Blogs";
import UserBlog from "./componenets/UserBlog";
import BlogDetail from "./componenets/BlogDetail";
import AddBlog from "./componenets/AddBlog"
import { Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { authActions } from "./store";
import First from "./componenets/First"

function App() {

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  
  return (
    <React.Fragment>
      <header className='position'>
        <Header />
      </header>

      <main> 
        <Routes>
          <Route path="/" element={<First/>} />
          {!isLoggedIn ?
            <>
            <Route path="/auth" element={<Auth />} />
            </>
            :
            <>
            <Route path="/blogs" element={<Blogs/>} />
            <Route path="/myBlogs" element={<UserBlog />} />
            <Route path="/myBlogs/:id" element={<BlogDetail />} />
            <Route path="/blogs/add" element={<AddBlog />} />
          </>
          }
        </Routes>
      </main>

    </React.Fragment>
  );
}

export default App;
