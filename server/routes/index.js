import express from 'express';
import {PrismaClient} from "@prisma/client"
const bcrypt = require("bcrypt");
const saltRounds = 10;
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
    if(result!=null){
        console.log(password,result.password)
        bcrypt.compare(password, result.password, function(err, resultHash) {
            console.log(resultHash);
            if(resultHash){
                delete result.password;
                //req.session.user = result;
                res.status(200).send(result);
            }else{
                res.status(403).send({error:"Forbidden",message:"Invalid email or password"})
            }
        });
    }else{
        res.status(403).send({error:"Forbidden",message:"Invalid email or password"})
    }
});


router.get("/platform",async (req,res)=>{
    var idUser = parseInt(req.query.user_id);
    const result = await prisma.user.findUnique({
       where:{
           id:idUser
       }
    }).Platform();

    res.send(result);
    //const result = await prisma.user.findMany({});
});

router.put("/user", async (req,res)=>{
   var email = req.query.email;
    var password = req.query.password;
    var bio = req.query.bio == undefined ? "" : req.query.bio;
    var role = req.query.role;
    var name = req.query.name;
    var firstName = req.query.firstName;
    if(email == undefined || password == undefined || role == undefined || name == undefined || firstName == undefined){
        res.status(403).send()
    }else{
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            console.log(err)
            var results = await prisma.user.create({
                data:{
                    email:email,
                    password:hash,
                    bio : bio,
                    roles:role,
                    name:name,
                    firstname:firstName
                }
            });
            res.send(results);
        });
    }

});

/*router.get("/get_password", async (req,res)=>{
    bcrypt.hash(req.query.password, saltRounds, async function(err, hash) {
        res.send(hash);
    });
});*/
module.exports = router