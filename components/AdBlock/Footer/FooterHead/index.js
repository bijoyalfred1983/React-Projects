/* @flow */
import React from 'react';
import NavButtons from './NavButtons';
import IconComponent from '../SocialMediaIcons';
import styles from './styles.scss';

const btnContainer = [
  {
    id: '1',
    linkTo: '/',
    content: 'locate a store',
    iconUrl: '/images/footer/location-pin.svg',
    className: ''
  },
  {
    id: '2',
    linkTo: '/trackOrder',
    content: 'track your order',
    iconUrl: '/images/footer/box.svg',
    className: ''
  },
  {
    id: '3',
    linkTo: '/',
    content: "we're hiring!",
    iconUrl: '/images/footer/pencil-write.svg',
    className: 'hide-on-small-only'
  }
];

const FooterHeadComponent = () => (
  <div className="row">
    <div className={styles.footerHead}>
      <div className={`col s12 m9 ${styles.navBtnPrintWidth}`}>
        <NavButtons btnContainer={btnContainer} />
      </div>
      <div className={`col s12 m3 hide-on-small-only ${styles.printIconWidth}`}>
        <IconComponent />
      </div>
    </div>
  </div>
);

export default FooterHeadComponent;
