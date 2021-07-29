import {createServer} from "http"
import {Server} from "socket.io"

const app = createServer()
const io = new Server(app, {
    cors: {origin: "*"}
})

app.listen(4000, () => console.log("Listening on port 4000"))

export default io;