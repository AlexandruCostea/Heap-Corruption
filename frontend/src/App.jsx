import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Posts from './pages/Posts'
import Details from './pages/Details'
import Title from './pages/Title'
import Update from './pages/Update'
import Add from './pages/Add'
import { useState, createContext } from 'react'
import boberData from './data'
import Unknown from './pages/Unknown'

export const PostsContext = createContext()

const App = () => {

  const [postList, setPostList] = useState(boberData)

  return (
    <PostsContext.Provider value={{postList, setPostList}}>
      <BrowserRouter>
        <Title/>
        <Routes>
          <Route path='/' element={<Navigate to='/posts' replace/>}/>
          <Route path='posts' element={<Posts/>}/>
          <Route path='details/post/:id' element={<Details/>} />
          <Route path='add/post' element={
            <Add pos={postList[postList.length - 1].id + 1}/>}/>
          <Route path='update/post/:id' element={<Update/>} />
          <Route path='*' element={<Unknown/>}/>
        </Routes>
      </BrowserRouter>
    </PostsContext.Provider>
  )
}
export default App