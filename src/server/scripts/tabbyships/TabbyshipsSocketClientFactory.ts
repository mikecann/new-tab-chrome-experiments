import {TabbyshipsSocketClient} from "./TabbyshipsSocketClient";
import {ISocketClientFactory} from "../sockets/ISocketClientFactory";
import { Db } from "mongodb";
import { ILogger } from "extension-services";

export class TabbyshipsSocketClientFactory implements ISocketClientFactory
{
    constructor(private db:Db, private logger: ILogger)
    {
    }

    produce()
    {
        return new TabbyshipsSocketClient(this.db, this.logger); 
    }
}