import React from 'react';
import { Link } from 'react-router-dom';

//mui
import Alert from '@mui/material/Alert';

const RegisterMobile = ({
  error,
  setEmail,
  setPassword,
  handleSignup,
  setStoreName,
  isLoading,
}) => {
  return (
    <div className='container flex flex-col items-center justify-center mx-auto w-full'>
      <h2 className='text-2xl text-center font-medium mb-4'>
        Launch your first storefront
      </h2>

      {error && (
        <Alert severity='error' color='error' className='mt-4 mb-4 w-10/12'>
          {error}
        </Alert>
      )}
      <form
        onSubmit={handleSignup}
        className='flex flex-col items-center w-10/12'
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
};

export default RegisterMobile;
