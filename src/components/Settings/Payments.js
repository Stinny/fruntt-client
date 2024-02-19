import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  useLazyGetOnboardUrlQuery,
  useDisconnectStripeMutation,
  useLazyGetBankUrlQuery,
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
  const [gettingBankLink, setGettingBankLink] = useState(false);

  const [getOnboardUrl, result] = useLazyGetOnboardUrlQuery();
  const [getBankUrl, res] = useLazyGetBankUrlQuery();

  const [disconnectStripe, { isLoading, isSuccess }] =
    useDisconnectStripeMutation();

  // useEffect(() => {
  //   const fetchOnboardUrl = async () => {
  //     setGettingUrl(true);
  //     const urlReq = await getOnboardUrl().unwrap();
  //     setGettingUrl(false);
  //   };

  //   if (!currentUser.stripeOnboard) fetchOnboardUrl();
  // }, []);

  const getStripeUrl = async () => {
    setGettingUrl(true);
    const urlReq = await getOnboardUrl().unwrap();
    window.location.href = urlReq.url;
  };

  const getBankLink = async () => {
    setGettingBankLink(true);
    const urlReq = await getBankUrl().unwrap();
    window.location.href = urlReq.url;
  };

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

  return (
    <div>
      <div className='w-full p-4'>
        <div className='flex items-center w-6/12'>
          <div className='p-4 w-3/6 border border-gray-200 rounded-md'>
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <BiSolidBank className='mr-1 text-xl text-stone-800' />
                <p className='font-bold text-stone-800'>Bank</p>
              </div>
              <p className='text-xs text-stone-600 mt-1'>
                Be paid out to a bank account
              </p>
              {gettingBankLink ? (
                <CircularProgress className='mt-1' />
              ) : (
                <button
                  type='button'
                  className='text-sm bg-gray-200 text-stone-800 rounded-md w-24 p-1 mt-1'
                  onClick={getBankLink}
                >
                  Connect
                </button>
              )}
            </div>
          </div>
          <div className='ml-2 w-3/6 border border-gray-200 rounded-md p-4'>
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <BsStripe className='text-xl mr-1 text-stone-800' />
                <p className='font-bold text-stone-800'>Stripe</p>
              </div>
              <p className='text-xs text-stone-600 mt-1'>
                Be paid out to a Stripe account
              </p>
              {gettingUrl ? (
                <CircularProgress className='mt-1' />
              ) : (
                <button
                  type='button'
                  className='text-sm bg-gray-200 text-stone-800 rounded-md w-24 p-1 mt-1'
                  onClick={getStripeUrl}
                >
                  Connect
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
