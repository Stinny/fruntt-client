import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useTwitterLoginMutation,
  useTwitterRegisterMutation,
} from '../api/authApiSlice';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import { setSelectedStoreUrl } from '../redux/userRedux';
import { useDispatch } from 'react-redux';
import Footer from '../components/Footer';
import { AiFillTwitterSquare } from 'react-icons/ai';
import { IoStorefrontOutline } from 'react-icons/io5';
import { BsArrowRightShort } from 'react-icons/bs';

//mui
import CircularProgress from '@mui/material/CircularProgress';

const TwitterAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [storeName, setStoreName] = useState('');
  const [error, setError] = useState('');
  //for twitter login
  const [searchParams, setSearchParams] = useSearchParams();
  const oauth_token = searchParams.get('oauth_token');
  const oauth_verifier = searchParams.get('oauth_verifier');
  const twitterAuthType = Cookies.get('twitterAuthType')
    ? Cookies.get('twitterAuthType')
    : '';

  const [twitterLogin, twitterloginResult] = useTwitterLoginMutation();
  const [twitterRegister, twitterRegisterResult] = useTwitterRegisterMutation();
  //need twitter registration also

  const handleTwitterSignup = async (e) => {
    try {
      const twitterRegisterReq = await twitterRegister({
        oauthToken: oauth_token,
        oauthVerifier: oauth_verifier,
        oauthSecret: Cookies.get('twitterOauth'),
      }).unwrap();
      const currentUser = JSON.stringify(twitterRegisterReq.userInfo);
      Cookies.set('currentUser', currentUser, { sameSite: 'Lax' });
      Cookies.set('aToken', twitterRegisterReq.accessToken, {
        sameSite: 'Lax',
      });
      Cookies.set('rToken', twitterRegisterReq.refreshToken, {
        sameSite: 'Lax',
      });
      Cookies.remove('twitterOauth');
      Cookies.remove('twitterAuthType');
      navigate('/dashboard');
    } catch (err) {
      if (!err?.status) {
        navigate('/signup', { state: { msg: 'Server not responding' } });
        return;
      } else if (err.status === 400) {
        navigate('/signup', { state: { msg: err.data.error } });
        return;
      } else {
        navigate('/signup', { state: { msg: 'Signup failed' } });
        return;
      }
    }
  };

  const loginWithTwitter = async () => {
    try {
      const twitterLoginReq = await twitterLogin({
        oauthToken: oauth_token,
        oauthVerifier: oauth_verifier,
        oauthSecret: Cookies.get('twitterOauth'),
      }).unwrap();

      const currentUser = JSON.stringify(twitterLoginReq.userInfo);
      Cookies.set('currentUser', currentUser, { sameSite: 'Lax' });
      Cookies.set('aToken', twitterLoginReq.accessToken, { sameSite: 'Lax' });
      Cookies.set('rToken', twitterLoginReq.refreshToken, {
        sameSite: 'Lax',
      });
      dispatch(setSelectedStoreUrl(twitterLoginReq?.userInfo?.store?.url));
      Cookies.remove('twitterOauth');
      Cookies.remove('twitterAuthType');
      navigate('/dashboard');
    } catch (err) {
      if (!err?.status) {
        navigate('/login', { state: { msg: 'Server not responding' } });
        return;
      } else if (err.status === 400) {
        navigate('/login', { state: { msg: 'Account does not exist' } });
        return;
      } else {
        navigate('/login', { state: { msg: 'Login failed' } });
        return;
      }
    }
  };

  useEffect(() => {
    if (oauth_token && oauth_verifier && twitterAuthType === 'login') {
      loginWithTwitter();
    } else if (
      oauth_token &&
      oauth_verifier &&
      twitterAuthType === 'register'
    ) {
      handleTwitterSignup();
    } else {
      navigate('/');
    }
  }, [oauth_token, oauth_verifier]);

  return (
    <>
      <Navbar />
      <div className='max-w-8xl mx-auto h-screen mx-auto'>
        {/* {twitterAuthType === 'register' ? (
          <form className='flex flex-col items-center w-3/12 bg-white p-2 rounded border-2 drop-shadow-md mx-auto mb-56'>
            <div className='w-full mt-2'>
              <p className='font-medium border-b text-lg'>
                Just need to give your page a name !
              </p>
            </div>

            <div className='flex w-full'>
              <input
                type='text'
                placeholder='Page name & url'
                className='w-5/6 border-2 border-gray-300 hover:border-gray-400 focus:outline focus:outline-1 focus:outline-gray-300 rounded p-2 mt-2'
                onChange={(e) => setStoreName(e.target.value)}
              />
              <p className='font-medium text-xl mt-6'>.fruntt.com</p>
            </div>

            <button
              type='button'
              className='h-11 w-full border-2 border-slate-800 hover:bg-slate-800 hover:text-white text-slate-800 rounded text-xl mt-4'
            >
              Launch product page
            </button>
          </form>
        ) : (
          ''
        )} */}

        <div className='w-96 border-2 rounded p-2 flex flex-col items-center mx-auto mt-32'>
          <div className='flex items-center'>
            <AiFillTwitterSquare className='text-5xl text-blue-400' />{' '}
            <BsArrowRightShort className='text-2xl ml-2 mr-2' />
            <IoStorefrontOutline className='text-5xl text-stone-800' />
          </div>
          <CircularProgress className='mt-10' />
          <p className='text-stone-800 mt-10 text-lg font-medium'>
            Authenticating with your Twitter account!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TwitterAuth;
