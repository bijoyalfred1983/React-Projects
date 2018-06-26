/* @flow */
import React from 'react';
import IconPane from './IconPane';

const btnContainer = [
  {
    id: '1',
    url: 'https://www.facebook.com/autozone',
    iconUrl: '/images/socialmedia/icon-facebook.svg'
  },
  {
    id: '2',
    url: 'https://twitter.com/autozone',
    iconUrl: '/images/socialmedia/icon-twitter.svg'
  },
  {
    id: '3',
    url: 'http://www.youtube.com/user/AutoZone',
    iconUrl: '/images/socialmedia/icon-you-tube.svg'
  },
  {
    id: '4',
    url: 'https://www.instagram.com/autozone',
    iconUrl: '/images/socialmedia/icon-instagram.svg'
  },
  {
    id: '5',
    url: 'https://itunes.apple.com/us/app/autozone/id375381161?mt=8',
    iconUrl: '/images/socialmedia/icon-app-apple.svg'
  }
];

const IconComponent = () => <IconPane btnContainer={btnContainer} />;

export default IconComponent;
