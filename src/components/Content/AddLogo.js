import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { uploadImageRequest } from '../../api/requests';
import {
  useAddLogoMutation,
  useDeleteLogoMutation,
} from '../../api/storefrontApiSlice';
import { isMobile } from 'react-device-detect';
import Cookies from 'js-cookie';
import { setSelectedStoreUrl } from '../../redux/userRedux';

//filepond
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Alert } from '@mui/material';
import { useDispatch } from 'react-redux';

const AddLogo = ({ storefront, refetch, setInfo }) => {
  const dispatch = useDispatch();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [logoFile, setLogoFile] = useState([]);
  const [name, setName] = useState(storefront?.name);
  const [error, setError] = useState('');
  const [changingName, setChangingName] = useState(false);

  const [addLogo, result] = useAddLogoMutation();

  //this needs to be refactored at some point to better handle errors
  const handleChangeName = async (e) => {
    try {
      setChangingName(true);
      const addLogoReq = await addLogo({
        storeId: storefront._id,
        name: name,
      }).unwrap();

      if (addLogoReq?.msg === 'Name changed') {
        setChangingName(false);
        refetch();
        // setInfo(
        //   'Please log out and log back in for name or logo change to fully take place'
        // );
        dispatch(setSelectedStoreUrl(`https://${name}.fruntt.com`));
        currentUser.store.name = name;
        currentUser.store.url = `https://${name}.fruntt.com`;
        const newUser = JSON.stringify(currentUser);
        Cookies.set('currentUser', newUser, { sameSite: 'Lax' });
        closeModal();
      } else if (addLogoReq?.msg === 'Name in use') {
        setChangingName(false);
        setError('Sorry that name is taken!');
      } else {
        setChangingName(false);
        refetch();
        return;
      }
    } catch (err) {
      setChangingName(false);
      setError('There was a server error');
    }
  };

  useEffect(() => {
    setError('');
  }, [name]);

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
            Edit page name
          </p>
          {error && <Alert severity='error'>{error}</Alert>}
          <form>
            <p>Name</p>
            <div className='flex justify-between items-center'>
              <input
                type='text'
                className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-full rounded p-2'
                placeholder='Storefront name'
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <p className='font-medium'>.fruntt.com</p>
            </div>
          </form>
          <button
            onClick={handleChangeName}
            disabled={changingName}
            className='h-14 w-full border-stone-800 border-2 rounded mt-2 hover:bg-stone-800 hover:text-white'
          >
            {changingName ? 'Changing name...' : 'Save'}
          </button>

          <button
            onClick={closeModal}
            className='h-10 w-full border-red-400 text-red-400 border-2 rounded mt-2 hover:bg-red-400 hover:text-white'
            type='button'
          >
            Cancel
          </button>
        </div>
      </Modal>

      {isMobile ? (
        <div className='mb-4 p-2'>
          <div className='w-full flex justify-between items-center mt-4 border-b pb-2'>
            <p className='text-slate-800 font-medium text-xl'>Page name</p>

            <button
              className='border-2 rounded w-16 h-8 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
              onClick={openModal}
            >
              Edit
            </button>
          </div>

          <div>
            <p className='text-gray-400 font-medium mt-2'>Name</p>
            <p className='text-xl text-gray-400 font-medium'>
              <span className='text-stone-800'>{storefront?.name}</span>
              .fruntt.com
            </p>
          </div>
        </div>
      ) : (
        <div className='mb-4'>
          <div className='w-full flex justify-between items-center mt-4 border-b p-2'>
            <p className='text-slate-800 font-medium text-xl'>Page name</p>
            <button
              className='border-2 rounded w-20 h-8 border-stone-800 text-slate-800 hover:bg-stone-800 hover:text-white'
              onClick={openModal}
            >
              Edit
            </button>
          </div>

          <div className='p-4'>
            <p className='text-gray-400 font-medium mt-2'>Name</p>
            <p className='text-xl text-gray-400 font-medium'>
              <span className='text-slate-800'>{storefront?.name}</span>
              .fruntt.com
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AddLogo;
