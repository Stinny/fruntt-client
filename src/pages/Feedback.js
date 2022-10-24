import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Feedback = () => {
  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-20 h-screen'>
        <div className='p-2 border-b-2'>
          <p className='font-medium text-3xl text-slate-800'>Leave feedback</p>
          <p className='font-medium text-gray-400'>
            We greatly appreaciate and encourage feedback!
          </p>
        </div>

        <form className='flex flex-col p-10 w-9/12 mx-auto'>
          <p className='font-medium mb-2 text-gray-400'>Leave feedback on:</p>
          <select className='w-6/12 h-10 border rounded'>
            <option value='orders'>Designing your storefront</option>
            <option value='orders'>Order management</option>
            <option value='orders'>Customer management</option>
            <option value='orders'>Request a feature</option>
            <option value='orders'>Other</option>
          </select>

          <textarea
            className='h-32 w-full border-2 rounded p-2 mt-2 outline outline-0 focus:border-gray-400'
            placeholder='Enter feedback here'
          />

          <button
            type='submit'
            className='w-full h-14 border-2 border-slate-800 text-slate-800 hover:text-white hover:bg-slate-800 rounded mt-4'
          >
            Submit feedback
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Feedback;
