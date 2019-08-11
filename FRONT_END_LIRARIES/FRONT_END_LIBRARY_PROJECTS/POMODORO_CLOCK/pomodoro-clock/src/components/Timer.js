import React from 'react';

class Timer extends React.Component{
    state={
        startTimer: false, // Determines if timer should start
        inSession: true, // Determines if on session
        onBreak: false, // Determines if on break
        
    }

    timer= async()=>{
        // Need async/await since it wont change the state in time for things to work
        await this.setState(prevState=>({
            // When 'start_stop' button pressed, will either start or stop depending 
            // on what startTimer is (if false, then turns true and timer starts)
            startTimer: !prevState.startTimer
        
        }))
        console.log(this.state.startTimer)
        let clockStart;
        let clock = async() =>{
            // Will hold the logic controlling the clock countdown
            if (!this.state.startTimer) {
                // If timer turned off, stop setInterval from running
                clearInterval(clockStart);
            }
            // Call the method passed in from App component, which will tell this
            // method in the App to decrease 'seconds' state value each time the
            // setInterval() method runs (clockStart). The 'seconds' from App is
            // passed to this Component and can be access this.props.seconds 
            if (this.props.minutes === 0 && this.props.seconds === 60) {
                // If the timer has reached 0, then stop it
                await this.setState(prevState=>({
                    // If reaches 0 then switch the clock to the other (break to session 
                    // or vice versa)
                    
                    onBreak: !prevState.onBreak,
                    inSession: !prevState.inSession
                }))
                // clearInterval(clockStart);
                this.beep();
                // This will switch the clock from either break to session or vice versa
                // Doesnt stop the clock
                // call resetCurrentTime in App component
                this.props.resCurrentTime(this.state.onBreak);
                
                
                
            }
            else if(this.state.startTimer){
                // Make sure else if statement, otherwise an error arises where
                // clock decreases a second after 00:00 occurs, so doesnt start at right number
                // Prevents decrease in value after stop or reset pressed
                this.props.decSec();
            }

            if(this.props.seconds === 0){
                // Reset the 'seconds' App state to 60
                this.props.resSec();
            }
            if(this.props.seconds===59){
                // If the seconds is 59, this means minutes val has to decrease by 1
                // Call the method, which is called in App component --> changes
                // 'minutes' state in App --> passes info back to Timer component
                this.props.decMin();
            }
            

            
        }
        
        if(this.state.startTimer){
            // If the start button is 'on', then start the interval which 
            // calls the clock method every second
            clockStart = setInterval(clock, 1000);
            
            console.log('clock');
            
        }
    }

    renderTime=()=>{

        // Used to print out the time mm:ss
        // If seconds === 60, then this means 00, otherwise just use actual value
        let sec;
        if(this.props.seconds>=10){
            sec = this.props.seconds === 60 ? "00" : this.props.seconds + "";
        }else{
            sec = "0"+this.props.seconds;
        }
        // Prints either 0 before number if <9 or not
        let min = this.props.minutes>9 ? this.props.minutes+"": "0"+this.props.minutes;
        return min+":"+sec;
    }

    resetTime=()=>{
        // When reset button pressed, reset time and stop clock
        // Also determines which clock is set
        this.props.resTime();
        this.setState({
            startTimer: false, // Stop timer
            onBreak: false // Switch label back to SESSION
        })
        // Pause the sound
        document.getElementById('beep').pause();
        // To reload the sound (so it start from beginning next call)
        document.getElementById('beep').load();

    }
  
    setTimerLabel=()=>{
        // Function to set timer label depending on if on break or in session
        if(this.state.onBreak){
            return "BREAK"
        }else{
            return "SESSION"
        }
    }

    beep=()=>{
        // Plays the beep when timer reaches 0 (called by timer method)
        document.getElementById('beep').play();
    }
    render(){
        return(
            <div className="timer-container">
                {/* Title */}
                <div id="timer-label">
                    <audio id="beep" preload="auto" src="https://goo.gl/65cBl1"></audio>
                    {this.setTimerLabel()}
                </div>
                {/* Timer */}
                <div id="timer-inner-container">
                    <div id="time-left">{this.renderTime()}</div>
                    <button id="start_stop" onClick={this.timer}>Start</button>
                    <button id="reset" onClick={this.resetTime}>Reset</button>
                </div>

            </div>

        )
    }
}

export default Timer;