// Redux Code:
const ADD = 'ADD';

// Action creator which creates new message and returns action
const addMessage = (message) => {
    return {
        type: ADD,
        message
    }
};

// Changes state based on an action
const messageReducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [
                ...state,
                action.message
            ];
        default:
            return state;
    }
};


// holds the state, sets up message state
const store = Redux.createStore(messageReducer);

// React Code:

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
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    submitMessage() {
        const currentMessage = this.state.input;
        this.setState({
            input: '',
            messages: this.state.messages.concat(currentMessage)
        });
    }
    render() {
        return (
            <div>
                <h2>Type in a new Message:</h2>
                <input
                    value={this.state.input}
                    onChange={this.handleChange} /><br />
                <button onClick={this.submitMessage}>Submit</button>
                <ul>
                    {this.state.messages.map((message, idx) => {
                        return (
                            <li key={idx}>{message}</li>
                        )
                    })
                    }
                </ul>
            </div>
        );
    }
};

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
    // render the Provider here
    render() {
        return (<Provider store={store}>
            <DisplayMessages />
        </Provider>
        )
    }

    // change code above this line
};