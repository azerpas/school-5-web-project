import express from 'express';
import session from 'express-session';
// import socketIO from "socket.io";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import cors from 'cors';

require('dotenv').config()

const apiRouter = require('./routes/index.js')

export default (app, http) => {
    app.use(express.json());
    app.use(cors({credentials: true, origin: `http://${process.env.VUE_APP_URL}`}));
    app.use(session({ secret: process.env.SECRET_SESSION, saveUninitialized: true, resave: false, cookie: { secure: false } }));
    app.use('/api/', apiRouter)
    //
    // app.post('/bar', (req, res) => {
    //   res.json(req.body);
    // });
    // 
    // optional support for socket.io
    // 
    // let io = socketIO(http);
    // io.on("connection", client => {
    //   client.on("message", function(data) {
    //     // do something
    //   });
    //   client.emit("message", "Welcome");
    // });
}
