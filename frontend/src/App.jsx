import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Posts from './pages/Posts'
import Details from './pages/Details'
import Title from './pages/Title'
import Update from './pages/Update'
import Add from './pages/Add'
import Unknown from './pages/Unknown'
import { useState, createContext, useEffect } from 'react'
import axios from 'axios'

export const PostsContext = createContext()

const App = () => {

  const [postList, setPostList] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then(res => setPostList(res.data))
      .catch(err => {console.log(err)
      })
  }, []);

  return (

    <PostsContext.Provider value={{postList, setPostList}}>
    {
      postList != null ? (
        <BrowserRouter>
          <Title/>
          <Routes>
            <Route path='/' element={<Navigate to='/posts' replace/>}/>
            <Route path='posts' element={<Posts/>}/>
            <Route path='details/post/:id' element={<Details/>} />
            <Route path='add/post' element={<Add/>}/>
            <Route path='update/post/:id' element={<Update/>} />
            <Route path='*' element={<Unknown/>}/>
          </Routes>
        </BrowserRouter>)
      : (
        <h1 className='page_title'>Couldn't connect to server</h1>
      )
    }
    </PostsContext.Provider>
  )
}
export default App