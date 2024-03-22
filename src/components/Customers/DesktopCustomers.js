import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import ReactPaginate from 'react-paginate';
import { BsPeople } from 'react-icons/bs';

const DesktopCustomers = ({ customers }) => {
  //stuff for pagination//
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const endOffset = itemOffset + itemsPerPage;
  const currentCustomers = customers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(customers.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % customers.length;

    setItemOffset(newOffset);
  };
  //pagination stuff ends here//

  return customers.length > 0 ? (
    <div className='w-full mx-auto h-full flex flex-col gap-2'>
      <div className='w-full flex justify-between items-end'>
        <div className='flex flex-col items-start rounded-md border border-gray-200 p-2'>
          <p className='text-sm text-stone-800'>Customers</p>
          <p className='text-xs text-stone-600'>View all your customers</p>
        </div>

        <p className='text-stone-600 font-medium text-xs'>
          {customers.length > 1
            ? `${customers.length} customers`
            : `${customers.length} customer`}
        </p>
      </div>

      <div className='flex flex-col gap-2'>
        {currentCustomers.map((customer, index) => (
          <div className='flex items-center w-full border border-gray-200 rounded-md p-2'>
            <div className='w-3/12 flex justify-start'>
              <p className='text-sm text-stone-800'>{customer?.email}</p>
            </div>

            <div className='w-3/12 flex items-center'>
              <p className='text-sm text-stone-800'>{customer?.name}</p>
            </div>

            <div className='flex items-center w-3/12'>
              <ReactCountryFlag countryCode='us' className='mr-1' />
              <p className='text-sm text-stone-800'>United States</p>
            </div>
            <div className='w-3/12 flex justify-end'>
              <div className='rounded-md p-1 pl-2 pr-2 bg-gray-200 flex items-center justify-center text-xs'>
                {customer?.numberOfOrders === 1
                  ? `${customer?.numberOfOrders} order`
                  : `${customer?.numberOfOrders} orders`}
              </div>
            </div>
          </div>
        ))}
      </div>

      {customers.length > 12 ? (
        <div className='w-full flex justify-end mx-auto mt-2'>
          <div className=''>
            <ReactPaginate
              breakLabel='...'
              nextLabel='Next'
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel='Prev'
              renderOnZeroPageCount={null}
              className='flex items-center'
              activeLinkClassName='activePage'
              pageLinkClassName='notActivePage'
              breakLinkClassName='breakLink'
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  ) : (
    <div
      className='w-full mx-auto bg-white border-gray-200 border rounded-md flex flex-col items-center justify-center'
      style={{ height: '600px' }}
    >
      <p className='text-stone-800'>You have no customers</p>

      <p className='text-stone-600 mt-1 text-sm'>
        All customer details can be seen here
      </p>
    </div>
  );
};

export default DesktopCustomers;
