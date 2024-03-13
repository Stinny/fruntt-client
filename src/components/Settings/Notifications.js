import React, { useState } from 'react';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';

//mui
import Switch from '@mui/material/Switch';
import { useUpdateNotificationsMutation } from '../../api/authApiSlice';
import { toast } from 'react-toastify';
import { Checkbox, FormControlLabel } from '@mui/material';

const Notifications = ({ user, refetch }) => {
  const [sendUpdates, setSendUpdates] = useState(user?.sendUpdates);
  const [sendOrderPlaced, setSendOrderPlaced] = useState(user?.sendOrderPlaced);
  const [sendReviewCollected, setSendReviewCollected] = useState(
    user?.sendReviewCollected
  );
  const [sendItemOutOfStock, setSendItemOutOfStock] = useState(
    user?.sendItemOutOfStock
  );

  const [edit, setEdit] = useState(false);

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
        toast.success('Notifications updated!');
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
    <div className='w-full border border-gray-200 rounded-md p-4 flex flex-col'>
      {edit ? (
        <>
          <div className='flex items-center justify-between w-full'>
            <p className='text-sm text-stone-800'>Edit notifications</p>

            <div className='flex items-center gap-2'>
              <button
                type='button'
                className='hover:bg-red-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
                onClick={(e) => setEdit(!edit)}
              >
                Cancel
              </button>
              <button
                type='button'
                className='bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
                onClick={handleSaveNotifications}
              >
                Save
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-4 mt-2'>
            <div className='w-full flex items-center justify-between'>
              <div className='flex flex-col items-start'>
                <p className='text-sm text-stone-800'>News & updates</p>
                <p className='text-xs text-stone-600'>
                  Receive emails about Fruntt news and updates
                </p>
              </div>

              <Checkbox checked={user?.sendUpdates} size='small' />
            </div>

            <div className='w-full flex items-center justify-between'>
              <div className='flex flex-col items-start'>
                <p className='text-sm text-stone-800'>Sales</p>
                <p className='text-xs text-stone-800'>
                  Receive an email everytime you make a sale
                </p>
              </div>

              <Checkbox checked={user?.sendOrderPlaced} size='small' />
            </div>

            <div className='w-full flex items-center justify-between'>
              <div className='flex flex-col items-start'>
                <p className='text-sm text-stone-800'>Customers</p>
                <p className='text-xs text-stone-600'>
                  Receive an email everytime a new customer is created
                </p>
              </div>

              <Checkbox checked={user?.sendUpdates} size='small' />
            </div>

            <div className='w-full flex items-center justify-between'>
              <div className='flex flex-col items-start'>
                <p className='text-sm text-stone-800'>Reviews</p>
                <p className='text-xs text-stone-600'>
                  Receive an email everytime a review is submitted
                </p>
              </div>

              <Checkbox checked={user?.sendReviewCollected} size='small' />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='flex items-center justify-between w-full'>
            <div className='flex flex-col'>
              <p className='text-sm text-stone-800'>Notifications</p>
            </div>

            <button
              type='button'
              className='bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
              onClick={(e) => setEdit(!edit)}
            >
              Edit
            </button>
          </div>
          <div className='flex flex-col gap-4 mt-2'>
            <div className='w-full flex items-center justify-between'>
              <div className='flex flex-col items-start'>
                <p className='text-sm text-stone-800'>News & updates</p>
                <p className='text-xs text-stone-600'>
                  Receive emails about Fruntt news and updates
                </p>
              </div>

              <Checkbox checked={user?.sendUpdates} disabled size='small' />
            </div>

            <div className='w-full flex items-center justify-between'>
              <div className='flex flex-col items-start'>
                <p className='text-sm text-stone-800'>Sales</p>
                <p className='text-xs text-stone-800'>
                  Receive an email everytime you make a sale
                </p>
              </div>

              <Checkbox checked={user?.sendOrderPlaced} disabled size='small' />
            </div>

            <div className='w-full flex items-center justify-between'>
              <div className='flex flex-col items-start'>
                <p className='text-sm text-stone-800'>Customers</p>
                <p className='text-xs text-stone-600'>
                  Receive an email everytime a new customer is created
                </p>
              </div>

              <Checkbox checked={user?.sendUpdates} disabled size='small' />
            </div>

            <div className='w-full flex items-center justify-between'>
              <div className='flex flex-col items-start'>
                <p className='text-sm text-stone-800'>Reviews</p>
                <p className='text-xs text-stone-600'>
                  Receive an email everytime a review is submitted
                </p>
              </div>

              <Checkbox
                checked={user?.sendReviewCollected}
                disabled
                size='small'
              />
            </div>
          </div>
        </>
      )}
    </div>

    // <div className='w-11/12 mx-auto flex justify-between items-center p-4'>
    //   <div className='flex flex-col'>
    //     <p className='text-lg font-medium'>News</p>
    //     <p className='text-lg font-medium mt-4'>An order was placed</p>

    //     <p className='text-lg font-medium mt-4'>Customer leaves a review</p>
    //   </div>

    //   <div className='flex flex-col'>
    //     <Switch checked={user?.sendUpdates} disabled />
    //     <Switch checked={user?.sendOrderPlaced} className='mt-4' disabled />

    //     <Switch
    //       checked={user?.sendReviewCollected}
    //       className='mt-4'
    //       disabled
    //     />
    //   </div>
    // </div>
  );
};

export default Notifications;
