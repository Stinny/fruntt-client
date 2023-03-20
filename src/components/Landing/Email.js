import React, { useState, useEffect } from 'react';
import { useEmailSignupMutation } from '../../api/feedbackApiSlice';
import { Link } from 'react-router-dom';

//mui
import Alert from '@mui/material/Alert';

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
    <div className='max-w-7xl mx-auto flex flex-col items-center mt-32'>
      <p className='font-medium text-slate-800 text-3xl'>
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
          className='h-10 border-2 rounded p-2 outline outline-0 hover:border-gray-400 focus:border-gray-400'
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type='submit'
          className='h-10 border-stone-800 border-2 rounded w-full font-medium hover:text-white hover:bg-stone-800 mt-2'
        >
          SUBSCRIBE
        </button>
      </form>
      <p className='text-slate-800 mt-4'>We respect your privacy</p>
    </div>
  );
};

export default Email;
