import express from 'express';
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()
const router = express.Router()

router.get('/', async (req, res) => {
    res.status(200).send({});
});

router.get('/login',async (req,res)=>{
    var email = req.query.email;
    var password = req.query.password;
    var result = await prisma.user.findUnique({
        where:{
            email:email
        }
    });
    console.log(result);
    if(result!=null && password == result.password){
        delete result.password;
        //req.session.user = result;
        res.status(200).send(result);
    }else{
        res.status(403).send({error:"Forbidden",message:"Invalid email or password"})
    }
});


router.get("/platform",async (req,res)=>{
    var idUser = parseInt(req.query.user_id);
    console.log(req.body)
    const result = await prisma.user.findUnique({
       where:{
           id:idUser
       }
    }).Platform_User();
    var resReq = {};
    for(var i = 0 ; i < result.length ; i ++){
        var p_u = result[i];
        console.log(p_u);
        resReq[i] = await prisma.platform.findUnique({
            where: {
                id: p_u.id_platform
            }
        });
    }
    console.log(resReq);

    res.send(resReq);
    //const result = await prisma.user.findMany({});
});
module.exports = router