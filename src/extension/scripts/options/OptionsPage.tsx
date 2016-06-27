import * as React from "react";
import * as ReactDOM from "react-dom";
import { IBackground } from "../background/IBackground";
import { init, logger, setupLogger } from "../common/utils";
import { ILogger } from "extension-services";
import { AppController } from "../background/AppController";
import { AppModel } from "../background/AppModel";
import { IExperiment, IAppState } from "./../../../common/Models";
import {Button} from "react-bootstrap";

import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';

interface OptionsPageProps
{    
    appController: AppController;
    appModel: AppModel<IAppState>;
}

const style : React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
}

class OptionsPage extends React.Component<OptionsPageProps,void>
{ 
    componentDidMount()
    {
    }

    resetStorage()
    {
        this.props.appController.reset();
    }
   
    render()
    {
        var {appModel, appController} = this.props;
        var {state} = appModel;

        return <div style={{padding: 10}}>
            <div style={{marginTop: 5}}>
                <Button onClick={() => this.resetStorage()}>Reset</Button> - Resets everything to an initial state
                <hr />
                <div style={{textAlign: "center", marginTop: 20}}>
                    by <a href="http://mikecann.co.uk">Mike Cann</a>
                </div>
            </div> 
        </div>;
    }
}

init()
    .then(bg => ReactDOM.render(<OptionsPage {...bg} />, document.getElementById('root')));