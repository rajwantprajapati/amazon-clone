import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React,{ useEffect, useState } from 'react';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import Order from './Order/Order';
import "./Orders.css"

const Orders = () => {
    const [{ user }] = useStateValue();  
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            const q = query(collection(db, 'users', user?.uid, 'orders'), orderBy('created', 'desc'));

            onSnapshot(q, (querySnapshot) => {
            setOrders(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })));
            });
        } else {
            setOrders([])
        }
    }, [user]);

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className="orders__order">
                {orders?.map(order => (
                    <Order
                        key={order.id}
                        order={order}
                    />
                ))}
            </div>
        </div>
    )
}

export default Orders;