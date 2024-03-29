import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import CoverImage from './CoverImage';
import Files from './Files';
import {
  useUpdateDigitalProductMutation,
  useDeleteProductMutation,
  useDeleteItemImageMutation,
} from '../../api/productsApiSlice';
import { uploadImageRequest } from '../../api/requests';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';

//filepond
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

//mui
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';

const EditDigitalMobile = ({ product, productId, refetch }) => {
  const navigate = useNavigate();

  const currentStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  const [error, setError] = useState('');

  const [title, setTitle] = useState(product?.title);
  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(product?.price);
  const [image, setImage] = useState([]);
  const [files, setFiles] = useState([]);
  const [published, setPublished] = useState(product?.published);
  const [digitalType, setDigitalType] = useState(product?.digitalType);
  const [link, setLink] = useState(product?.link);
  const [productContent, setProductContent] = useState(product?.content);
  const [callToAction, setCallToAction] = useState(product?.callToAction);
  const [payChoice, setPayChoice] = useState(product?.payChoice);
  const [suggestedPrice, setSuggestedPrice] = useState(product?.suggestedPrice);
  const [url, setUrl] = useState(product?.url);
  const [info, setInfo] = useState(product?.info);
  const [free, setFree] = useState(product?.free);
  const [marketplace, setMarketplace] = useState(product?.marketplace);
  const [category, setCategory] = useState(product?.category);

  const [updateDigitalProduct, result] = useUpdateDigitalProductMutation();
  const [deleteProduct, deleteProductResult] = useDeleteProductMutation();

  const typeOptions = [
    { value: 'video', label: 'Course' },
    { value: 'art', label: 'Art' },
    { value: 'ebook', label: 'E-Book' },
    { value: 'template', label: 'Template' },
    { value: 'other', label: 'Other' },
  ];

  const actionOptions = [
    { value: 'buy', label: 'Buy Now' },
    { value: 'want', label: 'I want this!' },
    { value: 'get', label: 'Get Now' },
  ];

  const categories = [
    { value: 'business', label: 'Business & Finance' },
    { value: 'design', label: 'Design' },
    { value: 'software', label: 'Software Development' },
    { value: 'drawing', label: 'Drawing & Painting' },
    { value: 'writing', label: 'Writing' },
    { value: 'education', label: 'Education' },
    { value: 'self', label: 'Self Improvement' },
    { value: 'other', label: 'Other' },
  ];

  const formattedTypeValue = typeOptions.find(
    (option) => option.value === digitalType
  );

  const formattedActionValue = actionOptions.find(
    (option) => option.value === callToAction
  );

  const formattedCategory = categories.find((cat) => cat.value === category);

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
    let uploadedImages = [];
    let newCoverImageUrl = '';
    let newCoverImageKey = '';

    if (product.coverImage.url === '' && !image.length) {
      setError('Please upload a cover image');
      return;
    }

    //to see if quill editor is empty on save
    var regex = /(<([^>]+)>)/gi;
    const hasText = !!productContent.replace(regex, '').length;

    try {
      //first try to upload new coverImage if one exists
      if (image.length) {
        const imageToUpload = new FormData();
        // imageToUpload.append('productImages', image[0].file);
        // const imageDataReq = await uploadImageRequest.post(
        //   '/products/imageupload',
        //   imageToUpload
        // );
        // newCoverImageUrl = imageDataReq.data[0].url;
        // newCoverImageKey = imageDataReq.data[0].key;
        for (var x = 0; x < image.length; x++) {
          imageToUpload.append('productImages', image[x]);
        }
        const imageDataReq = await uploadImageRequest.post(
          '/products/imageupload',
          imageToUpload
        );
        // newCoverImageUrl = imageDataReq.data[0].url;
        // newCoverImageKey = imageDataReq.data[0].key;
        uploadedImages = imageDataReq.data;
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
        coverImage: uploadedImages,
        files: uploadedFiles,
        productId: product?._id,
        digitalType: digitalType,
        link: link,
        content: hasText ? productContent : '',
        suggestedPrice: suggestedPrice,
        payChoice: payChoice,
        callToAction: callToAction,
        url: url,
        info: info,
        marketplace: marketplace,
        free: free,
        category: category,
      }).unwrap();

      if (editProductReq === 'Product updated') {
        refetch();
        toast.success('Product saved!', { style: { color: 'rgb(28 25 23)' } });
        navigate('/dashboard/item');
      }
    } catch (err) {
      setError('There was an error');
    }
  };

  const handleProductContent = (edits) => {
    setProductContent(edits);
  };

  const handleDelete = async () => {
    const deleteItemReq = await deleteProduct(product._id);
    navigate('/dashboard/item');
  };

  return (
    <div className='w-full p-2 mt-16'>
      <div className='mb-2'>
        <h2 className='text-xl font-medium'>Edit your digital product</h2>
      </div>

      <Tabs>
        <TabList>
          <Tab>
            <span className='text-sm'>Details</span>
          </Tab>
          <Tab>
            <span className='text-sm'>Content</span>
          </Tab>

          <Tab>
            <span className='text-sm'>Marketplace</span>
          </Tab>
        </TabList>

        <TabPanel>
          <form className='w-full border rounded bg-white drop-shadow-md p-2'>
            {error && <Alert severity='error'>{error}</Alert>}
            <div className='flex items-center'>
              <p className='text-md font-medium'>Details</p>
            </div>

            <div className='flex flex-col w-full mt-2'>
              <div className='flex flex-col w-full pb-12'>
                {/* <p className='text-stone-800 text-sm'>Type</p>

                <Select
                  options={typeOptions}
                  onChange={handleType}
                  value={formattedTypeValue}
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  isSearchable={false}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: 'rgb(229 231 235)',
                      borderWidth: 2,
                      '&:hover': {
                        borderColor: 'rgb(209 213 219)', // Keep the same border color on hover
                      },
                      boxShadow: 'none',
                      zIndex: 99999,
                      position: 'relative',
                    }),
                    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                  className=''
                /> */}

                <p className='text-stone-800 text-sm mt-4'>Title</p>
                <input
                  type='text'
                  className='border-2 text-sm border-gray-100 hover:border-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                />
                <div className='w-full flex justify-end'>
                  <p className='text-sm text-gray-400'>{title.length}/50</p>
                </div>

                <p className='text-stone-800 text-sm mt-4'>
                  Summary (optional)
                </p>
                <textarea
                  type='text'
                  className='border-2 text-sm border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 w-full rounded-md p-2 outline outline-0 h-28'
                  placeholder='Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={75}
                />
                <div className='w-full flex justify-end'>
                  <p className='text-sm text-gray-400'>
                    {description.length}/75
                  </p>
                </div>

                <p className='text-stone-800 text-sm mt-4'>Price</p>
                <div className='flex items-center'>
                  <div className='mr-4'>
                    <p className='text-xl font-medium'>$</p>
                  </div>
                  <input
                    type='number'
                    className='border-2 border-gray-100 hover:border-gray-200 w-full rounded-md text-sm p-2 outline outline-0 bg-gray-100'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                {free ? (
                  ''
                ) : (
                  <FormControlLabel
                    label='Let customers pay what they want'
                    control={
                      <Switch
                        checked={payChoice}
                        onChange={(e) => setPayChoice(e.target.checked)}
                      />
                    }
                    className='mt-2'
                  />
                )}

                {payChoice ? (
                  ''
                ) : (
                  <FormControlLabel
                    label='Free template'
                    control={
                      <Switch
                        checked={free}
                        onChange={(e) => setFree(e.target.checked)}
                      />
                    }
                    className='mt-2 mb-2'
                  />
                )}

                {payChoice ? (
                  <div className='flex items-center mb-2'>
                    <div className='flex flex-col w-6/12'>
                      <p className='text-stone-900 text-sm'>Minimum price</p>
                      <input
                        type='number'
                        className='border-2 border-gray-100 w-full rounded-md p-2 outline outline-0 bg-gray-100 text-sm'
                        step={1}
                        placeholder='$9+'
                        value={price}
                        disabled
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'textfield',
                        }}
                      />
                    </div>
                    <div className='flex flex-col w-6/12 ml-2'>
                      <p className='text-stone-800 text-sm'>Suggested price</p>
                      <input
                        className='border-2 text-sm text-gray-400 border-gray-100 hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100'
                        onChange={(e) => setSuggestedPrice(e.target.value)}
                        placeholder='$9+'
                        value={suggestedPrice}
                      />
                    </div>
                  </div>
                ) : (
                  ''
                )}

                <CoverImage
                  product={product}
                  productId={productId}
                  image={image}
                  setImage={setImage}
                  refetchProduct={refetch}
                />

                <FormControlLabel
                  label='Publish to store'
                  control={
                    <Switch
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                    />
                  }
                  className='mt-2'
                />

                <p className='text-stone-800 text-sm mt-2'>Call to action</p>

                <Select
                  options={actionOptions}
                  onChange={handleAction}
                  value={formattedActionValue}
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  isSearchable={false}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: 'rgb(243 244 246)',
                      borderWidth: 2,

                      '&:hover': {
                        borderColor: 'rgb(229 231 235)', // Keep the same border color on hover
                        backgroundColor: 'rgb(229 231 235)',
                      },
                      backgroundColor: 'rgb(243 244 246)',
                      boxShadow: 'none',
                      zIndex: 99999,
                      position: 'relative',
                    }),
                    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                  className='mt-1'
                />

                <p className='text-stone-800 text-sm mt-2'>URL</p>
                <div className='flex items-center border-2 rounded border-gray-200 hover:border-gray-300 p-2 w-full'>
                  <span className='underline underline-offset-2 text-sm font-medium'>{`${currentStoreUrl}/`}</span>
                  <input
                    className='bg-white outline outline-0 w-full text-sm'
                    placeholder='TemplateName'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>

                <p className='text-stone-800 text-sm mt-2'>Description</p>
                <ReactQuill
                  value={info}
                  onChange={setInfo}
                  className='h-60 mt-1 mb-10'
                  placeholder='Start typing description here...'
                />
              </div>
            </div>
          </form>
        </TabPanel>

        <TabPanel>
          <div className='w-full bg-white drop-shadow-md border rounded p-2 pb-12'>
            <div className='flex items-center'>
              <p className='text-md font-medium'>Content</p>
            </div>
            <p className='text-stone-800 text-sm mb-4'>
              All content and files are available to customers immediately after
              purchase
            </p>

            <Files
              productId={productId}
              product={product}
              formFiles={files}
              setFormFiles={setFiles}
              refetchProduct={refetch}
            />

            <div className='w-full mt-4'>
              <FilePond
                file={files}
                name='digitalProducts'
                allowMultiple
                onupdatefiles={(fileItems) => {
                  setFiles(fileItems.map((fileItem) => fileItem.file));
                }}
              />
            </div>

            <div className='w-full rounded mt-6'>
              <ReactQuill
                className='h-60 mb-10'
                value={productContent}
                onChange={setProductContent}
                placeholder='Start typing here'
              />
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className='h-screen flex flex-col border rounded w-full shadow-lg bg-white p-2'>
            <div className='flex items-center'>
              <p className='text-md text-stone-800'>Marketplace</p>
            </div>
            <p className='text-stone-800 text-sm mt-1'>
              List your template in our marketplace for other creators and
              customers to discover.
            </p>
            <FormControlLabel
              label='Publish to marketplace'
              control={
                <Switch
                  checked={marketplace}
                  onChange={(e) => setMarketplace(e.target.checked)}
                />
              }
              className='mt-2'
            />
            <p className='text-stone-800 text-sm mt-2'>Template category</p>
            <Select
              options={categories}
              onChange={handleCategory}
              value={formattedCategory}
              menuPortalTarget={document.body}
              menuPosition={'fixed'}
              isSearchable={false}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: 'rgb(229 231 235)',
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: 'rgb(209 213 219)', // Keep the same border color on hover
                  },
                  boxShadow: 'none',
                  position: 'relative',
                }),
                menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
              className='mt-1 w-64'
            />
          </div>
        </TabPanel>
      </Tabs>

      <div className='w-full bg-white border rounded p-2 drop-shadow-md mt-2'>
        <button
          type='button'
          onClick={handleSaveEdit}
          className='border-2 rounded h-12 w-full text-slate-800 border-slate-800 hover:bg-slate-800 hover:text-white text-sm'
        >
          SAVE
        </button>
        <button
          type='button'
          onClick={handleDelete}
          className='border-2 rounded h-8 w-full text-red-400 border-red-400 hover:bg-red-400 hover:text-white mt-2 text-sm'
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default EditDigitalMobile;
