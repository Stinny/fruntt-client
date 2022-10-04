import React, { useState } from 'react';
import Modal from 'react-modal';
import { states } from '../../states';
import { useEditShippingAddressMutation } from '../../api/ordersApiSlice';

const ShippingAddress = ({ order, refetch }) => {
  const [country, setCountry] = useState(order?.shippingAddress?.country);
  const [state, setState] = useState(order?.shippingAddress?.state);
  const [city, setCity] = useState(order?.shippingAddress?.city);
  const [zip, setZip] = useState(order?.shippingAddress?.zipcode);
  const [address, setAddress] = useState(order?.shippingAddress?.street);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [editShippingAddress, result] = useEditShippingAddressMutation();

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      const updateShippingReq = await editShippingAddress({
        orderId: order._id,
        country: country,
        address: address,
        state: state,
        city: city,
        zipcode: zip,
      }).unwrap();
      if (updateShippingReq === 'Shipping address updated') {
        refetch();
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
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <form className='flex flex-col' onSubmit={handleSaveAddress}>
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
            className='w-full h-14 text-xl border-2 border-slate-800 hover:border-slate-600 rounded mt-2'
            type='submit'
          >
            SAVE
          </button>

          <button
            className='w-full text-xl border-2 border-red-400 hover:border-red-400 text-red-400 h-10 rounded mt-2'
            type='button'
            onClick={closeModal}
          >
            CANCEL
          </button>
        </form>
      </Modal>

      <div className='flex justify-between items-center border-b p-2'>
        <p className='text-xl font-medium'>Shipping item to</p>
        <button
          onClick={openModal}
          className='border-2 rounded border-gray-400 text-gray-400 w-14'
        >
          Edit
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
            {order?.shippingAddress?.street}
          </p>
          <p className='text-lg font-medium mt-2'>United States</p>
          <p className='text-lg font-medium mt-2'>
            {order?.shippingAddress?.city}
          </p>
          <p className='text-lg font-medium mt-2'>
            {order?.shippingAddress?.state}
          </p>
          <p className='text-lg font-medium mt-2'>
            {order?.shippingAddress?.zipcode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
