/* @flow */
import React, { PureComponent } from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import * as styles from '../styles.scss';

type Props = {
  data: any
};

type State = {
  showFullCrumb: boolean,
  crumbData: any
};

class MobileCrumb extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      showFullCrumb: false,
      crumbData: this.props.data
    };
  }

  componentWillReceiveProps(nextProps) {
    const newData = nextProps.data;
    this.setState({
      crumbData: newData
    });
  }

  onClickEllipsis = () => {
    this.setState({ showFullCrumb: true });
  };

  render() {
    // console.log('breadcrumbdata', this.state.crumbData);
    let breadcrumbTag;
    if (
      this.state.crumbData &&
      this.state.crumbData.length >= 3 &&
      !this.state.showFullCrumb
    ) {
      breadcrumbTag = (
        <span>
          <Breadcrumb.Section className={styles.homeLink}>
            <button onClick={this.onClickEllipsis} className={styles.homeLink}>
              {`... `}
            </button>
          </Breadcrumb.Section>
          <Breadcrumb.Divider className={styles.dividerLink} />
        </span>
      );
    }

    return (
      <Breadcrumb className={styles.breadcrumbLinkAZ}>
        {breadcrumbTag}
        {this.state.crumbData &&
          this.state.crumbData.map((breadcrumbItem, index) => {
            if (
              !this.state.showFullCrumb &&
              index <= this.state.crumbData.length - 3
            ) {
              return false;
            }

            if (
              parseInt(index, 10) ===
              parseInt(this.state.crumbData.length - 1, 10)
            ) {
              return (
                <Breadcrumb.Section
                  key={breadcrumbItem.displayName}
                  active
                  className={styles.activeLink}
                >
                  {' '}
                  {breadcrumbItem.displayName}{' '}
                </Breadcrumb.Section>
              );
            }
            return (
              <span key={breadcrumbItem.displayName}>
                <Breadcrumb.Section className={styles.homeLink}>
                  <a
                    href={breadcrumbItem.url || '/'}
                    className={styles.homeLink}
                  >
                    {' '}
                    {breadcrumbItem.displayName}{' '}
                  </a>
                </Breadcrumb.Section>
                <Breadcrumb.Divider className={styles.dividerLink} />
              </span>
            );
          })}
      </Breadcrumb>
    );
  }
}

export default MobileCrumb;
