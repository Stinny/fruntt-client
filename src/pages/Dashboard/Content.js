import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Topbar from '../../components/Topbar';
import Navbar from '../../components/Navbar';
import AddLogo from '../../components/Content/AddLogo';
import FAQs from '../../components/Content/FAQs';
import { useGetStorefrontQuery } from '../../api/storefrontApiSlice';
import Spinner from '../../components/Spinner';
import AddSocials from '../../components/Content/AddSocials';
import AddMedia from '../../components/Content/AddMedia';
import { isMobile } from 'react-device-detect';
import Cookies from 'js-cookie';

//mui
import Alert from '@mui/material/Alert';

const Content = () => {
  const currentStoreID = useSelector((state) => state.user.selectedStore);
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const {
    data: storefront,
    isLoading,
    isSuccess,
    refetch,
  } = useGetStorefrontQuery({ storeId: currentUser?.store?._id });

  const [nameChangedInfo, setInfo] = useState('');

  useEffect(() => {
    refetch();
    setInfo('');
  }, []);

  useEffect(() => {
    refetch();
  }, [currentStoreID]);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <>
        <div className='w-full border-b-2 p-2'>
          <h2 className='text-3xl font-semibold'>Content</h2>
        </div>

        {isMobile
          ? nameChangedInfo && (
              <Alert severity='info' className='w-11/12 mt-2 mx-auto'>
                {nameChangedInfo}
              </Alert>
            )
          : nameChangedInfo && (
              <Alert severity='info' className='w-full mt-4'>
                {nameChangedInfo}
              </Alert>
            )}

        <AddLogo storefront={storefront} refetch={refetch} setInfo={setInfo} />

        {/* <AddSocials storefront={storefront} refetch={refetch} /> */}

        <FAQs currentUser={currentUser} />

        <AddMedia />
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

export default Content;
