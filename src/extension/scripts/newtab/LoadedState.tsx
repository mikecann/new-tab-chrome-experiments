import * as React from "react";
import * as ReactDOM from "react-dom";
import { IExperiment, IAppState } from "./../../../common/Models";
import {ExperimentInfoPopout} from "./ExperimentInfoPopout";

interface Props
{
    experiments: IExperiment[];
}

interface State
{    
    experiment: IExperiment;
}

const fullscreenStyle : React.CSSProperties = {
    height: "100%",
    width: "100%",
    position: "relative"
}

export class LoadedState extends React.Component<Props,State>
{
    constructor(props:Props, context:any)
    {
        super(props, context);
        this.state = {
            experiment: props.experiments[Math.floor(Math.random()*props.experiments.length)]
        };
    }
   
    render() {

        const {experiment} = this.state;

        return <div style={fullscreenStyle}>

            <ExperimentInfoPopout experiment={experiment} />
        
            <iframe width={window.innerWidth} height={window.innerHeight} sandbox="allow-forms allow-pointer-lock allow-scripts allow-same-origin" 
                style={{outline: "none", border: "none"}} src={experiment.url} />
        
        </div>;
    }
}