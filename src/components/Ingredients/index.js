import React, { useEffect, useState } from 'react';
import { listIngredients } from '../../api';

export default function Ingredients() {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        // api call
        listIngredients()
        .then((res) => {
            console.log(res);
            setIngredients(res.data);
        })
        .catch((err) => console.log(err));
    }, [])

    return (
        <div>
            <h1 className="text-center">Ingredients</h1>
            <div className="text-center">
                {
                    ingredients.map(ingredient => (
                        <p key={ingredient._id}> {ingredient.name} </p>
                    ))
                }
            </div>
        </div>
    )
}