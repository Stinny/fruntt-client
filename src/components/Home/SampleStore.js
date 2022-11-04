import React, { useState } from 'react';
import img from '../../media/browserStorefrontREDO-1.png';
import { BsArrow90DegDown } from 'react-icons/bs';
import { useEmailSignupMutation } from '../../api/feedbackApiSlice';

//mui
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';

const SampleStore = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');

  const [emailSignup, result] = useEmailSignupMutation();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const signUpReq = await emailSignup({ email: email }).unwrap();

      if (signUpReq === 'Signed up') {
        setSuccess('Thank you for signing up!');
        setEmail('');
      } else {
        setError('There was an error');
      }
    } catch (err) {
      setError('There was an error');
    }
  };

  return (
    <div className='mt-20 mx-auto'>
      <div className='w-10/12 flex justify-between items-center mx-auto'>
        <div className='flex- w-5/12'>
          <p className='text-5xl font-medium w-10/12 leading-tight'>
            Easily gather everything needed to sell ONE product on ONE page.
          </p>
          <p className='text-4xl  mt-4 w-10/12 leading-tight font-normal'>
            Make it easy for you AND the customer.
          </p>
          <Link to='/signup'>
            <button className='h-10 w-5/12 border-2 border-slate-800 text-slate-800 hover:text-white hover:bg-slate-800 font-medium rounded mt-4'>
              Launch a storefront - for free
            </button>
          </Link>
          <p className='mt-10 font-medium'>
            Sign up to receive the latest news & updates
          </p>
          {success && (
            <Alert severity='success' className='w-10/12 mt-2 mb-2'>
              {success}
            </Alert>
          )}
          {error && (
            <Alert severity='error' className='w-10/12 mt-2 mb-2'>
              {error}
            </Alert>
          )}
          <form className='flex items-center' onSubmit={handleSignup}>
            <input
              className='h-10 border-2 rounded p-2 outline outline-0 hover:border-gray-400 focus:border-gray-400'
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type='submit'
              className='h-10 border-slate-800 border-2 rounded w-32 font-medium hover:text-white hover:bg-slate-800 ml-2'
            >
              SIGN UP
            </button>
          </form>
        </div>
        <div className='w-7/12 flex flex-col'>
          <div className='flex w-full justify-end items-center'>
            <BsArrow90DegDown className='font-medium' />
            <p className='text-2xl font-medium mb-2 ml-2'>Sample storefront</p>
          </div>
          <img src={img} className='w-full border-2 rounded drop-shadow-md' />
        </div>
      </div>
    </div>
  );
};

export default SampleStore;
