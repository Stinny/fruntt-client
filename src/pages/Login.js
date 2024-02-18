import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Navigate,
  Link,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import {
  useLazyGetTwitterAuthUrlQuery,
  useLoginMutation,
  useTwitterLoginMutation,
} from '../api/authApiSlice';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import LoginMobile from './Mobile/LoginMobile';
import { setStoreIds, setSelectedStoreUrl } from '../redux/userRedux';
import { AiOutlineTwitter } from 'react-icons/ai';
import img from '../media/xlogowhite.png';

//mui
import Alert from '@mui/material/Alert';

const Login = () => {
  const { state } = useLocation();
  const [login, { isLoading }] = useLoginMutation();

  //form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getTwitterAuthUrl, result] = useLazyGetTwitterAuthUrlQuery();

  const handleTwitterLogin = async (e) => {
    //request the twitter auth url from server
    //redirect user to the auth url for log in
    e.preventDefault();
    console.log('Logging in with Twitter!');
    const twitterAuthUrlReq = await getTwitterAuthUrl({
      type: 'login',
    }).unwrap();

    if (twitterAuthUrlReq.url) {
      Cookies.set('twitterOauth', twitterAuthUrlReq?.oauthSecret);
      Cookies.set('twitterAuthType', twitterAuthUrlReq?.type);
      window.location.href = twitterAuthUrlReq?.url;
    }
  };

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
        handleTwitterLogin={handleTwitterLogin}
        isLoading={isLoading}
        setEmail={setEmail}
        setPassword={setPassword}
        error={error}
        state={state}
      />
    ) : (
      <div
        className='flex flex-col items-center mx-auto justify-center h-full'
        style={{ width: '400px' }}
      >
        <div className='w-full flex flex-col items-center'>
          <h2 className='text-3xl font-medium text-stone-800'>Login</h2>
          <p className='text-stone-600 text-center text-sm'>
            Welcome back! Please enter details below.
          </p>
        </div>
        {error && (
          <Alert severity='error' className='mt-2 mb-2 w-full bg-red-300'>
            {error}
          </Alert>
        )}
        {state?.success && (
          <Alert severity='info' className='mt-2 mb-2 w-full'>
            Your password was successfully reset
          </Alert>
        )}

        {state?.msg && (
          <Alert severity='error' className='mt-2 mb-2 w-full'>
            {state?.msg}
          </Alert>
        )}
        <form
          onSubmit={handleLogin}
          className='flex flex-col items-center w-full bg-white p-2 rounded-md border border-gray-200 mt-2'
        >
          <input
            type='email'
            placeholder='Email'
            className='border text-sm border-gray-200 bg-gray-50 text-stone-800 hover:bg-gray-200 focus:bg-gray-200 0 w-full outline outline-0 rounded-md mt-4 p-2'
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type='password'
            placeholder='Password'
            className='border text-sm border-gray-200 bg-gray-50 hover:bg-gray-200 focus:bg-gray-200 outline-0 outline w-full rounded-md mt-2 p-2'
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={isLoading}
            className='h-8 w-full border-2 border-stone-800 hover:bg-stone-800 hover:text-white text-stone-800 rounded-md text-sm mt-4'
          >
            Login
          </button>
          <p className='text-sm text-stone-800 mt-2'>OR</p>
          <button
            style={{
              backgroundColor: 'rgb(15, 20, 25)',
              borderColor: 'rgb(15, 20, 25)',
            }}
            className='w-full h-8 text-sm rounded-md flex items-center justify-center text-white mt-2'
            type='button'
            onClick={handleTwitterLogin}
          >
            <p className='mr-2'>Log in with</p>
            <img src={img} className='w-4 h-4' />
          </button>
          <div className='w-full flex justify-between mt-2'>
            <Link to='/signup'>
              <p className='text-sm text-stone-600'>
                Don't have an account yet?
              </p>
            </Link>
            <Link to='/reset/password'>
              <p className='text-sm text-stone-600'>Forgot your password?</p>
            </Link>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='mx-auto max-w-8xl h-screen flex justify-center items-center'>
        {content}
      </div>
      <Footer />
    </>
  );
};

export default Login;
