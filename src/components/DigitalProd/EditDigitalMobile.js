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
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

    //to see if quill editor is empty on save
    var regex = /(<([^>]+)>)/gi;
    const hasText = !!productContent.replace(regex, '').length;

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
        link: link,
        content: hasText ? productContent : '',
        suggestedPrice: suggestedPrice,
        payChoice: payChoice,
        callToAction: callToAction,
      }).unwrap();

      if (editProductReq === 'Product updated') {
        refetch();
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
    <div className='w-full p-2'>
      <div className='mb-2 flex flex-col border-b-2 p-2'>
        <h2 className='text-3xl font-medium'>Edit your digital product</h2>
      </div>

      <form
        className='w-full border rounded bg-white drop-shadow-md p-2'
        onSubmit={handleSaveEdit}
      >
        {error && <Alert severity='error'>{error}</Alert>}
        <div className='flex items-center'>
          <p className='text-xl font-medium'>Details</p>
          <Tooltip
            title={
              <p className='text-lg'>
                Product details help your customers know what they are buying.
              </p>
            }
            className='ml-2 text-lg'
            placement='right-end'
          >
            <button type='button' disabled>
              <AiOutlineInfoCircle />
            </button>
          </Tooltip>
        </div>

        <div className='flex flex-col w-full mt-2'>
          <div className='flex flex-col w-full'>
            <p className='text-gray-400'>Product Type</p>
            <select
              onChange={(e) => setDigitalType(e.target.value)}
              className='w-full h-14 rounded p-2'
              value={digitalType}
            >
              <option value='video'>Video Course</option>
              <option value='printable'>Printables</option>
              <option value='ebook'>E-Book</option>
              <option value='podcast'>Podcast</option>
              <option value='template'>Template</option>
              <option value='other'>Other Digital Media</option>
            </select>

            <p className='text-gray-400 mt-4'>Product Title</p>
            <input
              type='text'
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <p className='text-gray-400 mt-4'>Product Summary (optional)</p>
            <textarea
              type='text'
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white h-28'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <p className='text-gray-400 mt-4'>Product Price</p>
            <div className='flex items-center'>
              <div className='mr-4'>
                <p className='text-xl font-medium'>$</p>
              </div>
              <input
                type='number'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
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

            {payChoice ? (
              <div className='flex items-center'>
                <div className='flex flex-col w-6/12'>
                  <p className='text-gray-400'>Minimum price</p>
                  <input
                    type='number'
                    className='border-2 border-slate-200 w-full rounded p-2 outline outline-0 bg-white'
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
                  <p className='text-gray-400'>Suggested price</p>
                  <input
                    className='border-2 text-gray-400 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
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
            <p className='text-gray-400 mt-2'>Call to action</p>
            <select
              onChange={(e) => setCallToAction(e.target.value)}
              className='w-full h-14 rounded p-2'
              value={callToAction}
            >
              <option value='buy'>Buy Now</option>
              <option value='want'>I want this!</option>
              <option value='get'>Get Now</option>
            </select>
            <FormControlLabel
              label='Publish to page'
              control={
                <Switch
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
              }
              className='mt-2'
            />
          </div>
        </div>

        <div className='flex items-center mt-4 border-t'>
          <p className='text-xl font-medium mt-6'>Edit Content</p>
          <Tooltip
            title={
              <p className='text-lg'>Images, zip files, PDFs, video, etc..</p>
            }
            className='ml-2 text-lg mt-6'
            placement='right-end'
          >
            <button type='button' disabled>
              <AiOutlineInfoCircle />
            </button>
          </Tooltip>
        </div>
        <p className='text-gray-400 font-medium mb-4'>
          All content and files are available to customers immediately after
          purchase
        </p>

        <div className='flex flex-col'>
          <p className='text-gray-400 mt-4'>Content currently added</p>
        </div>

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

        <div className='w-full border rounded mt-6'>
          {/* <Editor
            editorState={productContent}
            toolbarClassName='toolbarClassName'
            wrapperClassName='wrapperClassName'
            editorClassName='editorClassName'
            onEditorStateChange={handleProductContent}
            placeholder='Start typing here..'
            toolbar={{
              options: [
                'inline',
                'blockType',
                'fontSize',
                'list',
                'textAlign',
                'colorPicker',
                'link',
                'embedded',
                'emoji',
                'image',
                'remove',
                'history',
              ],
            }}
          /> */}
          <ReactQuill
            // theme='snow'
            value={productContent}
            onChange={setProductContent}
            placeholder='Start typing here'
          />
        </div>

        <button
          type='submit'
          className='border-2 rounded h-14 w-full text-slate-800 border-slate-800 hover:bg-slate-800 hover:text-white mt-4'
        >
          SAVE
        </button>
        <button
          type='button'
          onClick={handleDelete}
          className='border-2 rounded h-8 w-full text-red-400 border-red-400 hover:bg-red-400 hover:text-white mt-2'
        >
          DELETE
        </button>
      </form>
    </div>
  );
};

export default EditDigitalMobile;
