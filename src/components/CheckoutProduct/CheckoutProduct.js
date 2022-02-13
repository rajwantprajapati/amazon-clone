import React from 'react';
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';

import "./CheckoutProduct.css"

const CheckoutProduct = ({ id, image, title, price, rating, hideRemoveFromBasketBtn }) => {
    const [, dispatch] = useStateValue();

    const removeFromBasket = () =>  {
        dispatch({
            type: actionTypes.REMOVE_FROM_BASKET,
            id,
        });
    }

    return (
        <div className='checkoutProduct'>
            <img
                src={image}
                alt=""
                className="checkoutProduct__image"
            />

            <div className="checkoutProduct__info">
                <p className='checkoutProduct__title'>{title}</p>
                <p className='checkoutProduct__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {
                        Array(rating)
                            .fill()
                            .map((_, i) => (
                                <p key={i}>⭐</p>
                            ))
                    }
                </div>
                {!hideRemoveFromBasketBtn && <button onClick={removeFromBasket}>Remove from Basket</button>}
            </div>
        </div>
    );
};

export default CheckoutProduct;
