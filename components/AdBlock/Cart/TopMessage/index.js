import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { removePromo } from '../../../actions/itemQuantity';
import type { Dispatch } from '../../../types';
import styles from './styles.scss';
import { jsTrack } from '../../../containers/Analytics/ClickTrack';

type Props = {
  data: any,
  flag: any,
  orderSummaryData: Object,
  removePromo: () => void,
  paymentMethod: String
  // toggeleTopMessage: boolean => void
};

type State = {
  show: boolean
};

// const TopMessage = (props: Props) => {
//   if (props.flag === 'SUCCESS') {
//     return (
//       <div>
//         <div className={styles.successPart}>
//           <img src="/images/itemSuccess-mobile.png" alt="Error icon" />
//           <span>{props.data}</span>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div>
//       <div className={styles.errorPart}>
//         <img src="/images/itemError-mobile.png" alt="Error icon" />
//         <span>{props.data}</span>
//       </div>
//     </div>
//   );
// };

class TopMessage extends Component<Props, State> {
  componentWillUnmount() {
    this.props.removePromo();
  }

  showMessage = () => {
    /* Analytics start */
    const propsData = this.props;
    const summaryData =
      propsData.orderSummaryData !== undefined
        ? this.props.orderSummaryData
        : '';
    let savings = 0;
    if (summaryData !== undefined && summaryData !== '') {
      savings = summaryData.promotionSavings
        ? Math.abs(summaryData.promotionSavings)
        : 0;
    }
    if (!global.utagData.topmsg) {
      if (propsData.flag === 'SUCCESS' && savings > 0) {
        const code = summaryData.couponVOList.couponList[0].name;
        jsTrack.successPROMOLink(code, savings);
        global.utagData.topmsg = true;
      } else if (propsData.flag === 'ERROR') {
        const errosMsg = propsData.data;
        const promocode = global.utagData.promo;
        if (promocode !== undefined) {
          jsTrack.invalidPROMOLink(promocode, errosMsg);
          jsTrack.cartItemLevelError(errosMsg);
        }
        global.utagData.topmsg = true;
      }
    }
    // Checkout Errors
    if (this.props.paymentMethod) {
      jsTrack.trackPaymentFailureCheckout(
        propsData.data,
        this.props.paymentMethod
      );
    }
    /* Analytics end */

    if (this.props.flag === 'SUCCESS') {
      return (
        <div>
          <div className={styles.successPart}>
            <img src="/images/itemSuccess-mobile.png" alt="Error icon" />
            <span>{this.props.data}</span>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className={styles.errorPart}>
          <img src="/images/itemError-mobile.png" alt="Error icon" />
          <span>{this.props.data}</span>
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.showMessage()}</div>;
  }
}

/* istanbul ignore next */
const connector: Connector<{}, Props> = connect(null, (dispatch: Dispatch) => ({
  removePromo: () => dispatch(removePromo())
}));

export default connector(TopMessage);
