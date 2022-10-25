import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Spinner from '../../components/Spinner';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import BillingForm from './BillingForm';

const stripeLoader = loadStripe('pk_live_eWcmPkgRoGeR0yn9gKf7wopL00xb4WlY4M');

const Billing = ({ user, refetch }) => {
  return (
    <div className='w-full h-32 mt-2'>
      <Elements stripe={stripeLoader}>
        <BillingForm user={user} refetch={refetch} />
      </Elements>
    </div>
  );
};

export default Billing;
