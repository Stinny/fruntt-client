import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

//mui
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

//filepond
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const DesktopForm = ({
  handleAddProduct,
  handleCancel,
  setDigitalType,
  setTitle,
  setDescription,
  setPrice,
  setImage,
  setPublished,
  published,
  image,
  setFiles,
  files,
}) => {
  return (
    <div className='w-full'>
      <div className='mb-10 flex justify-between border-b-2 p-2'>
        <h2 className='text-3xl font-medium'>Add your digital product</h2>

        <div className='flex'>
          <button
            className='w-32 h-10 rounded border-red-400 text-red-400 border-2 mr-2 hover:text-white hover:bg-red-400'
            onClick={handleCancel}
            type='button'
          >
            CANCEL
          </button>
          <button
            className='w-40 h-10 rounded border-slate-800 border-2 hover:text-white hover:bg-slate-800'
            onClick={handleAddProduct}
            type='button'
          >
            + ADD PRODUCT
          </button>
        </div>
      </div>

      <form className='w-full' onSubmit={handleAddProduct}>
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

        <div className='flex items-center justify-between w-full mt-2'>
          <div className='flex flex-col w-6/12'>
            <p className='text-gray-400'>Product Type</p>
            <select
              onChange={(e) => setDigitalType(e.target.value)}
              className='w-full h-14 rounded p-2'
            >
              <option disabled selected hidden>
                Select product type
              </option>
              <option value='video'>Video Course</option>
              <option value='printable'>Printables</option>
              <option value='ebook'>E-Book</option>
              <option value='podcast'>Podcast</option>
              <option value='other'>Other Digital Media</option>
            </select>
            <p className='text-gray-400'>Product Title</p>
            <input
              type='text'
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
            />

            <p className='text-gray-400 mt-4'>Product Description(optional)</p>
            <textarea
              type='text'
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
            />

            <p className='text-gray-400 mt-4'>Product Price</p>
            <div className='flex items-center'>
              <p className='mr-2 font-medium text-xl'>$</p>
              <input
                type='decimal'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                placeholder='Price'
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <FormControlLabel
              label='Publish to product page'
              control={
                <Switch
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
              }
              className='mt-2'
            />
          </div>

          <div className='border-2 rounded w-6/12 h-44 ml-4 flex flex-col p-2'>
            <p className='text-lg font-medium text-slate-800 text-center'>
              Upload a cover image
            </p>
            <p className='text-gray-400 font-medium text-center'>
              This will be the image your customers will see
            </p>

            <FilePond
              file={image}
              imageResizeTargetWidth={200}
              name='productImages'
              onupdatefiles={(file) => setImage(file)}
            />
          </div>
        </div>

        <div className='flex items-center mt-4'>
          <p className='text-xl font-medium'>Content</p>
          <Tooltip
            title={
              <p className='text-lg'>Images, zip files, PDFs, video, etc..</p>
            }
            className='ml-2 text-lg'
            placement='right-end'
          >
            <button type='button' disabled>
              <AiOutlineInfoCircle />
            </button>
          </Tooltip>
        </div>
        <p className='text-gray-400 font-medium mb-4'>
          Add any files you want to include in the digital purchase. All files
          will automatically be sent to customers after purchase.
        </p>
        <FilePond
          file={files}
          name='digitalProducts'
          allowMultiple
          onupdatefiles={(fileItems) => {
            setFiles(fileItems.map((fileItem) => fileItem.file));
          }}
        />

        <button className='border-2 rounded h-14 w-full text-slate-800 border-slate-800 hover:bg-slate-800 hover:text-white mt-4'>
          + ADD PRODUCT
        </button>
        <button
          type='button'
          onClick={handleCancel}
          className='border-2 rounded h-8 w-full text-red-400 border-red-400 hover:bg-red-400 hover:text-white mt-2'
        >
          CANCEL
        </button>
      </form>
    </div>
  );
};

export default DesktopForm;
