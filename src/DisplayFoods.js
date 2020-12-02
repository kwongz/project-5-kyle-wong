    const DisplayFoods = ({ quantity, name, calories, carbs, carbsUnit, fat, fatUnit, protein, proteinUnit, remove }) => {
        return(
                <li className='foodItem'>
                    <h3>({quantity}) {name}</h3>
                    <ul className='nutrients'>
                        <li>Calories: {calories}</li>
                        <li>Carbohydrates: {carbs} {carbsUnit}</li>
                        <li>Fat: {fat} {fatUnit}</li>
                        <li>Protein: {protein} {proteinUnit}</li>
                    </ul>
                    <button onClick={remove}>remove</button>
                </li>
        )
    }

export default DisplayFoods;