import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app)

const allowedOrigins = ["https://parlour-dashboard-delta.vercel.app","http://localhost:3000" 
  ,"https://parlour-dashboard-git-main-thashreefs-projects-29de65dc.vercel.app"];

const io = new Server(server,{
    cors:{
        origin:allowedOrigins,
        methods:['GET','POST','PATCH','DELETE'],
        credentials:true
    }
})

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
});

export { app, io, server };
