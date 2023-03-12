import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import DesktopForm from '../../components/DigitalProd/DesktopForm';
import MobileForm from '../../components/DigitalProd/MobileForm';
import { isMobile } from 'react-device-detect';
import { uploadImageRequest } from '../../api/requests';
import { useAddDigitalProductMutation } from '../../api/productsApiSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { EditorState, convertToRaw } from 'draft-js';

const AddDigitalProd = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;
  const currentStoreID = useSelector((state) => state.user.selectedStore);

  //form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [files, setFiles] = useState([]);
  const [published, setPublished] = useState(true);
  const [digitalType, setDigitalType] = useState('');
  const [link, setLink] = useState('');
  const [productContent, setProductContent] = useState(
    EditorState.createEmpty()
  );

  const [addDigitalProduct, result] = useAddDigitalProductMutation();

  const handleCancel = () => {
    navigate('/dashboard/item');
  };

  const handleProductContent = (edits) => {
    setProductContent(edits);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    console.log(
      JSON.stringify(convertToRaw(productContent.getCurrentContent()))
    );

    let coverPicUrl;
    let coverPicKey;
    let uploadedFiles = [];

    //try to upload cover image and all files first
    //if request is success
    //send request to create product

    if (!title || !description || !digitalType || !price) {
      setError('Please fill out all fields to complete your product');
      return;
    }
    try {
      if (image.length) {
        const imageToUpload = new FormData();
        imageToUpload.append('productImages', image[0].file);
        const imageDataReq = await uploadImageRequest.post(
          '/products/imageupload',
          imageToUpload
        );
        coverPicUrl = imageDataReq.data[0].url;
        coverPicKey = imageDataReq.data[0].key;

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

        const addDigitalProductReq = await addDigitalProduct({
          title,
          description,
          price,
          coverImage: imageDataReq.data,
          files: uploadedFiles,
          storeId: currentStoreID,
          published: published,
          digitalType,
          link: link,
          content: JSON.stringify(
            convertToRaw(productContent.getCurrentContent())
          ),
        }).unwrap();

        if (addDigitalProductReq.msg === 'Product added') {
          currentUser.store = addDigitalProductReq.store;
          const newUser = JSON.stringify(currentUser);
          Cookies.set('currentUser', newUser, { sameSite: 'Lax' });
          navigate('/dashboard/item');
        }

        console.log(addDigitalProductReq);
      }
    } catch (err) {
      setError('There was a server error');
    }
  };

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto'>
        {isMobile ? (
          <MobileForm
            handleAddProduct={handleAddProduct}
            handleCancel={handleCancel}
            setTitle={setTitle}
            setDescription={setDescription}
            setImage={setImage}
            setFiles={setFiles}
            setPrice={setPrice}
            setPublished={setPublished}
            published={published}
            setDigitalType={setDigitalType}
            productContent={productContent}
            handleProductContent={handleProductContent}
          />
        ) : (
          <DesktopForm
            handleAddProduct={handleAddProduct}
            handleCancel={handleCancel}
            setTitle={setTitle}
            setDescription={setDescription}
            setImage={setImage}
            setFiles={setFiles}
            setPrice={setPrice}
            setPublished={setPublished}
            published={published}
            setDigitalType={setDigitalType}
            setLink={setLink}
            productContent={productContent}
            handleProductContent={handleProductContent}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default AddDigitalProd;
