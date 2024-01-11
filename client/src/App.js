import React, { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from './components/navbar'
import "./App.css"
import { BrowserRouter, Route, Routes, Switch, useNavigate } from 'react-router-dom'
import Signin from './components/screens/signin'
import Profile from './components/screens/profile'
import Home from './components/screens/Home'
import Signup from './components/screens/signup'
import CodersHub from './components/screens/CodersHub'
import CreatePost from './components/screens/CreatePost'
import { reducer, initialState } from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscriberUser from './components/screens/SubscribersUser'
import Chat from './components/screens/chatbot';
export const UserContext = createContext();
const Routing = () => {
  const history = useNavigate()
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
   

    }
    else {
      history('/signin');
    }
  }, [])
  return (

    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/codersHub" element={<CodersHub />} />
      <Route path="/CreatePost" element={<CreatePost />} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/myFollowingpost" element={<SubscriberUser />} />
      <Route path="/chatBot" element={<Chat />} />
    </Routes>
 
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>

        <Navbar />

        <Routing />

      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
