/* @flow */
import React from 'react';
import LinkButton from './LinkButton';

const bottomlinks = [
  {
    id: '1',
    content: 'Terms & Conditions',
    url: '/termsCondition'
  },
  {
    id: '2',
    content: 'Privacy Policy',
    url: ''
  },
  {
    id: '3',
    content: 'Return Policy',
    url: ''
  },
  {
    id: '4',
    content: ' CA Supply Chain Disclosure',
    url: ''
  },
  {
    id: '5',
    content: 'Sitemap',
    url: ''
  }
];

const BottomLinksComponent = () => (
  <div>
    <LinkButton bottomLinks={bottomlinks} />
  </div>
);

export default BottomLinksComponent;
