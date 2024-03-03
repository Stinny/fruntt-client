import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import ReactPaginate from 'react-paginate';
import { BsPeople } from 'react-icons/bs';

const DesktopCustomers = ({ customers }) => {
  //stuff for pagination//
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;

  const endOffset = itemOffset + itemsPerPage;
  const currentCustomers = customers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(customers.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % customers.length;

    setItemOffset(newOffset);
  };
  //pagination stuff ends here//

  return customers.length > 0 ? (
    <div className='w-full mx-auto h-full'>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center justify-center rounded-md bg-stone-800 p-2'>
          <BsPeople className='text-white' />
          <p className='text-md text-white ml-2'>Customers</p>
        </div>
        <div className='flex justify-between'>
          <input
            placeholder='Coming soon!'
            className='border-2 h-10 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
          />
          <button className='border-2 rounded w-20 ml-2  h-10 border-stone-800 text-slate-800'>
            Search
          </button>
        </div>

        <p className='text-stone-800 font-medium text-sm'>
          {customers.length > 1
            ? `${customers.length} customers`
            : `${customers.length} customer`}
        </p>
      </div>

      <div className='w-full mx-auto mt-2'>
        <table className='w-full rounded-md bg-white border drop-shadow-lg p-2'>
          <tbody>
            {currentCustomers.map((customer, index) => (
              <tr className='text-left text-md border-b'>
                <td className='p-3 flex items-center justify-center'>
                  {customer?.email}
                </td>
                <td>{customer?.name}</td>
                <td>
                  <div className='flex items-center'>
                    <ReactCountryFlag
                      countryCode={customer?.country?.value}
                      className='mr-1'
                    />
                    <p>{customer?.country?.label}</p>
                  </div>
                </td>
                <td className='flex justify-end p-1'>
                  <div className='rounded w-32 p-1 bg-gray-100 flex items-center justify-center text-md'>
                    {customer?.numberOfOrders === 1
                      ? `${customer?.numberOfOrders} order`
                      : `${customer?.numberOfOrders} orders`}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {customers.length > 15 ? (
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
