/* @flow */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles.scss';

type Props = {
  staticLabelData: Object
};
const promoComponentDesktop = (props: Props.staticLabelData) => (
  <div className={styles.promoCodeCard}>
    <span className={styles.promoTextContainer}>
      <img
        src="/images/cart-star.png"
        alt="cart logo"
        className={styles.promoCartImg}
      />
      <span className={styles.promoTitleText}>
        {props !== undefined && props.label_cart_promo_Receive
          ? props.label_cart_promo_Receive.toUpperCase()
          : 'label_cart_promo_Receive'}
        {' 20% '}
        {props !== undefined &&
        props.label_cart_promo_OffShipToHomeItemsWithOurPromoCode
          ? props.label_cart_promo_OffShipToHomeItemsWithOurPromoCode.toUpperCase()
          : 'label_cart_promo_OffShipToHomeItemsWithOurPromoCode'}{' '}
        <span className={styles.couponText}>{'AutoZone123'.toUpperCase()}</span>
      </span>
    </span>
    <RaisedButton
      label={
        props !== undefined && props.label_cart_promo_ApplyNow
          ? props.label_cart_promo_ApplyNow
          : 'label_cart_promo_ApplyNow'
      }
      className={styles.applyButton}
    />
  </div>
);

const promoComponentMobile = (props: Props.staticLabelData) => (
  <div className={styles.promoCodeCardMobile}>
    <div className={styles.promoTitleText}>
      <strong>
        {props !== undefined && props.label_cart_promo_Congrats
          ? props.label_cart_promo_Congrats
          : 'label_cart_promo_Congrats'}
      </strong>
      {props !== undefined && props.label_cart_promo_YouQualifyFor
        ? props.label_cart_promo_YouQualifyFor
        : 'label_cart_promo_YouQualifyFor'}
      <span className={styles.persentageText}>
        <strong>20%</strong>
      </span>
      {props !== undefined && props.label_cart_promo_OffShipToHome
        ? props.label_cart_promo_OffShipToHome
        : 'label_cart_promo_OffShipToHome'}
    </div>
    <div className={styles.promoTextContainer}>
      <div className={styles.couponTextContent}>
        <p className={styles.couponText}>AUTOZONE123</p>
      </div>
      <RaisedButton
        label={
          props !== undefined && props.label_cart_orderSummary_Apply
            ? props.label_cart_orderSummary_Apply
            : 'label_cart_orderSummary_Apply'
        }
        className={styles.applyButton}
      />
    </div>
  </div>
);

export default (props: Props) => (
  <div className={styles.promoCodeContainer}>
    {promoComponentDesktop(props.staticLabelData)}
    {promoComponentMobile(props.staticLabelData)}
  </div>
);
