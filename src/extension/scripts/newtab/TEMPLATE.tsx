import * as React from "react";
import * as ReactDOM from "react-dom";

interface Props
{
}

interface State
{    
}

export class GameBoard extends React.Component<Props,State>
{
    constructor(props:Props, context:any)
    {
        super(props, context);
        this.state = {
        };
    }

    render() {
        return <div>Hello World</div>;
    }
}