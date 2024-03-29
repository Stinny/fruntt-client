import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  useLazyGetTwitterAuthUrlQuery,
  useRegisterMutation,
} from '../api/authApiSlice';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import { isMobile } from 'react-device-detect';
import { uploadImageRequest } from '../api/requests';
import { setStoreIds } from '../redux/userRedux';
import { AiOutlineTwitter, AiOutlineLinkedin } from 'react-icons/ai';
import img from '../media/xlogowhite.png';
import { BsArrow90DegDown } from 'react-icons/bs';

//mui
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';

//filepond
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

//mui
import Alert from '@mui/material/Alert';
import RegisterMobile from './Mobile/RegisterMobile';
import CardForm from '../components/Forms/CardForm';
import RegisterForm from '../components/Forms/RegisterForm';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  //component state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState([]);
  const [error, setError] = useState('');
  const { state } = useLocation();

  const [getTwitterAuthUrl, result] = useLazyGetTwitterAuthUrlQuery();

  const handleTwitterSignup = async (e) => {
    //request the twitter auth url from server
    //redirect user to the auth url for log in
    e.preventDefault();
    console.log('Signing up with Twitter!');
    const twitterAuthUrlReq = await getTwitterAuthUrl({
      type: 'register',
    }).unwrap();

    if (twitterAuthUrlReq.url) {
      Cookies.set('twitterOauth', twitterAuthUrlReq?.oauthSecret);
      Cookies.set('twitterAuthType', twitterAuthUrlReq?.type);
      window.location.href = twitterAuthUrlReq?.url;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    let profilePicUrl = '';
    let profilePicKey = '';

    if (!email || !password || !storeName) {
      setError('All required fields must be filled in');
      return;
    }
    try {
      //if files were added, upload to server and update profile pic url/key variables
      if (profilePic.length) {
        const image = new FormData();
        image.append('productImages', profilePic[0].file);
        const imageDataReq = await uploadImageRequest.post(
          '/products/imageupload',
          image
        );
        profilePicUrl = imageDataReq.data[0].url;
        profilePicKey = imageDataReq.data[0].key;
      }

      const registerData = await register({
        email,
        password,
        storeName,
        firstName,
        lastName,
        bio,
        profilePicUrl,
        profilePicKey,
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

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

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
        handleTwitterSignup={handleTwitterSignup}
        state={state}
        setStoreName={setStoreName}
        storeName={storeName}
        bio={bio}
        setBio={setBio}
        firstName={firstName}
        lastName={lastName}
        setLastName={setLastName}
        setFirstName={setFirstName}
        isLoading={isLoading}
        profilePic={profilePic}
        setProfilePic={setProfilePic}
      />
    ) : (
      <div
        className='mx-auto h-full flex items-center justify-center'
        style={{ width: '400px' }}
      >
        <div className='flex flex-col mx-auto items-center justify-center w-full'>
          <p className='text-3xl font-medium text-center'>Ready to sell?</p>
          <p className='text-stone-600 font-medium mb-4 text-center text-sm'>
            Signup and list your templates in minutes.
          </p>

          {error && (
            <Alert severity='error' color='error' className='mt-2 mb-2 w-full'>
              {error}
            </Alert>
          )}

          {state?.msg && (
            <Alert severity='error' className='mt-2 mb-2 w-full'>
              {state?.msg}
            </Alert>
          )}

          <form
            onSubmit={handleSignup}
            className='flex flex-col items-center w-full bg-white p-2 rounded-md border border-gray-200'
          >
            <input
              type='email'
              placeholder='Email'
              className='border text-sm border-gray-200 bg-gray-50 hover:border-gray-200 hover:bg-gray-200 outline outline-0 focus:bg-gray-200 focus:border-gray-200 w-full rounded-md p-2 mt-2'
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type='password'
              placeholder='Password'
              className='border text-sm  outline outline-0 border-gray-200 bg-gray-50 hover:border-gray-200 hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-200 w-full rounded-md p-2 mt-2'
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className='flex w-full items-center border-2 rounded-md mt-2 border-gray-100 bg-gray-100 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 hover:bg-gray-200 p-2'>
              <input
                className=' outline outline-0 bg-gray-100 hover:bg-gray-200 h-full'
                placeholder='Store'
                onChange={(e) => setStoreName(e.target.value)}
              />
              <span className='font-medium'>.fruntt.com</span>
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='h-8 w-full border-2 border-stone-800 hover:bg-stone-800 hover:text-white text-stone-800 rounded-md text-sm mt-4'
            >
              Signup
            </button>
            <p className='text-sm text-stone-800 mt-2'>OR</p>
            <button
              style={{
                backgroundColor: 'rgb(15, 20, 25)',
                borderColor: 'rgb(15, 20, 25)',
              }}
              className='w-full h-8 text-sm mt-2 rounded-md flex items-center justify-center text-white'
              type='button'
              onClick={handleTwitterSignup}
            >
              <p className='mr-2'>Connect with</p>
              <img src={img} className='w-4 h-4' />
            </button>
            <div className='mt-2 flex w-full'>
              <Link to='/login'>
                <p className='text-sm self-start text-stone-600'>
                  Already have a store? Login here.
                </p>
              </Link>
            </div>
          </form>
        </div>
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

export default Register;
