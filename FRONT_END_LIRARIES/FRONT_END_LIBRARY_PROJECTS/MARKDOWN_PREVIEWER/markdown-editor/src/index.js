import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
// import App from './components/App';


class App extends React.Component {
    state = { previewerString: '' };

    render() {
        return (
            <div>
                {/* Pass in the method to retrieve the textarea state */}
                <TextEditor />
            </div>

        )
    }

}

// Carriage return sets line breaks
// https://marked.js.org/#/USING_ADVANCED.md
marked.setOptions({
    breaks: true,
});

class TextEditor extends React.Component {
    
    state = { 
        text: "[Set up a link!](http://google.com)\n" +
            "# BRENDAN MUSICKS MARKDOWN PREVIEWER\n" +
            "## Create code block\n" + 
            "       This is a code block\n"+
            "``inline``\n\n" +
            "## Create a list\n" +
            "* list item 1\n"  +
            "* list item 2\n" +
            "> blockquote\n" +
            "Can add **bold** styling to words\n" +
            "# ADD AN IMAGE\n" +
            "![alt text](https://images.unsplash.com/photo-1563400822182-80b43becb728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=807&q=80 'Logo Title Text 1')"
         };

    // Code was lagging to print to screen so used async/ await
    handleChange = async e => {
        // This will take text in textarea and set it to the current state
        await this.setState({ text: e.target.value });
    }

    // Marked changes the text to HTML
    rawMarkup = () => {
        let rawMarkup = marked(this.state.text, { sanitize: true });
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div class="page-container">
                {/* textarea which takes input and handlechange will be called */}
                {/* Need initial text in the div from state */}
                <textarea id="editor" onChange={this.handleChange}>{this.state.text}</textarea>
                <div id="preview" dangerouslySetInnerHTML={this.rawMarkup()} />

            </div>
            // Text editor  
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
