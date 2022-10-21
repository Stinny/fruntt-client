import React, { useState } from 'react';
import Modal from 'react-modal';
import { useFulfillOrderMutation } from '../../api/ordersApiSlice';

//mui
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Alert from '@mui/material/Alert';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const FulfillModal = ({
  fulfillModalIsOpen,
  closeFulfillModal,
  order,
  refetch,
}) => {
  const [fulfillType, setFulfillType] = useState('auto');
  const [trackingNum, setTrackingNum] = useState('');
  const [carrierCode, setCarrierCode] = useState('ups');
  const [error, setError] = useState('');

  const [fulfillOrder, result] = useFulfillOrderMutation();

  //sends req to server to mark the order as fulfilled
  const handleFulfillOrder = async (e) => {
    e.preventDefault();

    if (fulfillType === 'manu' && trackingNum === '') {
      setError('Enter tracking number');
      return;
    }

    const fulfillOrderReq = await fulfillOrder({
      orderId: order._id,
      trackingNum: trackingNum,
      fulfillType: fulfillType,
      carrierCode: carrierCode,
    }).unwrap();

    if (fulfillOrderReq === 'Order fulfilled') {
      refetch();
      closeFulfillModal();
    } else if (fulfillOrderReq === 'Error') {
      setError(
        'There was an error, check if shipping address is a valid address'
      );
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

  return (
    <div>
      <Modal
        isOpen={fulfillModalIsOpen}
        onRequestClose={closeFulfillModal}
        style={modalStyles}
      >
        <form>
          <p className='text-xl font-medium'>Fulfilling order: {order._id}</p>
          <p className='text-gray-400 mb-4'>
            Fulfilling the order will send the customer a shipping confirmation
            email with tracking details and an order summary
          </p>

          {error && <Alert severity='error'>{error}</Alert>}

          <RadioGroup
            defaultValue='auto'
            onChange={(e) => setFulfillType(e.target.value)}
          >
            <FormControlLabel
              control={<Radio />}
              value='auto'
              label='You did or will purchase a shipping label from us'
            />

            {order.labelUrl ? (
              ''
            ) : (
              <FormControlLabel
                value='manu'
                control={<Radio />}
                label='Manually enter tracking number'
              />
            )}
          </RadioGroup>

          {fulfillType === 'manu' && (
            <div style={{ display: fulfillType === 'auto' ? 'none' : '' }}>
              <input
                type='text'
                className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-full rounded-lg p-2'
                placeholder='Enter tracking number'
                onChange={(e) => setTrackingNum(e.target.value)}
                // value={name}
              />

              <ToggleButtonGroup
                value={carrierCode}
                exclusive
                onChange={(e) => setCarrierCode(e.target.value)}
                aria-label='Platform'
                className='mt-2'
              >
                <ToggleButton value='ups'>UPS</ToggleButton>
                <ToggleButton value='usps'>USPS</ToggleButton>
                <ToggleButton value='fedex'>FEDEX</ToggleButton>
                <ToggleButton value='stamps_com'>STAMPS</ToggleButton>
                <ToggleButton value='dhl_express'>DHL EXPRESS</ToggleButton>
              </ToggleButtonGroup>
            </div>
          )}

          <button
            type='submit'
            className='w-full h-14 border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white rounded mt-4'
            onClick={handleFulfillOrder}
          >
            Fulfill Order
          </button>
          <button
            type='button'
            onClick={closeFulfillModal}
            className='w-full h-10 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded mt-4'
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default FulfillModal;
