import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';

//mui
import Switch from '@mui/material/Switch';
import DeletePage from '../../components/Config/DeletePage';

const Config = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const [name, setName] = useState(currentUser?.store?.name);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [error, setError] = useState('');
  const [changingName, setChangingName] = useState(false);

  const modalStyles = isMobile
    ? {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
        },
      }
    : {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
        },
      };

  const handleSaveName = () => {};

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <form onSubmit={handleSaveName}>
          <p className='text-xl font-medium mb-4 border-b'>Storefront Name</p>
          <div className='flex items-center border-2 rounded mt-1 h-12 border-gray-200 hover:border-gray-300 p-2'>
            <input
              className='bg-white outline outline-0'
              placeholder='Storefront name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className='font-medium'>.fruntt.com</span>
          </div>

          <button
            type='button'
            onClick={closeModal}
            className='w-full h-10 border-2 border-red-500 text-red-400 hover:text-white hover:bg-red-400 rounded mt-4'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='w-full h-14 border-2 border-stone-800 text-stone-800 hover:text-white hover:bg-stone-800 rounded mt-4'
            disabled={changingName}
          >
            {changingName ? 'Changing name...' : 'Change Name'}
          </button>
        </form>
      </Modal>
      <div className='max-w-6xl mx-auto h-screen'>
        <p className='font-medium text-2xl text-stone-800'>
          Storefront Configuration
        </p>
        <div className='w-full bg-white border rounded drop-shadow-lg mt-2 p-2'>
          <div className='w-full border-b p-2 flex justify-between items-center'>
            <p className='font-medium'>Storefront Name</p>
            <button
              onClick={openModal}
              className='border-2 rounded w-20 h-8 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white'
            >
              Edit
            </button>
          </div>

          <div className='flex justify-between items-center'>
            <div className='flex items-center border-2 rounded mt-1 border-gray-200 bg-gray-200 p-2 bg-inherit pl-4 pr-4'>
              <span className=' font-medium text-lg'>{`${currentUser?.store?.name}`}</span>
              <span className=' text-lg'>.fruntt.com</span>
            </div>
          </div>

          <div className='w-full border-b p-2 flex justify-between items-center mt-4'>
            <p className='font-medium'>Analytics</p>
          </div>

          <div className='rounded bg-gray-100 h-32 flex items-center justify-center mt-2'>
            <div>
              <p>Coming soon!</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Config;
