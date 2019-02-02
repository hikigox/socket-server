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
    
    usuariosConectados.borrarUsuario(cliente.id);

   

     io.emit('usuarios-activos', usuariosConectados.getLista());

    });


}


// Mensajes Recibidos 

export const mensajes = (cliente: Socket, io:SocketIO.Server) => {


    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) =>{
    console.log('Mensaje Recibido', payload);
    io.emit('mensaje-nuevo',payload);


    });
    

};

//conexion Usuario

export const connectionUser = (cliente: Socket , io: SocketIO.Server) => {
    cliente.on('configurar-usuario',(payload: { nombre: string },callback: Function) =>{
   
        usuariosConectados.actulizarNombre(cliente.id,payload.nombre);
    callback({
    ok: true,
    mensaje: `Usuario ${payload.nombre}, logeado`

    });
    io.emit('usuarios-activos', usuariosConectados.getLista());


    })
};


//Emitir el obtener Usuarios 

export const obtenerUsuarios = (cliente: Socket, io: SocketIO.Server) => {
    
    cliente.on('obtener-usuarios',()=>{

    io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });

};