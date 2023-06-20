import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import CoverImage from './CoverImage';
import Files from './Files';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';

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
  setProductContent,
  callToAction,
  setCallToAction,
  payChoice,
  setPayChoice,
  suggestedPrice,
  setSuggestedPrice,
  deletingProduct,
}) => {
  const modalStyles = isMobile
    ? {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
        },
      }
    : {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
        },
      };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className='w-11/12 mx-auto'>
          <p className='text-lg font-medium text-slate-800 mb-4 border-b'>
            Delete Product
          </p>

          <p className='text-xl mt-2 mb-2'>
            Are you sure you want to delete this product?
          </p>

          {error && (
            <Alert className='w-full mb-2 mt-2' severity='error'>
              {error}
            </Alert>
          )}

          <button
            type='button'
            // disabled={deletingPage}
            onClick={handleDelete}
            className='h-14 w-full border-red-400 text-red-400 border-2 rounded mt-2 hover:bg-red-400 hover:text-white'
          >
            {deletingProduct ? 'Deleting product...' : 'Yes, delete product'}
          </button>

          <button
            onClick={closeModal}
            className='h-10 w-full border-slate-800 text-slate-800 border-2 rounded mt-2 hover:bg-slate-800 hover:text-white'
            type='button'
          >
            Cancel
          </button>
        </div>
      </Modal>
      <div className='w-full'>
        <div className='mb-4 flex justify-between p-2'>
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
              onClick={openModal}
              type='button'
            >
              DELETE
            </button>
            <button
              className='w-32 h-10 rounded border-stone-800 border-2 hover:text-white hover:bg-stone-800'
              onClick={handleSaveEdit}
              type='button'
            >
              SAVE
            </button>
          </div>
        </div>

        <form
          className='w-full border rounded bg-white p-2 drop-shadow-md'
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
                maxLength={50}
              />
              <div className='w-full flex justify-end'>
                <p className='text-sm text-gray-400'>{title.length}/50</p>
              </div>

              <p className='text-gray-400 mt-4'>Product Summary (optional)</p>
              <textarea
                type='text'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={75}
              />
              <div className='w-full flex justify-end'>
                <p className='text-sm text-gray-400'>{description.length}/75</p>
              </div>

              <p className='text-gray-400 mt-4'>Product Price</p>
              <div className='flex items-center'>
                <div className='mr-4'>
                  <p className='text-xl font-medium'>$</p>
                </div>
                <input
                  type='number'
                  step={1}
                  min={0}
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
                    <div className='flex items-center w-full'>
                      <div className='w-1/12'>
                        <p className='text-xl font-medium'>$</p>
                      </div>
                      <input
                        type='number'
                        className='border-2 border-slate-200 w-11/12 rounded p-2 outline outline-0 bg-white'
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
                  </div>
                  <div className='flex flex-col w-6/12 ml-2'>
                    <p className='text-gray-400'>Suggested price/placeholder</p>
                    <div className='flex items-center w-full'>
                      <div className='w-1/12'>
                        <p className='text-xl font-medium'>$</p>
                      </div>
                      <input
                        className='border-2 text-gray-400 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                        onChange={(e) => setSuggestedPrice(e.target.value)}
                        placeholder='$9+'
                        value={suggestedPrice}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>

            <div className='border-2 rounded w-6/12 ml-4 flex flex-col justify-center p-2'>
              <CoverImage
                product={product}
                productId={product._id}
                image={image}
                setImage={setImage}
                refetchProduct={refetchProduct}
              />
              <p className='text-gray-400'>Call to action</p>
              <select
                onChange={(e) => setCallToAction(e.target.value)}
                className='w-full h-14 rounded p-2'
                value={callToAction}
              >
                <option value='buy'>Buy Now</option>
                <option value='want'>I want this!</option>
                <option value='get'>Get Now</option>
              </select>
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
    </>
  );
};

export default EditDesktop;
