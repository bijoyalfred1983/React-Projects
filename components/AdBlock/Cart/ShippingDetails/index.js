/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scss';

type Props = {
  cartData: Object,
  staticLabelData: Object,
  changeStoreLinkInteraction: () => void // Analytics
};

export default (props: Props) => (
  <div className={styles.shippingDetailsContainer}>
    <div className={styles.containerRow}>
      <div className={styles.containerColLeft}>
        <div>
          <img
            className={styles.homeImg}
            src="/images/az-store.svg"
            alt="store pickup"
          />
        </div>
        <div className={styles.shipingDetails}>
          <div className={styles.shipTitle}>
            {props.staticLabelData.label_cart_bopus_PickUpInStoreSameDay
              ? props.staticLabelData.label_cart_bopus_PickUpInStoreSameDay
              : 'label_cart_bopus_PickUpInStoreSameDay'}
          </div>
          <div className={styles.subShipTitle}>
            {props.staticLabelData
              .label_cart_bopus_SaveTimeBySelectingPickUpInStoreAndWeLlEmailYouWhenProductsAreReady
              ? props.staticLabelData
                  .label_cart_bopus_SaveTimeBySelectingPickUpInStoreAndWeLlEmailYouWhenProductsAreReady
              : 'label_cart_bopus_SaveTimeBySelectingPickUpInStoreAndWeLlEmailYouWhenProductsAreReady'}
          </div>
          <div className={styles.shipInfo}>
            {props.staticLabelData
              .label_cart_bopus_OnlyApplicableIfOrderedMoreThanOneHourBeforeClosingTime
              ? props.staticLabelData
                  .label_cart_bopus_OnlyApplicableIfOrderedMoreThanOneHourBeforeClosingTime
              : 'label_cart_bopus_OnlyApplicableIfOrderedMoreThanOneHourBeforeClosingTime'}
          </div>
          <div className={styles.addressContainer}>
            <div className={styles.addressText}>
              <div>{(props.cartData && props.cartData.storeAddress) || ''}</div>
              <div>
                {`${(props.cartData && props.cartData.storeCity) ||
                  ''} ${(props.cartData && props.cartData.storeState) ||
                  ''} ${(props.cartData && props.cartData.storeZipcode) || ''}`}
              </div>
            </div>
            <div className={styles.linkText}>
              {props.cartData &&
                !props.cartData.open24Hours && (
                  <div className={styles.closeAtTime}>
                    {props.staticLabelData.label_cart_bopus_ClosesAt
                      ? props.staticLabelData.label_cart_bopus_ClosesAt
                      : 'label_cart_bopus_ClosesAt'}
                    {` ${(props.cartData && props.cartData.storeCloseTime) ||
                      ''}`}
                  </div>
                )}
              <button
                className={styles.linkTextUnderline}
                onClick={props.changeStoreLinkInteraction}
              >
                {props.staticLabelData.label_cart_bopus_ChangeStore
                  ? props.staticLabelData.label_cart_bopus_ChangeStore
                  : 'label_cart_bopus_ChangeStore'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.containerColRight}>
        <div>
          <img
            className={styles.shipImg}
            src="/images/shipping-truck.png"
            alt="ship to home"
          />
        </div>
        <div className={styles.shipingDetails}>
          <div className={styles.shipTitle}>
            <div className={styles.shipHomeTitle}>
              {props.staticLabelData.label_cart_shipToHome_ShipToHomeWith
                ? props.staticLabelData.label_cart_shipToHome_ShipToHomeWith
                : 'label_cart_shipToHome_ShipToHomeWith'}
            </div>
            <div className={styles.shopRunnerImg}>
              <img src="/images/shoprunner-logo.png" alt="shoprunner" />
            </div>
          </div>
          {props.cartData && (
            <div className={styles.subShipTitle}>
              {props.staticLabelData
                .label_cart_shipToHome_OrderNowAndGetItBetween
                ? props.staticLabelData
                    .label_cart_shipToHome_OrderNowAndGetItBetween
                : 'label_cart_shipToHome_OrderNowAndGetItBetween'}{' '}
              {`  ${props.cartData.srMinDate || ' '} 
              ${
                props.staticLabelData.label_cart_beforeFooter_And
                  ? props.staticLabelData.label_cart_beforeFooter_And
                  : 'label_cart_beforeFooter_And'
              }
                  ${props.cartData.srMaxDate || ' '} `}
              {props.staticLabelData.label_cart_beforeFooter_With
                ? props.staticLabelData.label_cart_beforeFooter_With
                : 'label_cart_beforeFooter_With'}{' '}
              <strong>
                {props.staticLabelData.label_cart_bopus_Free
                  ? props.staticLabelData.label_cart_bopus_Free
                  : 'label_cart_bopus_Free'}{' '}
              </strong>{' '}
              {props.staticLabelData.label_cart_bopus_2DayShipping
                ? props.staticLabelData.label_cart_bopus_2DayShipping
                : 'label_cart_bopus_2DayShipping'}
              {'.'}
            </div>
          )}
          <div className={styles.linkContent}>
            <Link
              className={`${styles.linkText} ${styles.learnMoreShipHome}`}
              to=""
            >
              {props.staticLabelData.label_cart_shipToHome_LearnMore
                ? props.staticLabelData.label_cart_shipToHome_LearnMore
                : 'label_cart_shipToHome_LearnMore'}
            </Link>
            <div className={styles.line} />
            <Link className={styles.linkText} to="">
              {props.staticLabelData.label_checkout_signin_SignIn
                ? props.staticLabelData.label_checkout_signin_SignIn
                : 'label_checkout_signin_SignIn'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
