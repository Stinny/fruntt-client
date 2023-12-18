import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { BsPeople } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';

const MobileCustomers = ({ customers }) => {
  //stuff for pagination//
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  const endOffset = itemOffset + itemsPerPage;
  const currentCustomers = customers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(customers.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % customers.length;

    setItemOffset(newOffset);
  };
  //pagination stuff ends here//

  return customers.length > 0 ? (
    <div className='w-full mx-auto h-full mt-16'>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center justify-center rounded bg-stone-800 p-2'>
          <BsPeople className='text-white' />
          <p className='text-sm text-white ml-2'>Customers</p>
        </div>

        <p className='text-stone-800 font-medium text-sm'>
          {customers.length > 1
            ? `${customers.length} customers`
            : `${customers.length} customer`}
        </p>
      </div>

      <div className='w-full mx-auto mt-2'>
        {currentCustomers.map((customer, index) => (
          <div className='flex flex-col rounded-md border bg-white drop-shadow-md relative mt-2 p-2'>
            <div className='absolute rounded bottom-0 right-0 mr-2 mb-2 p-1 bg-gray-100'>
              <p className='text-xs text-stone-800'>
                {customer?.numberOfOrders === 1
                  ? `${customer?.numberOfOrders} order`
                  : `${customer?.numberOfOrders} orders`}
              </p>
            </div>

            <p className='text-stone-800 text-sm font-bold'>
              {customer?.email}
            </p>

            <p className='text-sm mt-2'>{customer?.name}</p>

            <div className='flex items-center mt-2'>
              <ReactCountryFlag
                countryCode={customer?.country?.value}
                className='mr-1'
              />
              <p className='text-sm'>{customer?.country?.label}</p>
            </div>
          </div>
        ))}
      </div>
      {customers.length > 8 ? (
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
    <div className='w-full mx-auto h-full bg-white drop-shadow-lg border rounded-md flex flex-col items-center justify-center'>
      <h2 className='text-sm font-medium mb-4'>You have no customers</h2>

      <p className='text-stone-800 mt-4 text-sm'>
        Everytime a customer makes a purchase, their details will be seen here.
      </p>
    </div>
  );
};

export default MobileCustomers;
