import React from 'react';

//mui
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { isMobile } from 'react-device-detect';

const FAQS = () => {
  return (
    <div className='w-full'>
      {isMobile ? (
        <div className='mx-auto w-11/12'>
          <p className='font-medium text-gray-400 text-2xl underline underline-offset-8 text-center mt-32 mb-4'>
            FAQ's
          </p>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>What can I sell?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                You can sell almost antying, templates, code, courses, e-books,
                etc. You have the ability to upload any digital files or create
                custom content for your customers.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2a-content'
              id='panel2a-header'
            >
              <Typography>How do I sell?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Selling is really easy. Once you signup you just need to connect
                to your payment gateway, create your product and direct your
                customers/audience to your page link. From there they can
                purchase your products in TWO easy clicks.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel3a-content'
              id='panel3a-header'
            >
              <Typography>How do I get paid?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We use Stripes connected accounts and direct charges, so funds
                flow straight to your connected Stripe account after purchases.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel3a-content'
              id='panel3a-header'
            >
              <Typography>When do I get paid?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                You get paid as soon as a successful purchase is made.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel3a-content'
              id='panel3a-header'
            >
              <Typography>
                Is their 'Pay What You Want' available for creators?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, creators have the ability to allow their customers to pay
                what they want for a product. Starting with free products is a
                good way to build a list.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ) : (
        <div className='mx-auto' style={{ width: '500px' }}>
          <p className='font-medium text-gray-400 text-2xl underline underline-offset-8 text-center mt-32 mb-4'>
            FAQ's
          </p>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>What can I sell?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                You can sell almost antying, templates, code, courses, e-books,
                etc. You have the ability to upload any digital files or create
                custom content for your customers.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2a-content'
              id='panel2a-header'
            >
              <Typography>How do I sell?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Selling is really easy. Once you signup you just need to connect
                to your payment gateway, create your product and direct your
                customers/audience to your page link. From there they can
                purchase your products in TWO easy clicks.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>What payment processor is used?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Currently we are only using Stripe to keep things simple on our
                end. PayPal will be available in the near future.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel3a-content'
              id='panel3a-header'
            >
              <Typography>How do I get paid?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We use Stripes connected accounts and direct charges, so funds
                flow striaight to your connected stripe account after purchases.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel3a-content'
              id='panel3a-header'
            >
              <Typography>When do I get paid?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                You get paid as soon as a successful purchase is made.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel3a-content'
              id='panel3a-header'
            >
              <Typography>
                Is their 'Pay What You Want' available for creators?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, creators have the ability to allow their customers to pay
                what they want for a product. Starting with free products is a
                good way to build a list.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default FAQS;
