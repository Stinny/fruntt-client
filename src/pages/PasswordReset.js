import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  useCheckTokenMutation,
  useResetPasswordMutation,
} from '../api/authApiSlice';
import Spinner from '../components/Spinner';
import { FaRegSadTear } from 'react-icons/fa';

//mui
import Alert from '@mui/material/Alert';
import { isMobile } from 'react-device-detect';

const PasswordReset = () => {
  const navigate = useNavigate();

  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState('');

  const [checkToken, { isLoading, isSuccess, data }] = useCheckTokenMutation();
  const [resetPassword, result] = useResetPasswordMutation();

  useEffect(() => {
    const handleCheckToken = async () => {
      const checkTokenReq = await checkToken({ token }).unwrap();
    };

    handleCheckToken();
  }, []);

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    if (password !== passwordTwo) {
      setError('Passwords do not match');
      return;
    }

    try {
      const resetPassReq = await resetPassword({
        email: data?.email,
        password: password,
      }).unwrap();

      console.log(resetPassReq);

      if (resetPassReq === 'Password reset')
        navigate('/login', { state: { success: true } });
    } catch (err) {
      setError('There was an error');
    }
  };

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = data?.valid ? (
      isMobile ? (
        <div className='mx-auto w-11/12 border rounded bg-white drop-shadow-md p-2 mt-32'>
          <p className='font-medium text-3xl text-stone-800'>
            Reset your password
          </p>

          <p className='font-medium text-lg mt-2 text-gray-400'>
            Reset your password for Fruntt account:{' '}
            <span className='text-stone-800'>{data?.email}</span>
          </p>

          {error && <Alert severity='error'>{error}</Alert>}
          <form
            className='flex flex-col mx-auto w-full'
            onSubmit={handleSubmitPassword}
          >
            <input
              type='password'
              placeholder='New Password'
              className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded mt-4 p-2'
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type='password'
              placeholder='Confirm Password'
              className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded mt-4 p-2'
              onChange={(e) => setPasswordTwo(e.target.value)}
            />
            <button
              type='submit'
              className='h-11 w-full border-2 border-stone-800 hover:bg-stone-800 hover:text-white text-stone-800 rounded text-xl mt-4'
            >
              Reset Password
            </button>
          </form>
        </div>
      ) : (
        <div className='mx-auto w-8/12 border rounded bg-white drop-shadow-md p-2 mt-32'>
          <p className='font-medium text-3xl text-stone-800'>
            Reset your password
          </p>

          <p className='font-medium text-lg mt-2 text-gray-400'>
            Reset your password for Fruntt account:{' '}
            <span className='text-stone-800'>{data?.email}</span>
          </p>

          {error && <Alert severity='error'>{error}</Alert>}
          <form
            className='flex flex-col mx-auto w-full'
            onSubmit={handleSubmitPassword}
          >
            <input
              type='password'
              placeholder='New Password'
              className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded mt-4 p-2'
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type='password'
              placeholder='Confirm Password'
              className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded mt-4 p-2'
              onChange={(e) => setPasswordTwo(e.target.value)}
            />
            <button
              type='submit'
              className='h-11 w-full border-2 border-stone-800 hover:bg-stone-800 hover:text-white text-stone-800 rounded text-xl mt-4'
            >
              Reset Password
            </button>
          </form>
        </div>
      )
    ) : isMobile ? (
      <div className='mx-auto mt-32 w-11/12 flex flex-col items-center border bg-white rounded drop-shadow-md p-2'>
        <FaRegSadTear className='text-6xl' />
        <p className='font-medium text-stone-800 text-xl mt-4'>
          This link is now expired
        </p>
        <Link
          to='/'
          className='border-2 rounded border-stone-800 flex items-center justify-center text-stone-800 w-28 h-10 mt-4'
        >
          Return Home
        </Link>
      </div>
    ) : (
      <div className='mx-auto mt-32 w-8/12 flex flex-col items-center border bg-white rounded drop-shadow-md p-2'>
        <FaRegSadTear className='text-6xl' />
        <p className='font-medium text-stone-800 text-xl mt-4'>
          This link is now expired
        </p>
        <Link
          to='/'
          className='border-2 rounded border-stone-800 flex items-center justify-center text-stone-800 w-28 h-10 mt-4'
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto h-screen'>{content}</div>
      <Footer />
    </>
  );
};

export default PasswordReset;
