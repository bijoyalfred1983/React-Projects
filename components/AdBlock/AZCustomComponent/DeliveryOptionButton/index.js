// @flow
import React from 'react';
import styles from './styles.scss';

type Props = {
  isActive: boolean,
  storeDOLabel: string,
  storeStockLabel: string,
  isBTNDisable: boolean,
  buttonWidth: string,
  radiButtonClass: string,
  availibilityInfoLabelClass: string,
  deliveryOptionClass: string,
  onDeliveryOptionClick: () => void
};

const DeliveryOptionButton = (props: Props) => {
  const customStyle = {
    buttonStyle: {
      width: props.buttonWidth || '100%'
    }
  };
  const activeRadioIcon = '/images/radio-on-black.svg';
  const inActiveRadioIcon = '/images/radio-off-black.svg';
  const storeClass = props.isActive ? styles.active : styles.inactive;
  const storeImg = props.isActive ? activeRadioIcon : inActiveRadioIcon;
  const btnDisable = props.isBTNDisable ? styles.disable : '';

  return (
    <div className={styles.shipContainer} style={customStyle.buttonStyle}>
      <button
        id="storePickupAvailableBtn"
        disabled={props.isBTNDisable}
        className={`${styles.pickup} ${storeClass} ${btnDisable}`}
        onClick={() => {
          props.onDeliveryOptionClick();
        }}
      >
        <div
          className={`${styles.radioImgContent} ${props.radiButtonClass || ''}`}
        >
          <img className={styles.radioImg} src={storeImg} alt="DO_radio" />
        </div>
        <div className={styles.switchText}>
          <div className={`${styles.store} ${props.deliveryOptionClass || ''}`}>
            {props.storeDOLabel}
          </div>
          <div
            className={`${
              props.storeStockLabel !== 'Out of Stock' &&
              props.storeStockLabel !== 'Not Available'
                ? styles.instock
                : styles.notAvailable
            } ${props.availibilityInfoLabelClass || ''}`}
          >
            {props.storeStockLabel}
          </div>
        </div>
      </button>
    </div>
  );
};

export default DeliveryOptionButton;
