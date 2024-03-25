import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { HiOutlineTemplate } from 'react-icons/hi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Select from 'react-select';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';

//filepond
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Checkbox, Spinner, Tooltip } from 'flowbite-react';
import { ChevronUp } from 'react-feather';
import { Link } from 'react-router-dom';

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
  setDupLink,
}) => {
  const currentStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  const [addDescription, setAddDescription] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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

  const handleFree = () => {
    setFree(!free);
    setPrice(0);
  };

  return (
    <div className='w-full flex flex-col gap-2'>
      {error && (
        <Alert severity='error' className='mb-2'>
          {error}
        </Alert>
      )}
      <div className='flex items-center justify-between w-full border border-gray-200 rounded-md p-4'>
        <div className='flex flex-col items-start'>
          <p className='text-sm text-stone-800'>List new template</p>
        </div>

        <div className='flex items-center gap-2'>
          <Tooltip
            content='Put your template into review to be published for sales'
            style='light'
          >
            <div className='flex items-center gap-2'>
              <Checkbox onChange={(e) => setPublished(e.target.checked)} />
              <p className='text-xs text-stone-800'>Publish</p>
            </div>
          </Tooltip>
          <Link
            to='/dashboard/templates'
            className='hover:bg-red-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
          >
            Cancel
          </Link>
          <button
            type='button'
            className='bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
            onClick={handleAddProduct}
            disabled={addingProduct}
          >
            Save
          </button>
        </div>
      </div>

      {addingProduct ? (
        <div className='w-full rounded-md border border-gray-200 flex items-center justify-center h-96'>
          <Spinner />
        </div>
      ) : (
        <Tabs>
          <TabList>
            <Tab>Details</Tab>
            <Tab>Media</Tab>
            <Tab>Content</Tab>
          </TabList>

          <TabPanel>
            <form className='w-full flex flex-col gap-4 border border-gray-200 rounded-md bg-white p-4'>
              <div className='flex items-start w-full gap-4'>
                <div className='flex flex-col gap-4 w-6/12'>
                  <div className='flex flex-col w-full'>
                    <div className='flex justify-between w-full'>
                      <p className='text-stone-600 text-xs'>Title</p>
                      <p className='text-xs text-stone-600'>
                        {title.length}/50
                      </p>
                    </div>
                    <input
                      type='text'
                      className={`border ${
                        emptyFields.includes('field1')
                          ? 'border-red-300'
                          : 'border-gray-200'
                      } hover:border-gray-200 bg-gray-50 text-sm focus:bg-gray-200 focus:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0`}
                      placeholder='Title'
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      maxLength={50}
                    />
                  </div>

                  <div className='flex flex-col w-full'>
                    <div className='flex w-full justify-between'>
                      <p className='text-stone-600 text-xs'>
                        Summary (optional)
                      </p>
                      <div>
                        <p className='text-xs text-stone-600'>
                          {description.length}/75
                        </p>
                      </div>
                    </div>
                    <textarea
                      type='text'
                      className='border border-gray-200 hover:border-gray-200 hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-200 w-full rounded-md p-2 bg-gray-50 resize-none text-sm'
                      placeholder='Summary'
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      maxLength={75}
                    />
                  </div>

                  <div className='flex flex-col w-full'>
                    <p className='text-stone-600 text-xs'>Link</p>
                    <div className='flex w-full'>
                      <div className='rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center p-2 pr-1'>
                        <p className='text-sm'>fruntt.com/t/</p>
                      </div>
                      <input
                        type='text'
                        placeholder='Link'
                        className='border text-sm border-gray-200 bg-gray-50 focus:bg-gray-200 focus:border-gray-200 hover:bg-gray-200 rounded-tr-md rounded-br-md p-2 pl-1 flex-1'
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className='w-6/12 flex flex-col gap-4 items-start'>
                  <div className='flex flex-col w-full'>
                    <p className='text-stone-600 text-xs'>Call to action</p>
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
                          borderColor: 'rgb(229 231 235)',
                          backgroundColor: 'rgb(249 250 251)',
                          borderWidth: 1,
                          '&:hover': {
                            backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                          },
                          '&:focus': {
                            backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                          },
                          fontSize: '14px',
                          borderRadius: '.375rem',
                          boxShadow: 'none',
                          zIndex: 99999,
                          position: 'relative',
                        }),
                        menuPortal: (provided) => ({
                          ...provided,
                          zIndex: 9999,
                          fontSize: '14px',
                        }),
                      }}
                      className='w-full'
                    />
                  </div>
                  <div className='flex flex-col w-full'>
                    <p className='text-stone-600 text-xs'>Price</p>
                    <div className='flex w-full items-start'>
                      <div className='rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center p-2 pr-1'>
                        <p className='text-sm'>$</p>
                      </div>
                      <input
                        type='number'
                        className={`border ${
                          emptyFields.includes('field4')
                            ? 'border-red-300'
                            : 'border-gray-200'
                        } hover:border-gray-200 hover:bg-gray-200 w-full text-sm rounded-tr-md rounded-br-md p-2 bg-gray-50 flex-1 focus:bg-gray-200 focus:border-gray-200`}
                        placeholder={payChoice ? '$9+' : '$9'}
                        value={price}
                        step={1}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='flex flex-col gap-4 items-start'>
                    {payChoice ? (
                      ''
                    ) : (
                      <div className='flex items-center gap-2'>
                        <Checkbox onChange={handleFree} />
                        <p className='text-sm text-stone-600'>Free template</p>
                      </div>
                    )}
                    {free ? (
                      ''
                    ) : (
                      <div className='flex items-center gap-2'>
                        <Checkbox
                          onChange={(e) => setPayChoice(e.target.checked)}
                        />
                        <p className='text-sm text-stone-600'>
                          Customer sets price
                        </p>
                      </div>
                    )}
                  </div>

                  {payChoice ? (
                    <div className='flex items-center'>
                      <div className='flex flex-col w-6/12'>
                        <p className='text-stone-600 text-xs'>Minimum</p>
                        <div className='flex w-full items-start'>
                          <div className='rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center p-2 pr-1'>
                            <p className='text-sm'>$</p>
                          </div>
                          <input
                            type='number'
                            className={`border ${
                              emptyFields.includes('field4')
                                ? 'border-red-300'
                                : 'border-gray-200'
                            } hover:border-gray-200 hover:bg-gray-200 w-full text-sm rounded-tr-md rounded-br-md p-2 bg-gray-50 flex-1 focus:bg-gray-200 focus:border-gray-200`}
                            placeholder={payChoice ? '$9+' : '$9'}
                            value={price}
                            step={1}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='flex flex-col w-6/12 ml-2'>
                        <p className='text-stone-600 text-xs'>Suggested</p>
                        <input
                          type='number'
                          className={`border ${
                            emptyFields.includes('field4')
                              ? 'border-red-300'
                              : 'border-gray-200'
                          } hover:border-gray-200 hover:bg-gray-200 w-full text-sm rounded-md p-2 bg-gray-50 focus:bg-gray-200 focus:border-gray-200`}
                          placeholder={payChoice ? '$9+' : '$9'}
                          step={1}
                          onChange={(e) => setSuggestedPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              {addDescription ? (
                <div className='flex flex-col gap-2 pb-10'>
                  <div className='flex items-center justify-between w-full'>
                    <p className='text-sm text-stone-800'>Add description</p>

                    <div>
                      <button
                        type='button'
                        className='hover:bg-red-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
                        onClick={(e) => setAddDescription(!addDescription)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <ReactQuill
                    value={info}
                    onChange={setInfo}
                    className='h-80'
                    placeholder='Start typing description here...'
                  />
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center border border-gray-200 w-full rounded-md p-4'>
                  <p className='text-stone-800 text-sm'>Description</p>
                  <p className='text-stone-600 text-xs text-center w-80'>
                    Tell potential customers a little more about your template.
                    This is visible on your template detail page.
                  </p>
                  <button
                    type='button'
                    className='flex items-center justify-center bg-gray-200 text-xs text-stone-800 rounded-md pt-1 pb-1 pl-2 pr-2 mt-2'
                    onClick={(e) => setAddDescription(!addDescription)}
                  >
                    Add Description
                  </button>
                </div>
              )}
            </form>
          </TabPanel>

          <TabPanel>
            <div className='border border-gray-200 rounded-md bg-white p-4 flex flex-col gap-4'>
              <div className='flex flex-col'>
                <p className='text-sm text-stone-800 text-center'>
                  Upload Images
                </p>
                <p className='text-stone-600 text-center text-xs'>
                  These images will be visible on your template card and
                  template detail page
                </p>
              </div>
              <FilePond
                files={image}
                imageResizeTargetWidth={200}
                name='productImages'
                // onupdatefiles={(file) => setImage(file)}
                instantUpload={false}
                allowMultiple
                maxFiles={5}
                onupdatefiles={(fileItems) => {
                  setImage(fileItems.map((fileItem) => fileItem.file));
                }}
              />
              <div className='w-full'>
                <p className='text-stone-600 text-xs'>{image.length}/5</p>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className='flex flex-col gap-4 items-start border border-gray-200 rounded-md w-full p-4 bg-white'>
              <div className='flex flex-col w-full'>
                <div className='flex flex-col'>
                  <p className='text-stone-600 text-xs'>Duplication link</p>
                </div>
                <input
                  type='text'
                  className={`border ${
                    emptyFields.includes('field1')
                      ? 'border-red-300'
                      : 'border-gray-200'
                  } hover:border-gray-200 bg-gray-50 text-sm focus:bg-gray-200 focus:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0`}
                  placeholder='https://carbonated-hill-6bc.notion.site/43be8a4d9'
                  onChange={(e) => setDupLink(e.target.value)}
                />
              </div>
              <div className='flex flex-col items-start gap-2'>
                <button
                  type='button'
                  onClick={(e) => setShowInfo(!showInfo)}
                  className='flex items-end justify-center text-xs text-stone-600'
                >
                  {showInfo ? (
                    <>
                      Hide <ChevronUp size={16} className='ml-1' />
                    </>
                  ) : (
                    <>Where do I get this?</>
                  )}
                </button>
                {showInfo && (
                  <div className='flex flex-col gap-2'>
                    <p className='text-stone-600 text-xs w-80'>
                      Once you have created and designed a template in Notion,
                      you have the ability to share and publish it using the top
                      right menu. After you publish it, a duplication link is
                      created.
                    </p>

                    <a
                      href='https://www.notion.so/help/public-pages-and-web-publishing'
                      target='_blank'
                      className='text-xs text-stone-800 underline-offset-1 underline'
                    >
                      {' '}
                      View tutorial
                    </a>
                  </div>
                )}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      )}
    </div>
  );
};

export default DesktopForm;
