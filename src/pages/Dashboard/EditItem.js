import React, { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from '../../api/productsApiSlice';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import FileUpload from './FileUpload';
import { productSlice } from '../../redux/productRedux';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Spinner from '../../components/Spinner';
import EditItemForm from '../../components/Forms/EditItemForm';

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
        <EditItemForm
          itemId={product._id}
          title={product.title}
          description={product.description}
          price={product.price}
          stock={product.stock}
          images={product.images}
          published={product.published}
          weightUnit={product.weightUnit}
          address={product.shipsFrom.address}
          country={product.shipsFrom.country}
          state={product.shipsFrom.state}
          city={product.shipsFrom.city}
          zipcode={product.shipsFrom.zipcode}
          sizeUnit={product.sizeUnit}
          weight={product.weight}
          height={product.height}
          length={product.length}
          width={product.width}
          options={product.options}
          productId={productId}
          refetch={refetch}
        />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto h-fit'>{content}</div>
      <Footer />
    </>
  );
};

export default EditItem;
