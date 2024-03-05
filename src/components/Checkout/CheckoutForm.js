import { PaymentElement } from '@stripe/react-stripe-js';
import { Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { ChevronLeft } from 'react-feather';

const CheckoutForm = ({ order, handleResetCheckout }) => {
  const [placingOrder, setPlacingOrder] = useState(false);
  // const [updateOrderAmount, result] = useUpdateOrderAmountMutation();
  // const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  // const handleConfirmOrder = async (e) => {
  //   e.preventDefault();

  //   if (!stripe || !elements) {
  //     // Stripe.js has not yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   //make sure all fields are filled out
  //   if (!email || !country || !name) {
  //     setError('All feilds must be filled out');
  //     return;
  //   }

  //   try {
  //     setPlacingOrder(true);

  //     const updatedOrderReq = await updateOrder({
  //       orderId: order._id,
  //       email: email.toLowerCase(),
  //       country,
  //       zip,
  //       name,
  //     }).unwrap();

  //     //update the order on the server
  //     if (updatedOrderReq.msg === 'Order updated') {
  //       const result = await stripe.confirmCardPayment(order?.clientId, {
  //         payment_method: {
  //           card: elements.getElement(CardElement),
  //         },
  //       });
  //       if (result.error) {
  //         setError(result.error.message);
  //         setPlacingOrder(false);
  //       } else {
  //         // The payment has been processed!
  //         if (result.paymentIntent.status === 'succeeded') {
  //           setPlacingOrder(false);
  //           Cookies.remove('orderId');
  //           navigate(`/order/success/`, {
  //             state: { order: updatedOrderReq.order },
  //           });
  //         }
  //       }
  //     } else {
  //       setPlacingOrder(false);
  //       setError('There was an error');
  //       return;
  //     }
  //   } catch (err) {
  //     setPlacingOrder(false);
  //     setError('There was an error');
  //     return;
  //   }
  // };

  return (
    <div>
      <form>
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
            // disabled={placingOrder || !stripeOnboard}
            // type='submit'

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
