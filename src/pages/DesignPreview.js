import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { useGetReviewsAndProductQuery } from '../api/customersApiSlice';
import SellerPro from '../components/DesignPrev/SellerPro';
import {
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill } from 'react-icons/bs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

//mui
import Rating from '@mui/material/Rating';
import DesignDetail from '../components/DesignPrev/DesignDetail';

const DesignPreview = ({
  pageBG,
  cardBG,
  buttonColor,
  buttonTextColor,
  buttonStyle,
  pageText,
  storefront,
  headerColor,
  borderColor,
  faqBackground,
  reviewBackground,
  hideReviews,
  price,
  hideDescription,
}) => {
  const {
    data: productData,
    isLoading,
    isSuccess,
    refetch,
  } = useGetReviewsAndProductQuery({ storeId: storefront._id });

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    //here we need to render a ew component
    //pass the array of products to new component
    //new component can then display the first in the array
    //and be able to toggle through all the other products

    //new component needs selectedStore, handlder, products,
    content = (
      <DesignDetail
        products={productData.products}
        pageBG={pageBG}
        cardBG={cardBG}
        price={price}
        buttonColor={buttonColor}
        buttonTextColor={buttonTextColor}
        buttonStyle={buttonStyle}
        storefrontId={storefront?._id}
        headerColor={headerColor}
        borderColor={borderColor}
        storefront={storefront}
        faqBackground={faqBackground}
        reviewBackground={reviewBackground}
        hideReviews={hideReviews}
        hideDescription={hideDescription}
      />
    );
  }
  return <div className='w-full h-fit'>{content}</div>;
};

export default DesignPreview;
