// define ADD, addMessage(), messageReducer(), and store here:
const ADD = 'ADD';

// Action creator which creates new messge
const addMessage = (message) => {
    return {
        type: 'ADD',
        message: message
    }
}

const messageReducer = (messages = [], action) => {
    if (action.type === ADD) {
        return [...messages, action.message]
    }

    return messages;
}

const store = Redux.createStore(messageReducer);