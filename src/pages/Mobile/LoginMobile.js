import React from 'react';
import { Link } from 'react-router-dom';

//mui
import Alert from '@mui/material/Alert';

const LoginMobile = ({
  error,
  setPassword,
  setEmail,
  handleLogin,
  isLoading,
}) => {
  return (
    <div className='flex flex-col items-center mx-auto justify-center w-full'>
      <h2 className='text-4xl font-bold'>Login</h2>
      {error && (
        <Alert severity='error' className='mt-2 mb-2 w-10/12 bg-red-300'>
          {error}
        </Alert>
      )}
      <form
        onSubmit={handleLogin}
        className='w-10/12 flex flex-col items-center'
      >
        <input
          type='email'
          placeholder='Email'
          className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded-lg mt-4 p-2'
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          placeholder='Password'
          className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded-lg mt-4 p-2'
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='w-full flex justify-between mt-2'>
          <Link to='/signup'>
            <p className='text-xs text-slate-400 hover:text-slate-800 font-medium'>
              Don't have a page yet?
            </p>
          </Link>
          <Link to='/signup'>
            <p className='text-xs text-slate-400 hover:text-slate-800 font-medium'>
              Forgot your password?
            </p>
          </Link>
        </div>

        <button
          disabled={isLoading}
          className='h-10 w-full border-2 border-slate-800 hover:bg-slate-800 hover:text-white text-slate-800 rounded text-lg mt-4'
        >
          Go to my page
        </button>
      </form>
    </div>
  );
};

export default LoginMobile;
