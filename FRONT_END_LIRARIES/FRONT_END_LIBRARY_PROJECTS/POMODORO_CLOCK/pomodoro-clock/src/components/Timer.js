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
        let clock = () =>{
            // Will hold the logic controlling the clock countdown
            // this.setState({

            // })
            
            if (!this.state.startTimer) {
                clearInterval(clockStart);
            }
            
        }
        
        if(this.state.startTimer){
            // If the start button is 'on', then start the interval which 
            // calls the clock method every second
            clockStart = setInterval(clock, 1000);
        }
    }

    
    render(){
        return(
            <div className="timer-container">
                {/* Title */}
                <div id="timer-label">SESSION</div>
                {/* Timer */}
                <div id="time-left"></div>
                <button id="start_stop" onClick={this.timer}>Start</button>
                <button id="reset">Reset</button>
            </div>

        )
    }
}

export default Timer;