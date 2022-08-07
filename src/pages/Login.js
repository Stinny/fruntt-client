import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Link, useNavigate } from 'react-router-dom';

import { useLoginMutation } from '../api/authApiSlice';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

//mui
import Alert from '@mui/material/Alert';

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();

  //form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Both fields need to be entered');
      return;
    }

    try {
      const userData = await login({ email, password }).unwrap();
      const currentUser = JSON.stringify(userData.userInfo);
      Cookies.set('currentUser', currentUser, { sameSite: 'Lax' });
      Cookies.set('aToken', userData.accessToken, { sameSite: 'Lax' });
      Cookies.set('rToken', userData.refreshToken, { sameSite: 'Lax' });
      navigate('/dashboard');
    } catch (err) {
      if (!err?.status) {
        setError('Server not responding');
      } else if (err.status === 400) {
        setError('Invalid email or password');
      } else {
        setError('Login failed');
      }
    }
  };

  //will clear any error message as soon as email or pwd is changed again
  useEffect(() => {
    setError('');
  }, [email, password]);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else {
    content = (
      <div className='flex flex-col items-center mx-auto justify-center w-full'>
        <h2 className='text-4xl font-bold'>Login</h2>
        {error && (
          <Alert severity='error' className='mt-4 mb-4 w-2/6 bg-red-300'>
            {error}
          </Alert>
        )}
        <form
          onSubmit={handleLogin}
          className='w-full flex flex-col items-center'
        >
          <input
            type='email'
            placeholder='Email'
            className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-2/6 rounded-lg mt-4 p-2'
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type='password'
            placeholder='Password'
            className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-2/6 rounded-lg mt-4 p-2'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='w-2/6 flex justify-between mt-2'>
            <Link to='/signup'>
              <p className='text-xs text-slate-400 hover:text-slate-800 font-medium'>
                Don't have a storefront yet?
              </p>
            </Link>
            <Link to='/signup'>
              <p className='text-xs text-slate-400 hover:text-slate-800 font-medium'>
                Forgot your password?
              </p>
            </Link>
          </div>

          <button
            disabled={isLoading}
            className='h-11 w-2/6 border-2 border-blue-300 hover:bg-blue-300 text-slate-800 rounded text-xl mt-4'
          >
            Go to my storefront
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='mx-auto max-w-7xl h-screen flex justify-center items-center'>
        {content}
      </div>
      <Footer />
    </>
  );
};

export default Login;
