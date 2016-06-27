import { AggregateLogger, ConsoleLogger, ChromeStorageLogger, LoggingHelpers, 
    ILog,ILogger } from "extension-services";
import { IBackground } from "./IBackground";
import { getBackgroundPage } from "../common/chromehelpers";
import { AppController } from "./AppController";
import { APIService } from "./APIService";

class Background implements IBackground
{
    logger:AggregateLogger;
    apiService: APIService;
    appController: AppController;

    constructor() {
        this.logger = new AggregateLogger();
        this.logger.loggers.push(new ChromeStorageLogger(chrome.storage.local));
        this.logger.loggers.push(new ConsoleLogger());
        this.apiService = new APIService(this.logger);
        this.appController = new AppController(this.logger);
    }

    async init()
    {
        await this.appController.init();
        this.logger.debug(this, "New Tab Chrome Experiments background initted");
    }
}

var bg = new Background();
bg.init();
(window as any).bgPage = bg;