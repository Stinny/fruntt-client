import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useSelector } from 'react-redux';

//mui
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
//filepond
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const MobileForm = ({
  handleAddProduct,
  handleCancel,
  setDigitalType,
  setTitle,
  setDescription,
  title,
  description,
  setPrice,
  setImage,
  setPublished,
  published,
  image,
  setFiles,
  files,
  setProductContent,
  productContent,
  setSuggestedPrice,
  payChoice,
  setPayChoice,
  setCallToAction,
  callToAction,
  price,
  error,
  info,
  setInfo,
  url,
  setUrl,
  addingProduct,
}) => {
  const currentStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  return (
    <div className='w-full p-2'>
      <div className='mb-2 p-2'>
        <h2 className='text-xl font-medium'>New digital product</h2>
      </div>

      {error && (
        <Alert severity='error' className='mb-2'>
          {error}
        </Alert>
      )}

      <Tabs>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Content</Tab>
        </TabList>

        <TabPanel>
          <form className='w-full border rounded bg-white drop-shadow-md p-2 pb-12'>
            <div className='flex items-center'>
              <p className='text-xl font-medium'>Details</p>
              <Tooltip
                title={
                  <p className='text-lg'>
                    Product details help your customers know what they are
                    buying.
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
                >
                  <option disabled selected hidden>
                    Select product type
                  </option>
                  <option value='video'>Video Course</option>
                  <option value='art'>Art</option>
                  <option value='ebook'>E-Book</option>
                  <option value='audio'>Audio</option>
                  <option value='template'>Template</option>
                  <option value='other'>Other Digital Media</option>
                </select>
                <p className='text-gray-400 mt-4'>Product Title</p>
                <input
                  type='text'
                  className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                  placeholder='Title'
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                />
                <div className='w-full flex justify-end'>
                  <p className='text-sm text-gray-400'>{title.length}/50</p>
                </div>

                <p className='text-gray-400 mt-4'>
                  Product Description(optional)
                </p>
                <textarea
                  type='text'
                  className='h-28 border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                  placeholder='Description'
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={75}
                />
                <div className='w-full flex justify-end'>
                  <p className='text-sm text-gray-400'>
                    {description.length}/75
                  </p>
                </div>

                <p className='text-gray-400 mt-4'>Product Price</p>
                <div className='flex items-center'>
                  <p className='mr-2 font-medium text-xl'>$</p>
                  <input
                    type='number'
                    step={1}
                    className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                    placeholder={payChoice ? '$9+' : '$9'}
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
                        className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                        onChange={(e) => setSuggestedPrice(e.target.value)}
                        placeholder='$9+'
                      />
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div className='border-2 rounded w-full h-44 flex flex-col p-2 mt-2'>
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

              <p className='text-gray-400 mt-2'>URL</p>
              <div className='flex items-center border-2 rounded mt-1 border-gray-200 hover:border-gray-300 p-2 w-full'>
                <span className='underline underline-offset-2 font-medium'>{`${currentStoreUrl}/`}</span>
                <input
                  className='bg-white outline outline-0 w-40'
                  placeholder='ProductName'
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <FormControlLabel
                label='Publish to storefront'
                control={
                  <Switch
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                  />
                }
                className='mt-2'
              />
            </div>

            <p className='text-gray-400 mt-2'>Description</p>
            <ReactQuill
              value={info}
              onChange={setInfo}
              className='h-60 mt-1'
              placeholder='Start typing description here...'
            />
          </form>
        </TabPanel>

        <TabPanel>
          <div className='pb-12 border rounded bg-white drop-shadow-md p-2 w-full'>
            <div className='flex items-center'>
              <p className='text-xl font-medium'>Content</p>
              <Tooltip
                title={
                  <p className='text-lg'>
                    Images, zip files, PDFs, video, etc..
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
            <p className='text-gray-400 font-medium mb-4'>
              Add any files and/or content you want to include in the digital
              product. All content and files are available to customers
              immediately after purchase.
            </p>
            <FilePond
              file={files}
              name='digitalProducts'
              allowMultiple
              onupdatefiles={(fileItems) => {
                setFiles(fileItems.map((fileItem) => fileItem.file));
              }}
            />

            <div className='mt-6'>
              <ReactQuill
                // theme='snow'
                onChange={setProductContent}
                placeholder='Start typing here...'
                className='h-60'
              />
            </div>
          </div>
        </TabPanel>
      </Tabs>

      <div className='w-full bg-white p-2 rounded border drop-shadow-md flex flex-col mt-2'>
        <button
          type='button'
          onClick={handleAddProduct}
          disabled={addingProduct}
          className='border-2 rounded h-14 w-full text-slate-800 border-slate-800 hover:bg-slate-800 hover:text-white mt-4'
        >
          {addingProduct ? 'ADDING...' : '+ ADD PRODUCT'}
        </button>
        <button
          type='button'
          onClick={handleCancel}
          className='border-2 rounded h-8 w-full text-red-400 border-red-400 hover:bg-red-400 hover:text-white mt-2'
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default MobileForm;
