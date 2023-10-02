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

export default EditDesign;
