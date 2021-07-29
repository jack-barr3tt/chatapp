import { useState } from "react";
import SignIn from "./SignIn"
import SignUp from "./SignUp";
import { Args } from "../types";

function UserAuth({auth, setAuth} : Args) {
    const [authState, setAuthState] = useState(0)

    return (
        <div className="Auth">{
        [
            (
                <div className="buttons">
                    <p>A chat app built in React and TypeScript with a MySQL database.</p>
                    <button className="AuthButtons" onClick={() => setAuthState(1)}>Sign In</button>
                    <button className="AuthButtons" onClick={() => setAuthState(2)}>Sign Up</button>
                </div>
            ),
            (
                <SignIn auth={auth} setAuth={setAuth}/>
            ),
            (
                <SignUp auth={auth} setAuth={setAuth}/>
            ),
        ][authState]
    }</div>
    )
}

export default UserAuth;
