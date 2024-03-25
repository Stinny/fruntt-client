import React, { useState, useEffect } from 'react';
import { useEmailSignupMutation } from '../../api/feedbackApiSlice';
import { Link } from 'react-router-dom';

//mui
import Alert from '@mui/material/Alert';
import { isMobile } from 'react-device-detect';

const Email = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');

  const [emailSignup, result] = useEmailSignupMutation();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const signUpReq = await emailSignup({ email: email }).unwrap();

      if (signUpReq === 'Signed up') {
        setSuccess('You have successfully subscribed!');
        setEmail('');
      } else {
        setError('There was an error');
      }
    } catch (err) {
      setError('There was an error');
    }
  };

  useEffect(() => {
    setError('');
  }, [email]);

  return (
    <div className='flex flex-col items-center gap-1'>
      {success && (
        <Alert severity='success' className='w-full mt-2'>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity='error' className='w-full mt-2'>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSignup} className='w-full flex gap-2'>
        <input
          className='h-8 w-9/12 text-xs border border-gray-200 rounded-md p-2 hover:border-gray-200 bg-gray-50 hover:bg-gray-200 focus:border-gray-200 focus:bg-gray-200'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type='submit'
          className='h-8 border-gray-200 border rounded-md bg-gray-200 text-xs w-3/12'
        >
          Subscribe
        </button>
      </form>
      <div className='w-full'>
        <p className='text-stone-600 text-xs'>
          Subscribe to recieve the latest updates
        </p>
      </div>
    </div>
  );
};

export default Email;
