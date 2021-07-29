import './App.css';
import TitleBar from './Components/TitleBar';
import ChatRoom from './Components/ChatRoom'
import UserAuth from './Components/UserAuth';
import { AuthState } from "./types"
import { useState } from 'react';


export function App() {
  const [auth, setAuth] = useState({auth : false, userid: 0})
  const updateAuthState = (state: AuthState) => setAuth(state)

  return (
    <div className="Main">
        <TitleBar auth={auth} setAuth={updateAuthState}/>
        {auth.auth ? <ChatRoom auth={auth} setAuth={updateAuthState}/> : <UserAuth auth={auth} setAuth={updateAuthState}/>}
    </div>
  );
}
