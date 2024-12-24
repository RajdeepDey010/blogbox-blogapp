import { createBrowserRouter } from "react-router-dom";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import MyBlogs from "./pages/MyBlogs";
import Write from "./pages/Write";
import AuthGuard from "./components/Authguard";
import BlogPage from "./pages/BlogPage";
//
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/signin",
    element: (
      <Signin />
    ) 
  },
  {
    path: "/signup",
    element: (
        <Signup />
    ) 
  },
  {
    path: "/myblogs",
    element: (
      <AuthGuard>
        <MyBlogs />
      </AuthGuard>
    ) 
  },
  {
    path: "/write",
    element: (
      <AuthGuard>
        <Write />
      </AuthGuard>
    ) 
  },
  {
    path: "/blogpage",
    element: (
        <BlogPage />
    ) 
  }
]);