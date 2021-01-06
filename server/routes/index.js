import express from 'express';
import {PrismaClient} from "@prisma/client"
const bcrypt = require("bcrypt");
const saltRounds = 10;
const prisma = new PrismaClient()
const router = express.Router()

router.get('/', async (req, res) => {
    res.status(200).send();
});

router.post('/login',async (req,res)=>{
    const email = req.body.username;
    const password = req.body.password;
    const result = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if(result!=null){
        bcrypt.compare(password, result.password, function(err, resultHash) {
            if(resultHash){
                delete result.password;
                req.session.user = result;
                res.status(200).send(result);
            }else{
                res.status(403).send({error:"Forbidden",message:"Invalid email or password"})
            }
        });
    }else{
        res.status(403).send({error:"Forbidden",message:"Invalid email or password"})
    }
});

router.get("/logout", async (req, res) => {
    if (req.session.user != null){
        req.session.destroy();
        res.status(200).json({});
    }else{
        res.status(400).json({message : "Please login first"});
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

router.get("/user", async (req, res) => {
    if(req.session.user) res.status(200).send(req.session.user);
    else res.status(403).send({message: "Please login first"})
});

router.put("/user", async (req,res)=>{
   console.log(req.body);
   bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
       var results = await prisma.user.create({
           data:{
               email:req.body.email,
               password:hash,
               bio : req.body.bio,
               role:req.body.role,
               name:req.body.name,
               firstName:req.body.firstName
           }
       });
       res.send(results);
   });
});

router.get("/get_password", async (req,res)=>{
    bcrypt.hash(req.query.password, saltRounds, async function(err, hash) {
        res.send(hash);
    });
});
module.exports = router