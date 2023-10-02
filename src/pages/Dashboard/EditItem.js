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
import EditItemForm from '../../components/Forms/EditItemForm';
import EditItemFormMobile from '../../components/Forms/EditItemFormMobile';

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
          <EditItemFormMobile
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

  return (
    <>
      <Navbar />
      <div className='flex'>
        <Topbar />
        <div className='w-9/12 mx-auto h-screen p-10 overflow-y-scroll bg-gray-50'>
          {content}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditItem;
