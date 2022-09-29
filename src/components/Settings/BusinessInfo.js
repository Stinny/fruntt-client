import React, { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useUpdateBusinessInfoMutation } from '../../api/authApiSlice';
import Modal from 'react-modal';

//mui
import Tooltip from '@mui/material/Tooltip';

const BusinessInfo = ({ user, refetch }) => {
  const [name, setName] = useState(user?.business?.name);
  const [country, setCountry] = useState(user?.business?.country);
  const [address, setAddress] = useState(user?.business?.address);
  const [city, setCity] = useState(user?.business?.city);
  const [state, setState] = useState(user?.business?.state);
  const [zip, setZip] = useState(user?.business?.zipCode);

  const [updateBusinessInfo, result] = useUpdateBusinessInfoMutation();

  const businessInfoAvailable =
    user.business.name &&
    user.business.country &&
    user.business.state &&
    user.business.city &&
    user.business.zipCode &&
    user.business.address;

  const handleSaveBusinessInfo = async (e) => {
    e.preventDefault();

    try {
      const updateBusinessInfoReq = await updateBusinessInfo({
        name,
        address,
        country,
        state,
        city,
        zip,
      }).unwrap();
      if (updateBusinessInfoReq === 'User updated') {
        refetch();
        closeModal();
      }
    } catch (err) {
      console.log('there was an error');
      closeModal();
    }
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <>
      <div className='flex justify-between items-center w-full border-b p-2'>
        <p className='text-xlg font-medium'>Business Details</p>
        <button
          className='border-2 rounded w-20 border-gray-400 text-gray-400'
          onClick={openModal}
        >
          Edit
        </button>
      </div>
      <div className='w-full'>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          <form onSubmit={handleSaveBusinessInfo}>
            <p className='text-xl font-medium mb-4'>Business Info</p>
            <p className='text-gray-400'>Business name</p>
            <input
              type='text'
              className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-full rounded-lg p-2'
              placeholder='First name'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <p className='text-gray-400 mt-2'>Business address</p>
            <input
              type='text'
              className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-full rounded-lg p-2'
              placeholder='Address'
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            <p className='text-gray-400 mt-2'>Business country</p>
            <input
              type='text'
              className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-full rounded-lg p-2'
              placeholder='Country'
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
            <p className='text-gray-400 mt-2'>Business state</p>
            <input
              type='text'
              className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-full rounded-lg p-2'
              placeholder='State'
              onChange={(e) => setState(e.target.value)}
              value={state}
            />
            <p className='text-gray-400 mt-2'>Business city</p>
            <input
              type='text'
              className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-full rounded-lg p-2'
              placeholder='City'
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
            <p className='text-gray-400 mt-2'>Business zipcode</p>
            <input
              type='text'
              className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-full rounded-lg p-2'
              placeholder='Zipcode'
              onChange={(e) => setZip(e.target.value)}
              value={zip}
            />
            <button
              type='button'
              onClick={closeModal}
              className='w-full h-10 border-2 border-red-500 text-red-500 rounded mt-4'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='w-full h-10 border-2 border-slate-800 text-slate-800 rounded mt-4'
            >
              Save
            </button>
          </form>
        </Modal>
        {businessInfoAvailable ? (
          <>
            <div className='w-11/12 mx-auto flex justify-between pl-4 mt-2'>
              <div className='text-left'>
                <p className='text-lg font-medium'>Business name</p>
              </div>
              <div className='text-right'>
                <p className='text-lg'>{user?.business?.name}</p>
              </div>
            </div>
            <div className='w-11/12 mx-auto p-4 flex items-center'>
              <p className='font-medium text-gray-400'>Location</p>
              <Tooltip
                title={
                  <p className='text-lg'>
                    For generating shipping labels and returns
                  </p>
                }
                className='ml-2 text-lg'
                placement='right-end'
              >
                <button>
                  <AiOutlineInfoCircle className='text-gray-400' />
                </button>
              </Tooltip>
            </div>
            <div className='w-11/12 mx-auto flex justify-between pl-4'>
              <div className='text-left'>
                <p className='text-lg font-medium'>Address</p>
                <p className='text-lg font-medium mt-2'>Country</p>
                <p className='text-lg font-medium mt-2'>State/province</p>
                <p className='text-lg font-medium mt-2'>City</p>
                <p className='text-lg font-medium mt-2'>Zipcode</p>
              </div>
              <div className='text-right'>
                <p className='text-lg'>{user?.business?.address}</p>
                <p className='text-xl mt-2'>{user?.business?.country}</p>
                <p className='text-xl mt-2'>{user?.business?.state}</p>
                <p className='text-xl mt-2'>{user?.business?.city}</p>
                <p className='text-xl mt-2'>{user?.business?.zipCode}</p>
              </div>
            </div>
          </>
        ) : (
          <div className='w-11/12 mx-auto border-2 rounded h-28 w-full flex flex-col justify-center items-center mt-4'>
            <p className='text-lg font-medium text-slate-800'>
              Business details not completed yet
            </p>
            <p className='text-gray-400 text-medium'>
              These are needed so we can calculate shipping rates properly and
              generate shipping labels
            </p>
            <button onClick={openModal} className='text-gray-400 mt-2'>
              + add business details
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BusinessInfo;
