import { ILogger } from "extension-services";
import {IExperiment, IGetExperimentsResponse} from "./../../../common/Models";
import * as axios from "axios";

export class APIService
{
    rootApi: string = "https://chromeexperiments-dat.appspot.com/_ah/api/experiments/v1/experiments";

    constructor(private logger: ILogger)
    {
    }

    async GetExperiments(offset:number, limit:number) : Promise<IGetExperimentsResponse>
    {
        var response = await axios.get<IGetExperimentsResponse>(`${this.rootApi}?limit=${limit}&offset=${offset}&sort=newest`);
        return response.data;
    }
}