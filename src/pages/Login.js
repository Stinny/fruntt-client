import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useLoginMutation } from '../api/authApiSlice';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import LoginMobile from './Mobile/LoginMobile';
import { setStoreIds, setSelectedStoreUrl } from '../redux/userRedux';

//mui
import Alert from '@mui/material/Alert';

const Login = () => {
  const { state } = useLocation();
  const [login, { isLoading }] = useLoginMutation();

  console.log(state);

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
      dispatch(setSelectedStoreUrl(userData?.userInfo?.store?.url));
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
    content = isMobile ? (
      <LoginMobile
        handleLogin={handleLogin}
        isLoading={isLoading}
        setEmail={setEmail}
        setPassword={setPassword}
        error={error}
      />
    ) : (
      <div className='flex flex-col items-center mx-auto justify-center w-full mb-56'>
        <div className='w-96 flex flex-col border-b-2 items-center'>
          <h2 className='text-4xl font-medium text-stone-800'>Login</h2>
          <p className='text-gray-400 font-medium text-center'>
            Welcome back! Please enter your details below.
          </p>
        </div>
        {error && (
          <Alert severity='error' className='mt-2 mb-2 w-96 bg-red-300'>
            {error}
          </Alert>
        )}
        {state?.success && (
          <Alert severity='info' className='mt-2 mb-2 w-96'>
            Your password was successfully reset
          </Alert>
        )}
        <form
          onSubmit={handleLogin}
          className='flex flex-col items-center w-96 bg-white p-2 rounded border-2 border drop-shadow-md mt-2'
        >
          <input
            type='email'
            placeholder='Email'
            className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded mt-4 p-2'
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type='password'
            placeholder='Password'
            className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded mt-4 p-2'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='w-full flex justify-between mt-2'>
            <Link to='/signup'>
              <p className='text-sm text-slate-400 hover:text-stone-800 font-medium'>
                Don't have a page yet?
              </p>
            </Link>
            <Link to='/reset/password'>
              <p className='text-sm text-slate-400 hover:text-stone-800 font-medium'>
                Forgot your password?
              </p>
            </Link>
          </div>

          <button
            disabled={isLoading}
            className='h-11 w-full border-2 border-stone-800 hover:bg-stone-800 hover:text-white text-stone-800 rounded text-xl mt-4'
          >
            Go to my page(s)
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
