import React from 'react';

class Session extends React.Component {
    onSessionIncrement = () => {
        // Called when 'session-increment' button pressed, will call the method which
        // was received from the App component
        this.props.onSessionIncrement();
    }
    onSessionDecrement = () => {
        // Called when 'session-decrement' button pressed, will call the method which
        // was received from the App component
        this.props.onSessionDecrement();
    }
    render(){
        return (
            <div>
                <h3 id="session-label">SESSION LENGTH</h3>
                {/* Display current session state */}
                <div id="session-inner-container">
                    <div id="session-length">{this.props.session}</div>
                    {/* Buttons to increment and decrement the session state value in App */}
                    <button id="session-increment" onClick={this.onSessionIncrement}>Increment</button>
                    <button id="session-decrement" onClick={this.onSessionDecrement}>Decrement</button>
                </div>

            </div>

        )
    }

}

export default Session;