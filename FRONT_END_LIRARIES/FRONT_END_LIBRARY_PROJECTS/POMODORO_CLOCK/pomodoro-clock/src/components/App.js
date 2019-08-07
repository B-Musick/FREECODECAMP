import React from 'react';

import Break from './Break';
import Session from './Session';

class App extends React.Component{
    render(){
        return (
            <div>
                <h1>Pomodoro Clock</h1>
                <Break />
                <Session />

            </div>
            
        )
    }
}

export default App;