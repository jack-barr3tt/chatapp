export interface AuthState {
    auth : boolean,
    userid : number
}

export interface Args {
    auth : AuthState,
    setAuth : any
}

export interface Message {
    id: number,
    userid: number,
    message: string,
    username? : string,
  }

