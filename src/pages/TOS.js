import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TOS = () => {
  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white drop-shadow-md w-10/12 mx-auto p-10 border rounded mt-24'>
          <p className='font-medium text-2xl text-stone-800'>
            Terms of Service
          </p>

          <p className='text-stone-800 font-medium mt-4'>
            Effective Date: June 10th, 2023
          </p>

          <p className='text-stone-800 mt-4'>
            Please read these Terms of Service ("Agreement") carefully before
            using our web application ("the Service"). This Agreement sets forth
            the legally binding terms and conditions for your use of the
            Service. By accessing or using the Service, you agree to be bound by
            this Agreement. If you do not agree with any part of the Agreement,
            you must not use the Service.
          </p>

          <p className='text-stone-800 font-medium mt-6'>1. User Obligations</p>
          <p className='text-stone-800 mt-4'>
            1.1. You agree to use the Service in compliance with all applicable
            laws and regulations.
          </p>
          <p className='text-stone-800 mt-4'>
            1.2. You are solely responsible for maintaining the confidentiality
            and security of your account information.
          </p>
          <p className='text-stone-800 font-medium mt-6'>
            2. Intellectual Property Rights
          </p>
          <p className='text-stone-800 mt-4'>
            2.1. The content, trademarks, and copyrights associated with the
            Service are owned by [Your Company Name] and protected by
            intellectual property laws.
          </p>
          <p className='text-stone-800 mt-4'>
            2.2. You are granted a limited, non-exclusive, non-transferable
            license to use the Service and its content solely for personal or
            internal business purposes.
          </p>
          <p className='text-stone-800 font-medium mt-6'>3. Privacy Policy</p>
          <p className='text-stone-800 mt-4'>
            3.1. Your privacy is important to us. Please review our Privacy
            Policy [Insert link to Privacy Policy] to understand how we collect,
            use, and protect your personal information.
          </p>
          <p className='text-stone-800 font-medium mt-6'>
            4. Limitation of Liability
          </p>
          <p className='text-stone-800 mt-4'>
            4.1. Fruntt shall not be liable for any direct, indirect,
            incidental, special, or consequential damages arising out of or
            relating to the use of the Service.
          </p>
          <p className='text-stone-800 mt-4'>
            4.2. We do not endorse or take responsibility for any third-party
            content or services accessed through the Service.
          </p>
          <p className='text-stone-800 font-medium mt-6'>5. Termination</p>
          <p className='text-stone-800 mt-4'>
            5.1. This Agreement is effective until terminated by either party.
          </p>
          <p className='text-stone-800 mt-4'>
            5.2. We reserve the right to suspend or terminate your access to the
            Service at any time, without prior notice, for any reason.
          </p>
          <p className='text-stone-800 font-medium mt-6'>
            6. Dispute Resolution
          </p>
          <p className='text-stone-800 mt-4'>
            6.1. Any disputes arising out of or relating to this Agreement shall
            be resolved through negotiation or other mutually agreed-upon
            methods.
          </p>

          <p className='text-stone-800 font-medium mt-6'>
            7. Modifications to the Terms
          </p>
          <p className='text-stone-800 mt-4'>
            7.1. We reserve the right to modify or update this Agreement at any
            time. Changes will be effective immediately upon posting the updated
            Agreement on our website.
          </p>
          <p className='text-stone-800 mt-4'>
            7.2. It is your responsibility to review the Agreement periodically.
            By continuing to use the Service, you agree to be bound by the
            modified terms.
          </p>
          <p className='text-stone-800 font-medium mt-6'>
            8. Similarity to Gumroad
          </p>
          <p className='text-stone-800 mt-4'>
            8.1. Please note that while our web app may have similarities to
            Gumroad in terms of functionality, we are an independent entity, and
            this Agreement governs the use of our own Service.
          </p>
          <p className='text-stone-800 mt-4'>
            8.2. We are not affiliated with Gumroad and do not imply any
            endorsement or partnership with them.
          </p>
          <p className='text-stone-800 font-medium mt-6'>9. Miscellaneous</p>
          <p className='text-stone-800 mt-4'>
            9.1. This Agreement constitutes the entire agreement between you and
            Fruntt regarding the use of the Service.
          </p>
          <p className='text-stone-800 mt-4'>
            9.2. If any provision of this Agreement is found to be
            unenforceable, the remaining provisions shall remain in full force
            and effect.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TOS;
