import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useSelector } from 'react-redux';
import Select from 'react-select';

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
  setFree,
  free,
  marketplace,
  setMarketplace,
  handleAction,
  handleType,
  handleCategory,
}) => {
  const currentStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  const typeOptions = [
    { value: 'video', label: 'Course' },
    { value: 'art', label: 'Art' },
    { value: 'ebook', label: 'E-Book' },
    { value: 'template', label: 'Template' },
    { value: 'other', label: 'Other digital media' },
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

  return (
    <div className='w-full p-2'>
      <div className='mb-2 p-2'>
        <h2 className='text-xl font-medium'>New Template</h2>
      </div>

      {error && (
        <Alert severity='error' className='mb-2'>
          {error}
        </Alert>
      )}

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
          <form className='w-full border rounded-md bg-white drop-shadow-md p-2 pb-12'>
            <div className='flex items-center'>
              <p className='text-md'>Details</p>
            </div>

            <div className='flex flex-col w-full mt-2'>
              <div className='flex flex-col w-full'>
                {/* <p className='text-stone-800 text-sm'>Type</p>

                <Select
                  options={typeOptions}
                  onChange={handleType}
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
                <p className='text-stone-800 text-sm mt-2'>Title</p>
                <input
                  type='text'
                  className='border-2 text-sm border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                  placeholder='Title'
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                />
                <div className='w-full flex justify-end'>
                  <p className='text-sm text-gray-400'>{title.length}/50</p>
                </div>

                <p className='text-stone-800 text-sm mt-2'>Summary(optional)</p>
                <textarea
                  type='text'
                  className='h-28 tex-sm border-2 border-gray-200 hover:border-gray-300 w-full rounded p-2 outline outline-0 bg-white'
                  placeholder='Description'
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={75}
                />
                <div className='w-full flex justify-end'>
                  <p className='text-sm text-gray-400'>
                    {description.length}/75
                  </p>
                </div>

                <p className='text-stone-800 text-sm mt-2'>Price</p>
                <div className='flex items-center'>
                  <p className='mr-2 font-medium text-xl'>$</p>
                  <input
                    type='number'
                    step={1}
                    className='border-2 border-gray-200 hover:border-gray-300 w-full text-sm rounded p-2 outline outline-0 bg-white'
                    placeholder={payChoice ? '$9+' : '$9'}
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
                    className='mt-2'
                  />
                )}
                {payChoice ? (
                  <div className='flex items-center'>
                    <div className='flex flex-col w-6/12'>
                      <p className='text-stone-800 text-sm'>Minimum price</p>
                      <input
                        type='number'
                        className='border-2 text-sm border-gray-200 w-full rounded p-2 outline outline-0 bg-white'
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
                        className='border-2 border-gray-200 text-sm hover:border-gray-300 w-full rounded p-2 outline outline-0 bg-white'
                        onChange={(e) => setSuggestedPrice(e.target.value)}
                        placeholder='$9+'
                      />
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div className='w-full flex flex-col p-2 mt-2'>
                <p className='text-sm font-medium text-stone-800 text-center'>
                  Upload a cover image
                </p>

                <FilePond
                  file={image}
                  imageResizeTargetWidth={200}
                  name='productImages'
                  onupdatefiles={(file) => setImage(file)}
                />
              </div>
              <p className='text-stone-800 text-sm mt-2'>Call to action</p>
              {/* <select
                onChange={(e) => setCallToAction(e.target.value)}
                className='w-full h-14 rounded p-2'
                value={callToAction}
              >
                <option value='buy'>Buy Now</option>
                <option value='want'>I want this!</option>
                <option value='get'>Get Now</option>
              </select> */}
              <Select
                options={actionOptions}
                onChange={handleAction}
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
              />

              <p className='text-stone-800 text-sm mt-2'>URL</p>
              <div className='flex items-center border-2 rounded border-gray-200 hover:border-gray-300 p-2 w-full'>
                <span className='underline underline-offset-2 text-sm'>{`${currentStoreUrl}/`}</span>
                <input
                  className='bg-white outline outline-0 w-full text-sm'
                  placeholder='TemplateName'
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

            <p className='text-stone-800 text-sm mt-2'>Description</p>
            <ReactQuill
              value={info}
              onChange={setInfo}
              className='h-60 mt-1 mb-10'
              placeholder='Start typing description here...'
            />
          </form>
        </TabPanel>

        <TabPanel>
          <div className='pb-12 border rounded-md bg-white drop-shadow-md p-2 w-full'>
            <div className='flex items-center'>
              <p className='text-md'>Content</p>
            </div>
            <p className='text-stone-800 text-sm mb-4'>
              Add any files and content you want to include in the digital
              purchase. All content and files are available to customers
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
                className='h-60 mb-10'
              />
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className='h-screen flex flex-col border rounded-md w-full shadow-lg bg-white p-2'>
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

      <div className='w-full bg-white p-2 rounded-md border drop-shadow-md flex flex-col mt-2'>
        <button
          type='button'
          onClick={handleAddProduct}
          disabled={addingProduct}
          className='border-2 rounded h-12 text-sm w-full text-stone-800 border-stone-800 hover:bg-stone-800 hover:text-white mt-4'
        >
          {addingProduct ? 'ADDING...' : '+ ADD TEMPLATE'}
        </button>
        <button
          type='button'
          onClick={handleCancel}
          className='border-2 rounded h-8 w-full text-sm text-red-400 border-red-400 hover:bg-red-400 hover:text-white mt-2'
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default MobileForm;
