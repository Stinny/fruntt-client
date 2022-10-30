import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../api/authApiSlice';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import { isMobile } from 'react-device-detect';

//mui
import Alert from '@mui/material/Alert';
import RegisterMobile from './Mobile/RegisterMobile';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  //component state

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    // register({ firstName, lastName, email, password, storeName }, dispatch);

    if (!email || !password || !storeName) {
      setError('All fields must be filled in');
      return;
    }
    try {
      const registerData = await register({
        email,
        password,
        storeName,
      }).unwrap();

      const currentUser = JSON.stringify(registerData.userInfo);
      Cookies.set('currentUser', currentUser, { sameSite: 'Lax' });
      Cookies.set('aToken', registerData.accessToken, { sameSite: 'Lax' });
      Cookies.set('rToken', registerData.refreshToken, { sameSite: 'Lax' });
      navigate('/storefront/launching');
    } catch (err) {
      if (!err?.status) {
        setError('Server not responding');
      } else if (err.status === 400) {
        setError(err.data.error);
      } else {
        console.log(err);
        setError('Signup failed');
      }
    }
  };

  useEffect(() => {
    setError('');
  }, [email, storeName, password]);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else {
    content = isMobile ? (
      <RegisterMobile
        error={error}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSignup={handleSignup}
        setStoreName={setStoreName}
        isLoading={isLoading}
      />
    ) : (
      <div className='container flex flex-col items-center justify-center mx-auto w-full'>
        <h2 className='text-4xl font-medium mb-4'>
          Launch your first storefront
        </h2>

        {error && (
          <Alert severity='error' color='error' className='mt-4 mb-4 w-5/12'>
            {error}
          </Alert>
        )}
        <form
          onSubmit={handleSignup}
          className='flex flex-col items-center w-5/12'
        >
          <input
            type='email'
            placeholder='Email'
            className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded-lg p-2 mt-2'
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type='password'
            placeholder='Password'
            className='border-2 border-slate-200 focus:outline focus:outline-1 focus:outline-slate-300 hover:border-slate-300 w-full rounded-lg p-2 mt-2'
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className='flex w-full'>
            <input
              type='text'
              placeholder='Storefront Name'
              className='w-5/6 border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded-lg p-2 mt-2'
              onChange={(e) => setStoreName(e.target.value)}
            />
            <p className='font-medium text-xl mt-6'>.fruntt.com</p>
          </div>

          <div className='mt-2 flex w-full'>
            <Link to='/login'>
              <p className='text-sm self-start text-slate-400 hover:text-slate-800 font-medium'>
                Already a merchant? Login here.
              </p>
            </Link>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='h-11 w-full border-2 border-slate-800 hover:bg-slate-800 hover:text-white text-slate-800 rounded text-xl mt-4'
          >
            Launch Storefront
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

export default Register;
