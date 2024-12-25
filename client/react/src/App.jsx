import "./App.css" 
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Home from './pages/Home'
import CreatePosts from './pages/CreatePosts'
import Post from './pages/Post'
function App() {
  
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/createpost">Create a Post</Link>
          <Link to="/">Home</Link>
          <Link to="/post/id">Post</Link>
        </nav>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePosts />} />
        <Route path="/post/:id" element={<Post />} />
        </Routes>
      </Router>
      </div>
  )
}

export default App
