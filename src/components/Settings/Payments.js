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
import { ChevronDown, ChevronUp } from 'react-feather';

const Payments = ({ refetch }) => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const aToken = Cookies.get('aToken');
  const [onboardUrl, setOnboardUrl] = useState('');
  const [gettingUrl, setGettingUrl] = useState(false);
  const [gettingBankLink, setGettingBankLink] = useState(false);
  const [gettingUpdateUrl, setGettingUpdateUrl] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

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

  return (
    <div>
      <div className='w-full'>
        <div className='flex flex-col items-start p-4 border border-gray-200 rounded-md'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex flex-col'>
              <p className='text-sm text-stone-800'>Payments & payouts</p>
              <p className='text-xs text-stone-600'>
                A payout option must be connected to publish templates and
                enable purchases
              </p>
            </div>
            {currentUser?.bankPending && (
              <Badge color='failure'>Information required</Badge>
            )}
            {currentUser?.bankAdded && (
              <Badge color='success'>Payouts enabled</Badge>
            )}
            {currentUser?.stripeOnboard && (
              <Badge color='success'>Connected</Badge>
            )}
            {currentUser?.stripePending && (
              <Badge color='info'>Continue with Stripe</Badge>
            )}
          </div>
          <div className='flex items-center w-full mt-4'>
            {!currentUser?.stripeOnboard && !currentUser?.stripePending && (
              <div>
                {!currentUser?.bankAdded && (
                  <div className='flex flex-col items-start'>
                    <div className='flex items-center'>
                      <BiSolidBank className='mr-1 text-stone-800' />
                      <p className='text-stone-800 text-sm'>Bank</p>
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
                              className='text-xs bg-gray-200 text-stone-800 rounded-md pl-2 pr-2 p-1 mt-1'
                              onClick={getUpdateLink}
                            >
                              Continue
                            </button>
                            <button
                              type='button'
                              className='text-xs hover:bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 mt-1 ml-1'
                              onClick={handleRemoveBank}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button
                            type='button'
                            className='text-xs bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 mt-1'
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
                        className='text-xs bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 mt-1'
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
                            className='text-xs hover:bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 mt-1 ml-1'
                            disabled
                          >
                            Remove
                          </button>
                        </Tooltip>
                      ) : (
                        <button
                          type='button'
                          className='text-xs hover:bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 mt-1 ml-1'
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
            {currentUser?.bankPending || currentUser?.stripePending ? (
              ''
            ) : (
              <>
                {!currentUser?.stripeOnboard && !currentUser?.bankAdded && (
                  <div className='border-r border-gray-200 h-14 w-4 mr-4'></div>
                )}
              </>
            )}
            {!currentUser?.bankPending && !currentUser?.bankAdded && (
              <div className='relative'>
                {currentUser?.stripeOnboard ? (
                  <div className='flex flex-col break-words'>
                    <p className='text-sm text-stone-600'>Stripe Account</p>
                    <p className='text-stone-800 text-sm mt-1'>
                      {currentUser?.stripeId}
                    </p>

                    <button
                      type='button'
                      className='text-xs hover:bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 mt-1'
                      onClick={handleDisconnectStripe}
                      disabled={isLoading}
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <div className='flex flex-col items-start'>
                    <div className='flex items-center'>
                      <BsStripe className='mr-1 text-stone-800' />
                      <p className='text-stone-800 text-sm'>Stripe</p>
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
                              className='text-xs bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 mt-1'
                              onClick={getStripeUrl}
                            >
                              Continue
                            </button>
                            <button
                              type='button'
                              className='text-xs hover:bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 mt-1 ml-1'
                              onClick={handleDisconnectStripe}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button
                            type='button'
                            className='text-xs bg-gray-200 text-stone-800 rounded-md p-1 pr-2 pl-2 mt-1'
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
          <div className='flex flex-col items-start mt-4'>
            <button
              type='button'
              onClick={(e) => setShowPricing(!showPricing)}
              className='flex items-end justify-center text-xs text-stone-600'
            >
              {showPricing ? (
                <>
                  Hide pricing <ChevronUp size={16} className='ml-1' />
                </>
              ) : (
                <>
                  Show pricing <ChevronDown size={16} className='ml-1' />
                </>
              )}
            </button>

            {showPricing && (
              <div className='flex flex-col gap-2 mt-2'>
                <div className='flex items-center w-80 gap-2'>
                  <div className='bg-white rounded-md border border-gray-200 flex flex-col items-center justify-center p-2 w-3/6'>
                    <p className='font-bold text-stone-800'>$0</p>

                    <p className='mt-1 text-xs text-stone-600 text-center'>
                      fee on sales <span className='font-bold'>under $5</span>
                    </p>
                  </div>
                  <div className='bg-white rounded-md border border-gray-200 flex flex-col items-center justify-center p-2 w-3/6'>
                    <p className='font-bold text-stone-800'>$1</p>

                    <p className='mt-1 text-xs text-stone-600 text-center'>
                      fee on sales <span className='font-bold'>$5+</span>
                    </p>
                  </div>
                </div>
                <div className='w-full p-2 bg-white border border-gray-200 rounded-md flex items-center justify-center'>
                  <p className='text-xs text-stone-600 flex items-center'>
                    with an additional 2.9% + 30 ¢ / sale fee by{' '}
                    <span className='underline underline-offset-2 ml-1'>
                      <a href='https://stripe.com/pricing' target='_blank'>
                        {' '}
                        Stripe
                      </a>
                    </span>{' '}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
