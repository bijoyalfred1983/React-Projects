/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scss';

type Props = {
  staticLabelData: Object
};

export const NoItemsComponent = (props: Props) => (
  <div className={styles.container}>
    <img
      src="/images/cart_empty_icon.svg"
      alt="empty"
      height="120"
      width="120"
    />
    <div className={styles.cartIsEmpty}>
      {props.staticLabelData.label_cart_emptyCart_LooksLikeYourCartIsEmpty
        ? props.staticLabelData.label_cart_emptyCart_LooksLikeYourCartIsEmpty
        : 'label_cart_emptyCart_LooksLikeYourCartIsEmpty'}
    </div>
    <div className={styles.searchProducts}>
      {props.staticLabelData.label_cart_emptyCart_SearchForProductsAbove
        ? props.staticLabelData.label_cart_emptyCart_SearchForProductsAbove
        : 'label_cart_emptyCart_SearchForProductsAbove'}
    </div>
    <Link to="/">
      <div className={styles.homeButton}>
        {props.staticLabelData.label_cart_emptyCart_ReturnToHome
          ? props.staticLabelData.label_cart_emptyCart_ReturnToHome
          : 'label_cart_emptyCart_ReturnToHome'}
      </div>
    </Link>
  </div>
);

export default NoItemsComponent;
