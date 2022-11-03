import React, { useState } from 'react';
import Modal from 'react-modal';
import { useUpdateAccountInfoMutation } from '../../api/authApiSlice';
import { isMobile } from 'react-device-detect';

const Profile = ({ user, refetch }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);

  const [updateAccountInfo, result] = useUpdateAccountInfoMutation();

  const handleSaveAccountInfo = async (e) => {
    e.preventDefault();
    const updateAccountInfoReq = await updateAccountInfo({
      firstName,
      lastName,
      email,
    }).unwrap();
    refetch();
    closeModal();
  };

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

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <form onSubmit={handleSaveAccountInfo}>
          <p className='text-xl font-medium mb-4'>Account Details</p>
          <p className='text-gray-400'>First name</p>
          <input
            type='text'
            className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-full rounded-lg p-2'
            placeholder='Enter first name'
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <p className='text-gray-400 mt-2'>Last name</p>
          <input
            type='text'
            className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-full rounded-lg p-2'
            placeholder='Enter last name'
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <p className='text-gray-400 mt-2'>Email</p>
          <input
            type='text'
            className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-full rounded-lg p-2'
            placeholder='Last name'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button
            type='button'
            onClick={closeModal}
            className='w-full h-10 border-2 border-red-500 text-red-400 rounded mt-4 hover:text-white hover:bg-red-400'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='w-full h-14 border-2 border-slate-800 text-slate-800 hover:text-white hover:bg-slate-800 rounded mt-4'
          >
            Save
          </button>
        </form>
      </Modal>

      {isMobile ? (
        <div className='flex justify-between items-center w-full border-b p-2'>
          <p className='text-lg font-medium'>Account Details</p>
          <button
            className='border-2 rounded w-16 h-8 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
            onClick={openModal}
          >
            Edit
          </button>
        </div>
      ) : (
        <div className='flex justify-between items-center w-full border-b p-2'>
          <p className='text-xlg font-medium'>Account Details</p>
          <button
            className='border-2 rounded w-20 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
            onClick={openModal}
          >
            Edit
          </button>
        </div>
      )}

      {isMobile ? (
        <div className='w-11/12 mx-auto flex flex-col p-4'>
          <p className='text-lg font-medium mt-2'>Account email</p>

          <p className='text-xl mt-2'>{user?.email}</p>
        </div>
      ) : (
        <div className='w-11/12 mx-auto flex justify-between p-4'>
          <div className='text-left'>
            <p className='text-lg font-medium mt-2'>Account email</p>
          </div>
          <div className='text-right'>
            <p className='text-xl mt-2'>{user?.email}</p>
          </div>
        </div>
      )}

      {user.firstName && user.lastName ? (
        <div className='w-11/12 mx-auto flex justify-between p-4'>
          <div className='text-left'>
            <p className='text-lg font-medium'>First name</p>
            <p className='text-lg font-medium mt-2'>Last name</p>
          </div>
          <div className='text-right'>
            <p className='text-xl'>{user?.firstName}</p>
            <p className='text-xl mt-2'>{user?.lastName}</p>
          </div>
        </div>
      ) : (
        <div className='w-11/12 mx-auto border-2 rounded h-36 w-full flex flex-col justify-center items-center'>
          <p className='text-lg font-medium text-slate-800'>
            Personal details not added yet
          </p>
          <p className='text-md mt-2 font-medium text-slate-800'>
            add to further personalize your dashboard
          </p>
          <button onClick={openModal} className='text-gray-400 mt-2'>
            + add personal details
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
