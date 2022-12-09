import React, { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from '../../api/productsApiSlice';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { productSlice } from '../../redux/productRedux';
import { isMobile } from 'react-device-detect';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Spinner from '../../components/Spinner';
import EditItemForm from '../../components/Forms/EditItemForm';
import EditItemFormMobile from '../../components/Forms/EditItemFormMobile';

const EditItem = () => {
  const { productId } = useParams();

  const [fileList, setFileList] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: product, isLoading, isSuccess, refetch } = useGetProductQuery({
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
          <EditItemForm product={product} productId={productId} />
        )}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {/* <Topbar /> */}
      <div className='max-w-6xl mx-auto h-fit mt-10'>{content}</div>
      <Footer />
    </>
  );
};

export default EditItem;
