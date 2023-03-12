import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';

import {
  useGetProductsQuery,
  useAddDescriptionMutation,
} from '../../api/productsApiSlice';
import Spinner from '../../components/Spinner';
import DescEditor from '../../components/Content/DescEditor';

const Description = () => {
  const currentStoreID = useSelector((state) => state.user.selectedStore);

  const {
    data: item,
    isLoading: gettingItem,
    isSuccess: gotItem,
    refetch: getItemAgain,
  } = useGetProductsQuery({
    storeId: currentStoreID,
  });

  let content;
  if (gettingItem) {
    content = <Spinner />;
  } else if (gotItem) {
    content = <DescEditor product={item[0]} getItemAgain={getItemAgain} />;
  }

  return (
    <>
      <Navbar />
      <Topbar />
      {content}
      <Footer />
    </>
  );
};

export default Description;
