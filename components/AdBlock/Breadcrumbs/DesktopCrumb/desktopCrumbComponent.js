/* @flow */
import React, { PureComponent } from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as styles from '../styles.scss';
import { analyticsBreadCrumb } from '../../../containers/Analytics/DataLayer';
import { jsTrack } from '../../../containers/Analytics/ClickTrack';

type Props = {
  data: any
};

class DesktopCrumb extends PureComponent<Props> {
  handleClick = (e: any, linkName: any) => {
    jsTrack.breadCrumbInteraction(linkName);
  };
  render() {
    const breadcrumbsList = this.props.data;
    analyticsBreadCrumb({
      pageHierarchy: `${this.props.data
        .map(item => item.displayName)
        .join('|')}`
    });
    return (
      <Breadcrumb className={styles.breadcrumbLinkAZ}>
        {breadcrumbsList &&
          breadcrumbsList.map((breadcrumbItem, index) => {
            if (
              parseInt(index, 10) === parseInt(breadcrumbsList.length - 1, 10)
            ) {
              return (
                <Breadcrumb.Section
                  active
                  key={breadcrumbItem.displayName}
                  className={styles.activeLink}
                >
                  {breadcrumbItem.displayName}
                </Breadcrumb.Section>
              );
            }
            return (
              <span key={breadcrumbItem.displayName}>
                <Breadcrumb.Section className={styles.homeLink}>
                  <Link
                    to={{
                      pathname: breadcrumbItem.url || `/`,
                      state: { pageType: breadcrumbItem.pageType }
                    }}
                    className={styles.homeLink}
                    id="breadcrumbItem"
                    onClick={e =>
                      this.handleClick(e, breadcrumbItem.displayName)
                    }
                  >
                    {breadcrumbItem.displayName}
                  </Link>
                </Breadcrumb.Section>
                <Breadcrumb.Divider className={styles.dividerLink} />
              </span>
            );
          })}
      </Breadcrumb>
    );
  }
}

export default DesktopCrumb;
