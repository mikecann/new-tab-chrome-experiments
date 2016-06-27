import { ILogger } from "extension-services";
import { AppController } from "./AppController";
import { AppModel } from "./AppModel";
import {IAppState} from "./../../../common/Models";

export interface IBackground
{
    logger:ILogger;
    appController: AppController;
    appModel: AppModel<IAppState>;
}