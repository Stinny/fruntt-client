import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { useGetUsersOrdersQuery } from '../../api/ordersApiSlice';
import Spinner from '../../components/Spinner';
import { isMobile } from 'react-device-detect';
import LibraryMobile from '../Mobile/Dashboard/LibraryMobile';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill, BsPalette } from 'react-icons/bs';

const Library = () => {
  //get all orders for the logged in user

  const {
    data: orders,
    isLoading,
    isSuccess,
    refetch,
  } = useGetUsersOrdersQuery();

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <LibraryMobile orders={orders} />
    ) : orders.length ? (
      <div className='mx-auto w-full'>
        <div className='w-full mx-auto flex flex-col'>
          <div className='w-full flex justify-between items-center p-2'>
            <p className='text-3xl font-medium'>Your library</p>

            {/* <Link to={`/dashboard/item/edit/${product[0]._id}`}>
          <button className='w-40 h-10 rounded border-stone-800 text-stone-800 border-2 hover:bg-stone-800 hover:text-white'>
            EDIT PRODUCT
          </button>
        </Link> */}
            <div className='flex items-center'>
              <p className='text-stone-800 font-medium text-lg'>
                {orders.length > 1
                  ? `${orders.length} purchases`
                  : `${orders.length} purchase`}
              </p>
            </div>
          </div>
          <div
            className='flex flex-col overflow-y-scroll h-screen bg-gray-50 p-2 rounded'
            // style={{ height: '500px' }}
          >
            {orders.map((order) => (
              <Link to={`/order/${order?._id}`}>
                <div className='border rounded bg-white drop-shadow-md relative flex mt-4'>
                  <img
                    src={order?.item?.coverImage?.url}
                    className='rounded-tl rounded-bl w-2/12 h-32'
                  />

                  <div className='w-10/12 border-l pl-4 flex flex-col p-2'>
                    <p className='text-xl font-medium mb-2'>
                      {order?.item?.title}
                    </p>

                    <p className='text-lg mb-4'>{order?.item?.description}</p>

                    {order?.item?.digitalType === 'video' ? (
                      <div className='flex items-center justify-center border-2 border-slate-800 rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                        <p className='text-sm'>Video Course</p>
                        <MdOutlineVideoLibrary className='ml-2 text-md' />
                      </div>
                    ) : order?.item?.digitalType === 'ebook' ? (
                      <div className='flex items-center justify-center border-2 border-slate-800 rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                        <p className='text-sm'>E-Book</p>
                        <HiOutlineBookOpen className='ml-2 text-md' />
                      </div>
                    ) : order?.item?.digitalType === 'audio' ? (
                      <div className='flex items-center justify-center border-2 border-slate-800 rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                        <p className='text-sm'>Audio</p>
                        <BsFillMicFill className='ml-2 text-md' />
                      </div>
                    ) : order?.item?.digitalType === 'template' ? (
                      <div className='flex items-center justify-center border-2 border-slate-800 rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                        <p className='text-sm'>Template</p>
                        <HiOutlineTemplate className='ml-2 text-md' />
                      </div>
                    ) : order?.item?.digitalType === 'other' ? (
                      <div className='flex items-center justify-center border-2 border-slate-800 rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                        <p className='text-sm'>Digital Media</p>
                        <MdOutlinePermMedia className='ml-2 text-md' />
                      </div>
                    ) : (
                      <div className='flex items-center justify-center border-2 border-slate-800  rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                        <p className='text-sm'>Art</p>
                        <BsPalette className='ml-2 text-md' />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div className='w-full h-screen mx-auto bg-white drop-shadow-lg border flex items-center justify-center'>
        <div className='flex flex-col'>
          <p className='text-xl font-medium text-stone-800'>
            Your library is empty!
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='mx-auto max-w-6xl'>{content}</div>
      <Footer />
    </>
  );
};

export default Library;
