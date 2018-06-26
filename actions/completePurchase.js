/* eslint-disable */
import axios from 'axios';
import completeData from './complete';
import { errorMessage } from './complete';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';

function sendToLittle(dispatch) {
  let originalCvv = '',
    tryAgain = true;
  function setLitleResponseFields(response) {
    document.getElementById('paypageResponseCode').value = response.response;
  }
  if (
    $('#cardNumber').css('display') == 'none' ||
    $('#cardNumber').length <= 0
  ) {
    document.getElementById('paypageResponseCode').value = '999';
    $('#submitorderbtn').click();
  } else {
    originalCvv = $('#securityCode').val();
    setLitleResponseFields({ response: '', message: '' });
    const formFields = {
      accountNum: document.getElementById('cardNumber'),
      cvv2: document.getElementById('securityCode'),
      paypageRegistrationId: document.getElementById('registrationId'),
      bin: document.getElementById('response$bin')
    };
    const litleRequest = {
      paypageId: document.getElementById('request$paypageId').value,
      reportGroup: document.getElementById('request$reportGroup').value,
      orderId: document.getElementById('request$orderId').value,
      id: new Date().getTime(),
      url: 'https://request.eprotect.vantivprelive.com'
    };

    function submitAfterLitle(response) {
      setLitleResponseFields(response);
      $('#securityCode').val(originalCvv);
      if (response.response == 870) {
				const paymentMethod = 'credit'
        //const creditCardNumber = document.getElementById('cardNumber').value;
        const creditCardCvv = document.getElementById('securityCode').value;
        const cardType = document.getElementById('cardType').value;
				const expiry = document.getElementById('expiry').value;
        const monthExp = expiry.split('/');
        const salesChannel = document.getElementById('salesChannel').value;
        const data = {
          paymentMethod,
          creditCardType: cardType,
          securityNumber: creditCardCvv,
          //creditCardNumber,
          expirationMonth: monthExp[0],
          expirationYear: monthExp[1],
          paypageResponseCode: response.response,
          registrationId: response.paypageRegistrationId,
          salesChannel
        };
        dispatch(completeData(data));
      }
      // document.forms['order_summary_form'].submit();
      // $('#submitorderbtn').click();
    }

    function onErrorAfterLitle(response) {
      setLitleResponseFields(response);
      $('#securityCode').val(originalCvv);
      // document.forms['order_summary_form'].submit();
      dispatch(errorMessage(response.message));
      // $('#submitorderbtn').click();
    }

    function timeoutOnLitle() {
      if (tryAgain == true) {
        tryAgain = false;
        setTimeout(() => {
          $('#submitorderbtn').click();
        }, 5000);
      } else {
        $('#paypageResponseCode').val('990');
        $('#submitorderbtn').click();
      }
    }

    new global.LitlePayPage().sendToLitle(
      litleRequest,
      formFields,
      submitAfterLitle,
      onErrorAfterLitle,
      timeoutOnLitle,
      15000
    );
    return false;
  }
}

export const completePurchase = () => dispatch => {
  sendToLittle(dispatch);
};
