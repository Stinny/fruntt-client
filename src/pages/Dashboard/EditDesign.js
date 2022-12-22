import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DesignForm from '../../components/Forms/DesignForm';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { useGetStorefrontQuery } from '../../api/storefrontApiSlice';
import Spinner from '../../components/Spinner';
import { isMobile } from 'react-device-detect';
import DesignFormMobile from '../../components/Forms/DesignFormMobile';
import Cookies from 'js-cookie';

const EditDesign = () => {
  const currentStoreID = useSelector((state) => state.user.selectedStore);
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const {
    data: storefront,
    isLoading,
    isSuccess,
    refetch,
  } = useGetStorefrontQuery({
    storeId: currentUser?.store?._id,
  });

  useEffect(() => {
    refetch();
  }, []);

  // useEffect(() => {
  //   refetch();
  // }, [currentUser]);

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <DesignFormMobile storefront={storefront} currentUser={currentUser} />
    ) : (
      <DesignForm storefront={storefront} currentUser={currentUser} />
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
