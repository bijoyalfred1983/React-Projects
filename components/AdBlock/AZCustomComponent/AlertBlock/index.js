// @flow

import React from 'react';
import styles from './styles.scss';

type Props = {
  message: string,
  error: boolean
};

export default (props: Props) => {
  if (props.error) {
    return (
      <div>
        <div className={styles.errorPart}>
          <img src="/images/itemError-mobile.png" alt="Error icon" />
          <span>{props.message}</span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className={styles.successPart}>
        <img src="/images/itemSuccess-mobile.png" alt="Success icon" />
        <span>{props.message}</span>
      </div>
    </div>
  );
};
