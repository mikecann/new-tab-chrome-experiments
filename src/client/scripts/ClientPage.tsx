import * as React from "react";
import * as ReactDOM from "react-dom";

interface Props
{
    
}

class ClientPage extends React.Component<Props, void>
{
    render(){
        return <div>Hello World!</div>;
    }
}

ReactDOM.render(<ClientPage />, document.getElementById('root'));