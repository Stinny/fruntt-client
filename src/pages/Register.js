import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../api/authApiSlice';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

//mui
import Alert from '@mui/material/Alert';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  //component state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    // register({ firstName, lastName, email, password, storeName }, dispatch);

    if (!firstName || !lastName || !email || !password || !storeName) {
      setError('All fields must be filled in');
      return;
    }
    try {
      const registerData = await register({
        firstName,
        lastName,
        email,
        password,
        storeName,
      }).unwrap();

      const currentUser = JSON.stringify(registerData.userInfo);
      Cookies.set('currentUser', currentUser, { sameSite: 'Lax' });
      Cookies.set('aToken', registerData.accessToken, { sameSite: 'Lax' });
      Cookies.set('rToken', registerData.refreshToken, { sameSite: 'Lax' });
      navigate('/dashboard');
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
  }, [email, firstName, lastName, storeName, password]);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else {
    content = (
      <div className='container flex flex-col items-center justify-center'>
        <h2 className='text-4xl font-medium'>Start your free trial today</h2>
        <p className='text-gray-500 text-2xl mt-2'>
          Have free access to everything for 14 days
        </p>
        {error && (
          <Alert severity='error' color='error' className='mt-4 mb-4 w-5/12'>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSignup}>
          <div className='mt-8 flex justify-between'>
            <input
              className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 rounded-lg p-2 w-6/12'
              type='text'
              placeholder='First'
              autoFocus
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className='border-2 border-slate-200 focus:outline focus:outline-1 focus:outline-slate-300 hover:border-slate-300 rounded-lg p-2 w-6/12 ml-4'
              type='text'
              placeholder='Last'
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className='mt-4'>
            <input
              type='email'
              placeholder='Email'
              className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded-lg p-2'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='mt-4'>
            <input
              type='password'
              placeholder='Password'
              className='border-2 border-slate-200 focus:outline focus:outline-1 focus:outline-slate-300 hover:border-slate-300 w-full rounded-lg p-2'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='mt-4'>
            <input
              type='text'
              placeholder='Storefront Name'
              className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded-lg p-2'
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>

          <div className='mt-2'>
            <Link to='/login'>
              <p className='text-xs text-slate-400 hover:text-slate-800 font-medium'>
                Already have a storefront? Login here.
              </p>
            </Link>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='h-11 w-full border-2 border-blue-300 hover:bg-blue-300 text-slate-800 rounded text-xl mt-4'
          >
            Start trial
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
