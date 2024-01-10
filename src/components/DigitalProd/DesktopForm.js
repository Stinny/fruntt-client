import React from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { HiOutlineTemplate } from 'react-icons/hi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
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
  setFree,
  free,
  marketplace,
  setMarketplace,
  handleType,
  handleAction,
  handleCategory,
  emptyFields,
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
    <div className='w-full'>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex items-center justify-center bg-stone-800 rounded-md p-2'>
          <HiOutlineTemplate className='text-white text-xl' />
          <p className='text-sm text-white ml-2'>New Template</p>
        </div>

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

        <div className='flex'>
          <button
            className='w-32 h-10 rounded border-red-400 text-red-400 border-2 mr-2 hover:text-white hover:bg-red-400 text-sm focus:border-red-400'
            onClick={handleCancel}
            type='button'
          >
            CANCEL
          </button>
          <button
            className='w-32 h-10 rounded border-stone-800 border-2 hover:text-white hover:bg-stone-800 text-stone-800 text-sm'
            onClick={handleAddProduct}
            type='button'
            disabled={addingProduct}
          >
            {addingProduct ? 'ADDING...' : '+ ADD'}
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
          <Tab>Marketplace</Tab>
        </TabList>

        <TabPanel>
          <form
            className='w-full border rounded-md bg-white drop-shadow-md p-2 pb-12'
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
                <p className='text-stone-800 mt-4'>Title</p>
                <input
                  type='text'
                  className={`border-2 ${
                    emptyFields.includes('field1')
                      ? 'border-red-300'
                      : 'border-gray-100'
                  } hover:border-gray-200 bg-gray-100 hover:bg-gray-200 w-full rounded p-2 outline outline-0  mt-1`}
                  placeholder='Title'
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  maxLength={50}
                />
                <div className='w-full flex justify-end'>
                  <p className='text-sm text-gray-400'>{title.length}/50</p>
                </div>

                <p className='text-stone-800 mt-2'>Summary (optional)</p>
                <textarea
                  type='text'
                  className='border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-200 w-full rounded p-2 outline outline-0 bg-gray-100 mt-1'
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

                <p className='text-stone-800 mt-2'>Price</p>
                <div className='flex items-center'>
                  <div className='mr-4'>
                    <p className='text-xl font-medium'>$</p>
                  </div>
                  <input
                    type='number'
                    className={`border-2 ${
                      emptyFields.includes('field4')
                        ? 'border-red-300'
                        : 'border-gray-100'
                    } hover:border-gray-200 hover:bg-gray-200 w-full rounded p-2 outline outline-0 bg-gray-100 mt-1`}
                    placeholder={payChoice ? '$9+' : '$9'}
                    value={price}
                    step={1}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
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
                  <div className='flex items-center'>
                    <div className='flex flex-col w-6/12'>
                      <p className='text-stone-800'>Minimum price</p>
                      <div className='flex items-center w-full'>
                        <div className='w-1/12'>
                          <p className='text-xl font-medium'>$</p>
                        </div>

                        <input
                          type='number'
                          className='border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-200 w-11/12 rounded p-2 outline outline-0 bg-gray-100 mt-1'
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
                      <p className='text-stone-800'>
                        Suggested price/placeholder
                      </p>
                      <div className='flex items-center w-full'>
                        <div className='w-1/12'>
                          <p className='text-xl font-medium'>$</p>
                        </div>
                        <input
                          className='border-2 text-gray-600 border-gray-100 hover:border-gray-200 hover:bg-gray-200 w-full rounded p-2 outline outline-0 bg-gray-100 mt-1'
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
                <p className='text-gray-400 font-medium text-center text-sm'>
                  This will be the image your customers will see (recommended
                  size 1280x720)
                </p>

                <FilePond
                  files={image}
                  imageResizeTargetWidth={200}
                  name='productImages'
                  onupdatefiles={(file) => setImage(file)}
                  instantUpload={false}
                />
                <p className='text-stone-800'>Call to action</p>
                <Select
                  options={actionOptions}
                  onChange={handleAction}
                  placeholder='Call to action'
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  isSearchable={false}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: emptyFields.includes('field3')
                        ? 'border-red-300'
                        : 'rgb(243 244 246)',
                      borderRadius: 6,
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

                <p className='text-stone-800 mt-2'>URL</p>
                <div
                  className={`flex items-center border-2 rounded mt-1 ${
                    emptyFields.includes('field2')
                      ? 'border-red-300'
                      : 'border-gray-100'
                  } hover:border-gray-200 hover:bg-gray-200 bg-gray-100 p-2`}
                >
                  <span className='underline underline-offset-2 font-medium'>{`${currentStoreUrl}/`}</span>
                  <input
                    className='bg-gray-100 hover:bg-gray-200 outline outline-0'
                    placeholder='TemplateName'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <p className='text-stone-800 mt-2'>Description</p>
            <ReactQuill
              value={info}
              onChange={setInfo}
              className='h-80'
              placeholder='Start typing description here...'
            />
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
            <p className='text-stone-800 font-medium mb-4'>
              Add any files and content you want to include in the template
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

        <TabPanel>
          <div className='h-screen flex flex-col border rounded w-full shadow-lg p-2 bg-white'>
            <div className='flex items-center'>
              <p className='text-2xl font-medium'>Marketplace</p>
              <Tooltip
                title={
                  <p className='text-lg'>
                    This allows you to list your template in our marketplace.
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
            <p className='text-stone-800 text-lg mt-6'>
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
            <p className='text-stone-800 mt-2'>Template category</p>
            <Select
              options={categories}
              onChange={handleCategory}
              placeholder='Category'
              menuPortalTarget={document.body}
              menuPosition={'fixed'}
              isSearchable={false}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: 'rgb(243 244 246)',
                  backgroundColor: 'rgb(243 244 246)',
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: 'rgb(229 231 235)', // Keep the same border color on hover
                    backgroundColor: 'rgb(229 231 235)',
                  },
                  boxShadow: 'none',
                  zIndex: 99999,
                  position: 'relative',
                }),
                menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
              className='mt-1 w-64'
            />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default DesktopForm;
