import {ISocketClient} from "./ISocketClient";

export interface ISocketClientFactory
{
    produce() : ISocketClient;
}