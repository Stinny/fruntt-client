import React, { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductQuery } from '../../api/productsApiSlice';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import { productSlice } from '../../redux/productRedux';
import { isMobile } from 'react-device-detect';
import EditDigital from './EditDigital';
import Spinner from '../../components/Spinner';
import EditDigitalMobile from '../../components/DigitalProd/EditDigitalMobile';

const EditItem = () => {
  const { productId } = useParams();

  const [fileList, setFileList] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isSuccess,
    refetch,
  } = useGetProductQuery({
    productId,
  });

  useEffect(() => {
    refetch();
  }, []);

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <div className='w-full'>
        {isMobile ? (
          <EditDigitalMobile
            product={product}
            productId={productId}
            refetch={refetch}
          />
        ) : (
          <EditDigital
            product={product}
            productId={productId}
            refetch={refetch}
          />
        )}
      </div>
    );
  }

  const styles = isMobile
    ? 'w-full mx-auto h-screen p-2 overflow-y-scroll bg-gray-50'
    : 'w-full mx-auto h-screen bg-white ml-2';

  return (
    <>
      <Navbar />
      <div className='flex mx-auto max-w-6xl'>
        <Topbar />
        <div className={styles}>{content}</div>
      </div>
      <Footer />
    </>
  );
};

export default EditItem;
