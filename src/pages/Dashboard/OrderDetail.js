import React, { useEffect, useState } from 'react';
import { useGetSingleOrderQuery } from '../../api/ordersApiSlice';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useFulfillOrderMutation } from '../../api/ordersApiSlice';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import moment from 'moment';
import Modal from 'react-modal';

//mui
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [fulfillType, setFulfillType] = useState('auto');
  const [trackingNum, setTrackingNum] = useState('');

  const { data: order, isLoading, isSuccess, refetch } = useGetSingleOrderQuery(
    {
      orderId,
    }
  );
  const [fulfillOrder, result] = useFulfillOrderMutation();

  //sends req to server to mark the order as fulfilled
  const handleFulfillOrder = async (e) => {
    e.preventDefault();
    console.log('fulfilling order...');
    console.log({ trackNum: trackingNum, fulfillType: fulfillType });
    const fulfillOrderReq = await fulfillOrder({
      orderId: orderId,
      trackingNum: trackingNum,
      fulfillType: fulfillType,
    }).unwrap();
    refetch();
    closeModal();
  };

  //modal stuff
  const [modalIsOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    console.log(fulfillType);
  }, [fulfillType]);

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <div className='w-full'>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          <form>
            <p className='text-xl font-medium'>Fulfilling order: {order._id}</p>
            <p className='text-gray-400 mb-4'>
              Fulfilling the order will send the customer a shipping
              confirmation email with tracking details and an order summary
            </p>

            <RadioGroup
              defaultValue='auto'
              onChange={(e) => setFulfillType(e.target.value)}
            >
              <FormControlLabel
                control={<Radio />}
                value='auto'
                label='Have us generate shipping label and tracking number'
              />

              <FormControlLabel
                value='manu'
                control={<Radio />}
                label='Manually enter tracking number'
              />
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
              </div>
            )}

            <button
              type='button'
              onClick={closeModal}
              className='w-full h-8 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded mt-4'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='w-full h-10 border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white rounded mt-4'
              onClick={handleFulfillOrder}
            >
              Fulfill Order
            </button>
          </form>
        </Modal>

        <div className='flex justify-between w-full border-b-2 p-2'>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-bold'>
              Viewing Order: <span className='font-medium'>{order?._id}</span>
            </h2>
            <p>
              Order placed on {moment(order?.placedOn).format('MMM D, YYYY')}
            </p>
          </div>
          <div className='flex items-center'>
            {order.fulfilled ? (
              <div className='flex items-center justify-center ml-2 border-2 mr-2 w-40 h-10 rounded text-gray-400 border-gray-400 '>
                <p>Order Fulfilled</p>
                <AiOutlineCheckCircle className='text-green-600 text-xl' />
              </div>
            ) : (
              <button
                onClick={openModal}
                className='border-2 mr-2 w-32 h-10 rounded text-gray-400 border-gray-400 hover:border-gray-600 hover:text-gray-600'
              >
                Fulfill Order
              </button>
            )}

            {order.manualTrackingNumber && (
              <button
                disabled
                className='border-2 w-72 h-10 rounded text-gray-400 border-gray-400'
              >
                Tracking number added manually
              </button>
            )}

            {order.labelUrl && (
              <a href={order?.labelUrl} target='_blank'>
                <button className='border-2 w-60 h-10 rounded text-gray-400 border-gray-400 hover:border-gray-600 hover:text-gray-600'>
                  Download Shipping Label
                </button>
              </a>
            )}
          </div>
        </div>

        <div className='w-11/12 mx-auto mt-10'>
          <p className='text-xl font-medium border-b'>Customer info</p>
          <div className='w-full p-4 flex justify-between mx-auto'>
            <div className='flex flex-col justify-between'>
              <p className='text-gray-400'>Email:</p>
              <p className='text-gray-400 mt-2'>First Name:</p>
              <p className='text-gray-400 mt-2'>Last Name:</p>
            </div>
            <div className='flex flex-col justify-between text-right'>
              <p className='text-lg font-medium'>{order?.email}</p>
              <p className='text-lg font-medium mt-2'>{order?.firstName}</p>
              <p className='text-lg font-medium mt-2'>{order?.lastName}</p>
            </div>
          </div>
          <p className='text-xl font-medium border-b'>What they got</p>
          <div className='w-full h-72 p-4 flex justify-between mx-auto'>
            <div className='flex flex-col justify-between'>
              <p className='text-gray-400'>Item:</p>
              <p className='text-gray-400 mt-2'>Options:</p>
              <p className='text-gray-400 mt-2'>Quantity:</p>
              <p className='text-gray-400 mt-2'>SKU:</p>
              <p className='text-gray-400 mt-2'>Total:</p>
            </div>
            <div className='flex flex-col justify-between text-right'>
              <p className='text-lg font-medium mt-2'>{order?.item?.title}</p>
              <p className='text-lg font-medium mt-2'>Medium, Black</p>
              <p className='text-lg font-medium mt-2'>{order?.qty}</p>
              <p className='text-lg font-medium mt-2'>BLK-MED-G123-GUC</p>
              <p className='text-lg font-medium mt-2'>
                ${order?.total?.toFixed(2)}
              </p>
            </div>
          </div>
          <p className='text-xl font-medium border-b'>Shipping item to</p>
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
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Topbar />

      <div className='max-w-6xl mx-auto'>{content}</div>
      <Footer />
    </>
  );
};

export default OrderDetail;
