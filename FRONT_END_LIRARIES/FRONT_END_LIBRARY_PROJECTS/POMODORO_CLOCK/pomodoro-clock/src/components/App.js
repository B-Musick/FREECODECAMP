import React from 'react';

import Break from './Break';
import Session from './Session';
import Timer from './Timer';

class App extends React.Component{
    state={
        break: 5, // Holds the break time
        session: 25, // Holds the session time
        minutes: 25,
        seconds: 60
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
            // Cant just use this.state.session++ since you dont want to change the original
            // state
            break: prevState.break -= 1
        }))
    }
    onSessionIncrement = () => {
        // This method is called from Session component when the id="session-increment"
        // button is pressed.
        this.setState(prevState => ({
            // Cant just use this.state.session++ since you dont want to change the original
            // state
            session: prevState.session += 1
        }))
    }
    onSessionDecrement = () => {
        // This method is called from Break component when the id="session-increment"
        // button is pressed.
        this.setState(prevState => ({
            // Cant just use this.state.session++ since you dont want to change the original
            // state
            session: prevState.session -= 1
        }))
    }

    decreaseMinutes = async () =>{
        // Passed to the Timer component
        // This will decrement when 60 seconds has gone by
        await this.setState(prevState=>({
            minutes: prevState.minutes-=1
        }))
    } 

    decreaseSeconds = async() => {
        // This will decrement when setTimeout has gone through 1 second has gone by
        // Passed to the Timer component
        await this.setState(prevState => ({
            seconds: prevState.seconds -= 1
        }))
    } 

    resetSeconds = async() =>{
        // This will be passed to the Timer component
        // Will reset seconds back to 60 once reaches 0
        await this.setState({
            seconds: 60
        })
    }

    render(){
        return (
            <div>
                <h1>Pomodoro Clock</h1>
                {/* Pass the onBreakIncrement method so it is called when the button is pressed
                to increment and will increment the Apps state */}
                <Break onBreakIncrement={this.onBreakIncrement} onBreakDecrement={this.onBreakDecrement} break={this.state.break} />
                <Session onSessionIncrement={this.onSessionIncrement} onSessionDecrement={this.onSessionDecrement} session={this.state.session} />
                <Timer decMin={this.decreaseMinutes} decSec={this.decreaseSeconds} resSec={this.resetSeconds} minutes={this.state.minutes} seconds={this.state.seconds}/>

            </div>
            
        )
    }
}

export default App;