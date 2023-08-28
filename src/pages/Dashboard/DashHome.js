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
import { isMobile } from 'react-device-detect';
import { BsArrowRightShort } from 'react-icons/bs';
import { useGetStoreStatsQuery } from '../../api/storefrontApiSlice';
import DashHomeMobile from '../Mobile/Dashboard/DashHomeMobile';
import { Line, Bar } from 'react-chartjs-2';
import { GoGraph } from 'react-icons/go';

//mui
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const DashHome = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const [dataView, setDataView] = useState('seven');
  const currentStoreID = useSelector((state) => state.user.selectedStore);
  //holds the url of the page being viewed
  const currentStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  const {
    data: stats,
    isLoading,
    isSuccess,
    refetch,
  } = useGetStoreStatsQuery({
    storeId: currentStoreID,
    view: dataView,
  });

  useEffect(() => {
    refetch();
  }, [dataView]);

  const options = {
    responsive: true,
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

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Septemer',
    'October',
    'November',
    'December',
  ];

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
    console.log(stats?.dataSet);
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
            <p>
              Finish setting up your seller profile in{' '}
              <Link to='/settings' className='text-blue-800 font-semibold'>
                settings!
              </Link>
            </p>
          </Alert>
        ) : (
          ''
        )}

        {!currentUser.stripeOnboard && (
          <Alert severity='error' className='mb-2 w-full'>
            <p>
              Connect to payment gateway in{' '}
              <Link to='/settings' className='text-red-900 font-semibold'>
                settings
              </Link>{' '}
              to enable purchases
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
            <p className='text-md text-stone-800 font-medium'>
              Your storefront:
            </p>
            <a
              href={currentStoreUrl}
              className='flex justify-center items-center text-md text-gray-400 hover:text-slate-800 font-medium ml-2 underline underline-offset-4'
              target='_blank'
            >
              {currentStoreUrl}
            </a>
          </div>
          <div className='flex items-center p-2 bg-white rounded border drop-shadow-md'>
            <p className='font-medium text-stone-800 mr-2 text-md'>Filter:</p>
            <select
              className='rounded border-2 w-32 h-8 p-1'
              onChange={(e) => setDataView(e.target.value)}
              value={dataView}
            >
              <option value='today'>Today</option>
              <option value='seven'>Last 7 days</option>
              <option value='thirty'>Last 30 days</option>
              <option value='all'>All time</option>
            </select>
          </div>
        </div>

        <div className='flex justify-between'>
          <div className='drop-shadow-md w-3/12 h-40 bg-white rounded p-2 relative border'>
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

          <div className='drop-shadow-md w-3/12 h-40 bg-white rounded p-2 ml-4 relative border'>
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
            <p className='text-xl font-medium text-slate-800'>Orders</p>
            <p className='text-4xl font-medium text-slate-800'>
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
            <p className='text-xl font-medium text-slate-800'>Views</p>
            <p className='text-4xl font-medium text-slate-800'>
              {stats?.visits}
            </p>
          </div>

          <div className='drop-shadow-md w-3/12 h-40 bg-white rounded p-2 ml-4 relative border'>
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
              {stats?.conversion > 0 ? stats?.conversion.toFixed(0) : '0'}%
            </p>
          </div>
        </div>

        <div className='w-full mt-4 h-28 bg-white border rounded drop-shadow-md flex flex-col p-2'>
          <p className='text-xl font-medium text-slate-800'>
            Is your storefront ready for customers?
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

        <div className='w-full border rounded mt-4 bg-white drop-shadow-md'>
          {stats?.numOfOrders > 0 ? (
            <Bar options={options} data={data} />
          ) : (
            <div className='h-72 w-full flex flex-col items-center justify-center'>
              <GoGraph className='text-4xl text-gray-300' />
              <p className='font-medium text-stone-800 mt-2'>
                No orders have came in
              </p>
            </div>
          )}
        </div>

        {/* <div className='w-full h-28 bg-white border rounded-md drop-shadow-md flex flex-col p-2 mt-4'>
          <p className='text-xl font-medium text-slate-800'>
            Share your page with your people!
          </p>

          <div className='w-8/12 flex justify-between mt-2'>
            <FacebookIcon borderRadius={5} size={50} />
            <TwitterIcon borderRadius={5} size={50} />
            <PinterestIcon borderRadius={5} size={50} />
            <LinkedinIcon borderRadius={5} size={50} />
            <WhatsappIcon borderRadius={5} size={50} />
            <TelegramIcon borderRadius={5} size={50} />
          </div>
        </div> */}

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
