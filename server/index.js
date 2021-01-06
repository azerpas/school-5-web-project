import express from 'express';
// import socketIO from "socket.io";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import cors from 'cors';

require('dotenv').config()

const apiRouter = require('./routes/index.js')

export default (app, http) => {
    app.use(express.json());
    app.use(cors());
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
