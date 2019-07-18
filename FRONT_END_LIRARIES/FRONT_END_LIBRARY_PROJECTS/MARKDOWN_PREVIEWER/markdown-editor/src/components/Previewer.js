import React from 'react';

class Previewer extends React.Component {
    state={}
    
    render(){
        return (
            // Previewer - shows html form of textEditor text
            <div id="previewer">{this.props.text}</div>
        )
    }
}

export default Previewer;