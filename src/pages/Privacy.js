import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Privacy = () => {
  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white drop-shadow-md w-10/12 mx-auto p-10 border rounded mt-24'>
          <p className='font-medium text-2xl text-stone-800'>Privacy Policy</p>
          <p className='text-stone-800 mt-4'>
            This Privacy Policy governs the manner in which Fruntt collects,
            uses, maintains, and discloses information collected from users
            (each, a "User") of the Fruntt website (the "Site") and associated
            services.
          </p>
          <p className='font-medium text-stone-800 mt-4'>
            1. Personal Identification Information
          </p>
          <p className='text-stone-800 mt-4'>
            We may collect personal identification information from Users in
            various ways, including but not limited to when Users visit our
            Site, register on the Site, place an order, fill out a form,
            subscribe to the newsletter, respond to a survey, or engage with
            other activities, services, features, or resources we make available
            on our Site. Users may be asked for, as appropriate, name, email
            address, mailing address, phone number, and payment information. We
            will collect personal identification information from Users only if
            they voluntarily submit such information to us. Users can always
            refuse to supply personal identification information, except that it
            may prevent them from engaging in certain Site-related activities.
          </p>
          <p className='font-medium text-stone-800 mt-4'>
            2. Non-personal Identification Information
          </p>
          <p className='text-stone-800 mt-4'>
            We may collect non-personal identification information about Users
            whenever they interact with our Site. Non-personal identification
            information may include the browser name, the type of computer or
            device, and technical information about Users' means of connection
            to our Site, such as the operating system, the Internet service
            providers utilized, and other similar information.
          </p>
          <p className='font-medium text-stone-800 mt-4'>
            3. Web Browser Cookies
          </p>
          <p className='text-stone-800 mt-4'>
            Our Site may use "cookies" to enhance the User experience. Users'
            web browsers place cookies on their hard drives for record-keeping
            purposes and sometimes to track information about them. Users may
            choose to set their web browsers to refuse cookies or to alert them
            when cookies are being sent. If they do so, note that some parts of
            the Site may not function properly.
          </p>
          <p className='font-medium text-stone-800 mt-4'>
            4. How We Use Collected Information
          </p>
          <p className='text-stone-800 mt-4'>
            Fruntt may collect and use Users' personal information for the
            following purposes:
          </p>
          <p className='text-stone-800 mt-2'>
            {' '}
            To personalize the user experience: We may use information to
            understand how our Users as a group use the services and resources
            provided on our Site. To improve our Site: We continually strive to
            improve our website offerings based on the information and feedback
            we receive from Users. To process transactions: We may use the
            information Users provide about themselves when placing an order
            only to provide service to that order. We do not share this
            information with outside parties except to the extent necessary to
            provide the service. To send periodic emails: We may use the email
            address to send User information and updates pertaining to their
            order. It may also be used to respond to their inquiries, questions,
            and/or other requests. If the User decides to opt-in to our mailing
            list, they will receive emails that may include company news,
            updates, related product or service information, etc. If at any time
            the User would like to unsubscribe from receiving future emails, we
            include detailed unsubscribe instructions at the bottom of each
            email or the User may contact us via our Site.
          </p>
          <p className='font-medium text-stone-800 mt-4'>
            5. How We Protect Your Information
          </p>
          <p className='text-stone-800 mt-4'>
            We adopt appropriate data collection, storage, and processing
            practices and security measures to protect against unauthorized
            access, alteration, disclosure, or destruction of your personal
            information, username, password, transaction information, and data
            stored on our Site.
          </p>
          <p className='font-medium text-stone-800 mt-4'>
            6. Sharing Your Personal Information
          </p>
          <p className='text-stone-800 mt-4'>
            We do not sell, trade, or rent Users' personal identification
            information to others. We may share generic aggregated demographic
            information not linked to any personal identification information
            regarding visitors and users with our business partners, trusted
            affiliates, and advertisers
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
