import React, { useState } from 'react';
import Modal from 'react-modal';
import { states } from '../../states';
import { useEditShipsFromAddressMutation } from '../../api/ordersApiSlice';
import { isMobile } from 'react-device-detect';

const FromAddress = ({ order, refetch, refetchRates }) => {
  const [country, setCountry] = useState(order?.shipsFrom?.country);
  const [state, setState] = useState(order?.shipsFrom?.state);
  const [city, setCity] = useState(order?.shipsFrom?.city);
  const [zip, setZip] = useState(order?.shipsFrom?.zipcode);
  const [address, setAddress] = useState(order?.shipsFrom?.address);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [editShipsFromAddress, result] = useEditShipsFromAddressMutation();

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      const updateShipsFromReq = await editShipsFromAddress({
        orderId: order._id,
        country: country,
        address: address,
        state: state,
        city: city,
        zipcode: zip,
      }).unwrap();
      console.log(updateShipsFromReq);
      if (updateShipsFromReq === 'Address updated') {
        refetch();
        refetchRates();
        closeModal();
      }
    } catch (err) {
      return;
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
        <form className='flex flex-col' onSubmit={handleSaveAddress}>
          <div className='border-b p-2 w-full mb-4'>
            <p className='text-xl font-medium'>Editing shipping address</p>
          </div>
          <p className='text-gray-400'>Address</p>
          <input
            className='w-full border-2 border-slate-200 hover:border-slate-300 rounded-lg p-2 outline outline-0'
            type='text'
            placeholder='Address'
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />

          <p className='text-gray-400 mt-2'>Country</p>
          <select className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg p-2 outline outline-0 bg-white'>
            <option>United States</option>
          </select>

          <p className='text-gray-400 mt-2'>State</p>
          <select
            onChange={(e) => setState(e.target.value)}
            className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg p-2 outline outline-0 bg-white'
            value={state}
          >
            <option disabled selected hidden className='text-gray-400'>
              State
            </option>
            {states.map((state, index) => (
              <option key={index}>{state}</option>
            ))}
          </select>

          <p className='text-gray-400 mt-2'>City</p>
          <input
            type='text'
            className='border-2 border-slate-200 hover:border-slate-300 outline outline-0 focus:border-slate-300 w-full rounded-lg p-2'
            placeholder='City'
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />

          <p className='text-gray-400 mt-2'>Zipcode</p>
          <input
            type='text'
            className='border-2 border-slate-200 hover:border-slate-300 outline outline-0 focus:border-slate-300 w-full rounded-lg p-2'
            placeholder='Zipcode'
            onChange={(e) => setZip(e.target.value)}
            value={zip}
          />
          <button
            className='w-full h-14 text-xl border-2 border-slate-800 hover:border-slate-600 rounded mt-2 hover:bg-slate-800 hover:text-white'
            type='submit'
          >
            SAVE
          </button>

          <button
            className='w-full text-xl border-2 border-red-400 hover:border-red-400 text-red-400 hover:bg-red-400 hover:text-white h-10 rounded mt-2'
            type='button'
            onClick={closeModal}
          >
            CANCEL
          </button>
        </form>
      </Modal>
      {isMobile ? (
        <div>
          <div className='flex justify-between items-center border-b p-2'>
            <p className='text-xl font-medium'>Return address</p>
            <button
              onClick={openModal}
              className='border-2 rounded border-slate-800 text-slate-800 w-16 h-8 hover:text-white hover:bg-slate-800'
            >
              Edit
            </button>
          </div>
          <div className='w-full p-4 flex flex-col mx-auto'>
            <p className='text-gray-400'>Street address:</p>
            <p className='text-lg font-medium'>{order?.shipsFrom?.address}</p>
            <p className='text-gray-400 mt-2'>Country:</p>
            <p className='text-lg font-medium'>{order?.shipsFrom?.country}</p>
            <p className='text-gray-400 mt-2'>State:</p>
            <p className='text-lg font-medium'>{order?.shipsFrom?.state}</p>
            <p className='text-gray-400 mt-2'>City:</p>
            <p className='text-lg font-medium'>{order?.shipsFrom?.city}</p>
            <p className='text-gray-400 mt-2'>Zipcode:</p>
            <p className='text-lg font-medium'>{order?.shipsFrom?.zipcode}</p>
          </div>
        </div>
      ) : (
        <div>
          <div className='flex justify-between items-center border-b p-2'>
            <p className='text-xl font-medium'>Return address</p>
            <button
              onClick={openModal}
              className='border-2 rounded border-slate-800 text-slate-800 w-44 hover:text-white hover:bg-slate-800'
            >
              Edit return address
            </button>
          </div>
          <div className='w-full p-4 flex justify-between mx-auto'>
            <div className='flex flex-col justify-between'>
              <p className='text-gray-400'>Street address:</p>
              <p className='text-gray-400 mt-2'>Country:</p>
              <p className='text-gray-400 mt-2'>State:</p>
              <p className='text-gray-400 mt-2'>City:</p>
              <p className='text-gray-400 mt-2'>Zipcode:</p>
            </div>
            <div className='flex flex-col justify-between text-right'>
              <p className='text-lg font-medium mt-2'>
                {order?.shipsFrom?.address}
              </p>
              <p className='text-lg font-medium mt-2'>
                {order?.shipsFrom?.country}
              </p>
              <p className='text-lg font-medium mt-2'>
                {order?.shipsFrom?.state}
              </p>
              <p className='text-lg font-medium mt-2'>
                {order?.shipsFrom?.city}
              </p>
              <p className='text-lg font-medium mt-2'>
                {order?.shipsFrom?.zipcode}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FromAddress;
