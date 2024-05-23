import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DisplayPosts from './pages/DisplayPosts'
import DetailsPost from './pages/DetailsPost'
import Title from './pages/Title'
import UpdatePost from './pages/UpdatePost'
import AddPost from './pages/AddPost'
import Unknown from './pages/Unknown'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UserDetails from './pages/UserDetails'
import { useState, createContext, useEffect } from 'react'
import axios from 'axios'

export const AppContext = createContext()

const App = () => {

  const [postList, setPostList] = useState(null)
  const [userList, setUserList] = useState(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [token, setToken] = useState(null)

  useEffect(() => {
    axios.get('https://heapcorruptionapi-7sgauzwsja-uc.a.run.app/posts')
    .then(res => {
      console.log("Success")
      setPostList(res.data)
    })
    .catch(err => {
      console.log("Error")
      console.log(err)
    })
  }, []);

  useEffect(() => {
    axios.get('https://heapcorruptionapi-7sgauzwsja-uc.a.run.app/users')
    .then(res => {
      setUserList(res.data)
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
    const ws = new WebSocket('ws://heapcorruptionapi-7sgauzwsja-uc.a.run.app:3001/ws');
    
    ws.addEventListener('message', (event) => {
      const newData = JSON.parse(event.data);
      setPostList(newData.posts);
      setUserList(newData.users);
      }); 
    }, []); 

  return (

    <AppContext.Provider value={{postList, setPostList, userList, setUserList, token, setToken}}>
    {
      postList != null ? (
        <BrowserRouter>
          <Title/>
          <Routes>
            <Route path='/' element={<Navigate to='/posts' replace/>}/>
            <Route path='posts' element={<DisplayPosts/>}/>
            <Route path='details/post/:id' element={<DetailsPost/>} />
            <Route path='add/post' element={<AddPost/>}/>
            <Route path='update/post/:id' element={<UpdatePost/>} />
            <Route path='login' element={<Login/>}/>
            <Route path='signup' element={<SignUp/>}/>
            <Route path='account' element={<UserDetails/>}/>
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
    </AppContext.Provider>
  )
}
export default App