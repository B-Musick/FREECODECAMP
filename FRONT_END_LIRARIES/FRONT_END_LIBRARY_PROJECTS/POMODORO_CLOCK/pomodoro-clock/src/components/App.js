import React from 'react';

import Break from './Break';
import Session from './Session';
import Timer from './Timer';

class App extends React.Component{
    sessionTime = 25;
    breakTime = 5;
    state={
        break: this.breakTime, // Holds the break time
        session: this.sessionTime, // Holds the session time
        minutes: this.sessionTime,
        seconds: 60,
        timerStart: this.props.sessionTime // What current timer is at based on if onBreak or not
    }
    onBreakIncrement= () =>{
        // This method is called from Break component when the id="break-increment"
        // button is pressed.
        if(this.state.break < 60){
            // Only 60 minutes in an hour
            this.setState(prevState => ({
                // Cant just use this.state.break++ since you dont want to change the original
                // state
                break: prevState.break += 1
            }))
        }

    }
    onBreakDecrement = () => {
        // This method is called from Break component when the id="break-increment"
        // button is pressed.
        if (this.state.break > 1) {
            // Cant go less than 1
            this.setState(prevState => ({
                // Cant just use this.state.session++ since you dont want to change the original
                // state
                break: prevState.break -= 1
            }))
        }

    }
    onSessionIncrement = () => {
        // This method is called from Session component when the id="session-increment"
        // button is pressed.
        if(this.state.session<60){
            this.setState(prevState => ({
                // Cant just use this.state.session++ since you dont want to change the original
                // state. Need to change the minutes as well to match
                // Reset the clock
                session: prevState.session += 1,
                minutes: prevState.session,
                timerStart: prevState.session,
                seconds: 60
            }))
        }

    }
    onSessionDecrement = () => {
        // This method is called from Break component when the id="session-increment"
        // button is pressed.
        if(this.state.session>1){
            // Cant go less than 1
            this.setState(prevState => ({
                // Cant just use this.state.session++ since you dont want to change the original
                // state. Need to change the minutes as well to match
                // Resets the clock as well
                session: prevState.session -= 1,
                minutes: prevState.session, // Dont increment since session gets decremented just before and must match
                timerStart: prevState.session,
                seconds: 60

            }));
        }

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

    resetTime = async () =>{
        // Passed to Timer component
        // When 'Reset' button in Timer is clicked, calls this method
        // Resets everything back to normal
        
            await this.setState({
                seconds: 60,
                session: this.sessionTime,
                break: this.breakTime,
                minutes: this.sessionTime, // set clock to time
            })

    }

    resetCurrentTime = async (onBreak) => {
        // This is called when continuing from current iterations
        // Called from Timer component in clock method when timer reaches 00:00
        if(onBreak){
            // If on break
            await this.setState(prevState=>({
                seconds: 60,
                session: prevState.session,
                break: prevState.break,
                minutes: prevState.break, // set clock to time
                timerStart: prevState.break
            }))
        }else{
            // If not on break
            await this.setState(prevState=>({
                seconds: 60,
                session: prevState.session,
                break: prevState.break,
                minutes: prevState.session, // set clock to time
                timerStart:prevState.session
            }))
        }

    }

    render(){
        return (
            <div>
                <h1 class="page-title">Pomodoro Clock</h1>
                <div class="page-container">

                    {/* Pass the onBreakIncrement method so it is called when the button is pressed
                to increment and will increment the Apps state */}
                    <Break onBreakIncrement={this.onBreakIncrement} onBreakDecrement={this.onBreakDecrement} break={this.state.break} />
                    <Session onSessionIncrement={this.onSessionIncrement} onSessionDecrement={this.onSessionDecrement} session={this.state.session} />



                </div>
                <div class="component-container">
                    <Timer decMin={this.decreaseMinutes} decSec={this.decreaseSeconds} resSec={this.resetSeconds} resTime={this.resetTime} minutes={this.state.minutes} seconds={this.state.seconds} session={this.state.session}
                        breakTime={this.state.break} resCurrentTime={this.resetCurrentTime} timerStart={this.state.timerStart} />
                </div>
            </div>
            
            
        )
    }
}

export default App;