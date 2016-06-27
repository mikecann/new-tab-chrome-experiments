import {IGame, IBoard, CellValue, IUser} from "./../../../common/Models.ts";
import { ILogger } from "extension-services";
import { GET_USER } from "../../../common/SocketEvents";
import * as axios from "axios";


export class AppController
{
    isLoadingData: boolean;
    rootApi: string = "https://chromeexperiments-dat.appspot.com/_ah/api/experiments/v1/experiments";
    countPerAPIPage: number = 50;

    constructor(private logger: ILogger)
    {
    }

    async init()
    {        
        this.loadExperiments();
        // 
        //this.logger.debug(this, "Getting the user..");
    }

    async loadExperiments()
    {
        this.logger.debug(this, "Loading api data");
        var response = await axios.get(`${this.rootApi}?limit=${this.countPerAPIPage}&offset=100&sort=newest`);
        this.logger.debug(this, "GOT DATA", response.data);
    }

    async LoadExperiments()
    {
        this.logger.debug(this, "Loading api data");
        var response = await axios.get(`${this.rootApi}?limit=${this.countPerAPIPage}&offset=100&sort=newest`);
        this.logger.debug(this, "GOT DATA", response.data);
    }
}