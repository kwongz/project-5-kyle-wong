import { Component, Fragment } from 'react';
import DisplayFoods from './DisplayFoods.js'


class FoodList extends Component {
    render(){
        const {foodArray, remove} = this.props
        return(
            <Fragment>
                    {
                        foodArray.map((foodItem, index) => {
                            return (
                                    <DisplayFoods 
                                    key={foodItem.ingredients[0].text + foodItem.ingredients[0].parsed[0].Id}
                                    remove={ () => { remove(index)} }
                                    foodType={foodItem.ingredients[0].parsed[0].food}
                                    weight={foodItem.ingredients[0].parsed[0].weight.toFixed(2)}
                                    name={foodItem.ingredients[0].text}
                                    calories={foodItem.calories}
                                    carbs={foodItem.totalNutrients.CHOCDF.quantity.toFixed(2)}
                                    carbsUnit={foodItem.totalNutrients.CHOCDF.unit}
                                    fat={foodItem.totalNutrients.FAT.quantity.toFixed(2)}
                                    fatUnit={foodItem.totalNutrients.FAT.unit}
                                    protein={(foodItem.totalNutrients.PROCNT.quantity).toFixed(2)}
                                    proteinUnit={foodItem.totalNutrients.PROCNT.unit}
                                    />  
                                    )
                            })
                    }
            </Fragment>
        )
    }
}

export default FoodList;