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
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
    .then(res => {
      setPostList(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, []);

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleStatusChange);

    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    console.log('connected to server');

    ws.addEventListener('message', (event) => {
      const newData = JSON.parse(event.data);
      setPostList(newData);
      });
    }, [])

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
      : isOnline ? (
        <h1 className='page_title'>Couldn't connect to server</h1>
      ) 
      : 
      (
        <h1 className='page_title'>No internet connection</h1>
      )
    }
    </PostsContext.Provider>
  )
}
export default App