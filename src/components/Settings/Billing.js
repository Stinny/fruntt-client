import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Spinner from '../../components/Spinner';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import BillingForm from './BillingForm';

const stripeLoader = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Billing = ({ user, refetch }) => {
  return (
    <div className='w-full mt-2'>
      <Elements stripe={stripeLoader}>
        <BillingForm user={user} refetch={refetch} />
      </Elements>
    </div>
  );
};

export default Billing;
