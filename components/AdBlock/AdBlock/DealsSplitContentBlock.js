/* @flow */
import React, { PureComponent } from 'react';
import { connect, Connector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeroComponentStack from '../../containers/ContentBlock/HeroContentBanner/HeroComponentStack';
import SlantContent from './../../containers/ContentBlock/SlantContent';
import QuickSubscription from './../../containers/ContentBlock/QuickSubscription';
// import shelfPageBanner from './ShelfPageBanner';
import SplitContentBlock from '../../containers/ContentBlock/HeroContentBanner/SplitContentBlock';
// import PencilAd from '../../containers/ContentBlock/HeroContentBanner/pencilContent';

type Props = {
  viewInfo: Object
};

class DealsSplitContentBlock extends PureComponent<Props> {
  rightArrowSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="7"
      viewBox="0 0 12 7"
    >
      <path
        fill="#F38021"
        fillRule="evenodd"
        d="M7.525 5.849l1.034 1.033L12 3.442 8.559 0 7.525 1.034 9.201 2.71H0v1.462h9.201z"
      />
    </svg>
  );

  render() {
    const { viewInfo } = this.props;
    const valuesplit = viewInfo;
    const mainContent = valuesplit.contentBlock;
    return (
      <div>
        {mainContent &&
          mainContent.map(obj => (
            <div>
              {obj[`@type`] === 'SplitContentBlock' && (
                <div key={obj}>
                  <SplitContentBlock blockItemData={obj} />
                </div>
              )}
              {obj[`@type`] === 'SlantContentBlock' && (
                <div key={obj}>
                  <SlantContent {...obj} />
                </div>
              )}
              {obj[`@type`] === 'HeroContentBlock' && (
                <div key={obj}>
                  <HeroComponentStack data={obj} />
                </div>
              )}
              {obj[`@type`] === 'EmailSignupContentBlock' && (
                <div key={obj}>
                  <QuickSubscription emailData={obj.contentBlock} />
                </div>
              )}
              {/* {obj[`@type`] === 'PencilAdContentBlock' && (
                <div key={obj}>
                  <shelfPageBanner data={obj} />
                </div>
              )} */}
            </div>
          ))}
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  readyStatus: state.deals.readyStatus,
  viewInfo: state.deals.viewInfo
});

/* istanbul ignore next */
const connector: Connector<{}, Props> = connect(mapStateToProps);

/* istanbul ignore next */
export default withRouter(connector(DealsSplitContentBlock));
