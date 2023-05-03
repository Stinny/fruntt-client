import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSendResetEmailMutation } from '../api/authApiSlice';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

//mui
import Alert from '@mui/material/Alert';

const RequestReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const [sendResetEmail, result] = useSendResetEmailMutation();

  const handleRequestLink = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      const resetEmailReq = await sendResetEmail({ email: email }).unwrap();
      if (resetEmailReq === 'Email sent') {
        setEmailSent(true);
      }
    } catch (err) {
      console.log(err);
      setError('There was a server error');
    }
  };

  useEffect(() => {
    setError('');
  }, [email]);

  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto h-screen'>
        {emailSent ? (
          isMobile ? (
            <div className='flex flex-col items-center p-2 border rounded drop-shadow-md w-11/12 mx-auto mt-32 bg-white'>
              <AiOutlineCheckCircle className='text-green-400 text-5xl' />
              <p className='font-medium text-stone-800 text-xl mt-2 text-center'>
                A reset link has been sent, check your inbox soon!
              </p>
              <Link
                to='/'
                className='border-2 rounded border-stone-800 flex items-center justify-center text-stone-800 w-28 h-10 mt-4'
              >
                Return Home
              </Link>
            </div>
          ) : (
            <div className='flex flex-col items-center p-2 border rounded drop-shadow-md w-8/12 mx-auto mt-32 bg-white'>
              <AiOutlineCheckCircle className='text-green-400 text-5xl' />
              <p className='font-medium text-stone-800 text-xl mt-2 text-center'>
                A reset link has been sent, check your inbox soon!
              </p>
              <Link
                to='/'
                className='border-2 rounded border-stone-800 flex items-center justify-center text-stone-800 w-28 h-10 mt-4'
              >
                Return Home
              </Link>
            </div>
          )
        ) : isMobile ? (
          <div className='flex flex-col p-2 border rounded drop-shadow-md w-11/12 mx-auto mt-32 bg-white'>
            <p className='font-medium text-stone-800 text-2xl'>
              Oops, you forgot your password
            </p>
            <p className='font-medium text-gray-400 text-lg mt-2'>
              Enter your email below to receive a link to reset your password
            </p>

            <form className='flex flex-col' onSubmit={handleRequestLink}>
              {error && (
                <Alert severity='error' className='mt-2'>
                  {error}
                </Alert>
              )}
              <input
                type='email'
                placeholder='Enter email'
                className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded mt-4 p-2'
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type='submit'
                className='h-11 w-full border-2 border-stone-800 hover:bg-stone-800 hover:text-white text-stone-800 rounded text-xl mt-4'
              >
                Send Link
              </button>
            </form>
          </div>
        ) : (
          <div className='flex flex-col p-2 border rounded drop-shadow-md w-8/12 mx-auto mt-32 bg-white'>
            <p className='font-medium text-stone-800 text-3xl'>
              Oops, you forgot your password
            </p>
            <p className='font-medium text-gray-400 text-xl mt-2'>
              Enter your email below to receive a link to reset your password
            </p>

            <form className='flex flex-col' onSubmit={handleRequestLink}>
              {error && (
                <Alert severity='error' className='mt-2'>
                  {error}
                </Alert>
              )}
              <input
                type='email'
                placeholder='Enter email'
                className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded mt-4 p-2'
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type='submit'
                className='h-11 w-full border-2 border-stone-800 hover:bg-stone-800 hover:text-white text-stone-800 rounded text-xl mt-4'
              >
                Send Link
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default RequestReset;
