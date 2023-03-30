import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';
import { useDeleteStoreMutation } from '../../api/storefrontApiSlice';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { setSelectedStoreUrl } from '../../redux/userRedux';

//mui
import Alert from '@mui/material/Alert';

const DeletePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [deletingPage, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const currentStoreId = useSelector((state) => state.user.selectedStore);

  const [deleteStore, result] = useDeleteStoreMutation();

  const handleDeleteStore = async (e) => {
    e.preventDefault();

    setDeleting(true);
    try {
      const deleteStoreReq = await deleteStore({
        storeId: currentStoreId,
      }).unwrap();

      if (deleteStoreReq.msg === 'Page deleted') {
        currentUser.store = deleteStoreReq.storefront;
        currentUser.storeIds = deleteStoreReq.storeIds;
        dispatch(setSelectedStoreUrl(deleteStoreReq.storefront.url));

        const newUser = JSON.stringify(currentUser);
        Cookies.set('currentUser', newUser, { sameSite: 'Lax' });
        setDeleting(false);
        navigate('/dashboard');
      } else {
        setError('There was an error');
        setDeleting(false);
      }
    } catch (err) {
      setError('There was a server error');
      setDeleting(false);
      console.log('error');
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className='w-11/12 mx-auto'>
          <p className='text-lg font-medium text-slate-800 mb-4 border-b'>
            Delete product page
          </p>

          <p className='text-xl'>
            Are you sure you want to delete this product page?
          </p>

          {error && (
            <Alert className='w-full mb-2 mt-2' severity='error'>
              {error}
            </Alert>
          )}

          <button
            type='button'
            disabled={deletingPage}
            onClick={handleDeleteStore}
            className='h-14 w-full border-red-400 text-red-400 border-2 rounded mt-2 hover:bg-red-400 hover:text-white'
          >
            {deletingPage ? 'Deleting page...' : 'Yes, delete'}
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
      <div className='p-2 border-b mt-4 flex flex-col'>
        <p className='text-xl font-medium'>Delete product page</p>
        {/* <p className='text-gray-400 font-medium'>
              Turn on maintenance mode if you ever need to make changes and do
              not want to take orders
            </p> */}
      </div>
      {currentUser.storeIds.length > 1 ? (
        <button
          type='button'
          onClick={openModal}
          className='w-full h-16 border-red-400 border-2 rounded text-red-400 font-medium text-2xl hover:bg-red-400 hover:text-white mt-4'
        >
          Delete product page
        </button>
      ) : (
        <div className='w-full h-32 flex flex-col justify-center items-center border-2 rounded mt-2 text-center'>
          <p className='font-medium'>
            You can't delete your last product page. Go into settings if you
            want to delete your account.
          </p>
        </div>
      )}
    </>
  );
};

export default DeletePage;
