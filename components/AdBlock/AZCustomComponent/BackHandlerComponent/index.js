/* @flow */

import React from 'react';
import styles from './styles.scss';

type Props = {
  handleBack: () => void,
  backText?: string
};

// Export this for unit testing more easily
const BackHandler = (props: Props) => (
  <div className={styles.backHandlerHeader}>
    <button
      id="myVehicleBackBtn"
      onClick={props.handleBack}
      className={styles.addServiceBack}
    >
      <img
        className={styles.addServiceLeftArrow}
        src="/images/leftBackButton.png"
        alt="left arrow"
      />
      {props.backText || 'BACK'}
    </button>
  </div>
);

BackHandler.defaultProps = {
  backText: 'BACK'
};

export default BackHandler;
