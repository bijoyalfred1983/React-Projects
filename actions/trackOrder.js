/* @flow */

import { push } from 'react-router-redux';
import _ from 'lodash/fp';
import type { Dispatch, GetState, ThunkAction } from '../types';
import azURL from '../config/serviceAPI';

const urlPath = azURL('trackOrder');

export const getOrderDetails = (
  axios: any,
  emailId: string,
  orderId: string,
  URL: string = urlPath
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'TRACK_ORDER_REQUESTING' });

  try {
    const { data } = await axios.get(
      `${URL}?emailId=${emailId}&orderId=${orderId}`
    );
    const pageData = {};
    pageData.orderSummaryVO = data.orderSummary;
    pageData.lineItemsListVO = {};
    pageData.lineItemsListVO.lineItemShippingMap = data.lineItemShippingMap;
    pageData.shippingDetails = data.shippingAddress;
    pageData.checkoutGreetingInfo = {};
    pageData.orderStatus = data.orderStatus;
    pageData.orderId = data.orderId;
    pageData.billingAddress = data.billingAddress;
    pageData.orderSubmittedDate = data.orderSubmittedDate;
    pageData.paymentMethodInfo = {};
    pageData.paymentMethodInfo.orderTotal =
      data.orderSummary && data.orderSummary.orderSubtotal;
    pageData.paymentMethodInfo.onlineOrderInfo = {
      onlineOrderId: data.orderId,
      chargeMessage: _.getOr(
        null,
        'orderSummary.onlineOrderSummary.paymentGroupInfo[0].chargeMessage',
        data
      ),
      customerFirstName: {},
      cardType: _.getOr(
        null,
        'orderSummary.onlineOrderSummary.paymentGroupInfo[0].tenderType',
        data
      ),
      emailId: data.billingAddress && data.billingAddress.email
    };
    dispatch({ type: 'ORDER_DETAILS_SUCCESS', data: pageData });
    dispatch({ type: 'TRACK_ORDER_SUCCESS' });
    dispatch(push('/orderDetails'));
  } catch (err) {
    dispatch({ type: 'TRACK_ORDER_FAILURE', err: err.response.data.title });
  }
};

export const trackOrder = /* istanbul ignore next */ (
  emailId: string,
  orderId: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(getOrderDetails(axios, emailId, orderId));
