import express from 'express';
import {PrismaClient} from "@prisma/client"
import {uploadFile} from "../src/services/storage/index";
import path from "path";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const prisma = new PrismaClient()
const router = express.Router()

router.get('/', async (req, res) => {
    res.status(200).send({
        name: "EIDO api",
        version:"1.0"
    });
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

/**
 * Deconnecte l'utlisateur connecté (le supprime de la session)
 */
router.get("/logout", async (req, res) => {
    if (req.session.user != null){
        req.session.destroy();
        res.status(200).json({});
    }else{
        res.status(400).json({message : "Please login first"});
    }
});

/**
 * Récupere l'utilisateur connecté
 */
router.get("/user", async (req, res) => {
    if(req.session.user) res.status(200).send(req.session.user);
    else res.status(403).send({message: "Please login first"})
});

/**
 * Route enregistrant un nouvel utilisateur
 */
router.post("/user", async (req,res)=>{
    var {email,password,role,name,firstname,bio,keywords,platforms} = req.body;
    bio = req.query.bio == undefined ? "" : req.query.bio;
    if(email == undefined || password == undefined || role == undefined  || name == undefined || firstname == undefined) return res.status(400).send({message:"no data received"})
    if(role == "ROLE_ADMIN") return res.status(403).send({message:"Forbidden to add an admin user"});
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        if(err != undefined) return res.status(400).send({message:"error password"});
        var data = {
            email:email,
            password:hash,
            bio : bio,
            roles:role,
            name:name,
            firstname:firstname
        };
        var ids = [];
        var i;
        if(keywords != undefined){
            ids = [];
            for(i in keywords){
                ids.push({id :parseInt(keywords[i])});
            }
            data.Keyword = {connect:ids};
        }
        if(platforms != undefined){
            ids = [];
            for(i in platforms){
                ids.push({id :parseInt(platforms[i])});
            }
            data.Platform = {connect:ids};
        }
        try {
            var results = await prisma.user.create({
                data:data
            });
            res.send(results);
        }catch (error){
            res.status(400).send({message:"error insert user"});
            //console.log(error);
            console.log("Error :  : " ,error.code);
            console.log("Error fields : " ,error.meta.target);
        }
    });
});

/**
 * Modification de l'utilisateur connecté
 */
router.put("/user",async (req,res,next)=>{
    if(req.session.user == undefined)return res.status(403).send({message: "Please login first"});
    var params = req.body;
    var id = req.session.user.id;
    if((Object.keys(params).length == 0 && req.file == undefined) || !id)return res.status(400).send({message:"give id and data to update"})
    if(params.role != undefined && params.role == "ROLE_ADMIN") return res.status(400).send({message:"error"});
    var message = {};
    if(req.file != undefined){
        try {
            const myFile = req.file;
            const extension = path.extname(myFile.originalname).split(".")[1];
            const imageUrl = await uploadFile(myFile, extension);
            message.push({
                message: "Upload was successful",
                data: imageUrl
            });
            params.url = imageUrl;
        }catch(error){
            next(error);
        }
    }
    var result = await prisma.user.update({
        where:{
            id:parseInt(id)
        },
        data:params
    });
    message.push(result);
    res.status(200).send(message);
});

/**
 * Suppression de l'utilisateur connecté
 */
router.delete("/user",async (req,res)=>{
    if(req.session.user == undefined)return res.status(403).send({message: "Please login first"});
    var id = req.session.user.id;
    var result = await prisma.user.delete({
        where:{
            id:parseInt(id)
        }
    });
    res.status(200).send(result);
});

/**
 * Route recuperant les platformes d'un utilisateur (donné en parametre)
 * Si il n'y a pas d'utilisateur : renvoi de toutes les platformes
 */
