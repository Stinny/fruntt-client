import { Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { AlertCircle, ChevronLeft } from 'react-feather';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useUpdateOrderMutation } from '../../api/ordersApiSlice';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

//flowbite
import { Alert } from 'flowbite-react';

const CheckoutForm = ({ order, handleResetCheckout, setError, error }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);
  // const [updateOrderAmount, result] = useUpdateOrderAmountMutation();
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    //make sure all fields are filled out
    if (!email || !name) {
      setError('All feilds must be filled out');
      return;
    }

    try {
      setPlacingOrder(true);

      const confirmRes = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: 'if_required',
      });

      if (confirmRes.error) {
        setError(confirmRes.error.message);
        setPlacingOrder(false);
      } else {
        // The payment has been processed!
        if (confirmRes.paymentIntent.status === 'succeeded') {
          const updatedOrderReq = await updateOrder({
            orderId: order._id,
            email: email.toLowerCase(),
            name,
          }).unwrap();

          //update the order on the server
          if (updatedOrderReq.msg === 'Order updated') {
            setPlacingOrder(false);
            Cookies.remove('orderId');
            navigate(`/order/${order?._id}`);
          }
        }
      }
    } catch (err) {
      setPlacingOrder(false);
      setError('There was an error');
      console.log(err);
      return;
    }
  };

  return (
    <div>
      <form onSubmit={handleConfirmOrder} className='flex flex-col'>
        {error ? (
          <Alert color='failure' rounded icon={AlertCircle}>
            {error}
          </Alert>
        ) : (
          ''
        )}
        <p className='text-stone-800 text-sm'>Customer</p>
        <div className='flex items-center mt-1'>
          <input
            type='email'
            placeholder='Email'
            className='border text-sm border-gray-200 bg-gray-50 ring-0 focus:border-transparent hover:bg-gray-200 focus:bg-gray-200 0 w-3/6 outline outline-0 rounded-md p-2'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='text'
            placeholder='Name'
            className='border text-sm border-gray-200 bg-gray-50 ring-0 focus:border-transparent hover:bg-gray-200 focus:bg-gray-200 0 w-3/6 outline outline-0 rounded-md p-2 ml-2'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <p className='text-stone-800 text-sm mb-1 mt-2'>Payment</p>
        <PaymentElement />
        <div className='w-full flex items-center mt-2'>
          <button
            type='button'
            disabled={placingOrder}
            onClick={handleResetCheckout}
            className='w-3/12 h-10 text-sm text-stone-800 bg-gray-200 rounded-md mr-2 flex items-center justify-center'
          >
            <ChevronLeft size={16} />
          </button>
          <button
            disabled={placingOrder}
            type='submit'
            className='w-9/12 h-10 bg-gray-200 text-stone-800 text-sm rounded-md'
          >
            {placingOrder ? <Spinner /> : 'Get Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
