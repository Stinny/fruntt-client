import React, { useState, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { useEditStylesMutation } from '../../api/storefrontApiSlice';
import { useNavigate, Link } from 'react-router-dom';
import DesignPreview from '../../pages/DesignPreview';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { BsPalette } from 'react-icons/bs';

const DesignForm = ({ storefront, currentUser }) => {
  const navigate = useNavigate();

  const [navbarBG, setNavbarBG] = useState(storefront?.style?.navbarBackground);
  const [pageBG, setPageBG] = useState(storefront?.style?.pageBackground);

  const [cardBG, setCardBG] = useState(storefront?.style?.cardBackground);

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
  const [price, setPrice] = useState(storefront?.style?.price);
  const [faqBackground, setFaqBackground] = useState(
    storefront?.style?.faqBackground
  );
  const [reviewBackground, setReviewBackground] = useState(
    storefront?.style?.reviewBackground
  );

  //displays for color picker
  const [showPage, setShowPage] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showButtonText, setShowButtonText] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showBorders, setShowBorders] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);
  const [editStyles, result] = useEditStylesMutation();

  const handleBtnStyle = (e) => {
    setButtonStyle(e.target.value);
  };

  const handleSaveStyles = async (e) => {
    e.preventDefault();

    const editStylesReq = await editStyles({
      storeId: storefront._id,
      pageBG,
      cardBG,
      pageText,
      buttonColor,
      buttonTextColor,
      footerBG,
      buttonStyle,
      hideNav,
      hideFooter,
      socialIcons,
      borders,
      price,
      header,
      reviewBackground,
      faqBackground,
    }).unwrap();
    if (editStylesReq.msg === 'Styles saved') {
      currentUser.store = editStylesReq.store;
      const newUser = JSON.stringify(currentUser);
      toast.success('Design updated!', { style: { color: 'rgb(28 25 23)' } });
      Cookies.set('currentUser', newUser, { sameSite: 'Lax' });
      navigate('/dashboard/design');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/design');
  };

  const designForm = () => {
    return (
      <form className='w-2/12 mr-2'>
        <div className='p-2 border rounded w-full mx-auto flex flex-col bg-white drop-shadow-lg mr-2'>
          <div className='rounded-md w-full text-sm bg-gray-100 p-2'>
            <p className='text-sm text-center'>
              Click on the color you want to edit
            </p>
          </div>
          <div className='flex flex-col w-full mt-1'>
            <p className='text-sm font-medium mb-1'>Page</p>
            <div
              className='flex rounded-md bg-gray-100 h-10 w-full hover:cursor-pointer hover:bg-gray-200'
              onClick={(e) => setShowPage(!showPage)}
            >
              <div className='w-9/12 flex items-center justify-center'>
                <p className='text-sm font-medium mt-1'>{pageBG}</p>
              </div>
              <div className='p-1 w-3/12'>
                <div
                  className='w-full h-full rounded-md border'
                  style={{ backgroundColor: pageBG }}
                ></div>
              </div>
            </div>
          </div>
          {showPage && (
            <div className='w-full flex flex-col p-2 border-b mx-auto'>
              <HexColorPicker
                color={pageBG}
                onChange={setPageBG}
                style={{ width: '150px', height: '75px' }}
              />
              <p className='text-gray-400 mr-2 text-sm'>Hex value:</p>
              <HexColorInput
                color={pageBG}
                onChange={setPageBG}
                prefixed
                className='w-28 h-10 text-sm border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
              />
            </div>
          )}

          <div className='flex flex-col w-full mt-1'>
            <p className='text-sm font-medium mb-1'>Card</p>
            <div
              className='flex rounded-md bg-gray-100 h-10 w-full hover:cursor-pointer hover:bg-gray-200'
              onClick={(e) => setShowCard(!showCard)}
            >
              <div className='w-9/12 flex items-center justify-center'>
                <p className='text-sm font-medium mt-1'>{cardBG}</p>
              </div>
              <div className='p-1 w-3/12'>
                <div
                  className='w-full h-full rounded-md border'
                  style={{ backgroundColor: cardBG }}
                ></div>
              </div>
            </div>
          </div>

          {showCard && (
            <div className='w-full flex flex-col p-2 border-b mx-auto'>
              <HexColorPicker
                color={cardBG}
                onChange={setCardBG}
                style={{ width: '150px', height: '75px' }}
              />
              <p className='text-gray-400 mr-2 text-sm'>Hex value:</p>
              <HexColorInput
                color={cardBG}
                onChange={setCardBG}
                prefixed
                className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0 text-sm'
              />
            </div>
          )}

          <div className='flex flex-col w-full mt-1'>
            <p className='text-sm font-medium mb-1'>Button</p>
            <div
              className='flex rounded-md bg-gray-100 h-10 w-full hover:cursor-pointer hover:bg-gray-200'
              onClick={(e) => setShowButton(!showButton)}
            >
              <div className='w-9/12 flex items-center justify-center'>
                <p className='text-sm font-medium mt-1'>{buttonColor}</p>
              </div>
              <div className='p-1 w-3/12'>
                <div
                  className='w-full h-full rounded-md border'
                  style={{ backgroundColor: buttonColor }}
                ></div>
              </div>
            </div>
          </div>

          {showButton && (
            <div className='w-full flex flex-col p-2 border-b mx-auto'>
              <HexColorPicker
                color={buttonColor}
                onChange={setButtonColor}
                style={{ width: '150px', height: '75px' }}
              />
              <p className='text-gray-400 mr-2 text-sm'>Hex value:</p>
              <HexColorInput
                color={buttonColor}
                onChange={setButtonColor}
                prefixed
                className='w-28 h-10 border-2 text-sm rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
              />
              <p className='text-sm'>Style</p>
              <select
                value={buttonStyle}
                className='mt-2 mb-2 transparent h-10 bg-transparent border-2 rounded'
                onChange={handleBtnStyle}
              >
                <option value='filled'>Filled</option>
                <option value='outlined'>Outlined</option>
              </select>
            </div>
          )}

          <div className='flex flex-col w-full mt-1'>
            <p className='text-sm font-medium mb-1'>Button text</p>
            <div
              className='flex rounded-md bg-gray-100 h-10 w-full hover:cursor-pointer hover:bg-gray-200'
              onClick={(e) => setShowButtonText(!showButtonText)}
            >
              <div className='w-9/12 flex items-center justify-center'>
                <p className='text-sm font-medium mt-1'>{buttonTextColor}</p>
              </div>
              <div className='p-1 w-3/12'>
                <div
                  className='w-full h-full rounded-md border'
                  style={{ backgroundColor: buttonTextColor }}
                ></div>
              </div>
            </div>
          </div>

          {showButtonText && (
            <div className='w-full flex flex-col p-2 border-b mx-auto'>
              <HexColorPicker
                color={buttonTextColor}
                onChange={setButtonTextColor}
                style={{ width: '150px', height: '75px' }}
              />
              <p className='text-gray-400 mr-2 text-sm'>Hex value:</p>
              <HexColorInput
                color={buttonTextColor}
                onChange={setButtonTextColor}
                prefixed
                className='w-28 text-sm h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
              />
            </div>
          )}

          <div className='flex flex-col w-full mt-1'>
            <p className='text-sm font-medium mb-1'>Borders</p>
            <div
              className='flex rounded-md bg-gray-100 h-10 w-full hover:cursor-pointer hover:bg-gray-200'
              onClick={(e) => setShowBorders(!showBorders)}
            >
              <div className='w-9/12 flex items-center justify-center'>
                <p className='text-sm font-medium mt-1'>{borders}</p>
              </div>
              <div className='p-1 w-3/12'>
                <div
                  className='w-full h-full rounded-md border'
                  style={{ backgroundColor: borders }}
                ></div>
              </div>
            </div>
          </div>

          {showBorders && (
            <div className='w-full flex flex-col p-2 border-b mx-auto'>
              <HexColorPicker
                color={borders}
                onChange={setBorders}
                style={{ width: '150px', height: '75px' }}
              />
              <p className='text-gray-400 mr-2 text-sm'>Hex value:</p>
              <HexColorInput
                color={borders}
                onChange={setBorders}
                prefixed
                className='w-28 h-10 border-2 rounded text-sm mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
              />
            </div>
          )}

          <div className='flex flex-col w-full mt-1'>
            <p className='text-sm font-medium mb-1'>Headers</p>
            <div
              className='flex rounded-md bg-gray-100 h-10 w-full hover:cursor-pointer hover:bg-gray-200'
              onClick={(e) => setShowHeaders(!showHeaders)}
            >
              <div className='w-9/12 flex items-center justify-center'>
                <p className='text-sm font-medium mt-1'>{header}</p>
              </div>
              <div className='p-1 w-3/12'>
                <div
                  className='w-full h-full rounded-md border'
                  style={{ backgroundColor: header }}
                ></div>
              </div>
            </div>
          </div>

          {showHeaders && (
            <div className='w-full flex flex-col p-2 border-b mx-auto'>
              <HexColorPicker
                color={header}
                onChange={setHeader}
                style={{ width: '150px', height: '75px' }}
              />
              <p className='text-gray-400 mr-2 text-sm'>Hex value:</p>
              <HexColorInput
                color={header}
                onChange={setHeader}
                prefixed
                className='w-28 h-10 border-2 rounded mr-4 text-sm p-2 focus:outline focus:border-gray-400 focus:outline-0'
              />
            </div>
          )}

          <div className='flex flex-col w-full mt-1'>
            <p className='text-sm font-medium mb-1'>Price</p>
            <div
              className='flex rounded-md bg-gray-100 h-10 w-full hover:cursor-pointer hover:bg-gray-200'
              onClick={(e) => setShowPrice(!showPrice)}
            >
              <div className='w-9/12 flex items-center justify-center'>
                <p className='text-sm font-medium mt-1'>{price}</p>
              </div>
              <div className='p-1 w-3/12'>
                <div
                  className='w-full h-full rounded-md border'
                  style={{ backgroundColor: price }}
                ></div>
              </div>
            </div>
          </div>

          {showPrice && (
            <div className='w-full flex flex-col p-2 border-b mx-auto'>
              <HexColorPicker
                color={price}
                onChange={setPrice}
                style={{ width: '150px', height: '75px' }}
              />
              <p className='text-gray-400 mr-2 text-sm'>Hex value:</p>
              <HexColorInput
                color={price}
                onChange={setPrice}
                prefixed
                className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0 text-sm'
              />
            </div>
          )}

          <div className='flex flex-col w-full mt-1'>
            <p className='text-sm font-medium mb-1'>Reviews</p>
            <div
              className='flex rounded-md bg-gray-100 h-10 w-full hover:cursor-pointer hover:bg-gray-200'
              onClick={(e) => setShowReview(!showReview)}
            >
              <div className='w-9/12 flex items-center justify-center'>
                <p className='text-sm font-medium mt-1'>{reviewBackground}</p>
              </div>
              <div className='p-1 w-3/12'>
                <div
                  className='w-full h-full rounded-md border'
                  style={{ backgroundColor: reviewBackground }}
                ></div>
              </div>
            </div>
          </div>

          {showReview && (
            <div className='w-full flex flex-col p-2 border-b mx-auto'>
              <HexColorPicker
                color={reviewBackground}
                onChange={setReviewBackground}
                style={{ width: '150px', height: '75px' }}
              />
              <p className='text-gray-400 mr-2 text-sm'>Hex value:</p>
              <HexColorInput
                color={reviewBackground}
                onChange={setReviewBackground}
                prefixed
                className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0 text-sm'
              />
            </div>
          )}
        </div>
      </form>
    );
  };

  return (
    <div className='w-full mx-auto'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center justify-center bg-stone-800 rounded-md p-2'>
          <BsPalette className='text-white text-xl' />
          <p className='text-xl text-white ml-2'>Design your store</p>
        </div>

        <div className='flex'>
          <button
            onClick={handleCancel}
            className='w-32 h-10 rounded border-red-400 text-red-400 hover:bg-red-400 hover:text-white border-2'
          >
            CANCEL
          </button>
          <button
            onClick={handleSaveStyles}
            className='w-32 h-10 rounded text-stone-800 border-stone-800 border-2 ml-2 hover:bg-stone-800 hover:text-white'
          >
            SAVE
          </button>
        </div>
      </div>

      <div className='flex mt-2'>
        {designForm()}
        <DesignPreview
          pageBG={pageBG}
          price={price}
          cardBG={cardBG}
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
