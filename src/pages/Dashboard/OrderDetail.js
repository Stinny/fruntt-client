import React, { useEffect, useState } from 'react';
import {
  useGetSingleOrderQuery,
  useGetShippingRatesQuery,
} from '../../api/ordersApiSlice';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useFulfillOrderMutation } from '../../api/ordersApiSlice';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import moment from 'moment';
import Modal from 'react-modal';
import { BsArrowLeftShort } from 'react-icons/bs';
import ShippingAddress from '../../components/OrderDetail/ShippingAddress';
import LabelModal from '../../components/OrderDetail/LabelModal';
import FulfillModal from '../../components/OrderDetail/FulfillModal';
import { FiDownload } from 'react-icons/fi';

const OrderDetail = () => {
  const { orderId } = useParams();

  //gets the order
  const { data: order, isLoading, isSuccess, refetch } = useGetSingleOrderQuery(
    {
      orderId,
    }
  );

  //gets the shipping rates
  const {
    data: rates,
    isLoading: gettingRates,
    isSuccess: gotRates,
    refetch: refetchRates,
  } = useGetShippingRatesQuery({
    orderId,
  });

  const [labelModaIsOpen, setLabelModalIsOpen] = useState(false);
  const [fulfillModalIsOpen, setFulfillModalIsOpen] = useState(false);

  function openLabelModal() {
    setLabelModalIsOpen(true);
  }

  function closeLabelModal() {
    setLabelModalIsOpen(false);
  }

  function openFulfillModal() {
    setFulfillModalIsOpen(true);
  }

  function closeFulfillModal() {
    setFulfillModalIsOpen(false);
  }

  useEffect(() => {
    refetch();
  }, []);

  let content;
  if (isLoading || gettingRates) {
    content = <Spinner />;
  } else if (isSuccess && gotRates) {
    content = (
      <div className='w-full'>
        <LabelModal
          closeLabelModal={closeLabelModal}
          openLabelModal={openLabelModal}
          labelModalIsOpen={labelModaIsOpen}
          order={order}
          rates={rates}
          refetch={refetch}
        />

        <FulfillModal
          closeFulfillModal={closeFulfillModal}
          order={order}
          fulfillModalIsOpen={fulfillModalIsOpen}
          refetch={refetch}
        />

        <Link
          to='/dashboard/orders'
          className='flex items-center text-gray-400 text-lg hover:text-gray-600 w-4/12'
        >
          {' '}
          <BsArrowLeftShort />
          Back to orders
        </Link>
        <div className='flex justify-between items-center w-full border-b-2 p-2'>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-bold'>
              Viewing order: <span className='font-medium'>{order?._id}</span>
            </h2>
            <p>
              Order placed on {moment(order?.placedOn).format('MMM D, YYYY')}
            </p>
          </div>
          <div className='flex items-center'>
            {order.fulfilled ? (
              <div className='flex items-center justify-center ml-2 border-2 mr-2 w-40 h-10 rounded text-slate-800 border-slate-800 '>
                <p>Order Fulfilled</p>
                <AiOutlineCheckCircle className='text-green-600 text-xl ml-2' />
              </div>
            ) : (
              <button
                onClick={openFulfillModal}
                className='border-2 mr-2 w-32 h-10 rounded text-slate-800 border-slate-800 hover:bg-slate-800 hover:text-white'
                type='button'
              >
                Fulfill Order
              </button>
            )}

            {order.manualTrackingNumber && (
              <button
                disabled
                className='border-2 w-72 h-10 rounded text-slate-800 border-slate-800'
              >
                Tracking number added manually
              </button>
            )}

            {order.labelUrl ? (
              <a href={order?.labelUrl} target='_blank'>
                <button className='border-2 w-60 h-10 rounded border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white flex justify-around items-center'>
                  Download Shipping Label <FiDownload />
                </button>
              </a>
            ) : (
              ''
            )}

            {!order.labelUrl && !order.manualTrackingNumber ? (
              <button
                onClick={openLabelModal}
                className='border-2 w-60 h-10 rounded border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
              >
                Get Shipping Label
              </button>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className='w-11/12 mx-auto mt-10'>
          <div className='w-full flex justify-between border-b p-2'>
            <p className='text-xl font-medium'>Customer info</p>
            <Link
              to={`/dashboard/customers/${order.customerId}`}
              className='border-2 w-32 flex justify-center items-center rounded text-slate-800 border-slate-800 hover:text-white hover:bg-slate-800'
            >
              View customer
            </Link>
          </div>
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
          <div className='border-b p-2'>
            <p className='text-xl font-medium'>What they got</p>
          </div>
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

          <ShippingAddress
            order={order}
            refetch={refetch}
            refetchRates={refetchRates}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='max-w-6xl mx-auto mt-10'>{content}</div>
      <Footer />
    </>
  );
};

export default OrderDetail;
