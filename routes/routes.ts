import { Router } from "express";




 const router = Router();


router.get('/mensaje',(req, res) =>{
res.json({
    ok: true,
    mensaje: 'Todo esta bien!'
})


});

router.post('/mensaje',(req, res) =>{
    const body = req.body.body;
    const from = req.body.form;
       res.json({
       ok: true,
   
       body,
   
       from
       });
       
       
       });
    
       

       router.post('/mensaje/:id',(req, res) =>{
        const body = req.body.body;
        const from = req.body.form;
        const id = req.params.id;

        res.json({
           ok: true,
           
           id,

           body,
       
           from
           });
           
           
           });
             

export default router;