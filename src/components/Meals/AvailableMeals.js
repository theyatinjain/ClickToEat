import React, { useEffect, useState } from 'react';
import styles from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from '../Meals/MealItem/MealItem';

function AvailableMeals() {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        async function fetchMeals() {
            const response = await fetch('https://clicktoeat77-default-rtdb.firebaseio.com/meals.json');
            if (!response.ok) throw new Error('Something Went wrong!');

            const responseData = await response.json();
            const loadedMeals = [];
            for (const key in responseData) loadedMeals.push({
                id: key,
                name: responseData[key].name,
                description: responseData[key].description,
                price: responseData[key].price,
            });
            setMeals(loadedMeals);
            setIsLoading(false);
        }
        fetchMeals().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        // try catch can't be used as throwing error rejects promise
    }, []);

    if (isLoading) return <section className={styles.mealsLoading}><p>Loading Meals....</p></section>
    if (httpError) return <section className={styles.mealsError}><p>{httpError}</p></section>

    const mealsList = meals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />);
    return (
        <section className={styles.meals} >
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;