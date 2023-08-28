import { Avatar } from '@mui/material';
import React from 'react';
import { isMobile } from 'react-device-detect';

const RecentStores = ({ stores, isLoading, isSuccess, refetch }) => {
  let content;

  if (isLoading) {
    content = '';
  } else if (isSuccess) {
    content = isMobile ? (
      <div className='w-full p-4 bg-stone-800 flex flex-col justify-center items-center mb-32 mt-24'>
        <div className='h-10 w-full'></div>
        <p className='text-white font-medium text-lg mb-4'>
          Recent storefronts
        </p>

        <div className='mx-auto flex items-center'>
          {stores.map((store, index) => (
            <div
              key={index}
              className='mx-auto bg-white rounded drop-shadow-lg flex flex-col p-2'
            >
              <div className='flex items-center'>
                <Avatar src={store?.image} />
                <div className='flex flex-col border-l pl-2 ml-2'>
                  <p className='font-medium text-lg'>{store?.name}</p>
                  <p className='text-sm'>{store?.bio}</p>
                  <p className='font-medium text-sm'>
                    {store?.numOfProducts} products |{' '}
                    {store?.numOfSales == 1
                      ? `${store?.numOfSales} sale`
                      : `${store?.numOfSales} sales`}
                  </p>
                </div>
              </div>
              <a
                href={store?.url}
                target='_blank'
                className='border-stone-800 border-2 w-full h-10 text-md text-stone-800 rounded flex justify-center items-center mt-2 hover:bg-stone-800 hover:text-white'
              >
                View Storefront
              </a>
            </div>
          ))}
        </div>
        <div className='h-10 w-full'></div>
      </div>
    ) : (
      <div className='w-full p-4 bg-stone-800 flex flex-col justify-center items-center mb-32 mt-24'>
        <div className='h-10 w-full'></div>
        <p className='text-white font-medium text-lg mb-4'>
          Recent storefronts
        </p>

        <div className='mx-auto flex items-center'>
          {stores.map((store, index) => (
            <div
              key={index}
              className='mx-auto w-96 bg-white rounded border drop-shadow-lg flex flex-col p-2'
            >
              <div className='flex items-center'>
                <Avatar src={store?.image} />
                <div className='flex flex-col border-l pl-2 ml-2'>
                  <p className='font-medium text-lg'>{store?.name}</p>
                  <p className='text-sm'>{store?.bio}</p>
                  <p className='font-medium text-sm'>
                    {store?.numOfProducts} products |{' '}
                    {store?.numOfSales == 1
                      ? `${store?.numOfSales} sale`
                      : `${store?.numOfSales} sales`}
                  </p>
                </div>
              </div>
              <a
                href={store?.url}
                target='_blank'
                className='border-stone-800 border-2 w-full h-10 text-md text-stone-800 rounded flex justify-center items-center mt-2 hover:bg-stone-800 hover:text-white'
              >
                View Storefront
              </a>
            </div>
          ))}
        </div>
        <div className='h-10 w-full'></div>
      </div>
    );
  }

  return content;
};

export default RecentStores;
