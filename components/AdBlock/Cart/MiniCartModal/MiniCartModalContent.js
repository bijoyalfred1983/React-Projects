/* flow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { Popup, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import RaisedButton from 'material-ui/RaisedButton';
import type { Dispatch, ReduxState } from '../../../types';
import styles from './styles.scss';
import CounterPartItem from './MiniCartCounterPart';
import * as orderSummaryCall from '../../../actions/orderSummary';
import CartCheckout from './MiniCartCheckOut';
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
type Props = {
  miniCartData: Object,
  staticData: Object,
  image: any,
  cartTotalData: Object,
  closeStoreModal: () => void,
  productDetails: Object,
  url: string
};

type State = {
  total: any,
  newTotal: any,
  errorMsg: string
};

let counterData = {};

export class MiniCartModalContent extends PureComponent<Props, State> {
  state = {
    total: this.props.miniCartData.quantity,
    newTotal: 0,
    errorMsg: ''
  };

  componentWillMount() {
    if (this.props.miniCartData) {
      const newLocal = {
        quantity: this.props.miniCartData.quantity,
        unitAmount: this.props.miniCartData.priceInfo.unitAmount
          ? this.props.miniCartData.priceInfo.unitAmount
          : null,
        commerceItemId: this.props.miniCartData.id
      };
      counterData = newLocal;
    }
  }
  quantityChange = (val: any, err: Object) => {
    if (val && err) {
      this.setState({
        newTotal: val,
        errorMsg: err.title
      });
    } else if (val) {
      this.setState({
        newTotal: val
      });
    } else {
      this.setState({
        errorMsg: err.title
      });
    }
  };
  errorChange = (val: Object) => {
    if (val) {
      this.setState({
        errorMsg: val
      });
    }
  };

  render() {
    const {
      miniCartData,
      staticData,
      image,
      cartTotalData,
      productDetails,
      url
    } = this.props;

    const retailPrice = this.state.newTotal
      ? (this.state.newTotal * miniCartData.priceInfo.unitAmount)
          .toFixed(2)
          .toString()
          .split('.')
      : (this.state.total * miniCartData.priceInfo.unitAmount)
          .toFixed(2)
          .toString()
          .split('.');
    const staticLabel = staticData || {};
    const text = staticLabel.pagecontent_cart_corePopup_CoreDetails
      ? staticLabel.pagecontent_cart_corePopup_CoreDetails
      : 'pagecontent_cart_corePopup_CoreDetails';
    return (
      <div className={styles.azModal}>
        <div className={styles.storeChangeContainer}>
          <div className={styles.minicartHeader}>
            <div className={styles.leftsideHeader}>
              <h2>
                {' '}
                1{' '}
                {staticLabel.label_cart_promo_Item
                  ? staticLabel.label_cart_promo_Item
                  : 'label_cart_promo_Item'}{' '}
              </h2>{' '}
              <span>
                {staticLabel.label_confirmation_Header_AddedToCart
                  ? staticLabel.label_confirmation_Header_AddedToCart.toUpperCase()
                  : 'label_confirmation_Header_AddedToCart'}
              </span>
            </div>
            <div className={styles.rightsideHeader}>
              <button
                id="continueBTN"
                onClick={() => {
                  this.props.closeStoreModal();
                }}
                className={styles.continue}
              >
                {staticLabel.label_cart_topNavigation_ContinueShopping
                  ? staticLabel.label_cart_topNavigation_ContinueShopping.toUpperCase()
                  : 'label_cart_topNavigation_ContinueShopping'}{' '}
              </button>
              <button
                id="crossBTN"
                className={styles.Modal_Header_closeButton}
                onClick={() => {
                  this.props.closeStoreModal();
                }}
              >
                <img
                  src="/images/close-dark.png"
                  alt="Close window"
                  width="17px"
                />
              </button>
            </div>
          </div>
          <div className={`row ${styles.minicartContent}`}>
            <div className={`col l8 m8 ${styles.minicartContentLeft}`}>
              {this.state.errorMsg ? (
                <span className={styles.topError}> {this.state.errorMsg} </span>
              ) : null}
              <div className={styles.leftPartContent}>
                <div className="col l4 m5 s5">
                  {url ? (
                    <Link
                      to={{
                        pathname: url,
                        state: { pageType: 'ProductDetail' }
                      }}
                      onClick={() => {
                        this.props.closeStoreModal();
                      }}
                    >
                      <img
                        className={styles.thumbnail}
                        src={image}
                        alt="thumbnail"
                      />
                    </Link>
                  ) : (
                    <img
                      className={styles.thumbnail}
                      src={image}
                      alt="thumbnail"
                    />
                  )}
                </div>
                <div className={`col l8 m8 ${styles.detailpart}`}>
                  <span className={styles.titlePart}>{miniCartData.brand}</span>{' '}
                  <span className={styles.partType}>
                    {miniCartData.partTypeName}
                  </span>
                  <div className={styles.titleSubPart}>
                    {productDetails.quickNote}
                  </div>
                  <div className={styles.productDetailPart}>
                    <div className={styles.detailLeft}>
                      {counterData && (
                        <CounterPartItem
                          data={counterData}
                          updatedValue={this.quantityChange}
                        />
                      )}
                    </div>
                    <div className={styles.detailRight}>
                      <div>
                        {miniCartData.priceInfo.onSale && (
                          <div>
                            <span className={styles.priceSub}>$</span>
                            <span className={styles.price}>
                              {retailPrice[0]}
                            </span>
                            <span className={styles.priceSub}>
                              {retailPrice[1]}
                            </span>
                          </div>
                        )}
                        {!miniCartData.priceInfo.onSale && (
                          <div>
                            <div className={styles.was}>
                              {staticLabel.label_cart_lineItem_Was
                                ? staticLabel.label_cart_lineItem_Was
                                : 'label_cart_lineItem_Was'}{' '}
                              <span className={styles.strike}>
                                ${miniCartData.priceInfo.rawTotalPrice
                                  .toFixed(2)
                                  .toString()}
                              </span>
                            </div>
                            <div className={styles.pricePart}>
                              {staticLabel.label_confirmation_lineItem_Total
                                ? staticLabel.label_confirmation_lineItem_Total
                                : 'label_confirmation_lineItem_Total'}{' '}
                              <span className={styles.priceSub}>$</span>
                              <span className={styles.price}>
                                {retailPrice[0]}
                              </span>
                              <span className={styles.priceSub}>
                                {retailPrice[1]}
                              </span>
                            </div>
                          </div>
                        )}
                        {cartTotalData && cartTotalData.corePrice ? (
                          <div className={styles.corePrice}>
                            <span>
                              <span>+ </span>
                              {staticLabel.label_cart_lineItem_Core
                                ? staticLabel.label_cart_lineItem_Core
                                : 'label_cart_lineItem_Core'}{' '}
                              ${cartTotalData.corePrice}
                            </span>
                            <Popup
                              trigger={
                                <img
                                  style={{ marginLeft: '5px' }}
                                  src="/images/info.png"
                                  alt="info"
                                />
                              }
                              hoverable
                            >
                              <Header as="h4">
                                {staticLabel.label_cart_lineItem_WhatIsIt
                                  ? staticLabel.label_cart_lineItem_WhatIsIt
                                  : 'label_cart_lineItem_WhatIsIt'}
                              </Header>
                              <p>{text}</p>
                            </Popup>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col l4 m4 ${styles.minicartContentRight}`}>
              {cartTotalData && (
                <CartCheckout
                  data={counterData}
                  totalData={cartTotalData}
                  updatedError={this.errorChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
const connector: Connector<{}, Props> = connect(
  (state: ReduxState) => ({
    orderReadyStatus: state.orderSummary.readyStatus
  }),
  (dispatch: Dispatch) => ({
    checkOut: () => dispatch(orderSummaryCall.fetchCheckout())
  })
);

export default connector(MiniCartModalContent);
