import React from 'react';
import marked from 'marked';


class Previewer extends React.Component {
    state={}

    rawMarkup = () => {
        let rawMarkup = marked(this.props.text, { sanitize: true });
        return { __html: rawMarkup };
    }

    render(){
        return (
            // Previewer - shows html form of textEditor text
            <div id="preview" dangerouslySetInnerHTML={this.rawMarkup()} />
        )
    }
}

export default Previewer;