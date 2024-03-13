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

//flowbite
import { Tooltip } from 'flowbite-react';

//mui
import Alert from '@mui/material/Alert';
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
      <DashHomeMobile
        currentUser={currentUser}
        stats={stats}
        dataView={dataView}
        refetchUser={refetchUser}
        user={user}
      />
    ) : (
      <>
        <div className='flex mb-2'>
          <div className='flex flex-col bg-white'>
            <p className='font-medium text-stone-800 text-sm'>Filter:</p>
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
                  borderWidth: 1,
                  '&:hover': {
                    borderColor: 'rgb(229 231 235)', // Keep the same border color on hover
                  },
                  borderRadius: '.375rem',
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

        <div className='flex justify-between items-center w-full'>
          <div className='bg-white border border-gray-200 rounded-md w-8/12 p-2 h-32'>
            <SellerProfile user={user} refetch={refetchUser} />
          </div>
          <div className='bg-white border border-gray-200 rounded-md w-4/12 ml-2 p-2 h-32 relative'>
            <div className='absolute right-0 mr-1'>
              <Tooltip
                content='Total revenue generated from sales'
                style='light'
              >
                <AiOutlineInfoCircle className='text-sm' />
              </Tooltip>
            </div>
            <p className='text-sm font-medium text-stone-800'>Revenue</p>
            <p className='text-2xl font-medium text-slate-800 mt-2'>
              $
              {stats?.revenue > 0
                ? stats?.revenue.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : '0'}
            </p>
            <p className='mt-1 text-xs text-stone-600'>
              {dataView === 'today'
                ? 'In the past 24 hours'
                : dataView === 'seven'
                ? 'In the past 7 days'
                : dataView === 'thirty'
                ? 'In the past 30 days'
                : 'Since you signed up'}
            </p>
          </div>
        </div>

        <div className='flex justify-between mt-2'>
          <div className='w-3/12 h-28 bg-white border-gray-200 rounded-md p-2 relative border'>
            <div className='absolute right-0 mr-1'>
              <Tooltip
                content='Total number of orders'
                style='light'
                className='w-32'
              >
                <AiOutlineInfoCircle className='text-sm' />
              </Tooltip>
            </div>
            <p className='text-sm font-medium text-slate-800'>Orders</p>
            <p className='text-2xl mt-2 font-medium text-slate-800'>
              {stats?.numOfOrders}
            </p>
          </div>

          <div className='w-3/12 h-28 bg-white border-gray-200 rounded-md p-2 ml-2 relative border'>
            <div className='absolute right-0 mr-1'>
              <Tooltip
                content='Total number of views'
                style='light'
                className='w-32'
              >
                <AiOutlineInfoCircle className='text-sm' />
              </Tooltip>
            </div>
            <p className='text-sm font-medium text-slate-800'>Views</p>
            <p className='text-2xl font-medium text-slate-800 mt-2'>
              {stats?.visits}
            </p>
          </div>

          <div className='border-gray-200 w-3/12 h-28 bg-white rounded-md p-2 ml-2 relative border'>
            <div className='absolute right-0 mr-1'>
              <Tooltip
                content='Total number of customers'
                style='light'
                className='w-32'
              >
                <AiOutlineInfoCircle className='text-sm' />
              </Tooltip>
            </div>
            <p className='text-sm font-medium'>Customers</p>
            <p className='text-2xl font-medium mt-2'>
              {stats?.numberOfCustomers > 0 ? stats?.numberOfCustomers : '0'}
            </p>
          </div>

          <div className='border-gray-200 w-3/12 h-28 bg-white rounded-md p-2 ml-2 relative border'>
            <div className='absolute right-0 mr-1'>
              <Tooltip
                content='Percentage of visitors who make a purchase'
                style='light'
                className='w-32'
              >
                <AiOutlineInfoCircle className='text-sm' />
              </Tooltip>
            </div>
            <p className='text-sm font-medium'>Conversion rate</p>
            <p className='text-2xl font-medium mt-2'>
              {stats?.conversion > 0 ? stats?.conversion.toFixed(0) : '0'}%
            </p>
          </div>
        </div>

        <div className='w-full mt-2 bg-white border border-gray-200 rounded-md flex flex-col p-2'>
          <p className='text-stone-800 text-sm'>Are you ready for customers?</p>

          <div className='w-full flex justify-between mt-2'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUser?.emailConfirmed}
                  color='default'
                  disabled
                  size='xsmall'
                />
              }
              label={
                <span className='text-sm text-stone-600'>Confirm email</span>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUser?.stripeOnboard}
                  color='default'
                  disabled
                  size='xsmall'
                />
              }
              label={
                <span className='text-sm text-stone-600'>
                  Add payout option
                </span>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUser?.store?.productAdded}
                  color='default'
                  disabled
                  size='xsmall'
                />
              }
              label={
                <span className='text-sm text-stone-600'>Submit template</span>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUser?.store?.designAdded}
                  color='default'
                  disabled
                  size='xsmall'
                />
              }
              label={
                <span className='text-sm text-stone-600'>
                  Finish account setup
                </span>
              }
            />
          </div>
        </div>

        <div className='w-full border border-gray-200 rounded-md mt-2 bg-white h-72 flex items-center justify-center'>
          {/* {stats?.numOfOrders > 0 ? (
            <Line options={options} data={data} />
          ) : (
            <div className='h-72 w-full flex flex-col items-center justify-center'>
              <GoGraph className='text-4xl text-stone-800' />
              <p className='font-medium text-stone-800 mt-2'>
                No orders have came in
              </p>
            </div>
          )} */}
          <div className='h-72 w-full flex flex-col items-center justify-center'>
            <p className=' text-stone-800 mt-1'>View all sales data here</p>
            <p className='text-sm text-stone-600 mt-1'>Display coming soon</p>
          </div>
        </div>
      </>
    );
  }

  const styles = isMobile
    ? 'w-full mx-auto h-fit p-2 bg-gray-50'
    : 'w-full mx-auto h-screen overflow-y-scroll bg-white ml-2';

  return (
    <>
      <Navbar />
      <div className='flex max-w-6xl mx-auto'>
        <Topbar />
        <div className={styles}>{content}</div>
      </div>
      <Footer />
    </>
  );
};

export default DashHome;
