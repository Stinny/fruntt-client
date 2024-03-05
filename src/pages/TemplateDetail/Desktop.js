import React, { useState } from 'react';
import { Carousel, Badge } from 'flowbite-react';
import { Avatar, Rating } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { ChevronDown, ChevronUp } from 'react-feather';
import Checkout from '../../components/Checkout/Checkout';
import { useCreateOrderMutation } from '../../api/ordersApiSlice';
import Cookies from 'js-cookie';

const Desktop = ({ product }) => {
  const orderId = Cookies.get('orderId') ? Cookies.get('orderId') : null;
  const [openMore, setOpenMore] = useState(false);
  const [priceChoice, setPriceChoice] = useState(0);
  const [error, setError] = useState('');
  const [readyForPayment, setReadyForPayment] = useState(false);

  const [createOrder, result] = useCreateOrderMutation();
  const [createdOrder, setCreatedOrder] = useState({});

  //to see if product info is empty or not
  var regex = /(<([^>]+)>)/gi;
  const hasInfo = !!product?.info.replace(regex, '').length;

  const handleMoveToCheckout = async (e) => {
    e.preventDefault();

    if (product?.payChoice && priceChoice < product?.price) {
      setError(`Set price has to be at least $${product?.price}`);
      return;
    }

    if (orderId) {
      setReadyForPayment(true);
    } else {
      try {
        const createOrderReq = await createOrder({
          total: product?.payChoice ? priceChoice : product?.price,
          item: product,
          storeId: product?.storeId,
        }).unwrap();
        Cookies.set('orderId', createOrderReq?._id);
        setCreatedOrder(createOrderReq);
        setReadyForPayment(true);
      } catch (err) {
        setError('There was a server error');
      }
    }
  };

  const handleResetCheckout = () => {
    setReadyForPayment(false);
    setPriceChoice(0);
    Cookies.remove('orderId');
  };

  return (
    <div className='border border-gray-200 rounded-md w-full flex flex-col'>
      <div className='w-full rounded-md flex items-center justify-center h-96 p-4'>
        {product?.coverImages.length ? (
          <Carousel className='w-full' arrowSize={8}>
            {product?.coverImages.map((img) => (
              <img
                src={img?.url}
                className='rounded-md object-fill h-full w-full'
              />
            ))}
          </Carousel>
        ) : (
          <img
            src={product?.coverImage?.url}
            className='rounded object-fill h-full w-full'
          />
        )}
      </div>

      <div className='w-full flex'>
        <div className='bg-white w-7/12 h-full flex-flex-col p-4'>
          {readyForPayment ? (
            <Checkout
              order={createdOrder}
              setReadyForPayment={setReadyForPayment}
              handleResetCheckout={handleResetCheckout}
            />
          ) : (
            <>
              <p className='text-stone-800 text-lg font-bold'>
                {product?.title}
              </p>
              <p className='text-stone-600 text-md mt-2'>
                {product?.description}
              </p>
              <div className='flex items-center mt-2'>
                <div className='flex justify-center bg-gray-200 items-center pr-2 pl-2 p-1 rounded-md mr-2'>
                  <p className='text-sm text-stone-800'>
                    {product?.free
                      ? 'FREE'
                      : product?.payChoice
                      ? `$ ${product?.price?.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })} +`
                      : `$${product?.price?.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}`}
                  </p>
                </div>
                <Rating value={4.5} readOnly precision={0.5} size='small' />
              </div>
              {product?.payChoice ? (
                <div className='flex flex-col w-full mt-2'>
                  <p className='text-xs text-stone-600'>Set your price</p>
                  <div className='w-full flex mt-1'>
                    <div className='flex items-center w-3/12'>
                      <input
                        type='number'
                        className='border text-sm border-gray-200 bg-gray-50 focus:bg-gray-200 focus:border-gray-200 mr-2 rounded-md h-10 p-2 w-full'
                        placeholder={`$${product?.suggestedPrice} +`}
                        min={product?.price}
                        onChange={(e) => setPriceChoice(e.target.value)}
                      />
                    </div>
                    <button
                      type='button'
                      onClick={handleMoveToCheckout}
                      className='w-9/12 h-10 text-sm bg-gray-200 rounded-md'
                    >
                      {product?.callToAction === 'buy'
                        ? 'Buy Now'
                        : product?.callToAction === 'want'
                        ? 'I want this!'
                        : 'Get Now'}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type='button'
                  onClick={handleMoveToCheckout}
                  className='w-full bg-gray-200 text-stone-800 text-sm rounded-md h-10 mt-2'
                >
                  {product?.callToAction === 'buy'
                    ? 'Buy Now'
                    : product?.callToAction === 'want'
                    ? 'I want this!'
                    : 'Get Now'}
                </button>
              )}
            </>
          )}
        </div>
        <div className='bg-white w-5/12 h-full ml-1 flex flex-col items-start p-4'>
          <p className='text-xs text-stone-600 mb-2'>Platform</p>
          <Badge color='gray'>Notion</Badge>
          <p className='text-xs text-stone-600 mt-2'>Categories</p>
          <div className='flex flex-wrap gap-1 mt-2'>
            <Badge color='gray'>Business</Badge>
            <Badge color='gray'>Lifestyle</Badge>
            <Badge color='gray'>Money</Badge>
          </div>
          <p className='text-xs text-stone-600 mt-2'>Creator</p>
          <div className='flex items-center mt-2'>
            <Avatar src={product?.userPicture} sx={{ width: 22, height: 22 }} />
            <p className='ml-1 text-stone-800 text-sm'>{product?.userName}</p>
          </div>
        </div>
      </div>

      {hasInfo ? (
        <>
          <div className='w-full flex flex-col items-center p-4'>
            <button
              onClick={(e) => setOpenMore(!openMore)}
              className='flex items-end justify-center text-xs text-stone-600'
            >
              {openMore ? (
                <>
                  Read less <ChevronUp size={16} className='ml-1' />
                </>
              ) : (
                <>
                  Read more <ChevronDown size={16} className='ml-1' />
                </>
              )}
            </button>
          </div>
          {openMore && (
            <ReactQuill
              value={product?.info}
              readOnly={true}
              theme={'bubble'}
            />
          )}
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Desktop;
