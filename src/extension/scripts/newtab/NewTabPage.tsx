import * as React from "react";
import * as ReactDOM from "react-dom";
import { IBackground } from "../background/IBackground";
import { init, logger, setupLogger } from "../common/utils";
import { ILogger } from "extension-services";
import { AppController } from "../background/AppController";
import { IGame, IUser } from "./../../../common/Models";

import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';

interface NewTabPageProps
{    
    appController: AppController;
}

interface BrowserActionState
{
}

const style : React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
}

class NewTabPage extends React.Component<NewTabPageProps,BrowserActionState>
{

    constructor(props:NewTabPageProps, context)
    {
        super(props, context);

        this.state = {
        };
    }
   
    render()
    {
        return <div style={{height: "100%", position: "relative"}}>
            New Tab!
        </div>;
    }
}

init()
    .then(bg => ReactDOM.render(<NewTabPage {...bg} />, document.getElementById('root')));