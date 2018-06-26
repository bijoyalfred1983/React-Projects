/* @flow */

import React from 'react';
import styles from './styles.scss';

type Props = {
  staticLabelData: Object
};

export default (props: Props) => (
  <div className={styles.contactInfoContainer}>
    <div className={styles.questionTitle}>
      {props.staticLabelData.label_checkout_cart_QuestionsAllCaps
        ? props.staticLabelData.label_checkout_cart_QuestionsAllCaps
        : 'label_checkout_cart_QuestionsAllCaps'}
    </div>
    <div className={styles.contactInfo}>
      {props.staticLabelData.label_checkout_footer_ContactUsAt8002886966
        ? props.staticLabelData.label_checkout_footer_ContactUsAt8002886966
        : 'label_checkout_footer_ContactUsAt8002886966'}
      {' or '}
      <a
        className={styles.contactLinkText}
        href="mailto:customer.service@autozone.com"
      >
        {props.staticLabelData.label_checkout_footer_CustomerServiceAutozoneCom
          ? props.staticLabelData
              .label_checkout_footer_CustomerServiceAutozoneCom
          : 'label_checkout_footer_CustomerServiceAutozoneCom'}
      </a>{' '}
    </div>
  </div>
);
