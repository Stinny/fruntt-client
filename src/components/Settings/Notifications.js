import React, { useState } from 'react';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';
import { useUpdateNotificationsMutation } from '../../api/authApiSlice';
import { toast } from 'react-toastify';

//flowbite
import { Checkbox as FlowCheck, Spinner } from 'flowbite-react';

//mui
import Switch from '@mui/material/Switch';
import { Checkbox, FormControlLabel } from '@mui/material';

const Notifications = ({ user, refetch, isFetching }) => {
  const [sendUpdates, setSendUpdates] = useState(user?.sendUpdates);
  const [sendOrderPlaced, setSendOrderPlaced] = useState(user?.sendOrderPlaced);
  const [sendReviewCollected, setSendReviewCollected] = useState(
    user?.sendReviewCollected
  );
  const [sendNewCustomer, setSendNewCustomer] = useState(user?.sendNewCustomer);

  const [edit, setEdit] = useState(false);

  const [updateNotifications, result] = useUpdateNotificationsMutation();

  const handleSaveNotifications = async (e) => {
    e.preventDefault();
    try {
      const updateNotificationsReq = await updateNotifications({
        sendUpdates,
        sendOrderPlaced,
        sendReviewCollected,
        sendNewCustomer,
      }).unwrap();
      if (updateNotificationsReq === 'User updated') {
        toast.success('Notifications updated!');
        refetch();
        setEdit(false);
      }
    } catch (err) {
      console.log('there was an error');
    }
  };

  return isFetching ? (
    <div className='w-full h-72 flex items-center justify-center'>
      <Spinner />
    </div>
  ) : (
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

              <FlowCheck
                checked={sendUpdates}
                onChange={(e) => setSendUpdates(e.target.checked)}
              />
            </div>

            <div className='w-full flex items-center justify-between'>
              <div className='flex flex-col items-start'>
                <p className='text-sm text-stone-800'>Sales</p>
                <p className='text-xs text-stone-800'>
                  Receive an email everytime you make a sale
                </p>
              </div>

              <FlowCheck
                checked={sendOrderPlaced}
                onChange={(e) => setSendOrderPlaced(e.target.checked)}
              />
            </div>

            <div className='w-full flex items-center justify-between'>
              <div className='flex flex-col items-start'>
                <p className='text-sm text-stone-800'>Customers</p>
                <p className='text-xs text-stone-600'>
                  Receive an email everytime a new customer is created
                </p>
              </div>

              <FlowCheck
                checked={sendNewCustomer}
                onChange={(e) => setSendNewCustomer(e.target.checked)}
              />
            </div>

            <div className='w-full flex items-center justify-between'>
              <div className='flex flex-col items-start'>
                <p className='text-sm text-stone-800'>Reviews</p>
                <p className='text-xs text-stone-600'>
                  Receive an email everytime a review is submitted
                </p>
              </div>

              <FlowCheck
                checked={sendReviewCollected}
                onChange={(e) => setSendReviewCollected(e.target.checked)}
              />
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

              <FlowCheck checked={user?.sendUpdates} disabled color={'gray'} />
            </div>

            <div className='w-full flex items-center justify-between'>
              <div className='flex flex-col items-start'>
                <p className='text-sm text-stone-800'>Sales</p>
                <p className='text-xs text-stone-800'>
                  Receive an email everytime you make a sale
                </p>
              </div>

              <FlowCheck
                checked={user?.sendOrderPlaced}
                disabled
                color={'gray'}
              />
            </div>

            <div className='w-full flex items-center justify-between'>
              <div className='flex flex-col items-start'>
                <p className='text-sm text-stone-800'>Customers</p>
                <p className='text-xs text-stone-600'>
                  Receive an email everytime a new customer is created
                </p>
              </div>

              <FlowCheck
                checked={user?.sendNewCustomer}
                disabled
                color={'gray'}
              />
            </div>

            <div className='w-full flex items-center justify-between'>
              <div className='flex flex-col items-start'>
                <p className='text-sm text-stone-800'>Reviews</p>
                <p className='text-xs text-stone-600'>
                  Receive an email everytime a review is submitted
                </p>
              </div>

              <FlowCheck
                checked={user?.sendReviewCollected}
                disabled
                color={'gray'}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications;
