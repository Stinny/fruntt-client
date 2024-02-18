import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  useLazyGetOnboardUrlQuery,
  useDisconnectStripeMutation,
} from '../../api/authApiSlice';
import { FaPaypal, FaStripeS } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Cookies from 'js-cookie';
import { isMobile } from 'react-device-detect';
import { BiSolidBank } from 'react-icons/bi';
import { BsStripe } from 'react-icons/bs';

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

  const [getOnboardUrl, result] = useLazyGetOnboardUrlQuery();
  const [disconnectStripe, { isLoading, isSuccess }] =
    useDisconnectStripeMutation();

  useEffect(() => {
    const fetchOnboardUrl = async () => {
      setGettingUrl(true);
      const urlReq = await getOnboardUrl().unwrap();
      setGettingUrl(false);
    };

    if (!currentUser.stripeOnboard) fetchOnboardUrl();
  }, []);

  const handleDisconnectStripe = async () => {
    const respon = await disconnectStripe().unwrap();
    refetch();
  };

  const connectedToStripe = isMobile ? (
    <>
      {' '}
      <div className='w-full h-20 flex items-center justify-center border-purple-600 border-2 text-purple-600 rounded-md text-md mt-2 p-2'>
        <p>{currentUser?.stripeId}</p>
        <AiOutlineCheckCircle className='text-2xl ml-4' />
      </div>
      <button
        className='w-full h-10 border-2 text-md rounded-md mt-4 text-slate-800 border-slate-800 hover:bg-slate-800 hover:text-white'
        onClick={handleDisconnectStripe}
      >
        Disconnect
      </button>
    </>
  ) : (
    <>
      <div className='w-full h-20 flex items-center justify-center border-purple-600 border-2 text-purple-600 rounded text-md mt-4 p-2'>
        <p>{currentUser?.stripeId}</p>
        <AiOutlineCheckCircle className='text-2xl ml-4' />
      </div>
      <button
        className='w-full h-10 border-2 text-md rounded mt-4 text-stone-800 border-stone-800 hover:bg-stone-800 hover:text-white'
        onClick={handleDisconnectStripe}
      >
        Disconnect
      </button>
    </>
  );

  let content;
  if (!currentUser.stripeOnboard) {
    content = gettingUrl ? (
      <div className='w-full flex items-center justify-center'>
        <CircularProgress className='mt-4 mx-auto' />
      </div>
    ) : (
      <div className='flex items-center justify-between'>
        <Link
          to='/settings'
          className='h-16 w-6/12 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200'
        >
          <BiSolidBank className='mr-2 text-2xl' />
          <div className='flex flex-col'>
            <p className='font-bold'>Bank</p>
            <p className='text-xs'>Be paid out to a bank account</p>
            <p className='text-xs'>COMING SOON</p>
          </div>
        </Link>
        <a
          href={result?.data?.url}
          className='w-6/12 ml-2 h-16 flex items-center justify-center bg-gray-100 rounded-md p-2 hover:bg-gray-200'
        >
          <BsStripe className='text-2xl mr-2' />
          <div className='flex flex-col'>
            <p className='font-bold'>Stripe</p>
            <p className='text-xs'>Be paid out to a Stripe account</p>
          </div>
        </a>
      </div>
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
