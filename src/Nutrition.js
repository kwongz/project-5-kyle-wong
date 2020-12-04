import { Component, Fragment } from 'react'
import axios from 'axios'
import FoodList from './FoodList.js'
import ErrorMessage from './ErrorMessage.js'
import { animateScroll as scroll } from 'react-scroll';

class Nutrition extends Component {

    constructor() {
        super();

        this.state = {
            userInput: '',
            ingredientError: false,
            food:[]

        }
    }

    // create a function that toggles off the hide class when the this.state.food > 0 || this.state.ingredientError === true

    toggleHide = () => {
        const el = document.querySelector('.results');
        if( this.state.food.length > 0 || this.state.ingredientError === true) {
            el.classList.remove('hide');
        }
    }

    // create a function that prevents default of button click
    // Use this function to call the api function
    submitFunction = (e) => {
        e.preventDefault();
        this.getData();
        this.setState({
            userInput: ''
        })
        scroll.scrollToBottom()

    }

    // this function updates the userInput state, so that the axio call will have content to enter in it's query parameter
    handleOnChange = (e) => {
        this.setState({
            userInput: e.target.value
        })
    }


    handleRemoveItem = (indexOfClickedFood) => {
        // create a copy of the food state array to manipulate
        const filteredFoodArray = [...this.state.food];
        // filter through each copied array and store it in a variable
        const updatedFoodList = filteredFoodArray.filter((food, index) => {
            return indexOfClickedFood !== index
        })
        this.setState({
            food: updatedFoodList
        })
        // create a condition when the last item is removed from the food list, to add class hide to the results section
        if (this.state.food.length === 1) {
            const el = document.querySelector('.results');
            el.classList.add('hide');
        }
    }

    // create a function that holds the axios call
    getData = () => {
        // create variables for the API's key, id and url
        const keyAPI = '5698e12ca2f5fbae51fac73d0355787e'
        const idAPI = 'eb92a73a'
        const urlAPI = `https://api.edamam.com/api/nutrition-data?`
        axios({
            method: 'GET',
            url: urlAPI,
            responseType: 'json',
            params: {
                app_id: idAPI,
                app_key: keyAPI,
                ingr: this.state.userInput
            }
        }).then((res) => {
            console.log(res.data);
            // create a conditional statement that ensures the res.data has the objects to render the nutritional values in foodList
            if( res.data.ingredients.length && res.data.ingredients[0].parsed && res.data.ingredients[0].parsed.length && res.data.ingredients[0].parsed[0].weight > 1 ) {
                // creat a independent copy of the food state array to push res.data
                const copyFoodArray = [...this.state.food];
                copyFoodArray.push(res.data);
                // update the food state with the pushed data from the copied array
                // set the userInput to '' to clear the input terminal for the next userInput
                // ensure ingredientError is falst, so the foodList will render, and not the error message
                this.setState({
                    food: copyFoodArray,
                    userInput: '',
                    ingredientError: false
                }) 
                // create a else statement that changes the ingredientError state to true
            } else {
                this.setState({
                    ingredientError: true
                })
            }
            this.toggleHide();
        }).catch(err => {
            this.setState({
                ingredientError:true
            })
            this.toggleHide();
        }) 
    }



    render() {
        return(
            <Fragment>
                <section className='formSection'>
                        <h1>Nutrition Calculator</h1>
                        <form action="">
                            <label htmlFor="food">What are you eating?</label>
                            <input 
                                type="text"
                                id="food"
                                onChange={this.handleOnChange}
                                placeholder="1 Large Apple"
                                autoComplete="off"
                                value={this.state.userInput}
                                />
                            <button onClick={this.submitFunction}>Submit</button>   
                        </form>
                </section>
                    <section className='results hide'>
                        <div className='wrapper'>
                            <h2>results</h2>
                            <ul className="foodList">
                        {
                            this.state.ingredientError 
                            ? <ErrorMessage />
                            : <FoodList foodArray={this.state.food} remove={this.handleRemoveItem}/>
                        }
                            </ul>
                        </div>
                    </section>
            </Fragment>
        )
    }
}

export default Nutrition;