import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import EditMobile from '../../components/DigitalProd/EditDigitalMobile';
import EditDesktop from '../../components/DigitalProd/EditDesktop';
import { useNavigate } from 'react-router-dom';
import {
  useUpdateDigitalProductMutation,
  useDeleteProductMutation,
  useDeleteItemImageMutation,
} from '../../api/productsApiSlice';
import { uploadImageRequest } from '../../api/requests';
import { toast } from 'react-toastify';

const EditDigital = ({ product, refetch }) => {
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const [title, setTitle] = useState(product?.title);
  const [description, setDescription] = useState(product?.description);
  const [info, setInfo] = useState(product?.info);
  const [price, setPrice] = useState(product?.price);
  const [image, setImage] = useState([]);
  const [files, setFiles] = useState([]);
  const [published, setPublished] = useState(product?.published);
  const [digitalType, setDigitalType] = useState(product?.digitalType);
  const [link, setLink] = useState(product?.link);
  const [callToAction, setCallToAction] = useState(product?.callToAction);
  const [payChoice, setPayChoice] = useState(product?.payChoice);
  const [suggestedPrice, setSuggestedPrice] = useState(product?.suggestedPrice);
  const [url, setUrl] = useState(product?.url);
  const [free, setFree] = useState(product?.free);
  const [marketplace, setMarketplace] = useState(product?.marketplace);
  const [category, setCategory] = useState(product?.category);

  const [updateDigitalProduct, result] = useUpdateDigitalProductMutation();
  const [deleteProduct, deleteProductResult] = useDeleteProductMutation();
  const [productContent, setProductContent] = useState(product?.content);

  const handleType = (value) => {
    setDigitalType(value.value);
  };

  const handleAction = (value) => {
    setCallToAction(value.value);
  };

  const handleCategory = (value) => {
    setCategory(value.value);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    let uploadedFiles = [];
    let newCoverImageUrl = '';
    let newCoverImageKey = '';

    if (product.coverImage.url === '' && !image.length) {
      setError('Please upload a cover image');
      return;
    }

    if (!title) {
      setError('Please fill in all fields');
      return;
    }

    //to see if quill editor is empty
    var regex = /(<([^>]+)>)/gi;
    const hasText = !!productContent.replace(regex, '').length;
    const hasInfo = !!info.replace(regex, '').length;

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
        price: free ? 0 : price,
        published: published,
        coverImageUrl: newCoverImageUrl,
        coverImageKey: newCoverImageKey,
        files: uploadedFiles,
        productId: product?._id,
        digitalType: digitalType,
        content: hasText ? productContent : '',
        info: hasInfo ? info : '',
        suggestedPrice: suggestedPrice,
        payChoice: payChoice,
        callToAction: callToAction,
        url: url,
        free: free,
        marketplace: marketplace,
        category: category,
      }).unwrap();

      if (editProductReq === 'Product updated') {
        toast.success('Product saved!', { style: { color: 'rgb(28 25 23)' } });
        refetch();
        navigate('/dashboard/item');
      }
    } catch (err) {
      setError('There was an error');
    }
  };

  const handleDelete = async () => {
    const deleteItemReq = await deleteProduct(product._id).unwrap();

    if (deleteItemReq === 'Item deleted') {
      toast.error('Product deleted!', { style: { color: 'rgb(28 25 23)' } });
      navigate('/dashboard/item');
    } else {
      setError('There was an error deleting your product');
      return;
    }
  };

  return (
    <EditDesktop
      product={product}
      title={title}
      setTitle={setTitle}
      digitalType={digitalType}
      setDigitalType={setDigitalType}
      description={description}
      setDescription={setDescription}
      info={info}
      setInfo={setInfo}
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
      link={link}
      setLink={setLink}
      productContent={productContent}
      setProductContent={setProductContent}
      callToAction={callToAction}
      setCallToAction={setCallToAction}
      payChoice={payChoice}
      setPayChoice={setPayChoice}
      suggestedPrice={suggestedPrice}
      setSuggestedPrice={setSuggestedPrice}
      setUrl={setUrl}
      url={url}
      free={free}
      setFree={setFree}
      marketplace={marketplace}
      setMarketplace={setMarketplace}
      category={category}
      handleAction={handleAction}
      handleType={handleType}
      handleCategory={handleCategory}
    />
  );
};

export default EditDigital;
