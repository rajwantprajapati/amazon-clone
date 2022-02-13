import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';
import { getBasketTotal } from '../../reducer';
import { useStateValue } from '../../StateProvider';

import "./Subtotal.css";

const Subtotal = () => {
    const [{ basket }] = useStateValue();
    const navigate = useNavigate();

    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={(value)=> (
                    <>
                        <p>Subtotal ({basket?.length} items): <strong>{value}</strong></p>
                        <small className='subtotal__gift'>
                            <input type="checkbox" name="" id="" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button onClick={() => navigate('/payment')}>Proceed to Checkout</button>
        </div>
    );
};

export default Subtotal;
