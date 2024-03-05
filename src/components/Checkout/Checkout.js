import React from 'react';
import NoPayForm from './NoPayForm';
import CheckoutForm from './CheckoutForm';

//stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const Checkout = ({ order, setReadyForPayment, refetch }) => {
  // const { orderId } = useParams();
  //   const {
  //     data: order,
  //     isLoading,
  //     isSuccess,
  //     refetch,
  //   } = useGetOrderQuery({
  //     orderId,
  //   });

  console.log(order);

  //test: pk_test_KnpiRgRMVGvh1Tu8cjzphjmP00L66ieGNQ
  //live: pk_live_eWcmPkgRoGeR0yn9gKf7wopL00xb4WlY4M
  const stripeLoader = loadStripe('pk_test_KnpiRgRMVGvh1Tu8cjzphjmP00L66ieGNQ');
  const stripeOptions = {
    clientSecret: order?.clientId,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#fff',
        colorBackground: '#ffffff',
        colorText: '#000',
        colorDanger: '#df1b41',
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        fontSizeBase: '14px',
        borderRadius: '5px',
      },
      rules: {
        '.Input': {
          borderColor: 'rgb(229 231 235)',
          backgroundColor: 'rgb(249 250 251)',
          boxShadow: 'none',
        },
        '.Input:focus': {
          borderColor: 'rgb(229 231 235)',
          backgroundColor: 'rgb(229 231 235)',
          outline: 0,
          boxShadow: 'none',
        },
      },
    },
  };
  return (
    <div className='mx-auto md:ml-4'>
      <div>
        {order?.total == 0 ? (
          <NoPayForm order={order} setReadyForPayment={setReadyForPayment} />
        ) : (
          <Elements stripe={stripeLoader} options={stripeOptions}>
            <CheckoutForm order={order} refetch={refetch} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Checkout;
