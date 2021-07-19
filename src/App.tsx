import React from 'react';
import './App.css';
import './Components/TitleBar'
import TitleBar from './Components/TitleBar';
import ChatRoom from './Components/ChatRoom'

function App() {
  return (
    <div className="Main">
      <TitleBar/>
      <ChatRoom/>
    </div>
  );
}

export default App;
