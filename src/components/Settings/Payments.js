import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  useLazyGetOnboardUrlQuery,
  useDisconnectStripeMutation,
  useLazyGetBankUrlQuery,
  useLazyGetUpdateUrlQuery,
  useRemoveBankMutation,
} from '../../api/authApiSlice';
import { FaPaypal, FaStripeS } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Cookies from 'js-cookie';
import { isMobile } from 'react-device-detect';
import { BiSolidBank } from 'react-icons/bi';
import { BsStripe } from 'react-icons/bs';
import { toast } from 'react-toastify';

//flowbite
import { Badge, Spinner, Tooltip } from 'flowbite-react';

const Payments = ({ refetch }) => {
  const dispatch = useDispatch();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;
  const aToken = Cookies.get('aToken');
  const [onboardUrl, setOnboardUrl] = useState('');
  const [gettingUrl, setGettingUrl] = useState(false);
  const [gettingBankLink, setGettingBankLink] = useState(false);
  const [gettingUpdateUrl, setGettingUpdateUrl] = useState(false);

  const [getOnboardUrl, result] = useLazyGetOnboardUrlQuery();
  const [getBankUrl, res] = useLazyGetBankUrlQuery();
  const [getUpdateUrl, resp] = useLazyGetUpdateUrlQuery();

  const [disconnectStripe, { isLoading, isSuccess }] =
    useDisconnectStripeMutation();
  const [removeBank, { isLoading: removing, isSuccess: removed }] =
    useRemoveBankMutation();

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

  const getUpdateLink = async () => {
    setGettingUpdateUrl(true);
    const urlReq = await getUpdateUrl().unwrap();
    window.location.href = urlReq.url;
  };

  const handleDisconnectStripe = async () => {
    try {
      const respon = await disconnectStripe().unwrap();

      if (respon === 'Stripe disconnected') {
        refetch();
        toast.success('Stripe account disconnected!', {
          style: { color: 'rgb(28 25 23)' },
        });
      }
    } catch (err) {
      return;
    }
  };

  const handleRemoveBank = async () => {
    try {
      const respon = await removeBank().unwrap();
      if (respon === 'Bank deleted') {
        refetch();
        toast.success('Bank account removed!', {
          style: { color: 'rgb(28 25 23)' },
        });
      }
    } catch (err) {
      return;
    }
  };

  console.log(currentUser.balance);

  return (
    <div>
      <div className='w-full p-4'>
        <div className='flex items-center w-full'>
          {!currentUser?.stripeOnboard && !currentUser?.stripePending && (
            <div className='p-4 w-3/6 border border-gray-200 rounded-md relative'>
              {currentUser?.bankPending && (
                <div className='absolute top-0 right-0 rounded mt-1 mr-1'>
                  <Badge color='failure'>Information required</Badge>
                </div>
              )}

              {currentUser?.bankAdded && (
                <div className='rounded p-1 absolute top-0 right-0 mr-1 mt-1'>
                  <Badge color='success'>Payouts enabled</Badge>
                </div>
              )}

              {!currentUser?.bankAdded && (
                <div className='flex flex-col'>
                  <div className='flex items-center'>
                    <BiSolidBank className='mr-1 text-xl text-stone-800' />
                    <p className='font-bold text-stone-800'>Bank</p>
                  </div>
                  <p className='text-xs text-stone-600 mt-1'>
                    Be paid out to a bank account
                  </p>
                  {gettingBankLink || gettingUpdateUrl || removing ? (
                    <Spinner className='mt-2' />
                  ) : (
                    <>
                      {currentUser?.bankPending ? (
                        <div className='flex items-center'>
                          <button
                            type='button'
                            className='text-sm bg-gray-200 text-stone-800 rounded-md w-24 p-1 mt-1'
                            onClick={getUpdateLink}
                          >
                            Continue
                          </button>
                          <button
                            type='button'
                            className='text-sm hover:bg-gray-200 text-stone-800 rounded-md w-20 p-1 mt-1 ml-1'
                            onClick={handleRemoveBank}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <button
                          type='button'
                          className='text-sm bg-gray-200 text-stone-800 rounded-md w-24 p-1 mt-1'
                          onClick={getBankLink}
                          disabled={currentUser?.bankPending}
                        >
                          Connect
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}

              {currentUser?.bankAdded && (
                <div className='flex flex-col break-words'>
                  <p className='text-sm text-stone-600'>Bank</p>
                  <p className='text-stone-800 text-sm mt-1'>
                    {currentUser?.bankId}
                  </p>
                  <div className='flex items-center'>
                    <button
                      type='button'
                      className='text-sm bg-gray-200 text-stone-800 rounded-md w-14 p-1 mt-1'
                      onClick={getUpdateLink}
                    >
                      Edit
                    </button>
                    {currentUser?.balance ? (
                      <Tooltip
                        content='Must have a balance of $0 to remove bank'
                        style='light'
                      >
                        <button
                          type='button'
                          className='text-sm hover:bg-gray-200 text-stone-800 rounded-md w-20 p-1 mt-1 ml-1'
                          disabled
                        >
                          Remove
                        </button>
                      </Tooltip>
                    ) : (
                      <button
                        type='button'
                        className='text-sm hover:bg-gray-200 text-stone-800 rounded-md w-20 p-1 mt-1 ml-1'
                        onClick={handleRemoveBank}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {!currentUser?.bankPending && !currentUser?.bankAdded && (
            <div className='ml-2 w-3/6 border border-gray-200 rounded-md p-4 relative'>
              {currentUser?.stripeOnboard && (
                <div className='bg-green-300 rounded p-1 absolute top-0 right-0 mr-1 mt-1'>
                  <Badge color='success'>Connected</Badge>
                </div>
              )}

              {currentUser?.stripeOnboard ? (
                <div className='flex flex-col break-words'>
                  <p className='text-sm text-stone-600'>Stripe Account</p>
                  <p className='text-stone-800 text-sm mt-1'>
                    {currentUser?.stripeId}
                  </p>

                  <button
                    type='button'
                    className='text-sm hover:bg-gray-200 text-stone-800 rounded-md w-24 p-1 mt-1'
                    onClick={handleDisconnectStripe}
                    disabled={isLoading}
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <div className='flex flex-col'>
                  <div className='flex items-center'>
                    <BsStripe className='text-xl mr-1 text-stone-800' />
                    <p className='font-bold text-stone-800'>Stripe</p>
                  </div>
                  <p className='text-xs text-stone-600 mt-1'>
                    Be paid out to a Stripe account
                  </p>

                  {gettingUrl || isLoading ? (
                    <Spinner className='mt-2' />
                  ) : (
                    <>
                      {currentUser?.stripePending ? (
                        <div className='flex items-center'>
                          <button
                            type='button'
                            className='text-sm bg-gray-200 text-stone-800 rounded-md w-20 p-1 mt-1'
                            onClick={getStripeUrl}
                          >
                            Continue
                          </button>
                          <button
                            type='button'
                            className='text-sm hover:bg-gray-200 text-stone-800 rounded-md w-20 p-1 mt-1 ml-1'
                            onClick={handleDisconnectStripe}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <button
                          type='button'
                          className='text-sm bg-gray-200 text-stone-800 rounded-md w-24 p-1 mt-1'
                          onClick={getStripeUrl}
                        >
                          Connect
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
