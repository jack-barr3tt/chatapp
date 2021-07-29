import { FormEvent, useState } from "react";
import socket from "../Utils/websocket"
import { Args } from "../types";

function SignIn({auth, setAuth} : Args) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [resState, setResState] = useState("")

    
    const sendLoginData = async (e : FormEvent) => {
        e.preventDefault();

        const reqID = Math.floor(Math.random() * 1000000)

        socket.emit('message', {
            method: "authUser",
            id: reqID,
            data: {
                username: username,
                password: password
            }
        })

        socket.on('message', res => {
            if(res.id === reqID){
                setResState(res.data.message)

                setUsername("")
                setPassword("")

                if(res.status === 200) setAuth({
                    auth: true,
                    userid: res.data.userid
                })
            }
        })
    }

    return (
        <form className="AuthEntry" onSubmit={sendLoginData}>
            <input className="AuthEntry" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
            <input className="AuthEntry" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            <p className="resStatus">{resState}</p>
            <button className="AuthEntry">Sign In</button>
        </form>
    )
}

export default SignIn;