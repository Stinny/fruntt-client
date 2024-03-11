import React from 'react';
import { isMobile } from 'react-device-detect';
import MobileStore from './MobileStore';
import DesktopStore from './DesktopStore';
import { useParams } from 'react-router-dom';
import { useGetStorefrontByURLQuery } from '../../api/storefrontApiSlice';
import Spinner from '../../components/Spinner';

const Store = () => {
  const { storeUrl } = useParams();

  const {
    data: storeAndItems,
    isLoaing,
    isSuccess,
    refetch,
  } = useGetStorefrontByURLQuery({ storeUrl: storeUrl });

  let content;

  if (isLoaing) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <MobileStore />
    ) : (
      <DesktopStore storeAndItems={storeAndItems} />
    );
  }

  return <div className='mx-auto w-full mt-20 mb-20'>{content}</div>;
};

export default Store;
