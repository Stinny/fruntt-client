import React from 'react';
import DesignForm from '../../components/Forms/DesignForm';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { useGetStorefrontQuery } from '../../api/storefrontApiSlice';
import Spinner from '../../components/Spinner';
import { isMobile } from 'react-device-detect';
import DesignFormMobile from '../../components/Forms/DesignFormMobile';

const EditDesign = () => {
  const { data: storefront, isLoading, isSuccess } = useGetStorefrontQuery();

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <DesignFormMobile storefront={storefront} />
    ) : (
      <DesignForm storefront={storefront} />
    );
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-7xl mx-auto h-fit'>{content}</div>
      <Footer />
    </>
  );
};

export default EditDesign;
