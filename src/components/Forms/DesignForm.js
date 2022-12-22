import React, { useState, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { useEditStylesMutation } from '../../api/storefrontApiSlice';
import { useNavigate, Link } from 'react-router-dom';
import DesignPreview from '../../pages/DesignPreview';
import Cookies from 'js-cookie';

const DesignForm = ({ storefront, currentUser }) => {
  const navigate = useNavigate();

  const [navbarBG, setNavbarBG] = useState(storefront?.style?.navbarBackground);
  const [pageBG, setPageBG] = useState(storefront?.style?.pageBackground);

  const [buttonColor, setButtonColor] = useState(
    storefront?.style?.buttonColor
  );
  const [buttonTextColor, setButtonTextColor] = useState(
    storefront?.style?.buttonTextColor
  );
  const [pageText, setPageText] = useState(storefront?.style?.pageText);
  const [footerBG, setFooterBG] = useState(storefront?.style?.footerBackground);
  const [buttonStyle, setButtonStyle] = useState(
    storefront?.style?.buttonStyle
  );
  const [socialIcons, setSocialIcons] = useState(
    storefront?.style?.socialIcons
  );
  const [hideNav, setHideNav] = useState(storefront?.style?.hideNav);
  const [hideFooter, setHideFooter] = useState(storefront?.style?.hideFooter);
  const [borders, setBorders] = useState(storefront?.style?.borderColor);
  const [header, setHeader] = useState(storefront?.style?.headerColor);
  const [faqBackground, setFaqBackground] = useState(
    storefront?.style?.faqBackground
  );
  const [reviewBackground, setReviewBackground] = useState(
    storefront?.style?.reviewBackground
  );
  const [editStyles, result] = useEditStylesMutation();

  const handleBtnStyle = (e) => {
    setButtonStyle(e.target.value);
  };

  const handleSaveStyles = async (e) => {
    e.preventDefault();

    const editStylesReq = await editStyles({
      storeId: storefront._id,
      navbarBG,
      pageBG,
      pageText,
      buttonColor,
      buttonTextColor,
      footerBG,
      buttonStyle,
      hideNav,
      hideFooter,
      socialIcons,
      borders,
      header,
      reviewBackground,
      faqBackground,
    }).unwrap();
    if (editStylesReq.msg === 'Styles saved') {
      currentUser.store = editStylesReq.store;
      const newUser = JSON.stringify(currentUser);
      Cookies.set('currentUser', newUser, { sameSite: 'Lax' });
      navigate('/dashboard/design');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/design');
  };

  const designForm = () => {
    return (
      <form className='w-3/12 mx-auto'>
        <div className='p-4 w-full mx-auto scroll-smooth overflow-scroll h-3/6'>
          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium mb-2'>Page background</p>

            <HexColorPicker
              color={pageBG}
              onChange={setPageBG}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400 mr-2'>Hex value:</p>
            <HexColorInput
              color={pageBG}
              onChange={setPageBG}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>

          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium mb-2'>Page text</p>

            <HexColorPicker
              color={pageText}
              onChange={setPageText}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400 mr-2'>Hex value:</p>
            <HexColorInput
              color={pageText}
              onChange={setPageText}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>

          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium mb-2'>Button background</p>
            <select
              value={buttonStyle}
              className='mt-2 mb-2'
              onChange={handleBtnStyle}
            >
              <option value='filled'>Filled</option>
              <option value='outlined'>Outlined</option>
            </select>

            <HexColorPicker
              color={buttonColor}
              onChange={setButtonColor}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400 mr-2'>Hex value:</p>
            <HexColorInput
              color={buttonColor}
              onChange={setButtonColor}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>

          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium mb-2'>Button text</p>

            <HexColorPicker
              color={buttonTextColor}
              onChange={setButtonTextColor}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400 mr-2'>Hex value:</p>
            <HexColorInput
              color={buttonTextColor}
              onChange={setButtonTextColor}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>

          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium mb-2'>Borders</p>

            <HexColorPicker
              color={borders}
              onChange={setBorders}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400 mr-2'>Hex value:</p>
            <HexColorInput
              color={borders}
              onChange={setBorders}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>

          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium mb-2'>Headers</p>

            <HexColorPicker
              color={header}
              onChange={setHeader}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400 mr-2'>Hex value:</p>
            <HexColorInput
              color={header}
              onChange={setHeader}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>
          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium mb-2'>FAQs background</p>

            <HexColorPicker
              color={faqBackground}
              onChange={setFaqBackground}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400 mr-2'>Hex value:</p>
            <HexColorInput
              color={faqBackground}
              onChange={setFaqBackground}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>

          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium mb-2'>Reviews background</p>

            <HexColorPicker
              color={reviewBackground}
              onChange={setReviewBackground}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400 mr-2'>Hex value:</p>
            <HexColorInput
              color={reviewBackground}
              onChange={setReviewBackground}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className='w-full mx-auto'>
      <div className='mb-10 flex justify-between items-center border-b-2 p-2'>
        <h2 className='text-3xl font-medium'>Designing your page</h2>

        <div className='flex'>
          <button
            onClick={handleCancel}
            className='w-32 h-10 rounded border-red-400 text-red-400 hover:bg-red-400 hover:text-white border-2'
          >
            CANCEL
          </button>
          <button
            onClick={handleSaveStyles}
            className='w-32 h-10 rounded text-slate-800 border-slate-800 border-2 ml-2 hover:bg-slate-800 hover:text-white'
          >
            SAVE
          </button>
        </div>
      </div>

      <div className='flex'>
        {designForm()}
        <DesignPreview
          pageBG={pageBG}
          navbarBG={navbarBG}
          buttonColor={buttonColor}
          buttonTextColor={buttonTextColor}
          buttonStyle={buttonStyle}
          pageText={pageText}
          footerBG={footerBG}
          storefrontId={storefront._id}
          hideNav={hideNav}
          socialIcons={socialIcons}
          hideFooter={hideFooter}
          storefront={storefront}
          headerColor={header}
          borderColor={borders}
          faqBackground={faqBackground}
          reviewBackground={reviewBackground}
        />
      </div>
    </div>
  );
};

export default DesignForm;
