import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  useLazyGetTwitterAuthUrlQuery,
  useRegisterMutation,
} from '../api/authApiSlice';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import Footer from '../components/Footer';
import { isMobile } from 'react-device-detect';
import { uploadImageRequest } from '../api/requests';
import { setStoreIds } from '../redux/userRedux';
import { AiOutlineTwitter, AiOutlineLinkedin } from 'react-icons/ai';
import img from '../media/xlogowhite.png';
import { BsArrow90DegDown } from 'react-icons/bs';
import { Spinner } from 'flowbite-react';

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
import { FaXTwitter } from 'react-icons/fa6';
import { Info, X } from 'react-feather';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

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
  const [registering, setRegistering] = useState(false);
  const [pageTaken, setPageTaken] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [valid, setValid] = useState(false);
  const { state } = useLocation();

  const [getTwitterAuthUrl, result] = useLazyGetTwitterAuthUrlQuery();

  //password regex
  const regex =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[^\w\d\s])\S{8,}$/;

  const handleTwitterSignup = async (e) => {
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

    setRegistering(true);

    if (!email || !password || !storeName) {
      setError('Please fill out all feilds');
      setRegistering(false);
      return;
    }

    setValid(regex.test(password));
    if (!valid) {
      setError('Password must match requirements');
      setIsFocused(true);
      setRegistering(false);
      return;
    }

    try {
      const registerData = await register({
        email,
        password,
        storeName,
      }).unwrap();

      if (registerData?.msg === 'User created') {
        const currentUser = JSON.stringify(registerData.userInfo);
        Cookies.set('currentUser', currentUser, { sameSite: 'Lax' });
        Cookies.set('aToken', registerData.accessToken, { sameSite: 'Lax' });
        Cookies.set('rToken', registerData.refreshToken, { sameSite: 'Lax' });
        setRegistering(false);
        navigate('/dashboard');
      }
    } catch (err) {
      if (!err?.status) {
        setError('Server not responding');
        setRegistering(false);
        return;
      } else if (err.status === 400) {
        setEmail(err?.data?.email);
        setPassword(err?.data?.pass);
        setStoreName(err?.data?.page);
        if (err?.data?.msg === 'Page name taken') {
          setPageTaken(true);
          setRegistering(false);
          return;
        } else if (err?.data?.msg === 'Email in use') {
          setError('An account with this email already exists');
          setRegistering(false);
          return;
        }
      } else {
        console.log(err);
        setError('Signup failed, try again');
        setRegistering(false);
      }
    }
  };

  useEffect(() => {
    setError('');
  }, [email, storeName, password]);

  useEffect(() => {
    setPageTaken(false);
  }, [storeName]);

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
        <div className='flex flex-col gap-2 mx-auto items-center justify-center w-full'>
          <div className='flex flex-col items-start w-full'>
            <p className='text-lg text-stone-800'>Ready to sell?</p>
            <p className='text-stone-600 text-xs'>
              Signup to begin selling your templates
            </p>
          </div>

          {error && (
            <div className='w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2'>
              <X size={16} className='text-red-500' />
              <p className='text-stone-800 text-xs'>{error}</p>
            </div>
          )}

          {state?.msg && (
            <Alert severity='error' className='mt-2 mb-2 w-full'>
              {state?.msg}
            </Alert>
          )}

          <form
            onSubmit={handleSignup}
            className='flex flex-col gap-2 items-center w-full bg-white p-2 rounded-md border border-gray-200'
          >
            <input
              type='email'
              placeholder='Email'
              className='border text-sm border-gray-200 bg-gray-50 hover:border-gray-200 hover:bg-gray-200 outline outline-0 focus:bg-gray-200 focus:border-gray-200 w-full rounded-md p-2'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              type='password'
              placeholder='Password'
              className='border text-sm outline outline-0 border-gray-200 bg-gray-50 hover:border-gray-200 hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-200 w-full rounded-md p-2'
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={password}
            />
            {isFocused && (
              <div className='w-full flex flex-col items-start gap-2 border border-gray-200 rounded-md p-2'>
                <p className='text-stone-800 text-xs'>Password must contain:</p>
                <p className='text-stone-600 text-xs'>
                  Minimum of 8 characters
                </p>
                <p className='text-stone-600 text-xs'>At least one uppercase</p>
                <p className='text-stone-600 text-xs'>
                  At least one special character
                </p>
                <p className='text-stone-600 text-xs'>At least one number</p>
              </div>
            )}
            {pageTaken && (
              <div className='w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md p-2'>
                <X size={16} className='text-red-500' />
                <p className='text-stone-800 text-xs'>Page name taken</p>
              </div>
            )}
            <div className='flex w-full'>
              <div className='rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center p-2 pr-1'>
                <p className='text-sm'>fruntt.com/</p>
              </div>
              <input
                type='text'
                placeholder='Page name'
                className='border text-sm border-gray-200 bg-gray-50 focus:bg-gray-200 focus:border-gray-200 hover:bg-gray-200 rounded-tr-md rounded-br-md p-2 pl-1 flex-1'
                onChange={(e) => setStoreName(e.target.value)}
                value={storeName}
              />
            </div>

            {registering ? (
              <div className='w-full flex items-center justify-center'>
                <Spinner />
              </div>
            ) : (
              <>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='h-10 w-full border border-gray-200 bg-gray-200 text-stone-800 rounded-md text-xs'
                >
                  Signup
                </button>
                <p className='text-xs text-stone-600'>OR</p>
                <button
                  style={{
                    backgroundColor: 'rgb(15, 20, 25)',
                    borderColor: 'rgb(15, 20, 25)',
                  }}
                  className='w-full h-10 text-xs rounded-md flex items-center justify-center text-white'
                  type='button'
                  onClick={handleTwitterSignup}
                >
                  <p className='mr-2'>Signup with</p>
                  <FaXTwitter />
                </button>
              </>
            )}
            <div className='flex w-full'>
              <Link to='/login'>
                <p className='text-xs self-start text-stone-600'>
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
