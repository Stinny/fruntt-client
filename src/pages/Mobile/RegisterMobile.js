import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLinkedin, AiOutlineTwitter } from 'react-icons/ai';
import img from '../../media/shirt.jpg';
import { BsArrow90DegDown } from 'react-icons/bs';

//mui
import Alert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';

//filepond
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const RegisterMobile = ({
  error,
  setEmail,
  setPassword,
  setFirstName,
  setLastName,
  setBio,
  bio,
  firstName,
  lastName,
  handleSignup,
  handleTwitterSignup,
  state,
  setStoreName,
  profilePic,
  setProfilePic,
  storeName,
  isLoading,
}) => {
  //auto scrolls to top of page
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className='flex flex-col mx-auto w-full p-2 items-center justify-center h-full'>
      <div className='flex flex-col w-full mx-auto'>
        <p className='text-2xl font-medium text-center'>Ready to sell?</p>
        <p className='text-stone-800 font-medium mb-4 text-center mt-2'>
          Launch your first page, be ready to sell in minutes.
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
          className='flex flex-col items-center w-full bg-white p-2 rounded border-2 drop-shadow-md'
        >
          <button
            style={{ backgroundColor: '#1D9BF0' }}
            className='w-full h-10 rounded flex items-center justify-center text-white'
            type='button'
            onClick={handleTwitterSignup}
          >
            <AiOutlineTwitter className='text-2xl mr-2' />
            <p>Connect with Twitter</p>
          </button>
          <p className='font-medium text-lg text-stone-800 mt-2'>OR</p>
          <input
            type='email'
            placeholder='Email'
            className='border-2 border-gray-200 hover:border-slate-300 hover:border-gray-400 focus:outline focus:outline-1 focus:outline-gray-300 w-full rounded p-2 mt-2'
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />

          <input
            type='password'
            placeholder='Password'
            className='border-2 border-gray-200 focus:outline focus:outline-1 hover:border-gray-400 focus:outline-gray-400 hover:border-gray-300 w-full rounded p-2 mt-2'
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className='w-full mt-2'>
            <p className='font-medium border-b'>Give your page a name</p>
          </div>

          <div className='flex w-full'>
            <input
              type='text'
              placeholder='Page name'
              className='w-5/6 border-2 h-10 border-gray-200 hover:border-gray-400 focus:outline focus:outline-1 focus:outline-gray-200 rounded p-2 mt-2'
              onChange={(e) => setStoreName(e.target.value)}
            />
            <p className='font-medium text-xl mt-6'>.fruntt.com</p>
          </div>
          {/* 
        <div className='w-full mt-2'>
          <p className='font-medium'>Payment</p>
          <p className='text-gray-400 font-medium text-sm border-b'>
            Won't be charged until 7 day trial is over, can cancel anytime
          </p>
        </div> */}

          {/* <div className='w-full mt-4'>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div> */}

          <button
            type='submit'
            disabled={isLoading}
            className='h-11 w-full border-2 border-stone-800 hover:bg-stone-800 hover:text-white text-stone-800 rounded text-xl mt-4'
          >
            Launch product page
          </button>
          <div className='mt-2 flex w-full'>
            <Link to='/login'>
              <p className='text-sm self-start text-slate-400 hover:text-slate-800 font-medium'>
                Already have a page? Login here.
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterMobile;
