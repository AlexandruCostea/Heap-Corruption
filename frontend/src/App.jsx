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
    axios.get('http://localhost:8080/api/posts')
    .then(res => {
      setPostList(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/api/users')
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
    const ws = new WebSocket('ws://localhost:8080/ws');

    ws.onopen = () => {
      console.log('WebSocket connection established.');
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    
    ws.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
      //const newData = JSON.parse(event.data);
      //console.log(newData);
      //setPostList(newData)
      }); 
    }, []); 

    /*
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://localhost:8080/api/posts')
      .then(res => {
        setPostList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }, 5000);
    return () => clearInterval(interval);
  }, []); */


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