import React, { useState } from 'react';
import Modal from 'react-modal';

//mui
import Switch from '@mui/material/Switch';
import { useUpdateNotificationsMutation } from '../../api/authApiSlice';

const Notifications = ({ user, refetch }) => {
  const [sendUpdates, setSendUpdates] = useState(user?.sendUpdates);
  const [sendOrderPlaced, setSendOrderPlaced] = useState(user?.sendOrderPlaced);
  const [sendReviewCollected, setSendReviewCollected] = useState(
    user?.sendReviewCollected
  );
  const [sendItemOutOfStock, setSendItemOutOfStock] = useState(
    user?.sendItemOutOfStock
  );

  const [updateNotifications, result] = useUpdateNotificationsMutation();

  const handleSaveNotifications = async (e) => {
    e.preventDefault();
    try {
      const updateNotificationsReq = await updateNotifications({
        sendUpdates,
        sendItemOutOfStock,
        sendOrderPlaced,
        sendReviewCollected,
      }).unwrap();
      if (updateNotificationsReq === 'User updated') {
        refetch();
        closeModal();
      }
    } catch (err) {
      console.log('there was an error');
      closeModal();
    }
  };

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

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className='flex justify-between items-center w-full border-b p-2'>
        <p className='text-xlg font-medium'>Notifications</p>
        <button
          onClick={openModal}
          className='border-2 rounded w-20 border-gray-400 text-gray-400'
        >
          Edit
        </button>
      </div>
      <div className='w-11/12 mx-auto flex justify-between items-center p-4'>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          <form onSubmit={handleSaveNotifications}>
            <p className='text-xl font-medium mb-4'>Notifications</p>
            <p className='text-gray-400'>Fruntt news & updates</p>
            <Switch
              checked={sendUpdates}
              onChange={(e) => setSendUpdates(e.target.checked)}
            />

            <p className='text-gray-400 mt-2'>An order has been placed</p>
            <Switch
              checked={sendOrderPlaced}
              onChange={(e) => setSendOrderPlaced(e.target.checked)}
            />

            <p className='text-gray-400 mt-2'>An item out of stock</p>
            <Switch
              checked={sendItemOutOfStock}
              onChange={(e) => setSendItemOutOfStock(e.target.checked)}
            />

            <p className='text-gray-400 mt-2'>Customer leaves a review</p>
            <Switch
              checked={sendReviewCollected}
              onChange={(e) => setSendReviewCollected(e.target.checked)}
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
        <div className='flex flex-col'>
          <p className='text-lg font-medium'>Fruntt news & updates</p>
          <p className='text-lg font-medium mt-4'>An order was placed</p>
          <p className='text-lg font-medium mt-4'>An item goes out of stock</p>
          <p className='text-lg font-medium mt-4'>Customer leaves a review</p>
        </div>

        <div className='flex flex-col'>
          <Switch checked={user?.sendUpdates} />
          <Switch checked={user?.sendOrderPlaced} className='mt-4' />
          <Switch checked={user?.sendItemOutOfStock} className='mt-4' />
          <Switch checked={user?.sendReviewCollected} className='mt-4' />
        </div>
      </div>
    </>
  );
};

export default Notifications;
