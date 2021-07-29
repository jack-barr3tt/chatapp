import { Socket } from "socket.io";
import bcrypt from "bcrypt"
import con from "../connections/sql"
import { SocketPayload, UserData } from "../types"

export default async function newUser(req : SocketPayload<UserData>, socket : Socket) {
    const u : UserData = {
        username: req.data.username,
        password: req.data.password
    }
    
    con.query(`SELECT username FROM users WHERE username="${u.username}"`, (err, res) => {
        if(err) throw err;

        if(res.length < 1){
            bcrypt.hash(u.password, 10, (err, data) => {
                if(err) throw err;

                con.query(`INSERT INTO users (username, password) VALUES ("${u.username}","${data}")`, (err, res) => {
                    if(err) throw err;

                    socket.emit('message', {
                        status: 201, 
                        id: req.id,
                        data: {
                            message: "User created",
                            userid: res.insertId
                        }
                    })
                })
            })
        }else{
            socket.emit('message', {
                status: 409, 
                id: req.id,
                data: {
                    message: "Username is already taken"
                }
            })
        }
    })
}