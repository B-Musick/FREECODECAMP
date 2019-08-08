import React from 'react';

class Timer extends React.Component{
    state={
        startTimer: false // Determines if timer should start
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
                this.setState({
                    startTimer: false
                })
                clearInterval(clockStart);
            }
            if(this.state.startTimer){
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
        
        let min = this.props.minutes>9 ? this.props.minutes+"": "0"+this.props.minutes;
        return min+":"+sec;
    }

    resetTime=()=>{
        // When reset button pressed, reset time and stop clock
        this.props.resTime();
        this.setState({
            startTimer: false
        })
    }

    render(){
        return(
            <div className="timer-container">
                {/* Title */}
                <div id="timer-label">SESSION</div>
                {/* Timer */}
                <div id="time-left">{this.renderTime()}</div>
                <button id="start_stop" onClick={this.timer}>Start</button>
                <button id="reset" onClick={this.resetTime}>Reset</button>
            </div>

        )
    }
}

export default Timer;