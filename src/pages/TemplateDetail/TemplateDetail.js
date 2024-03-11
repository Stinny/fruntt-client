import React from 'react';
import { isMobile } from 'react-device-detect';
import Mobile from './Mobile';
import Desktop from './Desktop';
import { useParams } from 'react-router-dom';
import { useGetProductByUrlQuery } from '../../api/productsApiSlice';
import Spinner from '../../components/Spinner';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TemplateDetail = () => {
  //get template ID from url
  //get template using ID
  const { productUrl } = useParams();

  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetProductByUrlQuery({ productUrl: productUrl });

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <Mobile />
    ) : (
      <Desktop product={product.product} rating={product.rating} />
    );
  }

  const styles = isMobile
    ? 'w-full mx-auto h-screen bg-white mt-16'
    : 'w-full mx-auto h-screen overflow-auto bg-white';

  return (
    <>
      <Navbar />
      <div className='flex mx-auto max-w-4xl'>
        <div className={styles}>{content}</div>
      </div>
      <Footer />
    </>
  );
};

export default TemplateDetail;
