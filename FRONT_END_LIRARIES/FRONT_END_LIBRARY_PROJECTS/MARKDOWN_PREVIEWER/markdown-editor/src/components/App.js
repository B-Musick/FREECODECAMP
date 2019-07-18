import React from 'react';
import TextEditor from './TextEditor'
import Previewer from './Previewer';

class App extends React.Component{
    state = {previewerString: ' '};

    onTextAreaChange(textArea) {
        // When text input to textArea, need to get state from TextEditor. When
        // handleChange called in textarea, it will call this method which is passed 
        // into the component, and pass in the current text through 'textArea' variable.
        // Then set value to App previewerString state and pass to Previewer

        this.setState({
            // Value obtained from 'textarea' through handleChange method
            previewerString: textArea
        })
    }
    render() {
        return (
            <div>
                <TextEditor onTextChange={this.onTextAreaChange}/>
                <Previewer />
            </div>

        )
    }

}

export default App;