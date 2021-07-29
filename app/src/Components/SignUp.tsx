import { FormEvent, useState } from "react"
import socket from "../Utils/websocket"
import { Args } from "../types"

function SignUp({auth, setAuth} : Args) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [resState, setResState] = useState("")

    const sendSignUpData = async(e : FormEvent) => {
        e.preventDefault();

        if([username, password, confirmPassword].includes("")) {
            setResState("Please fill out all fields")
            return
        }

        if(password !== confirmPassword){
            setResState("Passwords do not match")
            setPassword("")
            setConfirmPassword("")
            return
        }

        const reqID = Math.floor(Math.random() * 1000000)

        socket.emit('message', {
            method: "newUser",
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
                setConfirmPassword("")

                if(res.status === 201) setAuth({
                    auth: true,
                    userid: res.data.userid
                })
            }
        })
    }

    return (
        <form className="AuthEntry" onSubmit={sendSignUpData}>
            <input className="AuthEntry" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
            <input className="AuthEntry" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            <input className="AuthEntry" type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            <p className="resStatus">{resState}</p>
            <button className="AuthEntry">Sign Up</button>
        </form>
    )
}

export default SignUp;