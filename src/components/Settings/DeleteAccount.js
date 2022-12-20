import React, { useState } from 'react';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';

//mui
import Alert from '@mui/material/Alert';

const DeleteAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [deletingAccount, setDeletingAccount] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

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
  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles}>
        <div className='w-11/12 mx-auto'>
          <p className='text-lg font-medium text-slate-800 mb-4 border-b'>
            Delete Fruntt account
          </p>

          <p className='text-xl'>
            Are you sure you want to delete your Fruntt account?
          </p>

          {error && (
            <Alert className='w-full mb-2 mt-2' severity='error'>
              {error}
            </Alert>
          )}

          <button
            type='button'
            // disabled={deletingPage}
            // onClick={handleDeleteStore}
            className='h-14 w-full border-red-400 text-red-400 border-2 rounded mt-2 hover:bg-red-400 hover:text-white'
          >
            {deletingAccount ? 'Deleting account...' : 'Yes, delete account'}
          </button>

          <button
            onClick={closeModal}
            className='h-10 w-full border-slate-800 text-slate-800 border-2 rounded mt-2 hover:bg-slate-800 hover:text-white'
            type='button'
          >
            Cancel
          </button>
        </div>
      </Modal>

      <div className='w-full h-32 mt-2'>
        <button
          type='button'
          onClick={openModal}
          className='w-full h-14 border-2 border-red-400 text-red-400 text-xl font-medium hover:bg-red-400 hover:text-white rounded'
        >
          Delete account
        </button>
      </div>
    </>
  );
};

export default DeleteAccount;
