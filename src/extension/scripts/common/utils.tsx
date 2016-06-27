import * as React from "react";
import * as ReactDOM from "react-dom";
import { IBackground } from "../background/IBackground";
import * as chromeHelpers from "./chromehelpers";
import { AggregateLogger, ConsoleLogger, ILogger, SendToLogger } from "extension-services";

export var logger = new AggregateLogger();

export async function init() : Promise<IBackground>
{
    var page = (await chromeHelpers.getBackgroundPage()) as any;
    var bg = page.bgPage as IBackground;
    setupLogger(bg.logger);
    return bg;
}

export function setupLogger(parent:ILogger)
{
    logger.loggers.push(new ConsoleLogger());
    logger.loggers.push(new SendToLogger(parent))
}