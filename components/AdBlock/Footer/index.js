/* @flow */
import React, { PureComponent } from 'react';
import FooterHead from './FooterHead';
import FooterBody from './FooterBody';
import OtherSites from './FooterOtherSites';
import BottomLinks from './FooterBottomLinks';
import IconComponent from './SocialMediaIcons';
import styles from './styles.scss';

type Props = {
  appData: Object
};

export class FooterComponent extends PureComponent<Props> {
  render() {
    const { appData } = this.props;
    const staticLabel = appData.staticLabelData ? appData.staticLabelData : {};
    return (
      <div className={styles.footerWrapper}>
        <section className={styles.footerMainWrapper}>
          <div className={styles.footerMainContent}>
            <FooterHead staticLabelData={staticLabel} />
            <hr className="hide-on-small-only" />
            <FooterBody />
            <div className="hide-on-small-only">
              <OtherSites />
            </div>
          </div>
        </section>
        <hr className="hide-on-small-only" />
        <section className={styles.bottomSection}>
          <div className={`hide-on-med-and-up ${styles.printHide}`}>
            <div className={styles.hiring}>
              <div>
                <img src="/images/footer/pencil-write.svg" alt="" />
                <span>WE RE HIRING!</span>
              </div>
              <a href="http://www.autozone.com">LEARN MORE</a>
            </div>
            <hr />
            <IconComponent />
          </div>
          <BottomLinks />
          <div className={styles.footerCopyright}>
            © 2001-2018 AutoZone, Inc. All Rights Reserved
          </div>
          <div className={styles.digitalCert}>
            <img
              src="/images/footer/digicert.png"
              alt="digital certification"
            />
          </div>
        </section>
      </div>
    );
  }
}

export default FooterComponent;
