import express from 'express';
import {PrismaClient} from "@prisma/client"
const bcrypt = require("bcrypt");
const saltRounds = 10;
const prisma = new PrismaClient()
const router = express.Router()

router.get('/', async (req, res) => {
    res.status(200).send({});
});

/**
 * Route permettant de se connecter
 * TODO : Ajout du user dans la session
 */
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
    var idUser = req.query.user_id;
    var result = await prisma.user.findUnique({
        where:{
            id:parseInt(idUser)
        }
    }).Proposal_influencer();
    console.log(result);
    res.send(result);
});


/**
 * Route enregistrant un nouvel utilisateur
 */
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