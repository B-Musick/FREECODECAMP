import React from 'react';

import Break from './Break';
import Session from './Session';

class App extends React.Component{
    state={
        break: 5, // Holds the break time
        session: 45 // Holds the session time
    }
    onBreakIncrement= () =>{
        // This method is called from Break component when the id="break-increment"
        // button is pressed.
        this.setState(prevState=>({
            // Cant just use this.state.break++ since you dont want to change the original
            // state
            break: prevState.break+=1
        }))
    }
    onBreakDecrement = () => {
        // This method is called from Break component when the id="break-increment"
        // button is pressed.
        this.setState(prevState => ({
            // Cant just use this.state.break++ since you dont want to change the original
            // state
            break: prevState.break -= 1
        }))
    }
    onSessionIncrement = () => {
        // This method is called from Break component when the id="break-increment"
        // button is pressed.
        this.setState(prevState => ({
            // Cant just use this.state.break++ since you dont want to change the original
            // state
            session: prevState.session += 1
        }))
    }
    onSessionDecrement = () => {
        // This method is called from Break component when the id="break-increment"
        // button is pressed.
        this.setState(prevState => ({
            // Cant just use this.state.break++ since you dont want to change the original
            // state
            session: prevState.session -= 1
        }))
    }

    render(){
        return (
            <div>
                <h1>Pomodoro Clock</h1>
                {/* Pass the onBreakIncrement method so it is called when the button is pressed
                to increment and will increment the Apps state */}
                <Break onBreakIncrement={this.onBreakIncrement} onBreakDecrement={this.onBreakDecrement} break={this.state.break} />
                <Session onSessionIncrement={this.onSessionIncrement} onSessionDecrement={this.onSessionDecrement} session={this.state.session} />

            </div>
            
        )
    }
}

export default App;