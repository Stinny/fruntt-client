import React, { useState, useEffect } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import {
  useLazyGetSetupIntentQuery,
  useAddPaymentMethodMutation,
  useDeletePaymentMethodMutation,
} from '../../api/authApiSlice';
import { Alert } from '@mui/material';
import { AiFillCreditCard } from 'react-icons/ai';

const BillingForm = ({ user, refetch }) => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [addingPayment, setAddingPayment] = useState(false);

  const [getSetupIntent, result] = useLazyGetSetupIntentQuery();
  const [
    addPayment,
    {
      isLoading: addingPayement,
      data: addPaymentData,
      isSuccess: addedPayment,
    },
  ] = useAddPaymentMethodMutation();

  const [
    deletePayment,
    { isSuccess: deletedPayment, data: deletedPaymentData },
  ] = useDeletePaymentMethodMutation();

  const stripe = useStripe();
  const elements = useElements();

  const handleAddingPaymentMethod = async (e) => {
    e.preventDefault();
    setError('');
    setAddingPayment(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const getSetupIntentReq = await getSetupIntent().unwrap();

    if (getSetupIntentReq.success) {
      const confirmResult = await stripe.confirmCardSetup(
        getSetupIntentReq.setupIntent.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (confirmResult.error) {
        setError(confirmResult.error.message);
        setAddingPayment(false);
      } else {
        console.log(confirmResult.setupIntent);

        const addPaymentReq = await addPayment({
          paymentMethodId: confirmResult.setupIntent.payment_method,
        }).unwrap();

        if (addPaymentReq === 'Payment added') {
          refetch();
          setAddingPayment(false);
        }
      }
    } else {
      setError('There was an error');
      setAddingPayment(false);
    }
  };

  const handleDeletePaymentMethod = async (e) => {
    e.preventDefault();
    try {
      const deletePaymentReq = await deletePayment().unwrap();

      if (deletePaymentReq === 'Payment deleted') {
        setError('');
        refetch();
      }
    } catch (err) {
      setError('There was an error deleting payment method');
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#000000',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        outline: 'none',
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
    <div className='w-full h-full mx-auto'>
      {user.paymentAdded ? (
        <div className='w-4/12 flex flex-col'>
          <div className='w-full border-2 rounded flex justify-around items-center'>
            <AiFillCreditCard className=' text-4xl' />
            <div className='flex flex-col w-40'>
              <p>
                <span className='font-medium'>Brand:</span>{' '}
                {user?.paymentMethod?.brand}
              </p>
              <p>
                <span className='font-medium'>Last Four:</span>{' '}
                {user?.paymentMethod?.lastFour}
              </p>
            </div>
          </div>
          <button
            className='text-red-500 mt-2 w-full border-2 border-red-400 text-red-400 hover:text-white hover:bg-red-400 rounded'
            onClick={handleDeletePaymentMethod}
          >
            Delete payment method
          </button>
        </div>
      ) : (
        <form
          className='w-5/12 border-2 p-2 rounded'
          onSubmit={handleAddingPaymentMethod}
        >
          {error ? (
            <Alert severity='error' className='w-full mt-2 mb-2'>
              {error}
            </Alert>
          ) : (
            ''
          )}
          <CardElement options={CARD_ELEMENT_OPTIONS} />
          <button
            type='submit'
            className='h-14 w-full mt-4 border-2 border-slate-800 text-slate-800 rounded hover:bg-slate-800 hover:text-white'
          >
            {addingPayment ? 'Adding payment method...' : 'Add payment method'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BillingForm;
