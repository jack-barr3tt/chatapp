import con from "./connections/sql"
import io from "./connections/socket"
import * as endpoints from "./endpoints/index"
import { SocketPayload } from "./types"

function parse(o: any) {
    return{
        user: {
            username: o.username,
            password: o.password,
            id: o.id
        },
        message: {
            message: o.message,
            userid: o.userid,
            id: o.id
        }
    }
}

io.on('connection', socket  => {
    socket.on('message', (req : SocketPayload<any>) => {
        console.log(req.id + " " + req.method)

        switch (req.method) {
            case "sendMessage":
                endpoints.sendMessage(req, socket)
                break;
            case "getMessages":
                endpoints.getMessages(req, socket)
                break;
            case "newUser":
                endpoints.newUser(req, socket)
                break;
            case "authUser":
                endpoints.authUser(req, socket)
                break;
            default:
                socket.emit('message',{
                    status: 404,
                    data: {
                        message: "Not found"
                    }
                })
                break;
        }
    })
})