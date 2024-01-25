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

  return isMobile ? (
    <div className='max-w-7xl mx-auto flex flex-col items-center mb-16 mt-44'>
      <p className='font-medium text-stone-800 text-xl'>
        Stay connected with us!
      </p>
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
      <form onSubmit={handleSignup} className='flex flex-col mt-6 w-full'>
        <input
          className='h-10 border-2 rounded p-2 outline outline-0 hover:border-gray-400 focus:border-gray-400 text-sm'
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type='submit'
          className='h-10 text-sm border-stone-800 border-2 rounded-md w-full font-medium hover:text-white hover:bg-stone-800 mt-2'
        >
          SUBSCRIBE
        </button>
      </form>
      <p className='text-stone-800 mt-4'>We respect your privacy</p>
    </div>
  ) : (
    <div className='max-w-7xl mx-auto flex flex-col items-center mb-16 mt-44'>
      <p className='font-medium text-stone-800 text-2xl'>
        Stay connected with us!
      </p>
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
      <form onSubmit={handleSignup} className='flex flex-col mt-6 w-full'>
        <input
          className='h-10 border-2 rounded p-2 outline outline-0 hover:border-gray-200 bg-gray-100 border-gray-100 hover:bg-gray-200'
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type='submit'
          className='h-10 border-stone-800 border-2 rounded-md w-full font-medium hover:text-white hover:bg-stone-800 mt-2 text-sm'
        >
          SUBSCRIBE
        </button>
      </form>
      <p className='text-stone-800 mt-4'>We respect your privacy</p>
    </div>
  );
};

export default Email;
