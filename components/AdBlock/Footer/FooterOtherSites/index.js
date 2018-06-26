/* @flow */
import React from 'react';
import NavLink from './NavLink';
import styles from './styles.scss';

const otherSitesTitle = 'Other AutoZone Sites';
const otherSitesLinks = [
  {
    id: '1',
    content: 'AutoZoner Services ',
    URL: 'http://www.alldatapro.com/includes/main.jsp'
  },
  {
    id: '2',
    content: 'AutoZoner Benefits Login',
    URL:
      'https://sp7.benefitfocus.com/sp/startSSO.ping?PartnerIdpId=AutoZone-Unified-Emp-2018-IdP&amp;TargetResource=https%3A%2F%2Fautozone.hrintouch.com%2Fplatform%2FssoInbound.aspx%3FApplicationID%3DHRInTouch'
  },
  {
    id: '3',
    content: 'AutoZone Pro',
    URL: 'https://www.autozonepro.com'
  },
  {
    id: '4',
    content: 'ALLDATAdiy',
    URL: 'https://www.alldatadiy.com'
  },
  {
    id: '5',
    content: 'ALLDATA Repair',
    URL: 'http://www.alldatapro.com/includes/main.jsp'
  }
];

const OtherSitesComponent = () => (
  <div className={styles.footerOtherContainer}>
    <div className={styles.footerOther}>
      <div className={styles.heading}>{otherSitesTitle.toUpperCase()}</div>
      <NavLink NavLinks={otherSitesLinks} />
    </div>
  </div>
);

export default OtherSitesComponent;
