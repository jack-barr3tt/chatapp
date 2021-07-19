import { useState } from "react"

interface Message {
  text: string
  time: number
  user: string
}

const messages: Message[] = [
  { text: "Hello, world!", time: Date.now(), user: "React" },
]

function ChatRoom() {
  const [formValue, setFormValue] = useState('');

  const Send = async(e : any) => {
    e.preventDefault()

    messages.push({
        text: formValue,
        time: Date.now(),
        user: "React"
    })

    setFormValue('')
}

  return (
    <div className="Room">
      <ul>{
          messages.map(message => {
              return (
                <li className="Message">{message.text}</li>
              )
          })
      }</ul>
      <form onSubmit={Send}>
          <input value={formValue} onChange={e => setFormValue(e.target.value)}/>
          <button>Send</button>
      </form>
    </div>
  )
}

export default ChatRoom
