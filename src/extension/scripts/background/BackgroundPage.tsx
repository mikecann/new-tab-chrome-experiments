import { AggregateLogger, ConsoleLogger, ChromeStorageLogger, LoggingHelpers, 
    ILog,ILogger } from "extension-services";
import { IBackground } from "./IBackground";
import { getBackgroundPage } from "../common/chromehelpers";
import { AppController } from "./AppController";
import { APIService } from "./APIService";
import { AppModel } from "./AppModel";
import {IAppState} from "./../../../common/Models";

class Background implements IBackground
{
    logger:AggregateLogger;
    apiService: APIService;
    appController: AppController;
    appModel: AppModel<IAppState>;

    constructor() {
        this.logger = new AggregateLogger();
        this.logger.loggers.push(new ChromeStorageLogger(chrome.storage.local));
        this.logger.loggers.push(new ConsoleLogger());
        this.appModel = new AppModel(this.logger);
        this.apiService = new APIService(this.logger);
        this.appController = new AppController(this.logger, this.apiService, this.appModel);
    }

    async init()
    {
        await this.appModel.init({
            totalExperiments: 0,
            isLoadingExperiements: false,
            experiments: []
        });
        await this.appController.init();
        this.logger.debug(this, "New Tab Chrome Experiments background initted");
    }
}

var bg = new Background();
bg.init();
(window as any).bgPage = bg;