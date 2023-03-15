import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import { Navigate, Link } from 'react-router-dom';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Cookies from 'js-cookie';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { isMobile } from 'react-device-detect';
import { BsArrowRightShort } from 'react-icons/bs';
import { useGetStoreStatsQuery } from '../../api/storefrontApiSlice';
import DashHomeMobile from '../Mobile/Dashboard/DashHomeMobile';
import {
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
} from 'react-share';

//mui
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const DashHome = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;
  const currentStoreID = useSelector((state) => state.user.selectedStore);
  //holds the url of the page being viewed
  const currentStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  const { data: stats, isLoading, isSuccess, refetch } = useGetStoreStatsQuery({
    storeId: currentStoreID,
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [currentStoreID]);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <DashHomeMobile currentUser={currentUser} stats={stats} />
    ) : (
      <>
        {!currentUser.stripeOnboard && (
          <Alert severity='error' className='mt-4 mb-4 w-full'>
            <p>
              Connect to payment gateway in{' '}
              <Link to='/settings' className='text-red-900 font-semibold'>
                settings
              </Link>{' '}
              to enable checkout
            </p>
          </Alert>
        )}

        {!currentUser.firstName ||
        !currentUser?.sellerProfile?.bio ||
        !currentUser?.sellerProfile?.picture?.url ? (
          <Alert severity='error' className='mt-4 mb-4 w-full'>
            <p>
              Finish setting up your seller profile in{' '}
              <Link to='/settings' className='text-red-900 font-semibold'>
                settings!
              </Link>
            </p>
          </Alert>
        ) : (
          ''
        )}

        {!currentUser.emailConfirmed && (
          <Alert severity='error' className='mt-2 mb-4 w-full'>
            <p>
              Please check your email inbox to confirm your email address so you
              can enable checkout
            </p>
          </Alert>
        )}
        <div className='flex mb-2'>
          <p className='text-lg text-stone-800 font-medium'>Your live page:</p>
          <a
            href={currentStoreUrl}
            className='flex justify-center items-center text-lg text-gray-400 hover:text-slate-800 font-medium ml-2 underline underline-offset-4'
            target='_blank'
          >
            {currentStoreUrl}
          </a>
        </div>

        <div className='flex justify-between'>
          <div className='drop-shadow-md w-3/12 h-40 bg-white rounded-md p-2 relative border'>
            <Tooltip
              title={
                <p className='text-lg'>Total revenue your page has generated</p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='right-end'
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-xl font-medium text-slate-800'>Revenue</p>
            <p className='text-4xl font-medium text-slate-800'>
              $
              {stats?.revenue > 0
                ? stats?.revenue.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : '0'}
            </p>
          </div>

          <div className='drop-shadow-md w-3/12 h-40 bg-white rounded-md p-2 ml-4 relative border'>
            <Tooltip
              title={
                <p className='text-lg'>Total sales your page has generated</p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='right-end'
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-xl font-medium text-slate-800'>
              Number of Sales
            </p>
            <p className='text-4xl font-medium text-slate-800'>
              {stats?.numOfOrders}
            </p>
          </div>

          <div className='drop-shadow-md w-3/12 h-40 bg-white rounded-md p-2 ml-4 relative border'>
            <Tooltip
              title={
                <p className='text-lg'>
                  Amount of users who have visted your page
                </p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='right-end'
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-xl font-medium text-slate-800'>Page views</p>
            <p className='text-4xl font-medium text-slate-800'>
              {stats?.visits}
            </p>
          </div>

          <div className='drop-shadow-md w-3/12 h-40 bg-white rounded-md p-2 ml-4 relative border'>
            <Tooltip
              title={
                <p className='text-lg'>
                  Percentage of customers who visit and make a purchase
                </p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='right-end'
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-xl font-medium'>Conversion rate</p>
            <p className='text-4xl font-medium'>
              {stats?.conversion > 0 ? stats?.conversion.toFixed(2) : '0'}%
            </p>
          </div>
        </div>

        <div className='w-full mt-4 mb-4 flex justify between'>
          <div className='w-8/12 drop-shadow-md rounded-md h-40 bg-white border p-2'>
            <p className='text-xl font-medium text-slate-800'>
              Orders & Inventory
            </p>
            {stats?.numOfUnfulfilledOrders ? (
              <p className='text-3xl font-medium mt-2 text-slate-800'>
                {stats?.numOfUnfulfilledOrders > 1
                  ? `You have ${stats?.numOfUnfulfilledOrders} unfulfilled orders`
                  : `You have ${stats?.numOfUnfulfilledOrders} unfulfilled order`}
              </p>
            ) : (
              <p className='text-3xl font-medium mt-2 text-slate-800'>
                You have no recent orders
              </p>
            )}
            <Link to='/dashboard/orders' className='mt-2'>
              <div className='flex items-center'>
                <p>View orders</p>
                <BsArrowRightShort />
              </div>
            </Link>
            {stats?.itemStock <= 10 ? (
              <p className='mt-2'>
                Inventory:{' '}
                <span className='text-red-400 font-medium'>
                  {stats?.itemStock} units
                </span>
              </p>
            ) : (
              <p className='mt-2'>
                Inventory:{' '}
                <span className='text-slate-800 font-medium'>
                  {stats?.itemStock} units left
                </span>
              </p>
            )}
          </div>
          <div className='w-4/12 drop-shadow-md mx-auto rounded-md bg-white border h-40 ml-4 flex flex-col justify-center p-2'>
            <div className='w-full flex mx-auto justify-between items-center'>
              <Link to='/dashboard/item' className='w-6/12 h-14'>
                <button className='w-full h-full border-2 border-stone-800 rounded hover:bg-stone-800 hover:text-white'>
                  Product
                </button>
              </Link>
              <Link to='/dashboard/content' className='w-6/12 h-14 ml-2'>
                <button className='w-full h-full border-2 border-stone-800 rounded hover:bg-stone-800 hover:text-white'>
                  Content
                </button>
              </Link>
            </div>

            <div className='w-full flex mx-auto justify-between items-center mt-4'>
              <Link to='/dashboard/design' className='w-6/12 h-14'>
                <button className='w-full h-full border-2 border-stone-800 rounded hover:bg-stone-800 hover:text-white'>
                  Design
                </button>
              </Link>
              <Link to='/dashboard/orders' className='w-6/12 h-14 ml-2'>
                <button className='w-full h-full border-2 border-stone-800 rounded hover:bg-stone-800 hover:text-white'>
                  Orders
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className='w-full h-28 bg-white border rounded-md drop-shadow-md flex flex-col p-2'>
          <p className='text-xl font-medium text-slate-800'>
            Is your product page ready for customers?
          </p>

          <div className='w-full flex justify-between mt-2'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUser?.emailConfirmed}
                  color='default'
                  disabled
                />
              }
              label='Confirm your email'
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUser?.stripeOnboard}
                  color='default'
                  disabled
                />
              }
              label='Connect to payment gateway'
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUser?.store?.productAdded}
                  color='default'
                  disabled
                />
              }
              label='Add a product'
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUser?.store?.designAdded}
                  color='default'
                  disabled
                />
              }
              label='Design your page'
            />
          </div>
        </div>

        <div className='w-full h-28 bg-white border rounded-md drop-shadow-md flex flex-col p-2 mt-4'>
          <p className='text-xl font-medium text-slate-800'>
            Share your product page with your people!
          </p>

          <div className='w-8/12 flex justify-between mt-2'>
            <FacebookIcon borderRadius={5} size={50} />
            <TwitterIcon borderRadius={5} size={50} />
            <PinterestIcon borderRadius={5} size={50} />
            <LinkedinIcon borderRadius={5} size={50} />
            <WhatsappIcon borderRadius={5} size={50} />
            <TelegramIcon borderRadius={5} size={50} />
          </div>
        </div>

        {/* <SalesGraph /> */}
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto h-fit'>{content}</div>
      <Footer />
    </>
  );
};

export default DashHome;
