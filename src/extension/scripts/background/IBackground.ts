import { ILogger } from "extension-services";
import { AppController } from "./AppController";

export interface IBackground
{
    logger:ILogger;
    appController: AppController;
}