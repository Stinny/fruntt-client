import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';

//mui
import Switch from '@mui/material/Switch';

const Config = () => {
  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto h-screen'>
        <div className='w-full mx-auto p-4'>
          <div className='p-2 border-b'>
            <p className='text-xl font-medium'>Domain name</p>
          </div>
          <div className='w-full h-32 flex flex-col justify-center items-center border-2 rounded mt-2'>
            <p className='font-medium'>
              Adding your own domain name will be available very soon
            </p>
          </div>
          <div className='p-2 border-b mt-4 flex flex-col'>
            <p className='text-xl font-medium'>Maintenance mode</p>
            <p className='text-gray-400 font-medium'>
              Turn on maintenance mode if you ever need to make changes while
              not taking orders
            </p>
          </div>
          <p className='font-medium text-lg mt-4'>Turn on maintenance mode</p>
          <Switch className='mt-4' />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Config;
