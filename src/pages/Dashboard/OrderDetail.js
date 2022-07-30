import React from 'react';
import { useGetSingleOrderQuery } from '../../api/ordersApiSlice';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const OrderDetail = () => {
  const { orderId } = useParams();

  const { data: order, isLoading, isSuccess } = useGetSingleOrderQuery({
    orderId,
  });

  if (isSuccess) console.log(window.location.pathname);

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <div className='w-full'>
        <div className='flex justify-between w-full border-b-2 p-2'>
          <h2 className='text-2xl font-medium'>Viewing Order: {order?._id}</h2>
          <div className='flex items-center'>
            <button className='border-2 w-44 h-10 rounded text-gray-400 border-gray-400 hover:border-gray-600 hover:text-gray-600'>
              Create Shipping Label
            </button>
            <button className='border-2 ml-2 w-32 h-10 rounded text-gray-400 border-gray-400 hover:border-gray-600 hover:text-gray-600'>
              Fullfill
            </button>
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
              <p className='text-gray-400 mt-2'>Total:</p>
            </div>
            <div className='flex flex-col justify-between text-right'>
              <img
                src={order?.item?.images[0]?.url}
                className='w-28 right-align'
              />
              <p className='text-lg font-medium mt-2'>Medium, Black</p>
              <p className='text-lg font-medium mt-2'>{order?.qty}</p>
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
