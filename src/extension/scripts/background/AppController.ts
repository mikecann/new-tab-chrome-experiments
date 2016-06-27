import { ILogger } from "extension-services";
import { APIService } from "./APIService";
import * as axios from "axios";
import { AppModel } from "./AppModel";
import {IAppState} from "./../../../common/Models";
import * as moment from "moment";

export class AppController
{
    isLoadingData: boolean;
    countPerAPIPage: number = 50;
    timeBetweenExperimentsRefresh: number = moment.duration(1, "month").asMilliseconds();

    constructor(private logger: ILogger, private api:APIService, private model:AppModel<IAppState>)
    {
    }

    async init()
    {        
        var diff = Date.now() - this.model.state.timeOfLastUpdateUnix;
        if (isNaN(diff) || diff > this.timeBetweenExperimentsRefresh) 
            this.loadAllExperiments();
        else if (this.model.state.experiments.length==0)
             this.loadAllExperiments();
        else
            this.logger.debug(this, "Minimum time between experiements" +
             "refresh not met, remaining: "+(this.timeBetweenExperimentsRefresh - diff));
    }

    reset()
    {
        this.model.resetToInitial();
        this.loadAllExperiments();
    }

    async loadAllExperiments()
    {
        const {model, api, logger, countPerAPIPage} = this;

        logger.debug(this, "Loading all experiments..");

        model.update({ 
            isLoadingExperiements: true, 
            experiments:[], 
            totalExperiments: 0,
            timeOfLastUpdateUnix: Date.now()
        });
        
        var initialResp = await api.GetExperiments(0, countPerAPIPage);
        logger.debug(this, "Initial experiments loaded", initialResp);

        model.update({ totalExperiments: initialResp.total, experiments: initialResp.experiments });

        for(var i=countPerAPIPage; i<initialResp.total; i+=countPerAPIPage)
        {
            var resp = await api.GetExperiments(i, countPerAPIPage);
            logger.debug(this, "Experiements page loaded", resp);
            var experiments = model.state.experiments.concat(resp.experiments);
            model.update({ totalExperiments: initialResp.total, experiments });
        }
        console.log("All experiements loaded!");
        this.model.update({ isLoadingExperiements: false });
    }

}