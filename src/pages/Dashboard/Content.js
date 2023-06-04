import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Topbar from '../../components/Topbar';
import Navbar from '../../components/Navbar';
import AddLogo from '../../components/Content/AddLogo';
import FAQs from '../../components/Content/FAQs';
import { useGetStorefrontQuery } from '../../api/storefrontApiSlice';
import Spinner from '../../components/Spinner';
import HideSections from '../../components/Content/HideSections';
import AddMedia from '../../components/Content/AddMedia';
import { isMobile } from 'react-device-detect';
import Cookies from 'js-cookie';
import { useGetProductsQuery } from '../../api/productsApiSlice';

//mui
import Alert from '@mui/material/Alert';
import Description from '../../components/Content/Description';

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

  const {
    data: item,
    isLoading: gettingItem,
    isSuccess: gotItem,
    refetch: getItemAgain,
  } = useGetProductsQuery({
    storeId: currentUser?.store?._id,
  });

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
        <div className='w-full p-2'>
          <h2 className='text-3xl font-medium'>Content</h2>
          <p className='text-lg font-medium text-gray-400'>
            Add additional content to your page
          </p>
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

        <div className='w-full border rounded drop-shadow-md bg-white p-2'>
          <AddLogo
            storefront={storefront}
            refetch={refetch}
            setInfo={setInfo}
          />

          <HideSections storefront={storefront} refetch={refetch} />

          <Description
            currentUser={currentUser}
            isLoading={gettingItem}
            isSuccess={gotItem}
            refetch={getItemAgain}
            product={item}
          />

          <FAQs
            currentUser={currentUser}
            isLoading={gettingItem}
            isSuccess={gotItem}
            refetch={getItemAgain}
            item={item}
          />
        </div>

        {/* <AddMedia /> */}
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
