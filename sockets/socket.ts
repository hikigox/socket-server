import { Socket } from "socket.io";
import { Usuario } from '../classes/usuario';
import { UsuariosLista } from '../classes/lista-usuarios';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {

    const usuario = new Usuario (cliente.id);
    usuariosConectados.agregar(usuario);
    

}


// Desconexion de Cliente
export const desconectar = ( cliente: Socket, io:SocketIO.Server) => {

    cliente.on('disconnect', ()=>{
    console.log(usuariosConectados.getUsuario(cliente.id));
    
   const nombre = usuariosConectados.borrarUsuario(cliente.id)!.nombre;

   io.emit('mensaje-nuevo',{de: nombre, cuerpo: 'Se ah Desconectado'});

  console.log(`Usuario Eliminado de la sala ${ nombre }`);

    });


}


// Mensajes Recibidos 

export const mensajes = (cliente: Socket, io:SocketIO.Server) => {


    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) =>{
    console.log('Mensaje Recibido', payload);
    io.emit('mensaje-nuevo',payload);


    });
    

}

//conexion Usuario

export const connectionUser = (cliente: Socket , io: SocketIO.Server) => {
    cliente.on('configurar-usuario',(payload: { nombre: string },callback: Function) =>{
   
        usuariosConectados.actulizarNombre(cliente.id,payload.nombre);
    callback({
    ok: true,
    mensaje: `Usuario ${payload.nombre}, logeado`

    });


    })
}