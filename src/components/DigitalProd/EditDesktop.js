import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import CoverImage from './CoverImage';
import Files from './Files';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';

//filepond
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

//mui
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';

const EditDesktop = ({
  handleDelete,
  handleSaveEdit,
  setTitle,
  title,
  setDescription,
  description,
  price,
  setPrice,
  published,
  setPublished,
  setFiles,
  files,
  setImage,
  image,
  product,
  digitalType,
  setDigitalType,
  error,
  refetchProduct,
  productContent,
  handleProductContent,
}) => {
  return (
    <div className='w-full'>
      <div className='mb-10 flex justify-between border-b-2 p-2'>
        <h2 className='text-3xl font-medium'>Edit your digital product</h2>

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

        <div className='flex'>
          <button
            className='w-32 h-10 rounded border-red-400 text-red-400 border-2 mr-2 hover:text-white hover:bg-red-400'
            onClick={handleDelete}
            type='button'
          >
            DELETE
          </button>
          <button
            className='w-40 h-10 rounded border-slate-800 border-2 hover:text-white hover:bg-slate-800'
            onClick={handleSaveEdit}
            type='button'
          >
            SAVE
          </button>
        </div>
      </div>

      <form className='w-full' onSubmit={handleSaveEdit}>
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

        <div className='flex justify-between w-full mt-2'>
          <div className='flex flex-col w-6/12'>
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
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <p className='text-gray-400 mt-4'>Product Price</p>
            <div className='flex items-center'>
              <input
                type='number'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className='border-2 rounded w-6/12 ml-4 flex flex-col justify-center p-2'>
            <CoverImage
              product={product}
              productId={product._id}
              image={image}
              setImage={setImage}
              refetchProduct={refetchProduct}
            />
          </div>
        </div>

        <div className='flex items-center mt-4 border-t-2'>
          <p className='text-xl font-medium mt-4'>Content</p>
          <Tooltip
            title={
              <p className='text-lg'>Images, zip files, PDFs, video, etc..</p>
            }
            className='ml-2 text-lg mt-4'
            placement='right-end'
          >
            <button type='button' disabled>
              <AiOutlineInfoCircle />
            </button>
          </Tooltip>
        </div>
        <p className='text-gray-400 font-medium mb-4'>
          Add any files and content you want to include in your digital
          purchase. A download link will be sent to customers automatically
          after purchase.
        </p>

        <div className='flex flex-col'>
          <p className='text-gray-400 mt-4'>Content currently added</p>
        </div>

        <Files
          productId={product._id}
          product={product}
          formFiles={files}
          setFormFiles={setFiles}
          refetchProduct={refetchProduct}
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
          <Editor
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
          />
        </div>

        {/* <div className='flex flex-col'>
          <p className='font-medium'>Add a link</p>
          <p className='font-medium text-gray-400'>
            This is just a link for customers to click after purchase, not a
            redirect
          </p>
          <input
            type='text'
            className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white mt-2'
            placeholder='https://www.yourlink.com'
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
        </div> */}

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

export default EditDesktop;
