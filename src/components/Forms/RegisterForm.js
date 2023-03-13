import React from 'react';
import { Link } from 'react-router-dom';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';

//filepond
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

//mui
import Alert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';

const RegisterForm = ({
  error,
  setEmail,
  setPassword,
  handleSignup,
  setStoreName,
  storeName,
  bio,
  setBio,
  firstName,
  lastName,
  setLastName,
  setFirstName,
  isLoading,
  profilePic,
  setProfilePic,
}) => {
  return (
    <div className='flex flex-col w-3/12 mx-auto'>
      <h2 className='text-3xl font-medium'>Launch your first product page</h2>
      <p className='border-b-2 text-gray-400 font-medium mb-4'>
        Launch your first product page and explore the platform
      </p>

      {error && (
        <Alert severity='error' color='error' className='mt-4 mb-4 w-full'>
          {error}
        </Alert>
      )}

      <form
        onSubmit={handleSignup}
        className='flex flex-col items-center w-full bg-white p-2 rounded border-2 drop-shadow-md'
      >
        <input
          type='email'
          placeholder='Email'
          className='border-2 border-gray-300 hover:border-slate-300 hover:border-gray-400 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded p-2 mt-2'
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />

        <input
          type='password'
          placeholder='Password'
          className='border-2 border-gray-300 focus:outline focus:outline-1 hover:border-gray-400 focus:outline-gray-400 hover:border-slate-300 w-full rounded p-2 mt-2'
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className='w-full flex-col mt-2'>
          <div className='flex flex-col border-b mb-2'>
            <p className='font-medium'>Seller profile</p>
            <p className='text-gray-400 text-sm font-medium'>
              This appears at the top of all your product pages
            </p>
          </div>

          <div className='flex justify-between w-full'>
            <input
              type='text'
              maxLength='25'
              placeholder='First name or business name'
              className='border-2 border-gray-300 hover:border-gray-400 focus:outline focus:outline-1 focus:outline-gray-300 w-full rounded p-2'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <input
              type='text'
              maxLength='25'
              placeholder='Last name (optional)'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className='border-2 border-gray-300 hover:border-gray-400 focus:outline focus:outline-1 focus:outline-gray-300 w-full rounded p-2 ml-2'
            />
          </div>
          <div className='flex flex-col'>
            <textarea
              maxLength='100'
              placeholder='A little about you, your business, or what you sell...'
              className='w-full h-20 border-2 rounded border-gray-300 hover:border-gray-400 outline outline-0 p-2 mt-2'
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
            <p className='text-sm text-right'>{bio.length}/100</p>
          </div>
          <p className='text-gray-400 font-medium mt-2'>
            + add profile picture
          </p>
          <FilePond
            file={profilePic}
            imageResizeTargetWidth={200}
            allowReorder={true}
            name='productImages'
            onupdatefiles={(file) => setProfilePic(file)}
          />
        </div>

        <div className='w-full mt-2'>
          <p className='font-medium border-b'>Give your product page a name</p>
        </div>

        <div className='flex w-full'>
          <input
            type='text'
            placeholder='Page name & url'
            className='w-5/6 border-2 border-gray-300 hover:border-gray-400 focus:outline focus:outline-1 focus:outline-gray-300 w-full rounded p-2 mt-2'
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
          className='h-11 w-full border-2 border-slate-800 hover:bg-slate-800 hover:text-white text-slate-800 rounded text-xl mt-4'
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
  );
};

export default RegisterForm;
