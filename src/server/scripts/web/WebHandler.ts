import * as express from "express";
import { Server, createServer } from "http"; 
import { ILogger } from "extension-services";

export class WebServer
{
    httpServer : Server;
    app: express.Express;
    
    constructor(private logger:ILogger)
    {
        this.app = express();
        this.httpServer = createServer(this.app);
        
        this.app.use(express.static(__dirname + '/public'));
        this.app.get("*", (req, res) => {
            res.sendFile(__dirname + '/public/index.html');
        });
    }
    
    connect(port:number)
    {
        this.httpServer.listen(3000, () => {
            this.logger.debug(this, 'webserver listening on *:3000');
        });
    }
}