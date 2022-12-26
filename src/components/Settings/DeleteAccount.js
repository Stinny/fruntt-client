import React, { useState } from 'react';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';
import { useDeleteAccountMutation } from '../../api/authApiSlice';
import { useNavigate } from 'react-router-dom';

//mui
import Alert from '@mui/material/Alert';
import handleLogutUser from '../../utils/logout';

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [deletingAccount, setDeletingAccount] = useState(false);

  const [deleteAccount, result] = useDeleteAccountMutation();

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    setDeletingAccount(true);

    try {
      const deleteAccountReq = await deleteAccount().unwrap();
      console.log(deleteAccountReq);

      if (deleteAccountReq === 'Account deleted') {
        setDeletingAccount(false);
        handleLogutUser(navigate);
      } else {
        setError('There was an error');
        setDeletingAccount(false);
      }
    } catch (err) {
      setError('There was an error');
    }
  };

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
            onClick={handleDeleteAccount}
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

      {isMobile ? (
        <div className='w-full h-32 p-2'>
          <button
            type='button'
            disabled={deletingAccount}
            onClick={openModal}
            className='w-full h-14 border-2 border-red-400 text-red-400 text-xl font-medium hover:bg-red-400 hover:text-white rounded'
          >
            {deletingAccount ? 'Deleting account...' : 'Delete account'}
          </button>
        </div>
      ) : (
        <div className='w-full h-32 mt-2'>
          <button
            type='button'
            disabled={deletingAccount}
            onClick={openModal}
            className='w-full h-14 border-2 border-red-400 text-red-400 text-xl font-medium hover:bg-red-400 hover:text-white rounded'
          >
            {deletingAccount ? 'Deleting account...' : 'Delete account'}
          </button>
        </div>
      )}
    </>
  );
};

export default DeleteAccount;