router.get("/platform",async (req,res)=>{
    var idUser = req.query.userId;
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
 */
router.get("/proposal",async (req,res)=>{
    if(!req.session.user)return  res.status(403).send({message: "Please login first"})
    var idUser = req.session.user;
    var result;
    if(req.session.user.roles == "ROLE_BRAND"){
        result = await prisma.user.findUnique({
            where:{
                id:parseInt(idUser)
            }
        }).Proposal_influencer();
    }else if(req.session.user.roles == "ROLE_INFLUENCER"){
        result = await prisma.user.findUnique({
            where:{
                id:parseInt(idUser)
            }
        }).Proposal_brand();
    }
    console.log(result);
    res.send(result);
});


/**
 * Route recuperant les mots-clefs d'un utilisateur (donné en parametre)
 * Si il n'y a pas d'utilisateur : renvoi tous les mots clefs
 */
router.get("/keyword",async (req,res)=>{
    var idUser = req.query.userId;
    if(idUser != undefined){
        var result = await prisma.user.findUnique({
            where:{
                id:parseInt(idUser)
            }
        }).Keyword();
    }else{
        result = await prisma.keyword.findMany({});
    }
    res.status(200).send(result);
});

/**
 * Récupere les offres d'utilisteur (id donné en parametre)
 */
router.get("/offer",async (req,res)=>{
    var userId = req.query.userId;
    if(userId == undefined) return res.status("403").send({message:"give user id "});
    var result = await prisma.offer.findMany({
        where:{
            id_user:userId
        }
    });
    res.status(200).send(result);
});

/**
 * Creation d'une offre :
 * @param price (obligatoire)
 * @param unit (obligatoire)
 *
 * l'offre est associée à l'utlisateur connecté : donc la colonne "custom" est à FALSE
 * Les offres "Custom" sont créées lorsqu'une proposition est créée (put('/proposal',...))
 */
router.post("/offer", async(req,res)=>{
   var {price,unit} = req.body;
   if(req.session.user == undefined) return res.status(403).send({message:"Please login first"})
   if(price == undefined || unit == undefined) return res.status(403).send({message:"wrong data"});
   var result = await prisma.offer.create({
       data:{
           price:price,
           unit:unit,
           custom:false,
           id_user:req.session.user.id
       }
   });
   res.status(200).send(result);
});

/**
 * Recuperation des différents work de l'utlisateur connecté
 */
router.get("/work",async(req,res)=>{
   if(req.session.user == undefined) return res.status(403).send({message:"Please login first"});
   var result =  await prisma.work.findMany({
       where:{
           id_user:req.session.user.id
       }
   });
   res.status(200).send(result);
});

/**
 * Route qui permet la recherche en fonction de queries (optionnels): plateforme & categorie (tech, etc...)
 * si il n'y a pas ces parametres : retourne tous les users
 */
router.get("/search",async(req,res)=>{
    var {platform,category} = req.query;
    var where = {};
    if(platform != undefined)where.Platform = { some : {name: platform }};
    if(category != undefined)where.Keyword = { some : {name: category }};
    var result = await prisma.user.findMany({
        where : where
    });
    res.status(200).send(result);
});

/**
 *
 * TODO : 
 *        -- SEARCH (ou un nom bidon comme ça) --
 *        Route qui permet la recherche en fonction de queries (optionnels): plateforme & categorie (tech, etc...)
 *        Essentiel pour la page d'accueil
 *        - GET '/search' ou encore '/search?platform=tik-tok' ou encore '/search?platform=youtube&category=tech'
 *        -- WORK -- 
 *        Route pour récupérer les différents work de l'influenceur
 *        - GET /work
 *        --OFFER--
 *        - DELETE /offer
 *        - POST /offer
 *        -
 *        --PROPOSAL--
 *        - PUT /proposal
 *        - DELETE /proposal
 *        -
 *        -
 *        --KEYWORD--
 *        - PUT /keyword (sauf si on decide que les keyword sont prédéfinis)
 *        - DELETE /keyword (sauf si on decide que les keyword sont prédéfinis)
 *        - POST /keyword (sauf si on decide que les keyword sont prédéfinis)
 */
module.exports = router