/* @flow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import styles from './DeliveryStyles.scss';
import type { Dispatch, ReduxState } from '../../../../types';
import * as itemQuantity from '../../../../actions/itemQuantity';

type Props = {
  data: Object,
  quantityData: Object,
  storePickup: () => void,
  quantityUpdateReadyStatus: string,
  commerceId: any,
  staticLabelData: Object
};

type State = {
  toggleAvailability: boolean
};
export class DeliveryOption extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      toggleAvailability: this.props.data && this.props.data.storeItem
    };
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.commerceId === this.props.data.commerceItemId) {
      if (nextProps.quantityData) {
        if (nextProps.quantityUpdateReadyStatus === 'STORECHANGE_SUCCESS') {
          this.setState({
            toggleAvailability: !this.state.toggleAvailability
          });
        }
      }
    }
  }

  toggleActiveRadio = value => {
    const self = this;
    // const { quantityUpdateReadyStatus } = self.props;
    return () => {
      const data = {
        type: value
      };
      self.props.storePickup(data, self.props.data.commerceItemId);
    };
  };

  newPart = () => {
    const self = this;
    self.setState({
      toggleAvailability: !self.state.toggleAvailability
    });
  };

  render() {
    const { data, staticLabelData } = this.props;
    const availabilityInfo = data.skuPricingAndAvailability;
    const storeClass = this.state.toggleAvailability
      ? styles.white_active
      : styles.grey_inactive;
    const storeClass1 = !this.state.toggleAvailability
      ? styles.white_active
      : styles.grey_inactive;

    return (
      <div className={styles.deliveryOption}>
        <form className={`row ${styles.display_flex}`}>
          <div className={`${styles.pickUpStore} ${storeClass}`}>
            <div className={styles.display_flex}>
              <input
                type="radio"
                id="radio-1"
                name="StoreBtn"
                value="ship"
                className={`${styles.storePickPD} ${styles.pickup} 
                ${
                  availabilityInfo.storePickupAvailable ? '' : styles.notAllowed
                }`}
                disabled={!availabilityInfo.storePickupAvailable}
                checked={this.state.toggleAvailability}
                onChange={this.toggleActiveRadio('store')}
              />
            </div>
            <div className={styles.storeLeft}>
              <div className={styles.store_pickUp} id="storePickUpID">
                {staticLabelData.label_cart_lineItem_StorePickUp
                  ? staticLabelData.label_cart_lineItem_StorePickUp
                  : 'label_cart_lineItem_StorePickUp'}
              </div>
              <div
                className={
                  availabilityInfo.storePickupStockLabel !== 'Out of Stock' &&
                  availabilityInfo.storePickupStockLabel !== 'Not Available'
                    ? styles.greenFont
                    : styles.redFont
                }
                id="storePickUpID"
              >
                {availabilityInfo.storePickupStockLabel}
              </div>
            </div>
          </div>
          <div className={`${styles.shipHomeStore} ${storeClass1}`}>
            <div>
              <input
                className={`with-gap ${styles.shipHomeCS} ${styles.pickup}
                  ${
                    availabilityInfo.shipToHomeAvailable
                      ? ''
                      : styles.notAllowed
                  }`}
                disabled={!availabilityInfo.shipToHomeAvailable}
                name="StoreBtn"
                type="radio"
                id="storeHomeID"
                value="store"
                checked={!this.state.toggleAvailability}
                onChange={this.toggleActiveRadio('online')}
              />
            </div>
            <div className={styles.storeLeft1}>
              <div className={styles.store_pickUp}>
                {staticLabelData.label_cart_lineItem_ShipToHomeHyphenated
                  ? staticLabelData.label_cart_lineItem_ShipToHomeHyphenated
                  : 'label_cart_lineItem_ShipToHomeHyphenated'}
              </div>
              <div
                className={
                  availabilityInfo.shipToHomeStockLabel !== 'Out of Stock' &&
                  availabilityInfo.shipToHomeStockLabel !== 'Not Available'
                    ? styles.greenFont
                    : styles.redFont
                }
              >
                {this.state.toggleAvailability ? (
                  <span>{availabilityInfo.shipToHomeStockLabel}</span>
                ) : null}

                {!this.state.toggleAvailability ? (
                  <span>
                    {data.estDeliveryTime.trim() === '' ? (
                      <span>{availabilityInfo.shipToHomeStockLabel}</span>
                    ) : (
                      <span>
                        <span className={styles.desktopOnly}>
                          {data.estDeliveryTime}
                        </span>
                        <span className={styles.mobileOnly}>
                          {data.estDeliveryTime.replace('. Delivery:', '')}
                        </span>
                      </span>
                    )}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

/* istanbul ignore next */
const connector: Connector<{}, Props> = connect(
  (state: ReduxState) => ({
    quantityData: state.cartUpdate.storeData,
    quantityUpdateReadyStatus: state.cartUpdate.readyStatus,
    commerceId: state.cartUpdate.commerceId
  }),
  (dispatch: Dispatch) => ({
    storePickup: (value, id) => dispatch(itemQuantity.storePickup(value, id))
  })
);

export default connector(DeliveryOption);
