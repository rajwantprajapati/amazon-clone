import React from 'react';
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import "./Product.css";

const Product = ({id, title, image, price, rating }) => {
    const [, dispatch] = useStateValue();

    const addToBasket = () => {
        // dispatch the item to the reducer to update the state.
        dispatch({
            type: actionTypes.ADD_TO_BASKET,
            item: {
                id,
                title,
                image,
                price,
                rating,
            }
        })
    };

    return (
        <div className='product'>
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>⭐</p>
                        ))}
                </div>
            </div>

            <img
                src={image}
                alt="image_not_available"
            />

            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    );
};

export default Product;
