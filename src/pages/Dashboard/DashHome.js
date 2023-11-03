import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import { Navigate, Link } from 'react-router-dom';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Cookies from 'js-cookie';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { BiLinkExternal } from 'react-icons/bi';
import { isMobile } from 'react-device-detect';
import { BsArrowRightShort } from 'react-icons/bs';
import { useGetStoreStatsQuery } from '../../api/storefrontApiSlice';
import DashHomeMobile from '../Mobile/Dashboard/DashHomeMobile';
import { Line, Bar } from 'react-chartjs-2';
import { GoGraph } from 'react-icons/go';
import Select from 'react-select';

//mui
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SellerProfile from '../../components/Settings/SellerProfile';
import { useGetUpdatedUserQuery } from '../../api/authApiSlice';

const DashHome = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const [dataView, setDataView] = useState('seven');
  const currentStoreID = useSelector((state) => state.user.selectedStore);
  //holds the url of the page being viewed
  const currentStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  const viewOptions = [
    { value: 'today', label: 'Today' },
    { value: 'seven', label: 'Last 7 days' },
    { value: 'thirty', label: 'Last 30 days' },
    { value: 'all', label: 'All time' },
  ];

  const formattedViewValue = viewOptions.find(
    (option) => option.value === dataView
  );

  const handleView = (value) => {
    setDataView(value.value);
  };

  const {
    data: stats,
    isLoading,
    isSuccess,
    refetch,
  } = useGetStoreStatsQuery({
    storeId: currentStoreID,
    view: dataView,
  });

  const {
    data: user,
    isLoading: gettingUser,
    isError: errorGettingUser,
    isSuccess: gotUser,
    refetch: refetchUser,
  } = useGetUpdatedUserQuery();

  useEffect(() => {
    refetch();
  }, [dataView]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    height: 800,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Storefront Sales',
      },
    },
    scales: {
      yAxes: {
        ticks: {
          beginAtZero: true,
          display: false,
        },
      },

      xAxes: {
        ticks: {
          display:
            dataView === 'seven'
              ? false
              : dataView === 'thirty'
              ? false
              : dataView === 'today'
              ? false
              : false,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  useEffect(() => {
    refetch();
    refetchUser();
  }, []);

  // useEffect(() => {
  //   refetch();
  // }, [currentStoreID]);

  let content;

  if (isLoading || gettingUser) {
    content = <Spinner />;
  } else if (isSuccess && gotUser) {
    const data = {
      labels: stats?.dataSet?.dates,
      datasets: [
        {
          label: 'Total ($)',
          data: stats?.dataSet?.totals,
          backgroundColor: 'black',
          borderColor: 'black',
          minBarLength: 7,
        },
        {
          label: 'Sales',
          data: stats?.dataSet?.sales,
          backgroundColor: '#d9dad8',
          borderColor: '#d9dad8',
          minBarLength: 7,
        },
      ],
    };

    content = isMobile ? (
      <DashHomeMobile currentUser={currentUser} stats={stats} />
    ) : (
      <>
        {!currentUser.name ||
        !currentUser?.sellerProfile?.bio ||
        !currentUser?.sellerProfile?.picture?.url ? (
          <Alert severity='info' className='mt-2 mb-2 w-full'>
            <p>Finish setting up your seller profile</p>
          </Alert>
        ) : (
          ''
        )}

        {!currentUser.stripeOnboard && (
          <Alert severity='error' className='mb-2 w-full'>
            <p>
              Connect a Stripe account in{' '}
              <Link to='/settings' className='text-red-900 font-semibold'>
                settings
              </Link>{' '}
              to enable paid purchases
            </p>
          </Alert>
        )}

        {!currentUser.emailConfirmed && (
          <Alert severity='error' className='mb-2 w-full'>
            <p>
              Please check your email inbox to confirm your email address so you
              can enable purchases
            </p>
          </Alert>
        )}
        <div className='flex justify-between mb-4'>
          <div className='flex items-center p-2 bg-white rounded border drop-shadow-md'>
            <p className='text-md text-stone-800 font-medium'>Your store:</p>
            <a
              href={currentStoreUrl}
              className='flex justify-center items-center text-md text-stone-800 font-medium ml-2'
              target='_blank'
            >
              {currentStoreUrl}
            </a>
            <BiLinkExternal className='ml-1' />
          </div>
          <div className='flex items-center p-2 bg-white rounded border drop-shadow-md'>
            <p className='font-medium text-stone-800 mr-2 text-md'>Filter:</p>
            <Select
              options={viewOptions}
              onChange={handleView}
              value={formattedViewValue}
              menuPortalTarget={document.body}
              menuPosition={'fixed'}
              isSearchable={false}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: 'rgb(229 231 235)',
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: 'rgb(209 213 219)', // Keep the same border color on hover
                  },
                  boxShadow: 'none',
                  zIndex: 99999,
                  position: 'relative',
                }),
                menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
              className='mt-1 w-44 text-sm'
            />
          </div>
        </div>

        <div className='flex justify-between items-center w-full mb-4'>
          <div className='bg-white border rounded drop-shadow-md w-8/12 p-2 h-36'>
            <SellerProfile user={user} refetch={refetchUser} />
          </div>
          <div className='bg-white border rounded drop-shadow-md w-4/12 ml-2 p-2 h-36'>
            <Tooltip
              title={
                <p className='text-lg'>
                  Total revenue your store has generated
                </p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='right-end'
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-md font-medium text-slate-800'>Revenue</p>
            <p className='text-4xl font-medium text-slate-800 mt-2'>
              $
              {stats?.revenue > 0
                ? stats?.revenue.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : '0'}
            </p>
            <p className='mt-1 text-sm font-medium'>
              {dataView === 'today'
                ? 'In the past 24 hours'
                : dataView === 'seven'
                ? 'In the past 7 days'
                : dataView === 'thirty'
                ? 'In the past 30 days'
                : 'Since you opened your store'}
            </p>
          </div>
        </div>

        <div className='flex justify-between'>
          <div className='drop-shadow-md w-3/12 h-40 bg-white rounded p-2 relative border'>
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
            <p className='text-md font-medium text-slate-800'>Orders</p>
            <p className='text-4xl mt-2 font-medium text-slate-800'>
              {stats?.numOfOrders}
            </p>
          </div>

          <div className='drop-shadow-md w-3/12 h-40 bg-white rounded p-2 ml-4 relative border'>
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
            <p className='text-md font-medium text-slate-800'>Views</p>
            <p className='text-4xl font-medium text-slate-800 mt-2'>
              {stats?.visits}
            </p>
          </div>

          <div className='drop-shadow-md w-3/12 h-40 bg-white rounded p-2 ml-4 relative border'>
            <Tooltip
              title={
                <p className='text-lg'>Total number of unique customers</p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='right-end'
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-md font-medium'>Customers</p>
            <p className='text-4xl font-medium mt-2'>
              {stats?.numberOfCustomers > 0 ? stats?.numberOfCustomers : '0'}
            </p>
          </div>

          <div className='drop-shadow-md w-3/12 h-40 bg-white rounded p-2 ml-4 relative border'>
            <Tooltip
              title={
                <p className='text-lg'>
                  Percentage of viewers who make a purchase
                </p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='right-end'
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-md font-medium'>Conversion rate</p>
            <p className='text-4xl font-medium mt-2'>
              {stats?.conversion > 0 ? stats?.conversion.toFixed(0) : '0'}%
            </p>
          </div>
        </div>

        <div className='w-full mt-4 h-28 bg-white border rounded drop-shadow-md flex flex-col p-2'>
          <p className='text-xl font-medium text-slate-800'>
            Is your store ready for customers?
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
              label='Design your storefront'
            />
          </div>
        </div>

        <div className='w-full border rounded mt-4 bg-white drop-shadow-md h-96 flex items-center justify-center'>
          {stats?.numOfOrders > 0 ? (
            <Line options={options} data={data} />
          ) : (
            <div className='h-72 w-full flex flex-col items-center justify-center'>
              <GoGraph className='text-4xl text-stone-800' />
              <p className='font-medium text-stone-800 mt-2'>
                No orders have came in
              </p>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className='flex'>
        <Topbar />
        <div className='w-9/12 mx-auto h-screen overflow-y-scroll p-10 bg-gray-50'>
          {content}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashHome;
