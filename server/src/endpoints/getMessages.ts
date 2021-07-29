import { Socket } from "socket.io";
import { MessageData, SocketPayload } from "../types";
import con from "../connections/sql";

export default async function getMessages(req : SocketPayload<any>, socket : Socket) {
    con.query("SELECT m.id, m.userid, m.message, u.username FROM messages m INNER JOIN users u ON m.userid = u.id", (err, res) => {
        if(err) throw err;

        socket.emit('message', {
            status: 200,
            id: req.id,
            data: res.map((m : MessageData) => m)
        })
    })
}