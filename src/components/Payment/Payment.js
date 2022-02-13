import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';

import { useStateValue } from '../../StateProvider';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import { actionTypes, getBasketTotal } from '../../reducer';
import axios from '../../axios';

import "./Payment.css";
import { doc, setDoc } from 'firebase/firestore';
import db from '../../firebase';

const Payment = () => {
    const [{ basket, user }, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    const navigate = useNavigate();
    
    useEffect(() => {
        // generate special stripe secret which  allows us to charge the customer.
        const getClientSecret = async () =>  {
            const response  = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });

            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    }, [basket]);

    console.log("Client Secret: ", clientSecret);

    const handleSubmit = async event => {
        event.preventDefault();
        setProcessing(true);

        try {
            const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });
    
            console.log("paymentIntent: ", paymentIntent)
    
            const docRef = doc(db, 'users', user?.uid, 'orders', paymentIntent.id);
    
            await setDoc(docRef, {
                basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            })
            
    
            setSucceeded(true);
            setError(null);
            setProcessing(false);
    
            dispatch({
                type: actionTypes.EMPTY_BASKET,
            });
    
            navigate("/orders", {replace: true});
        } catch (error) {
            console.log("error: ", error);
        }
    }

    const handleChange = event => {
        // Listen for changes in card element and set error if any.
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>

                {/* Delivery section */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Megapolis, Splendour</p>
                        <p>Pune, Maharashtra,411057</p>
                    </div>
                </div>    
                {/* Review Item */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket?.map((item, i) => (
                            <CheckoutProduct
                                key={item.id + `_${i}`}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                {/* Payment method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value)=> (
                                        <>
                                            <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing  || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                                </button>    
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;