import React from 'react';

class TextEditor extends React.Component{
    state = {text: " "};

    handleChange = (e) => {
        // This will take text in textarea and set it to the current state
        this.setState({text: e.target.value });

    }

    render(){
        return (
            <div>
                {/* textarea which takes input and handlechange will be called */}
                <textarea id="editor" onChange={this.handleChange}></textarea>
                {console.log(this.state.text)}
            </div>
            // Text editor  
        )
    }
}

export default TextEditor;