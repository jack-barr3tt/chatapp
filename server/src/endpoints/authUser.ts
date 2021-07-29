import bcrypt from "bcrypt"
import { Socket } from "socket.io"
import con from "../connections/sql"
import { UserData, SocketPayload } from "../types"

export default async function authUser(req : SocketPayload<UserData>, socket: Socket) {
    const u : UserData = {
        username: req.data.username,
        password: req.data.password
    }
    
    con.query(`SELECT password, id FROM users WHERE username = "${u.username}"`, (err, res) => {
        if(err) throw err;

        if(res.length > 0){
            bcrypt.compare(u.password, res[0].password, (err, allow) => {
                if(allow){
                    socket.emit('message', {
                        status: 200,
                        id: req.id,
                        data: {
                            message: "Authentication success",
                            userid: res[0].id
                        }
                    })
                }else{
                    socket.emit('message', {
                        status: 403, 
                        id: req.id,
                        data: {
                            message: "Authentication failed"
                        }
                    })
                }
            })
        }else{
            socket.emit('message', {
                status: 404, 
                id: req.id,
                data: {
                    message: "User not found"
                }
            })
        }
    })
}