import express from 'express';
import { SERVER_PORT } from '../global/environment';
import http  from 'http';
import socketIO from 'socket.io';
import * as socket from '../sockets/socket';
export default class Server {

private static _intance: Server;
public io: socketIO.Server;
public app = express.application;
public port: number;
private httpServer: http.Server;

private constructor() {
this.app = express();
this.port = SERVER_PORT;
this.httpServer = new http.Server(this.app);
this.io = socketIO(this.httpServer);
this.escucharSockets();
}

public static get instance() {
return this._intance = this._intance || (this._intance = new this()) ;


}

private escucharSockets(){

console.log('Lista de clientes Conectados');
    
this.io.on('connection',cliente=>{
 
console.log('Cliente conectado');

//Conectar cliente
socket.conectarCliente(cliente);

// Mensajes

socket.mensajes(cliente , this.io);

// Desconectar

socket.desconectar( cliente, this.io);

// Usuarios logeados o configurados
socket.connectionUser(cliente, this.io);

//Obtener lista de Usuarios
socket.obtenerUsuarios(cliente,this.io);
});




}


start (callback: Function){

this.httpServer.listen(this.port,callback);

}
}