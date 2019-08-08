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
       
        let clock = () =>{
            
            console.log('fart');
        }
        let clockStart = setInterval(clock, 1000);
        
        if(!this.state.startTimer){
            clearInterval(clockStart);
        }else{
            
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