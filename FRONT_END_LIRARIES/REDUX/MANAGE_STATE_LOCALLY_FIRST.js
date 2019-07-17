class DisplayMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            messages: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }

    // add handleChange() and submitMessage() methods here
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    submitMessage() {

        this.setState(prevState => ({
            // Need to push the item to the state array
            messages: [...prevState.messages, this.state.input],
            input: ''
        }))

    }
    render() {
        return (
            <div>
                <h2>Type in a new Message:</h2>
                { /* render an input, button, and ul here */}
                <input name="message" id="input-name" type="text" onChange={this.handleChange} value={this.state.input} />
                <button name="message" onClick={this.submitMessage}>Submit</button>
                <ul>
                    {this.state.messages.forEach((message) => {
                        <li>{message}</li>
                    })}
                </ul>
                { /* change code above this line */}
            </div>
        );
    }
};