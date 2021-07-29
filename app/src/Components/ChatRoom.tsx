import { useEffect, FormEvent, useState, useRef } from "react"
import socket from "../Utils/websocket"
import { Message, Args } from "../types"


function ChatRoom({auth, setAuth} : Args) {
  const [formValue, setFormValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgLoadRetry, setMsgLoadRetry] = useState(0)
  var dummy = useRef<HTMLLIElement>(null!);

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior : "smooth"})
  },[messages])

  useEffect(() => {
    let reqID = Math.floor(Math.random() * 1000000)

    socket.emit('message', {
      method: "getMessages",
      id: reqID,
      data: {}
    })

    socket.on('message', res =>  {
      if(res.id === reqID){
        if(res.status === 200){
          setMessages(res.data)
        }else{
          setMsgLoadRetry(msgLoadRetry + 1)
        }
      }
    })
  }, [msgLoadRetry])

  const Send = async(e : FormEvent) => {
    e.preventDefault()

    if(formValue.length < 1) return;

    let reqID = Math.floor(Math.random() * 1000000)

    socket.emit('message', {
      method: "sendMessage",
      id: reqID,
      data: {
        userid: auth.userid,
        message: formValue
      }
    })

    socket.on('message', res => {
      if(res.id === reqID && res.status === 201){
        setFormValue('')
      }
    })
  }

  socket.on('message', res => {
    if(res.data.message === "Update messages"){
      setMessages(res.data.messages)
    }
  })

  return (
    <div className="Room">
      <ul>
        {
          messages.sort((a, b) => a.id - b.id).map((message : Message) => {
              let tempClass = (message.userid === auth.userid ? "sentMessage" : "receivedMessage")
              return (
                <li key={message.id} className={tempClass}>
                  <p className={tempClass}>{message.message}</p>
                  <p className={message.userid === auth.userid ? "sentBy" : "recFrom"}>{message.username}</p>
                </li>
              )
          })
      }
      <li ref={dummy}></li>
      </ul>
      <form onSubmit={Send} className="chat">
          <input className="MessageInput" placeholder="Enter a message..." value={formValue} onChange={e => setFormValue(e.target.value)}/>
          <button className="SendButton">Send</button>
      </form>
    </div>
  )
}

export default ChatRoom
