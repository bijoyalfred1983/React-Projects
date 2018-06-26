/* @flow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import type { Connector } from 'react-redux';
import styles from './styles.scss';
import type { Dispatch, ReduxState } from '../../../types';
import * as orderSummaryCall from '../../../actions/orderSummary';
import { jsTrack } from '../../../containers/Analytics/ClickTrack';

type Props = {
  orderTotalPart: Object,
  miniCartFlag: boolean,
  // data: Object,
  checkOut: () => void,
  totalData: Object,
  checkoutError: string,
  cartUpdate: Object,
  updatedError: () => void,
  appData: Object
};

type State = {
  orderSubTotal: number
};

export class MiniCartCheckOut extends PureComponent<Props, State> {
  state = {
    orderSubTotal: this.props.totalData.orderSubTotal
  };

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.miniCartFlag || nextProps.checkoutError) {
      if (nextProps.miniCartFlag) {
        this.setState({
          orderSubTotal: nextProps.orderTotalPart.orderSubTotal
        });
      } else if (
        nextProps.cartUpdate &&
        nextProps.cartUpdate.checkoutMessageData
      ) {
        if (nextProps.cartUpdate.checkoutMessageData.errorMessage)
          this.props.updatedError(
            nextProps.cartUpdate.checkoutMessageData.errorMessage
          );
      }
    }
  }

  checkOutCall = () => {
    /* Analytics Start */
    jsTrack.trackCheckoutAddToCartOverlay();
    /* Analytics End */
    this.props.checkOut();
  };

  render() {
    const { totalData, appData } = this.props;
    const staticLabel =
      appData.staticLabelData !== undefined ? appData.staticLabelData : {};
    return (
      <div>
        <div className={styles.miniCartPart}>
          <Link to="/cart">
            <img
              className={styles.cartIcon}
              src="/images/az-cart.png"
              alt="cart icon"
            />
            {totalData ? (
              <span className={styles.cartItemCount}>
                {totalData.itemCount}{' '}
              </span>
            ) : (
              ''
            )}
          </Link>
          <span className={styles.cartCountData}>
            {' '}
            {staticLabel.label_confirmation_Header_youHave
              ? staticLabel.label_confirmation_Header_youHave
              : 'label_confirmation_Header_youHave'}{' '}
            {totalData.itemCount}{' '}
            {staticLabel.label_cart_lineItem_ItemsInTheCart
              ? staticLabel.label_cart_lineItem_ItemsInTheCart
              : 'label_cart_lineItem_ItemsInTheCart'}{' '}
          </span>
        </div>
        <div className={styles.cartTotal}>
          {staticLabel.label_confirmation_summary_CartTotal
            ? staticLabel.label_confirmation_summary_CartTotal
            : 'label_confirmation_summary_CartTotal'}
          : ${this.state.orderSubTotal.toFixed(2)}
        </div>
        <div className={styles.checkoutBut}>
          <RaisedButton
            type="submit"
            label={
              staticLabel.label_checkout_heading_Checkout
                ? staticLabel.label_checkout_heading_Checkout
                : 'label_checkout_heading_Checkout'
            }
            onClick={() => this.checkOutCall()}
            className={styles.addToCartBtnBtn}
          />
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
const connector: Connector<{}, Props> = connect(
  (state: ReduxState) => ({
    checkoutError: state.orderSummary.checkoutError,
    orderReadyStatus: state.orderSummary.readyStatus,
    cartUpdate: state.cartUpdate,
    orderTotalPart: state.header.headerData.miniCartMap,
    miniCartFlag: state.header.miniCartSuccessNote,
    commerceId: state.cartUpdate.commerceId,
    appData: state.appData
  }),
  (dispatch: Dispatch) => ({
    checkOut: () => dispatch(orderSummaryCall.fetchCheckout())
  })
);

export default connector(MiniCartCheckOut);
