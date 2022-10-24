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

//mui
import CircularProgress from '@mui/material/CircularProgress';

const Payments = ({ refetch }) => {
  const dispatch = useDispatch();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;
  const aToken = Cookies.get('aToken');
  const [onboardUrl, setOnboardUrl] = useState('');
  const [gettingUrl, setGettingUrl] = useState(false);
  // const [isLoading, setIsLoading] = useState('false');
  const [getOnboardUrl, result] = useLazyGetOnboardUrlQuery();
  const [
    disconnectStripe,
    { isLoading, isSuccess },
  ] = useDisconnectStripeMutation();

  useEffect(() => {
    const fetchOnboardUrl = async () => {
      setGettingUrl(true);
      const urlReq = await getOnboardUrl().unwrap();
      setGettingUrl(false);
    };

    if (!currentUser.stripeOnboard) fetchOnboardUrl();

    fetchOnboardUrl();
  }, []);

  const handleDisconnectStripe = async () => {
    const respon = await disconnectStripe().unwrap();
    refetch();
  };

  const connectedToStripe = (
    <>
      <a className='w-full h-20 flex items-center justify-center border-purple-600 border-2 text-purple-600 rounded-md text-md mt-4 p-2'>
        You are connected to Stripe
        <AiOutlineCheckCircle className='text-2xl ml-4' />
      </a>
      <button
        className='w-full h-10 border-2 text-md rounded-md mt-4 text-slate-800 border-slate-800 hover:bg-slate-800 hover:text-white'
        onClick={handleDisconnectStripe}
      >
        Disconnect
      </button>
    </>
  );

  let content;
  if (!currentUser.stripeOnboard) {
    content = gettingUrl ? (
      <CircularProgress className='mt-4 mx-auto' />
    ) : (
      <a
        href={result?.data?.url}
        className='w-full h-20 flex items-center justify-center bg-purple-500 border-2 border-purple-600 hover:bg-purple-600 text-white rounded-lg text-md mt-4 p-2'
      >
        Connect to Stripe
        <FaStripeS className='text-2xl ml-4' />
      </a>
    );
  } else if (currentUser.stripeOnboard) {
    content = connectedToStripe;
  }

  return (
    <div>
      <div className='w-full p-4'>{content}</div>
    </div>
  );
};

export default Payments;
