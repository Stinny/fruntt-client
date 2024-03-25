import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Badge } from 'flowbite-react';
import StripeAmount from '../../utils/StripeAmount';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

const Desktop = ({ payouts, balance }) => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  //stuff for pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const endOffset = itemOffset + itemsPerPage;

  const currentPayouts = payouts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(payouts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % payouts.length;
    setItemOffset(newOffset);
  };
  //end of pagination stuff

  const ElapsedTimeOrDate = ({ payoutDate }) => {
    const now = new Date();
    const duration = moment.duration(moment(now).diff(moment(payoutDate)));
    const secondsElapsed = duration.asSeconds();
    const minutesElapsed = duration.asMinutes();
    const hoursElapsed = duration.asHours();
    const daysElapsed = duration.asDays();

    let displayText = '';

    if (secondsElapsed < 60) {
      displayText = `${Math.floor(secondsElapsed)} seconds ago`;
    } else if (minutesElapsed < 60) {
      displayText =
        Math.floor(minutesElapsed) === 1
          ? `${Math.floor(minutesElapsed)} minute ago`
          : `${Math.floor(minutesElapsed)} minutes ago`;
    } else if (hoursElapsed < 24) {
      displayText =
        Math.floor(hoursElapsed) === 1
          ? `${Math.floor(hoursElapsed)} hour ago`
          : `${Math.floor(hoursElapsed)} hours ago`;
    } else if (daysElapsed < 3) {
      displayText =
        Math.floor(daysElapsed) === 1
          ? `${Math.floor(daysElapsed)} day ago`
          : `${Math.floor(daysElapsed)} days ago`;
    } else {
      displayText = `${moment(payoutDate).format('MMM D, YYYY')}`;
    }

    return <span>{displayText}</span>;
  };

  const DisplayBadge = ({ status }) => {
    switch (status) {
      case 'paid':
        return (
          <Badge color='success' size='xs'>
            Paid
          </Badge>
        );
      case 'failed':
        return (
          <Badge color='failure' size='xs'>
            Failed
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge color='failure' size='xs'>
            cancelled
          </Badge>
        );
      case 'pending':
        return (
          <Badge color='warning' size='xs'>
            Pending
          </Badge>
        );
      case 'in_transit':
        return (
          <Badge color='warning' size='xs'>
            In Transit
          </Badge>
        );
      default:
        break;
    }
  };

  console.log(balance);
  console.log(currentUser?.stripeId);
  return (
    <div className='flex flex-col gap-2'>
      <div className='w-full flex flex-col items-start border border-gray-200 rounded-md p-4 relative'>
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
                You need to connect to a payout option in settings
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
      {payouts.length > 0 && (
        <div className='w-full flex justify-end items-center'>
          <div className='flex items-center'>
            <p className='text-stone-600 text-xs'>
              {payouts.length > 1
                ? `${payouts.length} payments`
                : `${payouts.length} payment`}
            </p>
          </div>
        </div>
      )}
      {payouts.length ? (
        <div className='flex flex-col w-full bg-white gap-2'>
          {currentPayouts.map((payout) => (
            <div className='flex justify-between items-center border border-gray-200 rounded-md p-4'>
              <div className='flex flex-col items-start'>
                <DisplayBadge status={payout?.status} />
                <p className='text-stone-800 text-sm'>{payout?.payoutId}</p>
                <p className='text-stone-600 text-xs'>
                  <ElapsedTimeOrDate payoutDate={payout?.paidOn} />
                </p>
              </div>
              <button
                disabled
                className='p-2 bg-gray-200 text-stone-800 text-xs rounded-md'
              >
                <StripeAmount amount={payout?.amount} />
              </button>
            </div>
          ))}
          {payouts.length > 5 && (
            <div className='w-full flex justify-end mt-2'>
              <div className=''>
                <ReactPaginate
                  breakLabel='...'
                  nextLabel='Next'
                  onPageChange={handlePageClick}
                  marginPagesDisplayed={0}
                  pageRangeDisplayed={0}
                  pageCount={pageCount}
                  previousLabel='Prev'
                  renderOnZeroPageCount={null}
                  className='flex items-center'
                  activeLinkClassName='activePage'
                  pageLinkClassName='notActivePage'
                  breakLinkClassName='breakLink'
                  disabledClassName='disabled'
                />
              </div>
            </div>
          )}
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
