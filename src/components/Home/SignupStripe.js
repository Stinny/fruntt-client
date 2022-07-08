import React from 'react';
import { Link } from 'react-router-dom';

const SignupStripe = () => {
  return (
    <div className='w-full mx-auto h-40 bg-blue-300 mt-20 mb-40'>
      <div className='w-full h-full mx-auto flex flex-col justify-center items-center bg-blue-300'>
        <h2 className='text-3xl text-white font-medium'>
          Open your storefront and start selling today!
        </h2>
        <Link to='/pricing'>
          <button className='rounded w-60 text-blue-300 bg-white hover:bg-slate-200 h-10 text-lg mt-4 flex items-center justify-center'>
            Start free trial
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignupStripe;
