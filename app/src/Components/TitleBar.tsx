import { Args } from "../types"
import { MouseEvent } from "react";

function TitleBar({auth, setAuth} : Args) {
    function signOut (e : MouseEvent) {
        setAuth({
            auth: false,
            userid: 0   
        })
    }

    return(
        <div className="Title">
            <h1 className="Title">Chat App</h1>
            <button className={(auth.auth ? "SignOut" : "HideSignOut")} onClick={signOut}>Sign Out</button>
        </div>
    )
}

export default TitleBar;
