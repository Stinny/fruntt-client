import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useGetShippingLabelMutation } from '../../api/ordersApiSlice';

//mui
import Alert from '@mui/material/Alert';

const LabelModal = ({
  labelModalIsOpen,
  closeLabelModal,
  openLabelModal,
  rates,
  refetch,
  order,
}) => {
  const [rateId, setRateId] = useState('');
  const [error, setError] = useState('');
  const [packTime, setPackTime] = useState('');
  const [amount, setAmount] = useState('');
  const [buyingLabel, setBuyingLabel] = useState(false);

  const [getShippingLabel, result] = useGetShippingLabelMutation();

  useEffect(() => {
    setError('');
    const getSelectedRate = rates.filter((rate) => rate.rateId === rateId);
    setAmount(getSelectedRate[0]?.amount);
  }, [rateId, packTime]);

  const handleGetShippingLabel = async (e) => {
    e.preventDefault();
    setBuyingLabel(true);

    if (!rateId || !packTime) {
      setError('Please select both a pack time and shipping rate');
      setBuyingLabel(false);
      return;
    }

    const getSelectedRate = rates.filter((rate) => rate.rateId === rateId);

    try {
      const getLabelReq = await getShippingLabel({
        rateId: rateId,
        orderId: order._id,
        amount: getSelectedRate[0].amount,
      }).unwrap();

      if (getLabelReq.error) {
        setError(getLabelReq.msg);
        setBuyingLabel(false);
      } else if (getLabelReq.msg === 'Label created') {
        refetch();
        setBuyingLabel(false);
        closeLabelModal();
      }
    } catch (err) {
      setError('There was an error, check payment method');
      setBuyingLabel(false);
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
    <div className='w-full'>
      <Modal
        isOpen={labelModalIsOpen}
        onRequestClose={closeLabelModal}
        style={modalStyles}
      >
        <form>
          <p className='text-xl font-medium'>
            Buy shipping label for order: {order._id}
          </p>
          <p className='text-gray-400 mb-4'>
            Select the rate that is best for you
          </p>

          {error ? (
            <Alert severity='error' className='w-full mt-2 mb-2'>
              {error}
            </Alert>
          ) : (
            ''
          )}

          {rates.length < 1 ? (
            <Alert severity='error' className='w-full mt-2 mb-2'>
              No rates available, please check shipping address and return
              address are valid
            </Alert>
          ) : (
            ''
          )}

          <Alert severity='info' className='w-full mt-2 mb-2'>
            Your customer paid ${order?.item?.shippingPrice} for shipping
          </Alert>

          <p className=' mt-2'>When will you fill order?</p>
          <select
            onChange={(e) => setPackTime(e.target.value)}
            className='w-8/12 h-14 rounded p-2'
          >
            <option disabled selected hidden>
              When will you fill the order?
            </option>
            <option value='today'>Today</option>
            <option value='twoDays'>In 2 days</option>
            <option value='threeDays'>In 3 days</option>
          </select>
          <p className='mt-2'>Select rate</p>
          <select
            onChange={(e) => setRateId(e.target.value)}
            className='w-8/12 h-14 rounded p-2'
          >
            <option disabled selected hidden>
              Pick a shipping rate
            </option>
            {rates.map((rate, index) => (
              <option value={rate.rateId} key={index}>
                {rate.service} {''}(${rate.amount})
              </option>
            ))}
          </select>

          <button
            type='submit'
            className='w-full text-lg h-14 border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white rounded mt-4'
            onClick={handleGetShippingLabel}
            disabled={buyingLabel || rates.length < 1}
          >
            {buyingLabel
              ? 'Buying label...'
              : `Buy Label ($${amount ? amount : ''})`}
          </button>
          <button
            type='button'
            onClick={closeLabelModal}
            className='w-full h-10 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded mt-4'
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default LabelModal;
