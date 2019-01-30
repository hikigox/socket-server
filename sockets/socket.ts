import { Socket } from "socket.io";
import { stringify } from "querystring";



// Desconexion de Cliente
export const desconectar = ( cliente: Socket) => {

    cliente.on('disconnect', ()=>{

console.log('Cliente Desconectado');


    });


}


// Mensajes Recibidos 

export const mensajes = (cliente: Socket, io:SocketIO.Server) => {


    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) =>{
    console.log('Mensaje Recibido', payload);
    io.emit('mensaje-nuevo',payload);



    });
    


}

