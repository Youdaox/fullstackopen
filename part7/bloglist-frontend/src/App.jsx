import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import BlogDetail from "./components/BlogDetail";

import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, logout } from "./reducers/loginReducer";
import { getAllUsers } from "./reducers/userReducer";

import {
  Container,
  AppBar,
  Toolbar,
  Button
} from "@mui/material"


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(initializeUser(user));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const user = useSelector((state) => state.login);

  return (
    <Router>
      <Container>
        {!user && <LoginForm />}
        {user && (
          <div>
            <AppBar position="static">
              <Toolbar>
                <Button color="inherit" component={Link} to="/">
                  home
                </Button>
                <Button color="inherit" component={Link} to="/users">
                  Users
                </Button>
                <em>{user.username} logged in</em>
                <Button color="inherit" onClick={handleLogout}>
                    logout
                </Button>
              </Toolbar>
            </AppBar>

            <Notification />

            <h2>blogs</h2>

            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<Profile />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
            </Routes>
          </div>
        )}
      </Container>
    </Router>
  );
};

export default App;
