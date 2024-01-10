import React from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import CoverImage from './CoverImage';
import Files from './Files';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Select from 'react-select';

//filepond
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

//mui
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import { HiOutlineTemplate } from 'react-icons/hi';

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
  info,
  setInfo,
  url,
  setUrl,
  free,
  category,
  marketplace,
  setMarketplace,
  setFree,
  handleType,
  handleAction,
  handleCategory,
}) => {
  const customQuillClass = 'custom-quill';
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

  const formattedTypeValue = typeOptions.find(
    (option) => option.value === digitalType
  );

  const formattedActionValue = actionOptions.find(
    (option) => option.value === callToAction
  );

  const formattedCategory = categories.find((cat) => cat.value === category);

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
            Delete Template
          </p>

          <p className='text-xl mt-2 mb-2'>
            Are you sure you want to delete this template?
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
            {deletingProduct ? 'Deleting template...' : 'Yes, delete template'}
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
        <div className='mb-2 flex justify-between items-center'>
          <div className='flex items-center justify-center bg-stone-800 rounded-md p-2'>
            <HiOutlineTemplate className='text-white text-xl' />
            <p className='text-md text-white ml-2'>Edit Template</p>
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
              className='w-32 h-10 rounded border-red-400 text-red-400 border-2 mr-2 hover:text-white hover:bg-red-400 text-sm'
              onClick={openModal}
              type='button'
            >
              DELETE
            </button>
            <button
              className='w-32 h-10 rounded border-stone-800 border-2 hover:text-white hover:bg-stone-800 text-sm'
              onClick={handleSaveEdit}
              type='button'
            >
              SAVE
            </button>
          </div>
        </div>

        <Tabs>
          <TabList>
            <Tab>Details</Tab>
            <Tab>Content</Tab>
            <Tab>Marketplace</Tab>
          </TabList>

          <TabPanel>
            <form
              className='w-full border rounded bg-white p-2 drop-shadow-lg pb-12'
              onSubmit={handleSaveEdit}
            >
              {error && <Alert severity='error'>{error}</Alert>}
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
              <div className='flex justify-between w-full mt-2'>
                <div className='flex flex-col w-6/12'>
                  <p className='text-stone-800 mt-2'>Title</p>
                  <input
                    type='text'
                    className='border-2 border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 w-full rounded p-2 outline outline-0 mt-1'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={50}
                  />
                  <div className='w-full flex justify-end'>
                    <p className='text-sm text-gray-400'>{title.length}/50</p>
                  </div>

                  <p className='text-stone-800 mt-2'>Summary (optional)</p>
                  <textarea
                    type='text'
                    className='border-2 border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 w-full rounded p-2 outline outline-0  mt-1'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                      step={1}
                      min={0}
                      className='border-2 border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 w-full rounded p-2 outline outline-0 mt-1'
                      value={price}
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
                        <div className='flex items-center w-full mt-1'>
                          <div className='w-1/12'>
                            <p className='text-xl font-medium'>$</p>
                          </div>
                          <input
                            type='number'
                            className='border-2 border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 w-11/12 rounded p-2 outline outline-0'
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
                        <div className='flex items-center w-full mt-1'>
                          <div className='w-1/12'>
                            <p className='text-xl font-medium'>$</p>
                          </div>
                          <input
                            className='border-2 border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 w-full rounded p-2 outline outline-0'
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
                  <p className='text-stone-800 mt-2'>Call to action</p>
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
                    className='mt-1'
                  />
                  {/* <select
                    onChange={(e) => setCallToAction(e.target.value)}
                    className='w-full h-14 rounded p-2 mt-1'
                    value={callToAction}
                  >
                    <option value='buy'>Buy Now</option>
                    <option value='want'>I want this!</option>
                    <option value='get'>Get Now</option>
                  </select> */}

                  <p className='text-stone-800 mt-2'>URL</p>
                  <div className='flex items-center border-2 p-2 rounded border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 mt-1'>
                    <span className='underline underline-offset-2 font-medium'>{`${currentStoreUrl}/`}</span>
                    <input
                      className='outline outline-0 border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200'
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
                className='h-72 mt-1'
                placeholder='Start typing description here...'
              />
            </form>
          </TabPanel>

          <TabPanel>
            <div className='p-2 pb-12 bg-white rounded drop-shadow-lg border'>
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
              <p className='text-stone-800 font-medium mb-4'>
                Add any files and content you want to include in your digital
                purchase. A download link will be sent to customers
                automatically after a purchase.
              </p>

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

              <ReactQuill
                value={productContent}
                onChange={setProductContent}
                placeholder='Start typing content here'
                className='h-96'
              />
            </div>
          </TabPanel>

          <TabPanel>
            <div className='h-screen flex flex-col border rounded w-full shadow-lg bg-white p-2'>
              <div className='flex items-center'>
                <p className='text-2xl font-medium'>Marketplace</p>
                <Tooltip
                  title={
                    <p className='text-lg'>
                      This allows you to list your product in our marketplace.
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
                List your product in our marketplace for other creators and
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
              <p className='text-stone-800 mt-2'>Product category</p>
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
    </>
  );
};

export default EditDesktop;
