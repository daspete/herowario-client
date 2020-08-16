import Vue from 'vue'
import io from 'socket.io-client'

let Sleep = async (time) => {
    return new Promise((resolve) => { setTimeout(() => { resolve() }, time) })
}

class SocketIO {
    constructor(){
        this.io = null
    }

    async Connect(){
        if(this.io !== null){
            if(this.io.connected !== true){
                this.io.connect()
            }
        }else{
            this.io = io(process.env.SOCKET_URL)
        }
        
        for(let i = 0; i < 10000; i++){
            await Sleep(10)
            if(this.io.connected) return this.io
        }

        return null
    }

}

Vue.prototype.$io = new SocketIO()