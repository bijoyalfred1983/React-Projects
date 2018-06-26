/* @flow */
import React from 'react';
import FooterList from './footerList';
import styles from './styles.scss';

const col1 = {
  title: 'Shop',
  className: '',
  list: [
    { id: '1', content: 'Store Locator', URL: '' },
    { id: '2', content: 'Shop by Make', URL: '' },
    { id: '3', content: 'Shop by Model', URL: '' },
    { id: '4', content: 'Vin Decoder', URL: '' },
    { id: '5', content: 'AutoZone Rewards', URL: '/rewards' },
    { id: '6', content: 'Gift Cards ', URL: '' }
  ]
};

const col2 = {
  title: 'AutoZone Services',
  className: 'hide-on-small-only',
  list: [
    { id: '51', content: 'Buy Online, Pick Up in Store', URL: '' },
    { id: '52', content: 'Local Store Ad', URL: '' },
    { id: '53', content: 'Loan-A-Tool', URL: '' },
    { id: '54', content: 'In-store Services', URL: '' },
    { id: '55', content: 'Video Library', URL: '' },
    { id: '56', content: 'Mobile App', URL: '' }
  ]
};

const col3 = {
  title: 'About Us',
  className: 'hide-on-small-only',
  list: [
    { id: '101', content: 'Careers', URL: '' },
    { id: '102', content: 'About Autozone', URL: '' },
    { id: '103', content: 'Investor Relations', URL: '' },
    { id: '104', content: 'Affiliate Program', URL: '' },
    { id: '105', content: 'Vendor Information', URL: '' },
    { id: '106', content: 'Customer Testimonials', URL: '' }
  ]
};

const col4 = {
  title: 'Customer Service',
  className: '',
  list: [
    { id: '150', content: 'Track My Order', URL: '/trackOrder' },
    { id: '151', content: 'Contact Us', URL: '/contactUs' },
    { id: '152', content: 'My Account', URL: '/myAccount' },
    { id: '153', content: 'Warranties', URL: '' },
    { id: '154', content: 'FAQs', URL: '' },
    { id: '155', content: 'Return Policies', URL: '' }
  ]
};

const columns = [col1, col2, col3, col4];
// const rightAlign = {
//   padding: '0'
// };
const FooterBodyComponent = () => (
  <div className={`${styles.footerBodyContainer}`}>
    {columns.map(column => (
      <FooterList footerColumn={column} key={column.title} />
    ))}
  </div>
);

export default FooterBodyComponent;
