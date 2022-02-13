import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import './App.css';
import Checkout from './components/Checkout/Checkout';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Payment from './components/Payment/Payment';
import { auth } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import Orders from './components/Orders/Orders';

const stripePromise = loadStripe("pk_test_51KSDOFSJ7T6EiEpoqgmVB5O5Fbfk455mOalKE7eno6XSDclJdcYN4YNi2EMpbpVWZnrogO1gDq26Fq0X85kbORSh00Ek8YVZJ5");

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (user)  => {
      console.log("The user: ", user);

      if (user) {
        // user is logged in.
        dispatch({
          type: actionTypes.SET_USER,
          user,
        })
      } else {
        // user is logged out.
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        })
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path='/' element={
            <>
              <Header />
              <Home />
            </>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/checkout' element={
            <>
              <Header />
              <Checkout />
            </>
          } />
          <Route path='/payment' element={
            <>
              <Header />
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </>
          } />
          <Route path='/orders' element={
            <>
              <Header />
              <Orders />
            </>
          } />
        </Routes>
      </div> 
    </Router>
  );
}

export default App;
