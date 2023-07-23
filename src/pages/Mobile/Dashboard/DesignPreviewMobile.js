import React, { useEffect } from 'react';
import { useGetProductsQuery } from '../../../api/productsApiSlice';
import { AiFillStar } from 'react-icons/ai';
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
import Spinner from '../../../components/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useGetReviewsAndProductQuery } from '../../../api/customersApiSlice';
import { BsArrow90DegDown } from 'react-icons/bs';

//mui
import Alert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import DesignDetailMobile from '../../../components/DesignPrev/DesignDetailMobile';

const DesignPreviewMobile = ({
  pageBG,
  cardBG,
  buttonColor,
  buttonTextColor,
  buttonStyle,
  storefront,
  headerColor,
  borderColor,
  faqBackground,
  reviewBackground,
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

  const btnStyle = buttonStyle === 'filled' ? buttonColor : '';

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <DesignDetailMobile
        products={productData.products}
        pageBG={pageBG}
        cardBG={cardBG}
        buttonColor={buttonColor}
        buttonTextColor={buttonTextColor}
        buttonStyle={buttonStyle}
        storefrontId={storefront?._id}
        headerColor={headerColor}
        borderColor={borderColor}
        storefront={storefront}
        faqBackground={faqBackground}
        reviewBackground={reviewBackground}
      />
    );
  }
  return <div className='w-full h-fit mx-auto p-2'>{content}</div>;
};

export default DesignPreviewMobile;
