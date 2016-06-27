import { ILogger } from "extension-services";

export class APIService
{
    rootApi: string = "https://chromeexperiments-dat.appspot.com/_ah/api/experiments/v1/experiments";
    constructor(private logger: ILogger)
    {
    }

    async LoadExperiments(offset:number, limit:number)
    {
        this.logger.debug(this, "Loading api data");
        var response = await axios.get(`${this.rootApi}?limit=${limit}&offset=${offset}&sort=newest`);
        this.logger.debug(this, "GOT DATA", response.data);
    }
}