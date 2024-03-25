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
import Footer from '../components/Footer';
import LoginMobile from './Mobile/LoginMobile';
import { setStoreIds, setSelectedStoreUrl } from '../redux/userRedux';
import { AiOutlineTwitter } from 'react-icons/ai';
import img from '../media/xlogowhite.png';
import { X } from 'react-feather';
import { Spinner } from 'flowbite-react';

//mui
import Alert from '@mui/material/Alert';
import { FaXTwitter } from 'react-icons/fa6';

const Login = () => {
  const { state } = useLocation();
  const [login, { isLoading }] = useLoginMutation();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  //form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
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
    setLoggingIn(true);

    if (!email || !password) {
      setError('Please fill out all fields');
      setLoggingIn(false);
      return;
    }

    try {
      const userData = await login({ email, password }).unwrap();

      if (userData?.msg === 'Success') {
        const currentUser = JSON.stringify(userData.userInfo);
        Cookies.set('currentUser', currentUser, { sameSite: 'Lax' });
        Cookies.set('aToken', userData.accessToken, { sameSite: 'Lax' });
        Cookies.set('rToken', userData.refreshToken, { sameSite: 'Lax' });
        setLoggingIn(false);
        navigate('/dashboard');
      }
    } catch (err) {
      if (!err?.status) {
        setError('Server not responding');
        setLoggingIn(false);
        return;
      } else if (err.status === 400) {
        setError('Email or password invalid');
        setEmail(err?.data?.email);
        setPassword(err?.data?.pass);
        setLoggingIn(false);
        return;
      } else {
        setError('Login failed');
        setLoggingIn(false);
        return;
      }
    }
  };

  //will clear any error message as soon as email or pwd is changed again
  useEffect(() => {
    setError('');
  }, [email, password]);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  if (currentUser) return <Navigate to='/dashboard' />;

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
        className='flex flex-col items-center mx-auto justify-center h-full gap-2'
        style={{ width: '400px' }}
      >
        <div className='flex flex-col items-start w-full'>
          <p className='text-lg text-stone-800'>Login</p>
          <p className='text-stone-600 text-xs'>
            Welcome back! Login to your account below
          </p>
        </div>
        {error && (
          <div className='w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2'>
            <X size={16} className='text-red-500' />
            <p className='text-stone-800 text-xs'>{error}</p>
          </div>
        )}
        {state?.success && (
          <Alert severity='info' className='w-full'>
            Your password was reset
          </Alert>
        )}

        {state?.msg && (
          <Alert severity='error' className='w-full'>
            {state?.msg}
          </Alert>
        )}
        <form className='flex flex-col gap-2 items-center w-full bg-white p-2 rounded-md border border-gray-200'>
          <input
            type='email'
            placeholder='Email'
            className='border text-sm border-gray-200 bg-gray-50 ring-0 focus:border-transparent text-stone-800 hover:bg-gray-200 focus:bg-gray-200 0 w-full outline outline-0 rounded-md p-2'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <input
            type='password'
            placeholder='Password'
            className='border text-sm border-gray-200 bg-gray-50 hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-200 outline-0 outline w-full rounded-md p-2'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {loggingIn ? (
            <div className='w-full flex items-center justify-center'>
              <Spinner />
            </div>
          ) : (
            <>
              <button
                disabled={isLoading}
                className='h-10 w-full border border-gray-200 bg-gray-200 text-stone-800 rounded-md text-xs'
                onClick={handleLogin}
              >
                Login
              </button>
              <p className='text-xs text-stone-600'>OR</p>
              <button
                style={{
                  backgroundColor: 'rgb(15, 20, 25)',
                  borderColor: 'rgb(15, 20, 25)',
                }}
                className='w-full h-10 border text-xs rounded-md flex items-center justify-center text-white'
                type='button'
                onClick={handleTwitterLogin}
              >
                <p className='mr-2'>Login with</p>
                <FaXTwitter />
              </button>
            </>
          )}
          <div className='w-full flex justify-between'>
            <Link to='/signup'>
              <p className='text-xs text-stone-600'>
                Don't have an account yet?
              </p>
            </Link>
            <Link to='/reset/password'>
              <p className='text-xs text-stone-600'>Forgot your password?</p>
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
