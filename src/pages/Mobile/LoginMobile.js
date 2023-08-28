import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../media/xlogowhite.png';

//mui
import Alert from '@mui/material/Alert';

const LoginMobile = ({
  error,
  setPassword,
  setEmail,
  handleLogin,
  handleTwitterLogin,
  isLoading,
  state,
}) => {
  return (
    <div className='flex flex-col mx-auto w-full p-2 mt-20'>
      <div className='w-full flex flex-col items-center'>
        <h2 className='text-4xl font-medium'>Login</h2>
        <p className='text-stone-800 font-medium text-center mt-2'>
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
        className='flex flex-col w-full items-center bg-white p-2 rounded border-2 drop-shadow-md mt-2 mb-44'
      >
        <button
          style={{
            backgroundColor: 'rgb(15, 20, 25)',
            borderColor: 'rgb(15, 20, 25)',
          }}
          className='w-full h-10 rounded flex items-center justify-center text-white'
          type='button'
          onClick={handleTwitterLogin}
        >
          <p className='mr-2'>Log in with</p>
          <img src={img} className='w-4 h-4' />
        </button>
        <p className='font-medium text-lg text-stone-800 mt-2'>OR</p>
        <input
          type='email'
          placeholder='Email'
          className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded mt-4 p-2'
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          placeholder='Password'
          className='border-2 border-slate-200 hover:border-slate-300 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded mt-4 p-2'
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='w-full flex justify-between mt-2'>
          <Link to='/signup'>
            <p className='text-xs text-slate-400 hover:text-stone-800 font-medium'>
              Don't have a store yet?
            </p>
          </Link>
          <Link to='/reset/password'>
            <p className='text-xs text-slate-400 hover:text-stone-800 font-medium'>
              Forgot your password?
            </p>
          </Link>
        </div>

        <button
          disabled={isLoading}
          className='h-10 w-full border-2 border-stone-800 hover:bg-stone-800 hover:text-white text-stone-800 rounded mt-4'
        >
          Go to my storefront
        </button>
      </form>
    </div>
  );
};

export default LoginMobile;
