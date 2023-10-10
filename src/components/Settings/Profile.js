import React, { useState, useMemo } from 'react';
import Modal from 'react-modal';
import { useUpdateAccountInfoMutation } from '../../api/authApiSlice';
import { isMobile } from 'react-device-detect';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';

const Profile = ({ user, refetch }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [country, setCountry] = useState(user?.country);
  const [zip, setZip] = useState(user?.zipcode);
  const [email, setEmail] = useState(user?.email);

  const options = useMemo(() => countryList().getData(), []);

  const [updateAccountInfo, result] = useUpdateAccountInfoMutation();

  const handleSaveAccountInfo = async (e) => {
    e.preventDefault();
    const updateAccountInfoReq = await updateAccountInfo({
      email,
      country,
      zip,
    }).unwrap();
    refetch();
    closeModal();
  };

  const handleCountry = (value) => {
    setCountry(value);
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
          <p className='text-xl font-medium mb-4 border-b'>Account Details</p>
          <p className='text-md font-medium mt-2'>Email</p>

          <input
            type='text'
            className='border-2 border-gray-200 hover:border-gray-300 outline outline-0 focus:border-gray-300 w-full rounded p-2'
            placeholder='Last name'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <p className='text-md font-medium mt-2'>Country</p>
          <Select
            options={options}
            onChange={handleCountry}
            className='w-full h-10 text-sm'
            value={country}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: 'rgb(229 231 235)',
                '&:hover': {
                  borderColor: 'rgb(209 213 219)', // Keep the same border color on hover
                },
                boxShadow: 'none',
                borderWidth: 2,
                zIndex: 99999,
                position: 'relative',
              }),
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />

          <p className='text-md font-medium mt-2'>Zipcode</p>

          <input
            type='text'
            className='border-2 text-sm border-gray-200 hover:border-gray-300 outline outline-0 focus:border-gray-300 w-full rounded p-2'
            placeholder='ZIP'
            onChange={(e) => setZip(e.target.value)}
            value={zip}
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
            className='w-full h-14 border-2 border-stone-800 text-stone-800 hover:text-white hover:bg-stone-800 rounded mt-4'
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
          <p className='text-lg font-medium'>Account Details</p>
          <button
            className='border-2 rounded w-20 h-8 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
            onClick={openModal}
          >
            Edit
          </button>
        </div>
      )}

      {isMobile ? (
        <div className='w-11/12 mx-auto flex flex-col p-2'>
          <p className='text-lg font-medium mt-2 text-gray-400'>
            Account email
          </p>
          <p className='text-xl mt-2'>{user?.email}</p>
        </div>
      ) : (
        <>
          <div className='flex flex-col pl-4'>
            <p className='text-sm font-medium mt-2'>Account email</p>
            <p className='text-lg'>{user?.email}</p>
          </div>
          {user?.zipcode ? (
            <div className='flex flex-col pl-4'>
              <p className='text-sm font-medium mt-2'>Location</p>

              <div className='flex items-center'>
                <ReactCountryFlag
                  countryCode={user?.country?.value}
                  className='mr-1'
                />
                <p className='text-lg'>{user?.country?.label}</p>
              </div>
              <p className='text-lg'>{user?.zipcode}</p>
            </div>
          ) : (
            <div className='rounded h-32 flex bg-gray-50 w-11/12 items-center justify-center mx-auto'>
              <p className='text-sm'>Finish adding account info</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
