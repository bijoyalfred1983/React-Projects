/* @flow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import styles from './CounterPart.scss';
import type { Dispatch, ReduxState } from '../../../../types';
import * as itemQuantity from '../../../../actions/itemQuantity';
import { jsTrack } from '../../../../containers/Analytics/ClickTrack';

type Props = {
  data: Object,
  updateQunatity: () => void,
  quantityStatus: string,
  quantityData: any,
  commerceId: any,
  quantityValue: number,
  staticLabelData: Object,
  errorValue: any,
  errorObject: Object,
  cartUpdate: Object
};

type State = {
  count: number,
  price: any,
  multiplyValue: any,
  countValue: any,
  value: any,
  oldCount: number
};

export class CounterPart extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      count: this.props.data.quantity,
      value: '',
      oldCount: this.props.data.quantity
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.commerceId === this.props.data.commerceItemId) {
      if (nextProps.quantityData || nextProps.errorValue) {
        this.validateVal(nextProps);
      }
    }
  }

  validateVal = nextProps => {
    if (
      nextProps.quantityStatus === 'ITEMQUANTITY_SUCCESS' &&
      nextProps.quantityValue
    ) {
      if (this.state.value === 'increment') {
        this.setState(previousState => ({
          count: Number(previousState.count) + 1,
          oldCount: Number(previousState.count) + 1
        }));
      } else if (this.state.value === 'decrement') {
        this.setState(previousState => ({
          count: Number(previousState.count) - 1,
          oldCount: Number(previousState.count) - 1
        }));
      } else {
        this.setState({
          count: Number(nextProps.quantityValue)
        });
      }
    } else if (nextProps.quantityStatus === 'ITEMQUANTITY_FAILURE') {
      jsTrack.trackCartItemLevelError(
        this.props.data.skuPricingAndAvailability.skuId,
        nextProps.errorObject.err &&
          nextProps.errorObject.err.response &&
          nextProps.errorObject.err.response.data.title
      );
      if (this.state.value === '') {
        this.setState({
          count: this.state.oldCount
        });
      }
    }
  };

  cartQuantityUpdate = (cartUpdateData, fullfillmentData, countValue) => {
    /* Analytics Start */
    let availableQuantityData = '';
    let typeData = '';
    if (cartUpdateData) {
      if (cartUpdateData.readyStatus === 'ITEMQUANTITY_SUCCESS') {
        if (cartUpdateData.quantityData) {
          if (cartUpdateData.quantityData.availableQuantity) {
            availableQuantityData =
              cartUpdateData.quantityData.availableQuantity;
          }
        }
      }
    }

    if (fullfillmentData.skuPricingAndAvailability) {
      const skuPricing = fullfillmentData.skuPricingAndAvailability;
      if (skuPricing.storePickupAvailable && skuPricing.shipToHomeAvailable) {
        if (
          skuPricing.storePickupAvailable === true &&
          skuPricing.shipToHomeAvailable === true
        ) {
          typeData = 'BOPUS,STH';
        }
      } else if (skuPricing.storePickupAvailable) {
        if (skuPricing.storePickupAvailable === true) {
          typeData = 'BOPUS';
        }
      } else if (skuPricing.shipToHomeAvailable) {
        if (skuPricing.shipToHomeAvailable === true) {
          typeData = 'STH';
        }
      } else if (skuPricing.storePickupAvailable) {
        if (skuPricing.storePickupAvailable.skuAvailabilityInfo) {
          if (
            skuPricing.storePickupAvailable.skuAvailabilityInfo
              .eligibleForNextDay
          ) {
            if (
              skuPricing.storePickupAvailable.skuAvailabilityInfo
                .eligibleForNextDay === true
            ) {
              typeData = 'BOPUS';
            }
          }
        }
      }
    }
    jsTrack.trackCartQtyUpdate(
      fullfillmentData.skuPricingAndAvailability.skuId,
      countValue,
      availableQuantityData,
      typeData
    );
    /* Analytics End */
  };

  incrementCount = event => {
    event.preventDefault();
    const countValue = Number(this.state.count) + 1;
    this.setState({
      value: 'increment'
    });
    const data = {
      quantity: countValue
    };
    this.props.updateQunatity(data, this.props.data.commerceItemId);

    /* Analytics Start */
    const cartUpdateData = this.props.cartUpdate ? this.props.cartUpdate : {};
    const fullfillmentData = this.props.data;
    this.cartQuantityUpdate(cartUpdateData, fullfillmentData, countValue);
    /* Analytics End */
  };

  decrementCount = event => {
    event.preventDefault();
    const countValue = Number(this.state.count) - 1;
    this.setState({
      value: 'decrement'
    });
    const data = {
      quantity: countValue
    };
    this.props.updateQunatity(data, this.props.data.commerceItemId);
    /* Analytics Start */
    const cartUpdateData = this.props.cartUpdate ? this.props.cartUpdate : {};
    const fullfillmentData = this.props.data;
    this.cartQuantityUpdate(cartUpdateData, fullfillmentData, countValue);
    /* Analytics End */
  };

  handleChange = event => {
    const numberPattern = /0[1-9]|1[0-2]/;
    const numberPattern2 = /^(?:[1-9]\d*|0)$/;
    if (
      (numberPattern.test(event.target.value) ||
        numberPattern2.test(event.target.value)) &&
      event.target.value !== '' &&
      event.target.value !== '0'
    ) {
      this.setState({
        value: '',
        oldCount: this.state.oldCount
      });
      const data = {
        quantity: event.target.value
      };
      this.props.updateQunatity(data, this.props.data.commerceItemId);
    } else {
      this.setState({
        count: 1,
        value: ''
      });
      const data = {
        quantity: 1
      };
      this.props.updateQunatity(data, this.props.data.commerceItemId);
    }
  };

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.handleChange(event);
    }
  };

  handleKeyPress = event => {
    const numberPattern = /^[0-9]*$/;
    if (
      numberPattern.test(event.target.value) ||
      event.target.value === 0 ||
      event.target.value === ''
    ) {
      this.setState({
        count: event.target.value
      });
    }

    /* Analytics start */
    if (numberPattern.test(event.target.value)) {
      if (event.target.value !== 0 && event.target.value !== '') {
        const cartUpdateData = this.props.cartUpdate
          ? this.props.cartUpdate
          : {};
        const fullfillmentData = this.props.data;
        this.cartQuantityUpdate(
          cartUpdateData,
          fullfillmentData,
          event.target.value
        );
      }
    }

    /* Analytics End */
  };

  render() {
    const { data, staticLabelData } = this.props;
    // const count = data.quantity;
    return (
      <div>
        <div className={styles.counterpart}>
          <button
            id="decrementBtn"
            className={styles.round}
            disabled={this.state.count <= 1}
            onClick={event => this.decrementCount(event)}
          >
            <img
              style={{ marginBottom: '5px' }}
              src="/images/decresvg.svg"
              alt="decrement"
            />
          </button>
          <input
            className={`center-align ${styles.qtyTextBoz}`}
            type="text"
            value={this.state.count}
            onBlur={this.handleChange}
            onChange={this.handleKeyPress}
            onKeyPress={this.handleKeyDown}
            maxLength="2"
          />
          <button
            id="incrementBtn"
            className={styles.round}
            onClick={event => this.incrementCount(event)}
          >
            <img src="/images/incresvg.svg" alt="increment" />
          </button>
        </div>
        {this.state.count > 1 && data.retailPrice ? (
          <div className={styles.unitPrice}>
            {staticLabelData.label_cart_lineItem_Each
              ? staticLabelData.label_cart_lineItem_Each
              : 'label_cart_lineItem_Each'}{' '}
            ${data.retailPrice.toFixed(2).toString()}
          </div>
        ) : null}
      </div>
    );
  }
}

/* istanbul ignore next */
const connector: Connector<{}, Props> = connect(
  (state: ReduxState) => ({
    quantityStatus: state.cartUpdate.readyStatus,
    quantityData: state.cartUpdate.quantityData,
    quantityValue: state.cartUpdate.quantityValue,
    commerceId: state.cartUpdate.commerceId,
    errorValue: state.cartUpdate.errorValue,
    errorObject: state.cartUpdate
  }),
  (dispatch: Dispatch) => ({
    updateQunatity: (value, id) =>
      dispatch(itemQuantity.fetchQuantityUpdate(value, id))
  })
);

export default connector(CounterPart);
