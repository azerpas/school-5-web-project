import express from 'express';
import {PrismaClient} from "@prisma/client"
const bcrypt = require("bcrypt");
const saltRounds = 10;
const prisma = new PrismaClient()
const router = express.Router()

router.get('/', async (req, res) => {
    res.status(200).send();
});


/**
 * Route permettant de se connecter
 * TODO : Ajout du user dans la session
 */

router.post('/login',async (req,res)=>{
    const email = req.body.username;
    const password = req.body.password;
    if(email == undefined|| password ==  undefined )return res.status(403).send({error:"Forbidden",message:"Invalid email or password"})
    const result = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if(result==null) return res.status(403).send({error:"Forbidden",message:"Invalid email or password"});
    bcrypt.compare(password, result.password, function(err, resultHash) {
        if(resultHash){
            delete result.password;
            req.session.user = result;
            res.status(200).send(result);
        }else{
            res.status(403).send({error:"Forbidden",message:"Invalid email or password"})
        }
    });
});


router.get("/logout", async (req, res) => {
    if (req.session.user != null){
        req.session.destroy();
        res.status(200).json({});
    }else{
        res.status(400).json({message : "Please login first"});
    }
});

/**
 * Route recuperant les platformes d'un utilisateur (donné en parametre)
 * Si il n'y a pas d'utilisateur : renvoi de toutes les platformes
 */
router.get("/platform",async (req,res)=>{
    var idUser = req.query.user_id;
    console.log(idUser)
    if(idUser != undefined){
        var result = await prisma.user.findUnique({
            where:{
                id:parseInt(idUser)
            }
        }).Platform();
        console.log(result);
    }else{
        result = await prisma.platform.findMany({});
    }
    res.send(result);
});

/**
 * Route affichant les proposition d'un utilisateur en fonction de son role
 *
 * TODO recup l'user dans la session et non dans la requete + select les propositions en fonction du role
 */
router.get("/proposal",async (req,res)=>{
    if(req.session.user) var idUser = req.session.user;
    else res.status(403).send({message: "Please login first"})

    var result = await prisma.user.findUnique({
        where:{
            id:parseInt(idUser)
        }
    }).Proposal_influencer();
    console.log(result);
    res.send(result);
});

router.get("/user", async (req, res) => {
    if(req.session.user) res.status(200).send(req.session.user);
    else res.status(403).send({message: "Please login first"})
});

/**
 * Route enregistrant un nouvel utilisateur
 */
router.put("/user", async (req,res)=>{
   var {email,password,role,name,firstname,bio} = req.body;
    bio = req.query.bio == undefined ? "" : req.query.bio;
    if(email == undefined || password == undefined || role == undefined  || name == undefined || firstname == undefined) return res.status(400).send({message:"no data received"})
    if(role == "ROLE_ADMIN") return res.status(400).send({message:"error"});
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        if(err != undefined) return res.status(400).send({message:"error password"})
        try {
            var results = await prisma.user.create({
                data:{
                    email:email,
                    password:hash,
                    bio : bio,
                    roles:role,
                    name:name,
                    firstname:firstname
                }
            });
            res.send(results);
        }catch (error){
            res.status(400).send({message:"error insert user"})
            console.log("Error :  : " ,error.code);
            console.log("Error fields : " ,error.meta.target);
        }
    });
});


router.post("/user/:userId",async (req,res)=>{
    var params = req.body;
    var id = req.params.userId;
    if(Object.keys(params).length == 0 || !id)return res.status(400).send({message:"give id and data to update"})
    if(params.role != undefined && params.role == "ROLE_ADMIN") return res.status(400).send({message:"error"});
    var result = await prisma.user.update({
        where:{
            id:parseInt(id)
        },
        data:params
    });
    res.status(200).send(result);
});

/**
 *
 * TODO : --OFFER--
 *        - GET /offer (par user)
 *        - PUT /offer
 *        - DELETE /offer
 *        - POST /offer
 *        -
 *        --PROPOSAL--
 *        - PUT /proposal
 *        - DELETE /proposal
 *        -
 *        --USER--
 *        - DELETE /user
 *        - POST /user
 *        -
 *        --KEYWORD--
 *        - GET /keyword (par user)
 *        - PUT /keyword (sauf si on decide que les keyword sont prédéfinis)
 *        - DELETE /keyword (sauf si on decide que les keyword sont prédéfinis)
 */
module.exports = router