/* @flow */
import React, { PureComponent } from 'react';
import * as styles from './styles.scss';
import MobileCrumb from './MobileCrumb/mobileCrumbComponent';
import DesktopCrumb from './DesktopCrumb/desktopCrumbComponent';

type Props = {
  data: any
};

class Breadcrumbs extends PureComponent<Props> {
  render() {
    const breadcrumbsList = this.props.data;
    if (breadcrumbsList && breadcrumbsList.length > 0) {
      return (
        <div>
          <div className={styles.desktopCrumb}>
            <DesktopCrumb data={breadcrumbsList} />
          </div>
          <div className={styles.mobileCrumb}>
            <MobileCrumb data={breadcrumbsList} />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Breadcrumbs;
