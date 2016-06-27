import * as React from "react";
import * as ReactDOM from "react-dom";
import { IBackground } from "../background/IBackground";
import { init, logger, setupLogger } from "../common/utils";
import { ILogger } from "extension-services";
import { AppController } from "../background/AppController";
import { AppModel } from "../background/AppModel";
import { IExperiment, IAppState } from "./../../../common/Models";
import { LoadingState } from "./LoadingState";
import { LoadedState } from "./LoadedState";


import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';

interface NewTabPageProps
{    
    appController: AppController;
    appModel: AppModel<IAppState>;
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

    componentDidMount()
    {
        var binding = this.props.appModel.stateUpdated.add(state => this.forceUpdate());
        window.onbeforeunload = () => { binding.detach(); return null; }
    }
   
    render()
    {
        var {appModel, appController} = this.props;
        var {state} = appModel;        

        return <div style={style}>
            {
                state.isLoadingExperiements ? 
                <LoadingState experimentsLoaded={state.experiments.length} totalExperiments={state.totalExperiments} /> : 
                <LoadedState experiments={state.experiments} />
            }
        </div>;
    }
}

init()
    .then(bg => ReactDOM.render(<NewTabPage {...bg} />, document.getElementById('root')));