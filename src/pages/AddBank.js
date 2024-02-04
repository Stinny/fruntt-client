import React from 'react';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AddBank = () => {
  return (
    <>
      <Navbar />
      <div className='flex'>
        <Topbar />

        <div className='w-9/12 p-10 mx-auto h-screen bg-gray-50'>
          <div className='flex justify-between'>
            <p className='text-3xl font-medium'>Add bank</p>
          </div>
          <div className='w-full h-full bg-white border rounded drop-shadow-lg mt-2 p-2 flex flex-col'>
            <p className='text-stone-800 text-md'>
              Use the form below to change the name of your Fruntt store.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddBank;
