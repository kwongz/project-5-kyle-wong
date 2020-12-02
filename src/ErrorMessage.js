import { Component } from 'react';

class ErrorMessage extends Component {
    render() {
        return (
            <div className='errorAlert'>   
                <h1>There was an error</h1>
            </div>
        )
    }
}

export default ErrorMessage;