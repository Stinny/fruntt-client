import React from 'react';
import { Link } from 'react-router-dom';
import LabelModal from '../../../components/OrderDetail/LabelModal';
import { BsArrowLeftShort } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import FulfillModal from '../../../components/OrderDetail/FulfillModal';
import moment from 'moment';
import { FiDownload } from 'react-icons/fi';
import ShippingAddress from '../../../components/OrderDetail/ShippingAddress';
import FromAddress from '../../../components/OrderDetail/FromAddress';
import { FaExternalLinkAlt } from 'react-icons/fa';

const OrderDetailMobile = ({
  order,
  closeFulfillModal,
  openFulfillModal,
  closeLabelModal,
  openLabelModal,
  rates,
  refetch,
  refetchRates,
  labelModaIsOpen,
  fulfillModalIsOpen,
}) => {
  return (
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
        Orders
      </Link>
      <div className='flex flex-col items-center w-full border-b-2 p-2'>
        <div className='flex flex-col'>
          <h2 className='text-xl font-bold'>
            Viewing order: <span className='font-medium'>{order?._id}</span>
          </h2>
          <p>Order placed on {moment(order?.placedOn).format('MMM D, YYYY')}</p>
        </div>
        <div className='w-full flex items-center'>
          {order.fulfilled ? (
            <div className='flex items-center justify-center border-2 mr-2 w-40 h-10 rounded text-slate-800 border-slate-800 '>
              <p>Order Fulfilled</p>
              <AiOutlineCheckCircle className='text-green-600 text-lg ml-2' />
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

          {order?.item?.ali && !order.fulfilled ? (
            <a
              href={order?.item?.aliUrl}
              target='_blank'
              className='w-56 border-2 rounded border-slate-800 text-slate-800 h-10 flex justify-center items-center hover:bg-slate-800 hover:text-white'
            >
              Place order on Aliexpress <FaExternalLinkAlt className='ml-2' />
            </a>
          ) : (
            ''
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
                Download Label <FiDownload />
              </button>
            </a>
          ) : (
            ''
          )}

          {!order.labelUrl &&
          !order.manualTrackingNumber &&
          !order?.item?.ali ? (
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

      <div className='w-11/12 mx-auto mt-10 border-2 rounded p-2'>
        <div className='w-full flex justify-between border-b p-2'>
          <p className='text-xl font-medium'>Customer info</p>
          <Link
            to={`/dashboard/customers/${order.customerId}`}
            className='border-2 w-32 flex justify-center items-center rounded text-slate-800 border-slate-800 hover:text-white hover:bg-slate-800'
          >
            View customer
          </Link>
        </div>
        <div className='w-full p-4 flex flex-col mx-auto'>
          <p className='text-gray-400'>Email:</p>
          <p className='text-lg font-medium'>{order?.email}</p>
          <p className='text-gray-400 mt-2'>First Name:</p>
          <p className='text-lg font-medium'>{order?.firstName}</p>
          <p className='text-gray-400 mt-2'>Last Name:</p>
          <p className='text-lg font-medium'>{order?.lastName}</p>
        </div>
        <div className='border-b p-2'>
          <p className='text-xl font-medium'>What they got</p>
        </div>
        <div className='w-full h-72 p-4 flex flex-col mx-auto'>
          <p className='text-gray-400'>Item:</p>
          <p className='text-lg font-medium'>{order?.item?.title}</p>
          {Object.entries(order.options).length > 0 ? (
            <p className='text-gray-400 mt-2'>Options:</p>
          ) : (
            ''
          )}
          <div className='mt-2'>
            {Object.entries(order.options).map(([key, value]) => (
              <p>
                {key}: {value}
              </p>
            ))}
          </div>
          <p className='text-gray-400 mt-2'>Quantity:</p>
          <p className='text-lg font-medium'>{order?.qty}</p>
          <p className='text-gray-400 mt-2'>Shipping price:</p>
          <p className='text-lg font-medium'>${order?.item?.shippingPrice}</p>
          <p className='text-gray-400 mt-2'>Total:</p>

          <p className='text-lg font-medium'>
            $
            {order?.total?.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <ShippingAddress
          order={order}
          refetch={refetch}
          refetchRates={refetchRates}
        />

        {order?.item?.ali ? (
          ''
        ) : (
          <FromAddress
            order={order}
            refetch={refetch}
            refetchRates={refetchRates}
          />
        )}
      </div>
    </div>
  );
};

export default OrderDetailMobile;
