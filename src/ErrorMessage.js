import { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll';

class ErrorMessage extends Component {
    render() {
        return (
            <div className='errorAlert'>   
                <h2>Sorry, we weren't able to find what you ate!</h2>
                <div>
                    <p>Please try again, this time add a quantitiy or weight and the food item</p>
                    <p>e.g "1 chicken breast" or "1 scoop of ice cream"</p>
                </div>
                <button onClick={() => scroll.scrollToTop()} className='errorButton'>Okay!</button>
            </div>
        )
    }
}

export default ErrorMessage;

