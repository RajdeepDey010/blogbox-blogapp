import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import MyBlogs from "./pages/MyBlogs"
import Write from "./pages/Write"
import Signup from './pages/Signup';
import Signin from './pages/Signin';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='max-w-screen-md mx-auto pt-20'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/myblogs' element={<MyBlogs />} />
          <Route path='/write' element={<Write />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
