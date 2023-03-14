import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from '../pages/PostIdPage';
import { routes } from '../router';
const AppRouter = () => {
    return (
        <Routes>
                {/* <Route path='/about' element={<About />} />
                <Route path='/posts' element={<Posts />} />
                <Route path='/posts/:id' element={<PostIdPage />} />
                <Route path="/error" element={<Error />} /> */}
                {routes.map(route => 
                    <Route
                    path={route.path}
                    element={route.element}
                    exact={route.exact}
                    key={route.path}
                    />
                )}
                <Route path="/*" element={<Navigate to="/posts" replace />} />
            </Routes>
    );
}

export default AppRouter;
