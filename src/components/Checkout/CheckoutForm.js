import { PaymentElement } from '@stripe/react-stripe-js';
import React from 'react';

const CheckoutForm = () => {
  return (
    <div>
      <PaymentElement />
    </div>
  );
};

export default CheckoutForm;
