/* @flow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { Popup, Header } from 'semantic-ui-react';
import type { Dispatch, ReduxState } from '../../../../types';
import styles from './styles.scss';
import DeliveryOptionItem from './DeliveryOption';
import CounterPartItem from './CounterPart';
import * as itemQuantity from '../../../../actions/itemQuantity';
import { jsTrack } from '../../../../containers/Analytics/ClickTrack';

type Props = {
  data: Object,
  removeCall: () => void,
  updateReadyStatus: string,
  cartUpdate: Object,
  quantityValue: any,
  appData: Object,
  commerceId: any,
  cartErrorItems: any
};

type State = {
  expanded: boolean,
  total: any,
  errorFlag: boolean,
  errorMessageVerify: any
};

class Item extends PureComponent<Props, State> {
  state = {
    expanded: false,
    total: this.props.data.quantity,
    errorFlag: false,
    errorMessageVerify: ''
  };

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.commerceId === this.props.data.commerceItemId) {
      if (nextProps.quantityValue) {
        this.setState({
          total: nextProps.quantityValue
        });
      }
      if (
        nextProps.updateReadyStatus === 'ITEMQUANTITY_FAILURE' ||
        nextProps.updateReadyStatus === 'STORECHANGE_FAILURE' ||
        nextProps.updateReadyStatus === 'REMOVECART_FAILURE'
      ) {
        this.setState({
          errorFlag: true,
          errorMessageVerify: ''
        });
      } else {
        this.setState({
          errorFlag: false,
          errorMessageVerify: ''
        });
      }
    }
    if (this.props.cartErrorItems !== nextProps.cartErrorItems) {
      const cartData = nextProps.cartErrorItems.filter(
        item => item.commerceItemId === this.props.data.commerceItemId
      );
      if (cartData.length > 0) {
        this.setState({
          errorFlag: true,
          errorMessageVerify: cartData[0].itemErrorMessage
        });
      }
    }
  }

  onSeeProductNotesClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  onBackClick = () => {
    this.setState({ expanded: false });
  };

  removePart = () => {
    this.props.removeCall(this.props.data.commerceItemId);
    jsTrack.trackCartRemoval(this.props.data.skuPricingAndAvailability.skuId);
  };
  renderApplicationMap = map => {
    let merge = [];
    Object.entries(map).forEach(obj => {
      const key = obj[0];
      const value = obj[1];
      merge = `<span style=font-weight:normal>${key}</span> ${value}`;
    });
    return merge;
  };
  render() {
    const { data, cartUpdate, appData } = this.props;
    const retailPrice = (this.state.total * data.retailPrice)
      .toFixed(2)
      .toString()
      .split('.');
    const listPrice = (this.state.total * data.retailPrice)
      .toFixed(2)
      .toString()
      .split('.');

    const staticLabel = appData.staticLabelData ? appData.staticLabelData : {};
    const text = staticLabel.pagecontent_cart_corePopup_CoreDetails
      ? staticLabel.pagecontent_cart_corePopup_CoreDetails
      : 'pagecontent_cart_corePopup_CoreDetails';
    const noVehicleAssigned = staticLabel.label_cart_lineItem_NoVehicleAssigned
      ? staticLabel.label_cart_lineItem_NoVehicleAssigned
      : 'label_cart_lineItem_NoVehicleAssigned';
    return (
      <div
        className={
          (this.state.errorFlag &&
            (cartUpdate.err && cartUpdate.err.response)) ||
          (this.state.errorFlag && this.state.errorMessageVerify)
            ? styles.cartLeft
            : ''
        }
      >
        <div className={styles.cardBlock}>
          {this.state.errorFlag &&
            (this.state.errorMessageVerify ||
              (cartUpdate.err && cartUpdate.err.response)) && (
              <div className={styles.errorText}>
                <img src="/images/itemError-mobile.png" alt="Error icon" />
                {!this.state.errorMessageVerify && (
                  <span>
                    {cartUpdate.err &&
                      cartUpdate.err.response &&
                      cartUpdate.err.response.data.title}
                  </span>
                )}
                {this.state.errorMessageVerify && (
                  <span>{this.state.errorMessageVerify}</span>
                )}
              </div>
            )}
          <button
            onClick={this.removePart}
            className={`${styles.remove} ${styles.desktop}`}
          >
            {' '}
            {staticLabel.label_cart_lineItem_Remove
              ? staticLabel.label_cart_lineItem_Remove
              : 'label_cart_lineItem_Remove'}{' '}
          </button>
          {data.eligibleForNextDay || data.rebateAvailable ? (
            <div className={`${styles.aboveHeader} ${styles.mobile}`}>
              {data.eligibleForNextDay ? (
                <img
                  src="/images/next-day-delivery.png"
                  alt={
                    staticLabel.label_checkout_os_NextDayDelivery
                      ? staticLabel.label_checkout_os_NextDayDelivery
                      : 'label_checkout_os_NextDayDelivery'
                  }
                  className={styles.nextDayDelivery}
                />
              ) : null}
              {/* {data.rebateAvailable ? (
                <div className={styles.rebate}>
                  <img
                    src="/images/info.png"
                    alt="rebate"
                    style={{ marginRight: '4px', verticalAlign: 'middle' }}
                  />
                  <span style={{ verticalAlign: 'middle' }}>
                    {staticLabel.label_cart_lineItem_MailInRebateAvailable
                      ? staticLabel.label_cart_lineItem_MailInRebateAvailable
                      : 'label_cart_lineItem_MailInRebateAvailable'}
                  </span>
                </div>
              ) : null} */}
            </div>
          ) : null}
          <div className={styles.header}>
            <div>
              <span className={styles.itemName}>{data.displayName}</span>
              <button
                onClick={this.removePart}
                className={`${styles.remove} ${styles.mobile}`}
              >
                <img src="/images/close-dark.png" alt="Error icon" />
              </button>
              {data.eligibleForNextDay ? (
                <img
                  src="/images/next-day-delivery.png"
                  alt={
                    staticLabel.label_checkout_os_NextDayDelivery
                      ? staticLabel.label_checkout_os_NextDayDelivery
                      : 'label_checkout_os_NextDayDelivery'
                  }
                  className={`${styles.nextDayDelivery} ${styles.desktop}`}
                />
              ) : null}
            </div>
            <span className={styles.quickNote}>{data.quickNote}</span>
          </div>
          <div className={`row ${styles.content} ${styles.itemInfo}`}>
            <div className={`col l4 m4 s12 ${styles.printViewContainer}`}>
              <div className={`col l4 m6 s6 ${styles.printView}`}>
                <img
                  className={styles.thumbnail}
                  src={data.imageURL}
                  alt="thumbnail"
                />
              </div>
              <div className={`col l8 m6 s6 ${styles.printView}`}>
                <div>
                  {staticLabel.label_cart_lineItem_PartNo
                    ? staticLabel.label_cart_lineItem_PartNo
                    : 'label_cart_lineItem_PartNo'}{' '}
                  <span
                    className={`${styles.itemInfoValue} ${styles.partNumber}`}
                  >
                    {data.partNumber}
                  </span>
                </div>
                {(data.applicationMap && data.applicationMap !== null) || '' ? (
                  <div>
                    <span
                      className={styles.itemInfoValue}
                      dangerouslySetInnerHTML={{__html: this.renderApplicationMap(data.applicationMap)}} // eslint-disable-line
                    />
                  </div>
                ) : null}
                {(data.warrenty && data.warrenty !== null) || '' ? (
                  <div>
                    {staticLabel.label_cart_lineItem_Warranty
                      ? staticLabel.label_cart_lineItem_Warranty
                      : 'label_cart_lineItem_Warranty'}{' '}
                    <span
                      className={`${styles.itemInfoValue} ${styles.warranty}`}
                    >
                      {data.warrenty}
                    </span>
                  </div>
                ) : null}
                {data.productNotes || data.application ? (
                  <div
                    className={`${styles.seeProductNotes} ${styles.mobile}`}
                    onClick={this.onSeeProductNotesClick}
                    role="button"
                    onKeyPress={/* istanbul ignore next */ () => {}}
                    tabIndex={0}
                  >
                    {staticLabel.label_cart_lineItem_SeeProductNotes
                      ? staticLabel.label_cart_lineItem_SeeProductNotes
                      : 'label_cart_lineItem_SeeProductNotes'}
                  </div>
                ) : null}
                {data.rebateAvailable !== false ? (
                  <div className={`${styles.rebate} ${styles.desktop}`}>
                    <a
                      href={data.rebateUrl}
                      target="_blank"
                      download={data.rebateUrl}
                    >
                      {staticLabel.label_cart_lineItem_RebateAvailable
                        ? staticLabel.label_cart_lineItem_RebateAvailable
                        : 'label_cart_lineItem_RebateAvailable'}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
            <div className={`col l3 m3 s12 ${styles.printViewDelivery}`}>
              <DeliveryOptionItem data={data} staticLabelData={staticLabel} />
            </div>
            <div className={`col l3 m3 s6 ${styles.printViewCounter}`}>
              <CounterPartItem
                data={data}
                staticLabelData={staticLabel}
                cartUpdate={cartUpdate}
              />
            </div>
            <div className={`col l2 m2 s6 ${styles.printViewPrice}`}>
              <div className="right-align">
                {data.onSale && (
                  <div>
                    <span className={styles.priceSub}>$</span>
                    <span className={styles.price}>{retailPrice[0]}</span>
                    <span className={styles.priceSub}>{retailPrice[1]}</span>
                  </div>
                )}
                {!data.onSale && (
                  <div>
                    <div className={styles.was}>
                      {staticLabel.label_cart_lineItem_Was
                        ? staticLabel.label_cart_lineItem_Was
                        : 'label_cart_lineItem_Was'}{' '}
                      <span className={styles.strike}>
                        ${data.skuPricingAndAvailability.retailPrice
                          .toFixed(2)
                          .toString()}
                      </span>
                    </div>
                    <div className={styles.pricePart}>
                      <span className={styles.priceSub}>$</span>
                      <span className={styles.price}>{listPrice[0]}</span>
                      <span className={styles.priceSub}>{listPrice[1]}</span>
                    </div>
                  </div>
                )}
                {data.skuPricingAndAvailability.corePriceAvailable && (
                  <div className={styles.corePrice}>
                    <span>
                      <span>+ </span>
                      {staticLabel.label_cart_lineItem_Core
                        ? staticLabel.label_cart_lineItem_Core
                        : 'label_cart_lineItem_Core'}{' '}
                      ${data.skuPricingAndAvailability.corePrice
                        .toFixed(2)
                        .toString()}
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
                )}
              </div>
            </div>
          </div>
          {data && !data.discounted ? (
            <div
              className={`hide-on-small-only show-on-med-and-up ${
                styles.exclusion
              }`}
            >
              <img
                src="/images/promoVote.png"
                alt="promo"
                role="presentation"
              />
            </div>
          ) : null}
          <div className={styles.footer}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                paddingLeft: '8px',
                justifyContent: 'space-between'
              }}
            >
              <span className={styles.vehicle}>
                {data.vehicleFit ? (
                  <span style={{ display: 'table' }}>
                    <img
                      src="/images/fits.png"
                      height="14"
                      width="14"
                      alt={
                        staticLabel.label_cart_lineItem_Fits
                          ? staticLabel.label_cart_lineItem_Fits
                          : 'label_cart_lineItem_Fits'
                      }
                    />
                    <span className={styles.fits}>
                      {staticLabel.label_cart_lineItem_Fits
                        ? staticLabel.label_cart_lineItem_Fits
                        : 'label_cart_lineItem_Fits'}
                    </span>
                  </span>
                ) : null}
                <span className={styles.vehicleDescription}>
                  {data.vehicleDescription || noVehicleAssigned}
                </span>
              </span>
              {data.productNotes && data.application ? (
                <span
                  className={`${styles.seeProductNotes} ${styles.desktop}`}
                  onClick={this.onSeeProductNotesClick}
                  onKeyUp={/* istanbul ignore next */ () => {}}
                  role="button"
                  tabIndex={0}
                >
                  {staticLabel.label_cart_lineItem_SeeProductNotesSmall
                    ? staticLabel.label_cart_lineItem_SeeProductNotesSmall
                    : 'label_cart_lineItem_SeeProductNotesSmall'}
                  <img
                    style={{ float: 'right', marginLeft: '10px' }}
                    width="18px"
                    height="18px"
                    src="/images/down-arrow.png"
                    alt="expand"
                  />
                </span>
              ) : null}
            </div>
            {data && !data.discounted ? (
              <div
                className={`hide-on-small-only hide-on-med-and-up ${
                  styles.exclusionMobile
                }`}
              >
                <img
                  src="/images/mobile-promoVote.png"
                  alt={
                    staticLabel.label_cart_orderSummary_Promo
                      ? staticLabel.label_cart_orderSummary_Promo
                      : 'label_cart_orderSummary_Promo'
                  }
                  role="presentation"
                />
                {staticLabel.label_cart_lineItem_PromotionsOnlyApplyToShipToHomeItems
                  ? staticLabel.label_cart_lineItem_PromotionsOnlyApplyToShipToHomeItems
                  : 'label_cart_lineItem_PromotionsOnlyApplyToShipToHomeItems'}
              </div>
            ) : null}
          </div>{' '}
          {this.state.expanded ? (
            <div className={`${styles.notes} ${styles.desktop}`}>
              <table>
                <tbody>
                  {data.productNotes ? (
                    <tr>
                      <td>
                        {staticLabel.label_cart_notesOpen_Notes
                          ? staticLabel.label_cart_notesOpen_Notes
                          : 'label_cart_notesOpen_Notes'}:
                      </td>
                      <td>{data.productNotes}</td>
                    </tr>
                  ) : null}
                  {data.application ? (
                    <tr>
                      <td>
                        {staticLabel.label_cart_notesOpen_Application
                          ? staticLabel.label_cart_notesOpen_Application
                          : 'label_cart_notesOpen_Application'}:
                      </td>
                      <td>{data.application}</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          ) : null}
          {this.state.expanded ? (
            <div className={`${styles.popup} ${styles.mobile}`}>
              <div className={styles.header}>
                <span
                  onClick={this.onBackClick}
                  onKeyPress={/* istanbul ignore next */ () => {}}
                  role="button"
                  tabIndex={0}
                  className={styles.backButton}
                >
                  <img
                    src="/images/left_arrow.png"
                    style={{ verticalAlign: 'middle', marginRight: '6px' }}
                    alt={
                      staticLabel.label_cart_lineItem_Back
                        ? staticLabel.label_cart_lineItem_Back
                        : 'label_cart_lineItem_Back'
                    }
                  />
                  {staticLabel.label_cart_lineItem_Back
                    ? staticLabel.label_cart_lineItem_Back
                    : 'label_cart_lineItem_Back'}
                </span>
              </div>
              <div className={styles.content}>
                <span className={styles.itemName}>{data.displayName}</span>
                <span className={styles.quickNote}>{data.quickNote}</span>
                <div className={styles.divider} />
                <div className={styles.noteContainer}>
                  <div className={styles.shadowContainer}>
                    <div
                      className={`${styles.shadow} ${styles.linearShadowTop}`}
                    />
                  </div>
                  <div className={styles.notes}>
                    <div className={styles.shadowCoverTop} />
                    <div className={styles.note} style={{ marginTop: '16px' }}>
                      <span style={{ fontWeight: 'bold', color: '#000' }}>
                        {staticLabel.label_cart_notesOpen_Notes
                          ? staticLabel.label_cart_notesOpen_Notes
                          : 'label_cart_notesOpen_Notes'}:
                      </span>
                      {data.productNotes}
                    </div>
                    <br />
                    <div className={styles.note}>
                      <span style={{ fontWeight: 'bold', color: '#000' }}>
                        {staticLabel.label_cart_notesOpen_Application
                          ? staticLabel.label_cart_notesOpen_Application
                          : 'label_cart_notesOpen_Application'}:
                      </span>
                      {data.application}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
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
    appData: state.appData,
    commerceId: state.cartUpdate.commerceId,
    cartErrorItems: state.cartUpdate.cartItemError
  }),
  (dispatch: Dispatch) => ({
    removeCall: id => dispatch(itemQuantity.removeCall(id))
  })
);

export default connector(Item);
