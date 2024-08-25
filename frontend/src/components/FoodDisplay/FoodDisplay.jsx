import React, { useContext } from 'react';
import './FoodDisplay.css';
import { food_list } from './../../assets/assets';
import { StoreContext } from '../../context/StoreContext';


const FoodDisplay = () => {

    const {food_list} = useContext(StoreContext)    

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((item,index) =>{
                return
            })}
        </div>
    </div>
  )
}

export default FoodDisplay;