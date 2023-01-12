import { useContext } from 'react';
import MealItemForm from './MealItemForm';

import classes from './MealItem.module.css';
import CartContext from '../../store/cart-context';

const MealItem = props => {
    const carCtx =useContext(CartContext);

    const addItemToCartHandler = (amount)=>{
        carCtx.addItem({
            id: props.id,
            name : props.title,
            amount : amount,
            price : props.price
        })
    }

    const price = `$${props.price.toFixed(2)}`;
    

    return (
        <li   className={classes.meal}>
        <div>
            <h3>{props.title}</h3>
            <div className={classes.description}>{props.desc}</div>
            <div className= {classes.price}>{price}</div>
        </div>
        <MealItemForm onAddToCart = {addItemToCartHandler}/>
        </li>
    );
}

export default MealItem;
