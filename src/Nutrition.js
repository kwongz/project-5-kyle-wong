import { Component, Fragment } from 'react'
import axios from 'axios'
import DisplayFoods from './DisplayFoods.js'
import ErrorMessage from './ErrorMessage.js'

class Nutrition extends Component {

    constructor() {
        super();

        this.state = {
            userInput: '',
            ingredientError: false,
            food:[]

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
        }

        // create a function that holds the axios call
        getData = () => {
            // create variables for the API's key, id and url
            const keyAPI = '5698e12ca2f5fbae51fac73d0355787e'
            const idAPI = 'eb92a73a'
            const urlAPI = `https://api.edamam.com/api/nutrition-data?`
            axios({
                method:'GET',
                url: urlAPI,
                responseType: 'json',
                params: {
                    app_id: idAPI,
                    app_key: keyAPI,
                    ingr: this.state.userInput
                }
            }).then((res) => {
                // create a conditional statement that ensures the res.data has the objects to render the nutritional values in foodList
                if( res.data.ingredients.length && res.data.ingredients[0].parsed && res.data.ingredients[0].parsed.length ) {
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
                                placeholder="1 Large Apple or 200g Chicken"
                                autoComplete="off"
                                value={this.state.userInput}
                                />
                            <button onClick={this.submitFunction}>Submit</button>
                        </form>
                </section>
                <section className='results'>
                    <div className='wrapper'>
                        <h2>results</h2>
                        {
                            this.state.ingredientError 
                                ? <ErrorMessage />
                                :<ul className='foodList'>
                                {
                                    this.state.food.map((foodItem, index) => {
                                        return (
                                                <DisplayFoods 
                                                key={foodItem.ingredients[0].parsed[0].foodId}
                                                remove={ () => { this.handleRemoveItem(index)} }
                                                quantity={foodItem.ingredients[0].parsed[0].quantity}
                                                name={foodItem.ingredients[0].parsed[0].food}
                                                calories={foodItem.calories}
                                                carbs={(foodItem.totalNutrients.CHOCDF.quantity).toFixed(2)}
                                                carbsUnit={foodItem.totalNutrients.CHOCDF.unit}
                                                fat={(foodItem.totalNutrients.FAT.quantity).toFixed(2)}
                                                fatUnit={foodItem.totalNutrients.FAT.unit}
                                                protein={(foodItem.totalNutrients.PROCNT.quantity).toFixed(2)}
                                                proteinUnit={foodItem.totalNutrients.PROCNT.unit}
                                                />  
                                                )
                                        })
                                }
                                </ul>
                        }
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default Nutrition;