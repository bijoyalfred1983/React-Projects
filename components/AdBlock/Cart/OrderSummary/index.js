/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { Popup, Header } from 'semantic-ui-react';
import root from 'window-or-global';
import type { Dispatch, ReduxState } from '../../../types';
import * as styles from './styles.scss';
import * as itemQuantity from '../../../actions/itemQuantity';
import { EarnRewards } from '../../../components/Cart';
import { jsTrack } from '../../../containers/Analytics/ClickTrack';

type Props = {
  data: any,
  promoCall: () => void,
  removePromoCodeCall: () => void,
  promoData: any,
  updateReadyStatus: any,
  staticLabelData: Object,
  promoMessage: boolean,
  orderPromoMessage: boolean,
  cartData: Object,
  toggeleTopMessage: () => void,
  appData: Object
};

type RHeaderProps = {
  clickFn: any,
  staticLabelData: Object
};

type State = {
  isOpen: boolean,
  showPromo: boolean
};

export const RHeader = (props: RHeaderProps) => (
  <div>
    <div className={styles.coreProductTitle}>
      <span className={styles.floatLeft}>
        {props.staticLabelData.label_cart_corePopup_CoreDeposit
          ? props.staticLabelData.label_cart_corePopup_CoreDeposit
          : 'label_cart_corePopup_CoreDeposit'}
      </span>
      <span
        role="presentation"
        onKeyDown={() => {}}
        id="infoCloseBtn"
        className={`${styles.floatRight} ${styles.handCursor}`}
        onClick={props.clickFn}
      >
        X
      </span>
    </div>
    <div
      className={`${styles.clearBoth}
        ${styles.titleSubText}`}
    >
      {props.staticLabelData.label_cart_corePopup_WhatIsThis
        ? props.staticLabelData.label_cart_corePopup_WhatIsThis
        : 'label_cart_corePopup_WhatIsThis'}
    </div>
  </div>
);

