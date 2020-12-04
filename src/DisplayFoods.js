import { Fragment } from "react";

    const DisplayFoods = ({ name, foodType, weight, calories, carbs, carbsUnit, fat, fatUnit, protein, proteinUnit, remove }) => {
        return(
            <Fragment>
                            <li className='foodItem'>
                                <h3>{name}</h3>
                                <ul className='nutrients'>
                                    <li>
                                        <span>Food Type:</span> 
                                        <span>{foodType}</span>
                                    </li>
                                    <li>
                                        <span>Weight:</span>
                                        <span>{weight} g</span>
                                    </li>
                                    <li>
                                        <span>Calories:</span>
                                        <span>{calories} kcal</span>
                                    
                                    </li>
                                    <li>
                                        <span>Carbohydrates:</span> 
                                        <span>{carbs} {carbsUnit}</span>
                                    </li>
                                    <li>
                                        <span>Fat:</span> 
                                        <span>{fat} {fatUnit}</span>
                                    </li>
                                    <li>
                                        <span>Protein:</span> 
                                        <span>{protein} {proteinUnit}</span>
                                    </li>
                                </ul>
                                    <button onClick={remove}>remove</button>
                            </li>
            </Fragment>
        )
    }

export default DisplayFoods;