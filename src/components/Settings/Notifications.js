import React, { useState } from 'react';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';

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
        <form onSubmit={handleSaveNotifications}>
          <p className='text-xl font-medium mb-4 border-b'>Notifications</p>
          <p className='text-stone-800'>Fruntt news & updates</p>
          <Switch
            checked={sendUpdates}
            onChange={(e) => setSendUpdates(e.target.checked)}
          />

          <p className='text-stone-800 mt-2'>An order has been placed</p>
          <Switch
            checked={sendOrderPlaced}
            onChange={(e) => setSendOrderPlaced(e.target.checked)}
          />

          <p className='text-stone-800 mt-2'>Customer leaves a review</p>
          <Switch
            checked={sendReviewCollected}
            onChange={(e) => setSendReviewCollected(e.target.checked)}
          />

          <button
            type='button'
            onClick={closeModal}
            className='w-full h-10 border-2 border-red-500 text-red-400 hover:text-white hover:bg-red-400 rounded mt-4'
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
          <p className='text-lg font-medium'>Notifications</p>
          <button
            onClick={openModal}
            className='border-2 rounded w-16 h-8 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
          >
            Edit
          </button>
        </div>
      ) : (
        <div className='flex justify-between items-center w-full border-b p-2'>
          <p className='text-xlg font-medium'>Notifications</p>
          <button
            onClick={openModal}
            className='border-2 rounded w-20 h-8 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white'
          >
            Edit
          </button>
        </div>
      )}
      {isMobile ? (
        <div className='w-11/12 mx-auto flex justify-between items-center p-2'>
          <div className='flex flex-col'>
            <p className='text-lg font-medium'>Fruntt news & updates</p>
            <p className='text-lg font-medium mt-4'>An order was placed</p>
            <p className='text-lg font-medium mt-4'>Customer leaves a review</p>
          </div>

          <div className='flex flex-col'>
            <Switch checked={user?.sendUpdates} disabled />
            <Switch checked={user?.sendOrderPlaced} className='mt-4' disabled />

            <Switch
              checked={user?.sendReviewCollected}
              className='mt-4'
              disabled
            />
          </div>
        </div>
      ) : (
        <div className='w-11/12 mx-auto flex justify-between items-center p-4'>
          <div className='flex flex-col'>
            <p className='text-lg font-medium'>Fruntt news & updates</p>
            <p className='text-lg font-medium mt-4'>An order was placed</p>

            <p className='text-lg font-medium mt-4'>Customer leaves a review</p>
          </div>

          <div className='flex flex-col'>
            <Switch checked={user?.sendUpdates} disabled />
            <Switch checked={user?.sendOrderPlaced} className='mt-4' disabled />

            <Switch
              checked={user?.sendReviewCollected}
              className='mt-4'
              disabled
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Notifications;
