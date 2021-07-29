import mysql from "mysql"
import config from "../config.json"

const con = mysql.createConnection(config)

con.connect(err => {
    if(err) throw err;
    console.log("Connected to MySQL database.")
})

export default con;