const addMessage = (message) => {
    return {
        type: 'ADD',
        message: message
    }
};

// change code below this line
const mapDispatchToProps = (dispatch) => {
    return {
        submitNewMessage: function (message) {
            dispatch(addMessage(message))
        }
    }
}