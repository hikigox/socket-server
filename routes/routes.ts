import { Router } from "express";
import Server from '../classes/server';
import { Request, Response } from "express-serve-static-core";
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';




 const router = Router();


router.get('/mensaje',(req, res) =>{
res.json({
    ok: true,
    mensaje: 'Todo esta bien!'
})




});

router.post('/mensaje',(req, res) =>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
       res.json({
       ok: true,
   
       cuerpo,
   
       de
       });
       const server = Server.instance;
    const payload = {
    cuerpo,
    de

    }

    server.io.emit('mensaje-nuevo',payload);
      
    
       
       });
    
       

       router.post('/mensaje/:id',(req, res) =>{
        const cuerpo = req.body.cuerpo;
        const de = req.body.de;
        const id = req.params.id;
        const server = Server.instance;
        
        const payload = {
            cuerpo,
            de


        }

        server.io.in(id).emit('mensaje-privado',payload);


        
        res.json({
           ok: true,
           
           id,

           cuerpo,
       
           de
           });
           
           
           });

           // Obtener ID de los Usuarios conectados
           router.get('/usuarios',(req:Request, res: Response) =>{
            const server = Server.instance;

            server.io.clients((err: any, clientes: Socket)=>{
                if (err) {

                    return res.json({
                ok: false,
                err

                    });
                }

            res.json({
                ok: true,
                clientes
            });

            })


           });

           router.get('/usuarios/detalle', (req:Request, res: Response) =>{
         usuariosConectados

         res.json({
    ok: true,
    clientes: usuariosConectados.getLista()

         })

           });
             

export default router;