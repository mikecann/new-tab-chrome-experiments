import * as sio from "socket.io"; 
import { Server } from "http"; 
import { ISocketClientFactory } from "./ISocketClientFactory";
import { Db } from "mongodb";
import { ILogger } from "extension-services";

var extend = require('util')._extend;

export class SocketIOServer
{    
    constructor(private clientFactory:ISocketClientFactory, private logger : ILogger)
    {        
    }
    
    connect(httpServer:Server)
    {
        var io = sio.listen(httpServer);       
        this.logger.debug(this, "Socket.io server listening..");
        io.sockets.on('connection', socket => this.onSocketConnected(socket));
    }
    
    private onSocketConnected(socket:SocketIO.Socket)
    {
        this.logger.debug(this, "New SocketIO connection!");
        this.clientFactory.produce()
            .init(socket);
    }
}

