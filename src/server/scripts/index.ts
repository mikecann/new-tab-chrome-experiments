import { SocketIOServer } from "./sockets/SocketIOHandler"; 
import { TabbyshipsSocketClientFactory } from "./tabbyships/TabbyshipsSocketClientFactory"; 
import { WebServer } from "./web/WebHandler";
import { MongoClient, ObjectID } from "mongodb";
import { default as config } from "./config";
import { NodeConsoleLogger } from "./NodeConsoleLogger";

var logger = new NodeConsoleLogger();

MongoClient.connect(config.dbURI, (err, db) => {
    if (err)
        throw new Error("Error connecting to mongo: "+err);

    var web = new WebServer(logger);
    var clientFactory = new TabbyshipsSocketClientFactory(db, logger);
    var sio = new SocketIOServer(clientFactory, logger);
    web.connect(3000);
    sio.connect(web.httpServer);
});