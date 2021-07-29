import { Socket } from "socket.io";
import io from "../connections/socket";
import con from "../connections/sql";
import { MessageData, SocketPayload } from "../types"

export default async function sendMessage(req : SocketPayload<MessageData>, socket : Socket) {
    const m : MessageData = {
        message: req.data.message,
        userid: req.data.userid
    }
    
    con.query(`INSERT INTO messages (userid, message) VALUES (${m.userid},"${m.message}")`, (err, res) => {
        if(err) throw err;

        socket.emit('message', {
            status: 201,
            id: req.id,
            data: {
                message: "Message sent"
            }
        })
        con.query("SELECT m.id, m.userid, m.message, u.username FROM messages m INNER JOIN users u ON m.userid = u.id", (err, res) => {
            if(err) throw err;

            io.emit('message', {
                status: 200, 
                data: {
                    message: "Update messages",
                    messages: res.map((m : MessageData) => m)
                }
            })
        })
    })
}