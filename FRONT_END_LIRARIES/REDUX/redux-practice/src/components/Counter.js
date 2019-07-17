import React, {Component} from 'react';
import {connect} from 'react-redux';
import {incrementCount, decrementCount} from '../actions/'

class Counter extends React.Component {
    render(){
        return(
            <div>
                <h1>{}</h1>
                <p>
                    <button onClick={}>+</button>
                    <button onClick={}>-</button>

                </p>
            </div>

        )

        
    }
}