import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyGetSetupIntentQuery } from '../api/authApiSlice';
import BillingForm from '../components/Settings/BillingForm';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
const stripeLoader = loadStripe('pk_test_KnpiRgRMVGvh1Tu8cjzphjmP00L66ieGNQ');

const PaymentMethod = () => {
  const [getSetupIntent, result] = useLazyGetSetupIntentQuery();

  useEffect(() => {
    getSetupIntent();
  }, []);

  let content;

  if (result.isLoading) {
    content = <Spinner />;
  } else if (result.isSuccess) {
    content = (
      <Elements
        stripe={stripeLoader}
        options={{ clientSecret: result?.data?.client_secret }}
      >
        <BillingForm />
      </Elements>
    );
  }

  return (
    <>
      <Navbar />
      <div className='h-screen max-w-7xl mx-auto'>{content}</div>
      <Footer />
    </>
  );
};

export default PaymentMethod;
