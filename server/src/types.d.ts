export interface MessageData {
    userid : number,
    message : string,
    id? : number
    username? : string
}

export interface UserData {
    username : string,
    password : string,
    id? : number
}

export interface SocketPayload<T>{
    method : string,
    id: number,
    data : T
}