export class CartOrderSummary extends PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      value: '',
      showPromo: false
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.removePromoCode = this.removePromoCode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeClick = this.closeClick.bind(this);
    this.openPopup = this.openPopup.bind(this);
  }

  componentWillReceiveProps(newPromoData) {
    const orderOld =
      this.props.data &&
      this.props.data.couponVOList &&
      this.props.data.couponVOList.couponList[0] &&
      this.props.data.couponVOList.couponList[0].applied;
    const orderNew =
      newPromoData.data &&
      newPromoData.data.couponVOList &&
      newPromoData.data.couponVOList.couponList[0] &&
      newPromoData.data.couponVOList.couponList[0].applied;
    if (orderOld !== orderNew) {
      this.setState({
        value: ''
      });
    }
  }

  closeClick() {
    this.setState({ isOpen: false });
  }

  openPopup() {
    this.setState({ isOpen: true });
  }

  handleSubmit = () => {
    if (this.state.value) {
      if (this.props.toggeleTopMessage) {
        this.props.toggeleTopMessage(true);
      }
      const data = {
        promotionId: this.state.value
      };
      this.props.promoCall(data);
      /* Analytics start */
      global.utagData.topmsg = false;
      global.utagData.promo = this.state.value;
      /* Analytics end */
    }
  };

  promoApplySubmit(value) {
    if (value) {
      const data = {
        promotionId: value
      };
      this.props.promoCall(data);
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  applyPromoCode(value) {
    if (value) {
      this.setState({ value: value.name });
      this.promoApplySubmit(value.name);
    }
  }

  removePromoCodeMain = () => {
    const { data, staticLabelData } = this.props;
    return (
      <div>
        {data.couponVOList &&
          data.couponVOList.couponList.map(item => (
            <div>
              {item.name ? (
                <div className={`${styles.fullWidth} ${styles.subTotalMain}`}>
                  <div className={styles.firstHalf}>
                    <span>
                      {staticLabelData.label_cart_orderSummary_Promo
                        ? staticLabelData.label_cart_orderSummary_Promo
                        : 'label_cart_orderSummary_Promo'}{' '}
                      <strong>{item.name}</strong>
                    </span>
                  </div>
                  <div className={styles.secondHalf}>
                    <div>
                      {item.applied ? (
                        <button
                          className={styles.removePromo}
                          id="removePromoCodeBtn"
                          onClick={() => this.removePromoCode(item.id)}
                        >
                          {staticLabelData.label_cart_orderSummary_Remove
                            ? staticLabelData.label_cart_orderSummary_Remove
                            : 'label_cart_orderSummary_Remove'}
                        </button>
                      ) : (
                        <button
                          className={styles.removePromo}
                          id="removePromoCodeBtn"
                          onClick={() => this.applyPromoCode(item)}
                        >
                          {staticLabelData.label_cart_promo_ApplyProper
                            ? staticLabelData.label_cart_promo_ApplyProper
                            : 'label_cart_promo_ApplyProper'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}{' '}
            </div>
          ))}
      </div>
    );
  };

  removePromoCode(value) {
    const data = {
      promotionId: value
    };

    /* Analytics Start */
    const coupon = this.props.data.couponVOList
      ? this.props.data.couponVOList
      : '';
    if (coupon !== '') {
      if (coupon.couponList) {
        const couponName = coupon.couponList[0].name;
        const savings = this.props.data.promotionSavings;
        jsTrack.removePROMOLink(couponName, savings);
      }
    }
    /* Analytics End */
    this.props.removePromoCodeCall(data);
  }

  render() {
    const orderData = this.props.data;
    const {
      updateReadyStatus,
      cartData,
      promoData,
      promoMessage,
      orderPromoMessage,
      appData
    } = this.props;
    const staticLabel =
      appData && appData.staticLabelData ? appData.staticLabelData : {};
    const isDesktop = root.innerWidth >= 1141;
    const isTablet = root.innerWidth >= 720 && root.innerWidth <= 1139;
    if (cartData && cartData.commerceItemsList) {
      cartData.commerceItemsList.map(item => {
        if (!item.storeItem) {
          this.setState({
            showPromo: true
          });
        }
        return null;
      });
    }
    return (
      <div
        className={`${styles.mainDiv} ${cartData &&
          cartData.commerceItemsList &&
          cartData.commerceItemsList.length === 0 &&
          styles.mobileHide}`}
      >
        <div className={styles.summaryHdr}>
          {staticLabel.label_cart_orderSummary_OrderSummary
            ? staticLabel.label_cart_orderSummary_OrderSummary
            : 'label_cart_orderSummary_OrderSummary'}
        </div>
        <div className={styles.uline}>
          <img
            src="/images/rectangle.png"
            alt="Underline"
            className={styles.titleImg}
          />
        </div>
        <div className={styles.contentBlockLeft}>
          <form onSubmit={this.handleSubmit}>
            <div className={`${styles.fullWidth} ${styles.promoCodeContainer}`}>
              <div className={`${styles.firstHalf} ${styles.promoCodeBlk}`}>
                {/* <TextField id="promoCodeTxt" hintText="Enter Promo Code" /> */}
                <input
                  className={styles.promoInput}
                  type="text"
                  placeholder={
                    staticLabel.label_checkout_os_EnterPromoCode
                      ? staticLabel.label_checkout_os_EnterPromoCode
                      : 'label_checkout_os_EnterPromoCode'
                  }
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </div>
              <div className={styles.secondHalf}>
                <button
                  className={styles.promoButton}
                  id="promoSubmitBtn"
                  onClick={() => this.handleSubmit()}
                >
                  {staticLabel.label_checkout_os_Apply
                    ? staticLabel.label_checkout_os_Apply
                    : 'label_checkout_os_Apply'}
                </button>
              </div>
            </div>
          </form>
          {orderData.couponVOList &&
          orderData.couponVOList.couponList[0] &&
          orderData.couponVOList.couponList[0].applied &&
          orderData.couponVOList.couponList[0].id ? (
            <div>{this.removePromoCodeMain()}</div>
          ) : null}
          {orderData.couponVOList &&
          orderData.couponVOList.couponList[0] &&
          orderData.couponVOList.couponList[0].applied ? (
            <div className={`${styles.fullWidth} ${styles.promoTerms}`}>
              <img
                src="/images/promoVote.png"
                alt="promo"
                role="presentation"
              />
              {staticLabel.label_cart_orderSummary_PromotionsOnlyApplyToShipToHomeItemsOtherExclusionsMayApply
                ? staticLabel.label_cart_orderSummary_PromotionsOnlyApplyToShipToHomeItemsOtherExclusionsMayApply
                : 'label_cart_orderSummary_PromotionsOnlyApplyToShipToHomeItemsOtherExclusionsMayApply'}
            </div>
          ) : null}
          {cartData &&
            cartData.rewardsMessageData && (
              <EarnRewards
                tablet={!isTablet}
                staticLabelData={staticLabel}
                data={cartData.rewardsMessageData}
              />
            )}
        </div>
        <div className={styles.verticalDivider}>&nbsp;</div>
        <div className={styles.contentBlock}>
          <div className={styles.tableBlock}>
            <table>
              <tbody>
                <tr>
                  <td className={styles.contentLeft}>
                    {staticLabel.label_cart_orderSummary_ItemSSubtotal
                      ? staticLabel.label_cart_orderSummary_ItemSSubtotal
                      : 'label_cart_orderSummary_ItemSSubtotal'}
                  </td>
                  <td className={styles.contentRight}>
                    ${orderData.itemSubtotal &&
                      orderData.itemSubtotal.toFixed(2).toString()}
                  </td>
                </tr>
                {cartData &&
                  cartData.commerceItemsList &&
                  cartData.commerceItemsList.length > 0 &&
                  orderData &&
                  orderData.coreDeposit > 0 && (
                    <tr>
                      <td className={styles.contentLeft}>
                        {staticLabel.label_cart_orderSummary_CoreDeposit
                          ? staticLabel.label_cart_orderSummary_CoreDeposit
                          : 'label_cart_orderSummary_CoreDeposit'}{' '}
                        <Popup
                          on={isDesktop ? 'hover' : 'click'}
                          open={this.state.isOpen}
                          id="infoPopup"
                          onClose={this.closeClick}
                          onOpen={this.openPopup}
                          trigger={
                            <img
                              role="presentation"
                              src="/images/info.png"
                              alt="info"
                              id="infoBtn"
                              className={`${styles.handCursor} ${
                                styles.vAlignMiddle
                              }`}
                            />
                          }
                        >
                          <Header as="h4" className={styles.coreInfoheader}>
                            <RHeader
                              clickFn={this.closeClick}
                              staticLabelData={staticLabel}
                            />
                          </Header>
                          <div className={styles.depositPH}>
                            {staticLabel.pagecontent_cart_corePopup_CoreDetails
                              ? staticLabel.pagecontent_cart_corePopup_CoreDetails
                              : 'pagecontent_cart_corePopup_CoreDetails'}
                          </div>
                        </Popup>
                      </td>
                      <td className={styles.contentRight}>
                        + ${orderData.coreDeposit > 0 &&
                          orderData.coreDeposit.toFixed(2).toString()}
                      </td>
                    </tr>
                  )}
                {cartData &&
                cartData.commerceItemsList &&
                cartData.commerceItemsList.length > 0 &&
                orderData &&
                orderData.totalSavings > 0 ? (
                  <tr>
                    <td className={styles.contentLeft}>
                      {staticLabel.label_cart_orderSummary_Savings
                        ? staticLabel.label_cart_orderSummary_Savings
                        : 'label_cart_orderSummary_Savings'}
                    </td>
                    <td className={styles.contentRight}>
                      - ${orderData.totalSavings &&
                        orderData.totalSavings.toFixed(2).toString()}
                    </td>
                  </tr>
                ) : null}
                {cartData &&
                cartData.commerceItemsList &&
                cartData.commerceItemsList.length > 0 &&
                orderData &&
                orderData.promotionSavings ? (
                  <tr>
                    <td className={styles.contentLeft}>
                      {staticLabel.label_cart_orderSummary_Promotions
                        ? staticLabel.label_cart_orderSummary_Promotions
                        : 'label_cart_orderSummary_Promotions'}
                    </td>
                    <td className={styles.contentRight}>
                      - ${orderData.promotionSavings &&
                        orderData.promotionSavings.toFixed(2).toString()}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          {/* <div className={styles.promoCode}>Enter Promo Code</div> */}
          <div className={styles.fullWidth}>
            <div className={`${styles.firstHalf} ${styles.promoCodeBlk}`}>
              {/* <TextField id="promoCodeTxt" hintText="Enter Promo Code" /> */}
              <input
                className={`${
                  updateReadyStatus === 'PROMOCODE_APPLY_SUCCESS' &&
                  (promoMessage || orderPromoMessage) &&
                  promoData &&
                  promoData.response === 'failure'
                    ? styles.promoInputError
                    : styles.promoInput
                }`}
                type="text"
                placeholder={
                  staticLabel.label_checkout_os_EnterPromoCodeProper
                    ? staticLabel.label_checkout_os_EnterPromoCodeProper
                    : 'label_checkout_os_EnterPromoCodeProper'
                }
                value={this.state.value}
                disabled={!this.state.showPromo}
                onChange={this.handleChange}
              />
              {updateReadyStatus === 'PROMOCODE_APPLY_SUCCESS' &&
              (promoMessage || orderPromoMessage) &&
              promoData &&
              promoData.response === 'failure' &&
              promoData.errorMessage ? (
                <span className={styles.promoErrorMsg}>
                  {promoData.errorMessage}
                </span>
              ) : null}
            </div>
            <div className={styles.secondHalf}>
              <button
                className={styles.promoButton}
                id="secondPromoBtn"
                onClick={() => this.handleSubmit()}
                disabled={!this.state.showPromo}
              >
                {staticLabel.label_checkout_os_Apply
                  ? staticLabel.label_checkout_os_Apply
                  : 'label_checkout_os_Apply'}
              </button>
            </div>
          </div>
          <div>
            {orderData.couponVOList &&
            orderData.couponVOList.couponList[0] &&
            orderData.couponVOList.couponList[0].id ? (
              <div>{this.removePromoCodeMain()}</div>
            ) : null}
          </div>
          {orderData.couponVOList &&
          orderData.couponVOList.couponList[0] &&
          orderData.couponVOList.couponList[0].applied ? (
            <div className={`${styles.fullWidth} ${styles.promoTerms}`}>
              <img
                src="/images/promoVote.png"
                alt="promo"
                role="presentation"
              />
              {staticLabel.label_cart_orderSummary_PromotionsOnlyApplyToShipToHomeItemsOtherExclusionsMayApply
                ? staticLabel.label_cart_orderSummary_PromotionsOnlyApplyToShipToHomeItemsOtherExclusionsMayApply
                : 'label_cart_orderSummary_PromotionsOnlyApplyToShipToHomeItemsOtherExclusionsMayApply'}
            </div>
          ) : null}
          <div className={`${styles.fullWidth} ${styles.subTotalMain}`}>
            <div className={`${styles.firstHalf} ${styles.subTotalBlk}`}>
              <span>
                {staticLabel.label_cart_orderSummary_Subtotal
                  ? staticLabel.label_cart_orderSummary_Subtotal
                  : 'label_cart_orderSummary_Subtotal'}
              </span>
            </div>
            <div className={`${styles.secondHalf} ${styles.subTotalBlk}`}>
              <span>
                ${orderData.orderSubtotal && orderData.orderSubtotal.toFixed(2)}
              </span>
            </div>
          </div>
          <div className={`${styles.fullWidth} ${styles.subText}`}>
            {staticLabel.label_cart_orderSummary_TaxesAndShippingCalculatedAtCheckout
              ? staticLabel.label_cart_orderSummary_TaxesAndShippingCalculatedAtCheckout
              : 'label_cart_orderSummary_TaxesAndShippingCalculatedAtCheckout'}
          </div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
const connector: Connector<{}, Props> = connect(
  (state: ReduxState) => ({
    quantityData: state.cartUpdate.quantityData,
    cartUpdate: state.cartUpdate,
    updateReadyStatus: state.cartUpdate.readyStatus,
    quantityValue: state.cartUpdate.quantityValue,
    promoData: state.cartUpdate.promoData,
    promoMessage: state.cartUpdate.promoMessage,
    orderPromoMessage: state.orderSummary.promoMessage,
    cartData: state.cart.cartData,
    appData: state.appData
  }),
  (dispatch: Dispatch) => ({
    promoCall: value => dispatch(itemQuantity.promoCall(value)),
    removePromoCodeCall: data => dispatch(itemQuantity.promoRemoveCall(data))
  })
);

export default connector(CartOrderSummary);
