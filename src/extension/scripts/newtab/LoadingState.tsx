import * as React from "react";
import * as ReactDOM from "react-dom";
import {ProgressBar} from "react-bootstrap";

interface Props
{
    totalExperiments: number;
    experimentsLoaded: number;
}

interface State
{    
}

export class LoadingState extends React.Component<Props,State>
{
    constructor(props:Props, context:any)
    {
        super(props, context);
        this.state = {
        };
    }

    render() {

        const {totalExperiments, experimentsLoaded} = this.props;
        const progPercent = Math.round((experimentsLoaded / totalExperiments)*100);

        return <div style={{textAlign: "center"}}>
        
            <img src="/images/icon500.png" width={256} />
            <div style={{marginTop: 40}}>
                <h1>New Tab Chrome Experiments</h1>
                <p>Loading experiements (this only happens once a month)</p>
                <div className="well" style={{marginTop: 40}}>
                    <ProgressBar active now={progPercent} />
                    <div>{experimentsLoaded} of {totalExperiments}</div>
                </div>                
            </div>
        
        </div>;
    }
}