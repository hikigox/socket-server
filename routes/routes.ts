import { Router } from "express";
import Server from '../classes/server';




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
             

export default router;