import * as React from "react";
import * as ReactDOM from "react-dom";
import { IExperiment } from "./../../../common/Models";

interface Props {
    experiment: IExperiment;
}

interface State {
    isExpanded: boolean;
}

const innerStyle: React.CSSProperties = {
    position: "relative",
    maxWidth: 300,
    maxHeight: 200,
    overflowY: "auto",
    overflowX: "hidden",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
}

export class ExperimentInfoPopout extends React.Component<Props, State>
{
    constructor(props: Props, context: any) {
        super(props, context);
        this.state = {
            isExpanded: true
        };
    }

    render() {
        const {isExpanded} = this.state;
        return isExpanded ? this.renderExpanded() : this.renderNotExpanded();
    }

    renderExpanded() {
        const {experiment} = this.props;
        const {isExpanded} = this.state;
        return <div className="info-open" style={{ position: "absolute" }}><div className="well" style={innerStyle}>
            <div style={{ position: "absolute", top: 10, left: 10, fontSize: 40 }}>
                <i onClick={() => this.setState({isExpanded: false})} className="glyphicon glyphicon-question-sign" style={{cursor: "pointer"}} />
            </div>
            <div style={{ marginLeft: 40, marginTop: -20 }}>
                <h3><a href={experiment.url}> {experiment.title}</a></h3>
                <h5 style={{ marginTop: -5 }}><a href={experiment.site}>{experiment.author}</a></h5>
                <p>{experiment.description}</p>
            </div>
            {
                isExpanded ?
                    <button onClick={e => this.setState({ isExpanded: false }) }
                        className="btn btn-link" style={{ top: 5, right: 5, position: "absolute" }}>x</button> :
                    null
            }
        </div></div>;
    }

    renderNotExpanded() {
         return <div className="info-closed" style={{ position: "absolute", bottom: 20, left: 10, fontSize: 40, opacity: 0.6 }}>
            <i onClick={() => this.setState({isExpanded: true})} className="glyphicon glyphicon-question-sign" style={{cursor: "pointer"}} />
        </div>
    }
}