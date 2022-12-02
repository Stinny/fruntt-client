import React from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';

const CardForm = () => {
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#000000',
        backgroundColor: '#ffffff',
        height: '50px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '20px',
        '::placeholder': {
          color: '#000000',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: 'red',
      },
    },
  };

  return (
    <div className='w-full mt-4'>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </div>
  );
};

export default CardForm;
