import React, { useState } from 'react';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';
import { useDeleteAccountMutation } from '../../api/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//mui
import Alert from '@mui/material/Alert';
import handleLogutUser from '../../utils/logout';
import { Spinner } from 'flowbite-react';

const DeleteAccount = ({ setDeleteAcc, deleteAcc }) => {
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

  return (
    <div className='flex items-center w-full justify-start gap-2'>
      {deletingAccount ? (
        <Spinner className='mt-2' />
      ) : (
        <>
          <button
            type='button'
            onClick={(e) => setDeleteAcc(!deleteAcc)}
            className='text-stone-800 hover:bg-gray-200 rounded-md p-1 pl-2 pr-2 text-xs mt-2'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={handleDeleteAccount}
            className='text-stone-800 bg-red-200 rounded-md p-1 pl-2 pr-2 text-xs mt-2'
          >
            Delete account
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteAccount;
