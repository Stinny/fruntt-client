import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import EditMobile from '../../components/DigitalProd/EditMobile';
import EditDesktop from '../../components/DigitalProd/EditDesktop';
import { useNavigate } from 'react-router-dom';
import {
  useUpdateDigitalProductMutation,
  useDeleteProductMutation,
  useDeleteItemImageMutation,
} from '../../api/productsApiSlice';
import { uploadImageRequest } from '../../api/requests';

const EditDigital = ({ product, refetch }) => {
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const [title, setTitle] = useState(product?.title);
  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(product?.price);
  const [image, setImage] = useState([]);
  const [files, setFiles] = useState([]);
  const [published, setPublished] = useState(product?.published);
  const [digitalType, setDigitalType] = useState(product?.digitalType);

  const [updateDigitalProduct, result] = useUpdateDigitalProductMutation();
  const [deleteProduct, deleteProductResult] = useDeleteProductMutation();

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    let uploadedFiles = [];
    let newCoverImageUrl = '';
    let newCoverImageKey = '';

    if (product.coverImage.url === '' && !image.length) {
      setError('Please upload a cover image');
      return;
    }

    if (!product.files.length && !files.length) {
      setError('Please upload files to include in the purchase');
      return;
    }

    try {
      //first try to upload new coverImage if one exists
      if (image.length) {
        const imageToUpload = new FormData();
        imageToUpload.append('productImages', image[0].file);
        const imageDataReq = await uploadImageRequest.post(
          '/products/imageupload',
          imageToUpload
        );
        newCoverImageUrl = imageDataReq.data[0].url;
        newCoverImageKey = imageDataReq.data[0].key;
      }

      //then try to upload any new files if they exist
      if (files.length) {
        const filesToUpload = new FormData();
        for (var x = 0; x < files.length; x++) {
          filesToUpload.append('productImages', files[x]);
        }
        const filesUploadReq = await uploadImageRequest.post(
          '/products/filesupload',
          filesToUpload
        );
        uploadedFiles = filesUploadReq.data;
      }

      const editProductReq = await updateDigitalProduct({
        title: title,
        description: description,
        price: price,
        published: published,
        coverImageUrl: newCoverImageUrl,
        coverImageKey: newCoverImageKey,
        files: uploadedFiles,
        productId: product?._id,
        digitalType: digitalType,
      }).unwrap();

      if (editProductReq === 'Product updated') {
        refetch();
        navigate('/dashboard/item');
      }
    } catch (err) {
      setError('There was an error');
    }
  };

  const handleDelete = async () => {
    const deleteItemReq = await deleteProduct(product._id);
    navigate('/dashboard/item');
  };

  return isMobile ? (
    <EditMobile product={product} />
  ) : (
    <EditDesktop
      product={product}
      title={title}
      setTitle={setTitle}
      digitalType={digitalType}
      setDigitalType={setDigitalType}
      description={description}
      setDescription={setDescription}
      price={price}
      setPrice={setPrice}
      setImage={setImage}
      setFiles={setFiles}
      published={published}
      setPublished={setPublished}
      handleDelete={handleDelete}
      handleSaveEdit={handleSaveEdit}
      error={error}
      refetchProduct={refetch}
    />
  );
};

export default EditDigital;