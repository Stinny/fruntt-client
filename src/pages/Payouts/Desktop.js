import React from 'react';
import Cookies from 'js-cookie';
import { Badge } from 'flowbite-react';
import StripeAmount from '../../utils/StripeAmount';

const Desktop = ({ payouts, balance }) => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  console.log(balance);
  console.log(currentUser?.stripeId);
  return (
    <div className='flex flex-col gap-2'>
      <div className='w-full flex flex-col items-start border border-gray-200 rounded-md p-2 relative'>
        {!currentUser?.bankAdded &&
          !currentUser?.stripeOnboard &&
          !currentUser?.bankPending &&
          !currentUser?.stripePending && (
            <div className='absolute right-0 top-0 mr-1 mt-1'>
              <Badge color='failure' size='xs'>
                Payouts disabled
              </Badge>
            </div>
          )}
        {currentUser?.bankAdded && (
          <div className='absolute right-0 top-0 mr-1 mt-1'>
            <Badge color='success' size='xs'>
              Payouts enabled
            </Badge>
          </div>
        )}
        {currentUser?.stripeOnboard && (
          <div className='absolute right-0 top-0 mr-1 mt-1'>
            <Badge color='success' size='xs'>
              Payouts enabled
            </Badge>
          </div>
        )}
        {currentUser?.bankPending && (
          <div className='absolute right-0 top-0 mr-1 mt-1'>
            <Badge color='info' size='xs'>
              Bank pending
            </Badge>
          </div>
        )}
        {currentUser?.stripePending && (
          <div className='absolute right-0 top-0 mr-1 mt-1'>
            <Badge color='info' size='xs'>
              Stripe pending
            </Badge>
          </div>
        )}
        {!currentUser?.bankAdded &&
          !currentUser?.stripeOnboard &&
          !currentUser?.bankPending &&
          !currentUser?.stripePending && (
            <div className='flex flex-col break-words'>
              <p className='text-sm text-stone-800'>
                No payout option connected
              </p>
              <p className='text-stone-600 text-xs'>
                You need to connect a payout option in settings
              </p>
            </div>
          )}
        {currentUser?.bankPending && (
          <div className='flex flex-col break-words'>
            <p className='text-xs text-stone-600'>Payouts via bank account</p>
            <p className='text-stone-800 text-sm'>
              Continue connecting bank account in settings
            </p>
          </div>
        )}
        {currentUser?.stripePending && (
          <div className='flex flex-col break-words'>
            <p className='text-xs text-stone-600'>Payouts via Stripe account</p>
            <p className='text-stone-800 text-sm'>
              Continue connecting Stripe account in settings
            </p>
          </div>
        )}
        {currentUser?.bankAdded && (
          <div className='flex gap-4'>
            <div className='flex flex-col break-words'>
              <p className='text-xs text-stone-600'>Payouts via bank account</p>
              <p className='text-stone-800 text-sm'>{currentUser?.bankId}</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-xs text-stone-800'>Balance</p>
              <div className='flex items-center gap-4'>
                <div className='flex flex-col items-start'>
                  <p className='text-stone-800 text-md'>
                    <StripeAmount amount={balance?.available} />
                  </p>
                  <p className='text-xs text-stone-600'>Available</p>
                </div>
                <div className='flex flex-col items-start'>
                  <p className='text-stone-800 text-md'>
                    <StripeAmount amount={balance?.pending} />
                  </p>
                  <p className='text-xs text-stone-600'>Pending</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentUser?.stripeOnboard && (
          <div className='flex flex-col break-words'>
            <p className='text-xs text-stone-600'>Payouts via Stripe account</p>
            <p className='text-stone-800 text-sm'>{currentUser?.stripeId}</p>
          </div>
        )}
      </div>
      {payouts.length ? (
        <div
          className='flex flex-col border-gray-200 items-center justify-center rounded-md w-full border bg-white'
          style={{ height: '600px' }}
        >
          <div className='flex flex-col items-center gap-2'>
            <p className='text-stone-800 text-sm'>
              Payouts will be displayed here
            </p>
          </div>
        </div>
      ) : (
        <div
          className='flex flex-col border-gray-200 items-center justify-center rounded-md w-full border bg-white'
          style={{ height: '600px' }}
        >
          <div className='flex flex-col items-center gap-2'>
            <p className='text-stone-800 text-sm'>No payouts</p>
            <p className='text-stone-600 text-xs text-center w-60'>
              You only receive payouts when you are being paid out to a bank
              account and have a positive balance
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Desktop;
