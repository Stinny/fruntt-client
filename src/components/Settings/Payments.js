import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLazyGetOnboardUrlQuery,
  useDisconnectStripeMutation,
} from '../../api/authApiSlice';
import { FaPaypal, FaStripeS } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Cookies from 'js-cookie';
import Spinner from '../Spinner';

const Payments = ({ refetch }) => {
  const dispatch = useDispatch();

  const currentUser = JSON.parse(Cookies.get('currentUser'));
  const aToken = Cookies.get('aToken');
  const [onboardUrl, setOnboardUrl] = useState('');
  // const [isLoading, setIsLoading] = useState('false');
  const [getOnboardUrl, result] = useLazyGetOnboardUrlQuery();
  const [
    disconnectStripe,
    { isLoading, isSuccess },
  ] = useDisconnectStripeMutation();

  useEffect(() => {
    const fetchOnboardUrl = async () => {
      if (!currentUser.stripeOnboard) {
        const urlReq = await getOnboardUrl().unwrap();

        setOnboardUrl(urlReq.url);
      }
    };

    fetchOnboardUrl();
  }, []);

  const handleDisconnectStripe = async () => {
    const respon = await disconnectStripe().unwrap();
    refetch();
  };

  const notConnectedToStripe = (
    <a
      href={onboardUrl}
      className='w-full h-20 flex items-center justify-center bg-purple-500 border-2 border-purple-600 hover:bg-purple-600 text-white rounded-lg text-md mt-4 p-2'
    >
      Connect to Stripe
      <FaStripeS className='text-2xl ml-4' />
    </a>
  );

  const connectedToStripe = (
    <>
      <a className='w-full h-20 flex items-center justify-center border-purple-600 border-2 text-purple-600 rounded-md text-md mt-4 p-2'>
        You are connected to Stripe
        <AiOutlineCheckCircle className='text-2xl ml-4' />
      </a>
      <button
        className='w-full h-10 border-2 text-md rounded-md mt-4 text-gray-400 border-gray-400 hover:border-gray-600 hover:text-gray-600'
        onClick={handleDisconnectStripe}
      >
        Disconnect
      </button>
    </>
  );

  let content;
  if (!currentUser.stripeOnboard) {
    content = result.isLoading ? <Spinner /> : notConnectedToStripe;
  } else if (currentUser.stripeOnboard) {
    content = connectedToStripe;
  }
  return (
    <div>
      <div className='w-full'>{content}</div>
    </div>
  );
};

export default Payments;
