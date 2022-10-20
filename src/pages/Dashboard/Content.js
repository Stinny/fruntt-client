import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Topbar from '../../components/Topbar';
import Navbar from '../../components/Navbar';
import AddLogo from '../../components/Content/AddLogo';
import FAQs from '../../components/Content/FAQs';
import { useGetStorefrontQuery } from '../../api/storefrontApiSlice';
import Spinner from '../../components/Spinner';
import AddSocials from '../../components/Content/AddSocials';
import AddMedia from '../../components/Content/AddMedia';

//mui
import Alert from '@mui/material/Alert';

const Content = () => {
  const {
    data: storefront,
    isLoading,
    isSuccess,
    refetch,
  } = useGetStorefrontQuery();

  const [nameChangedInfo, setInfo] = useState('');

  useEffect(() => {
    refetch();
    setInfo('');
  }, []);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <>
        <div className='w-full border-b-2 p-2'>
          <h2 className='text-3xl font-semibold'>Content</h2>
        </div>

        {nameChangedInfo && (
          <Alert severity='info' className='w-full mt-4'>
            {nameChangedInfo}
          </Alert>
        )}

        <AddLogo storefront={storefront} refetch={refetch} setInfo={setInfo} />

        <AddSocials storefront={storefront} refetch={refetch} />

        <FAQs storefront={storefront} />

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
