import React from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

//mui
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';

//filepond
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const DesktopForm = ({
  handleAddProduct,
  handleCancel,
  setDigitalType,
  digitalType,
  setTitle,
  setDescription,
  description,
  title,
  setPrice,
  setImage,
  setPublished,
  published,
  image,
  setFiles,
  files,
  error,
  setCallToAction,
  callToAction,
  payChoice,
  setPayChoice,
  price,
  info,
  setInfo,
  setSuggestedPrice,
  suggestedPrice,
  setProductContent,
  productContent,
  url,
  setUrl,
  addingProduct,
}) => {
  const currentStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  return (
    <div className='w-full'>
      <div className='mb-4 flex justify-between p-2'>
        <h2 className='text-3xl font-medium'>Add your digital product</h2>
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
            onClick={handleCancel}
            type='button'
          >
            CANCEL
          </button>
          <button
            className='w-40 h-10 rounded border-stone-800 border-2 hover:text-white hover:bg-stone-800 text-stone-800'
            onClick={handleAddProduct}
            type='button'
            disabled={addingProduct}
          >
            {addingProduct ? 'ADDING...' : '+ ADD PRODUCT'}
          </button>
        </div>
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
          <form
            className='w-full border rounded bg-white drop-shadow-md p-2 pb-12'
            onSubmit={handleAddProduct}
          >
            <div className='flex items-center'>
              <p className='text-2xl font-medium'>Details</p>
              <Tooltip
                title={
                  <p className='text-lg'>
                    This is the information your customers will see before
                    buying the product
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
                  className='w-full h-14 rounded p-2 mt-1'
                  value={digitalType}
                >
                  <option disabled selected hidden value=''>
                    Select product type
                  </option>
                  <option value='video'>Video Course</option>
                  <option value='printable'>Printables</option>
                  <option value='ebook'>E-Book</option>
                  <option value='podcast'>Podcast</option>
                  <option value='template'>Template</option>
                  <option value='other'>Other Digital Media</option>
                </select>
                <p className='text-gray-400 mt-4'>Title</p>
                <input
                  type='text'
                  className='border-2 border-gray-200 hover:border-gray-300 w-full rounded p-2 outline outline-0 bg-white mt-1'
                  placeholder='Title'
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  maxLength={50}
                />
                <div className='w-full flex justify-end'>
                  <p className='text-sm text-gray-400'>{title.length}/50</p>
                </div>

                <p className='text-gray-400 mt-4'>Summary (optional)</p>
                <textarea
                  type='text'
                  className='border-2 border-gray-200 hover:border-gray-300 w-full rounded p-2 outline outline-0 bg-white mt-1'
                  placeholder='Summary'
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  maxLength={75}
                />
                <div className='w-full flex justify-end'>
                  <p className='text-sm text-gray-400'>
                    {description.length}/75
                  </p>
                </div>

                <p className='text-gray-400 mt-4'>Price</p>
                <div className='flex items-center'>
                  <div className='mr-4'>
                    <p className='text-xl font-medium'>$</p>
                  </div>
                  <input
                    type='number'
                    className='border-2 border-gray-200 hover:border-gray-300 w-full rounded p-2 outline outline-0 bg-white mt-1'
                    placeholder={payChoice ? '$9+' : '$9'}
                    step={1}
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
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
                          className='border-2 border-gray-200 hover:border-gray-300 w-11/12 rounded p-2 outline outline-0 bg-white mt-1'
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
                      <p className='text-gray-400'>
                        Suggested price/placeholder
                      </p>
                      <div className='flex items-center w-full'>
                        <div className='w-1/12'>
                          <p className='text-xl font-medium'>$</p>
                        </div>
                        <input
                          className='border-2 text-gray-600 border-gray-200 hover:border-gray-300 w-full rounded p-2 outline outline-0 bg-white mt-1'
                          onChange={(e) => setSuggestedPrice(e.target.value)}
                          value={suggestedPrice}
                          placeholder='$9+'
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div className='border-2 rounded w-6/12 ml-4 flex flex-col p-2'>
                <p className='text-lg font-medium text-slate-800 text-center'>
                  Upload a cover image
                </p>
                <p className='text-gray-400 font-medium text-center'>
                  This will be the image your customers will see
                </p>

                <FilePond
                  files={image}
                  imageResizeTargetWidth={200}
                  name='productImages'
                  onupdatefiles={(file) => setImage(file)}
                  instantUpload={false}
                />
                <p className='text-gray-400'>Call to action</p>
                <select
                  onChange={(e) => setCallToAction(e.target.value)}
                  className='w-full h-14 rounded p-2 mt-1'
                  value={callToAction}
                >
                  <option value='buy'>Buy Now</option>
                  <option value='want'>I want this!</option>
                  <option value='get'>Get Now</option>
                </select>

                <p className='text-gray-400 mt-2'>URL</p>
                <div className='flex items-center border-2 rounded mt-1 border-gray-200 hover:border-gray-300 p-2'>
                  <span className='underline underline-offset-2 font-medium'>{`${currentStoreUrl}/`}</span>
                  <input
                    className='bg-white outline outline-0'
                    placeholder='YourProductName'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <p className='text-gray-400 mt-2'>Description</p>
            <ReactQuill
              value={info}
              onChange={setInfo}
              className='h-72 mt-1'
              placeholder='Start typing description here...'
            />

            {/* <button className='border-2 rounded h-14 w-full text-stone-800 border-stone-800 hover:bg-stone-800 hover:text-white mt-4'>
              + ADD PRODUCT
            </button>
            <button
              type='button'
              onClick={handleCancel}
              className='border-2 rounded h-8 w-full text-red-400 border-red-400 hover:bg-red-400 hover:text-white mt-2'
            >
              CANCEL
            </button> */}
          </form>
        </TabPanel>

        <TabPanel>
          <div className='border rounded bg-white drop-shadow-lg p-2 pb-12'>
            <div className='flex items-center'>
              <p className='text-2xl font-medium'>Content</p>
              <Tooltip
                title={
                  <p className='text-lg'>
                    This is the information customers will see after buying the
                    product
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
              Add any files and content you want to include in the digital
              purchase. All content and files are available to customers
              immediately after purchase.
            </p>
            <FilePond
              files={files}
              name='digitalProducts'
              allowMultiple
              onupdatefiles={(fileItems) => {
                setFiles(fileItems.map((fileItem) => fileItem.file));
              }}
            />

            <ReactQuill
              onChange={setProductContent}
              value={productContent}
              placeholder='Start typing here...'
              className='h-96'
            />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default DesktopForm;
