// @flow
import React from 'react';
import styles from './styles.scss';

type Props = {
  count: number,
  maxLength?: string,
  onInputChange: number => void,
  onIncrementDerement: number => void,
  isLighterQuantityLabel?: boolean,
  showQuantityLabel?: boolean,
  inputWidth?: string,
  inputHeight?: string,
  inputFontSize?: string,
  incrementDerementBtnSize?: string,
  hasError?: boolean,
  quantityLabelColor?: string,
  minQuantity?: number
};

const handleChange = (event, onInputChange) => {
  const numberPattern = /0[1-9]|1[0-2]/;
  const numberPattern2 = /^(?:[1-9]\d*|0)$/;
  if (
    (numberPattern.test(event.target.value) ||
      numberPattern2.test(event.target.value)) &&
    event.target.value !== '' &&
    event.target.value !== '0'
  ) {
    onInputChange(Number(event.target.value));
  } else {
    onInputChange(0);
  }
};

const handleKeyDown = (event, onInputChange) => {
  if (event.key === 'Enter') {
    handleChange(event, onInputChange);
  }
};

const handleKeyPress = (event, onInputChange) => {
  const numberPattern = /^[0-9]*$/;
  if (
    numberPattern.test(event.target.value) ||
    event.target.value === 0 ||
    event.target.value === ''
  ) {
    onInputChange(Number(event.target.value));
  }
};

const QuantityComponent = (props: Props) => {
  const customStyle = {
    inputStyle: {
      width: props.inputWidth,
      height: props.inputHeight,
      fontSize: props.inputFontSize
    },
    buttonStyle: {
      width: props.incrementDerementBtnSize,
      height: props.incrementDerementBtnSize,
      borderRadius: props.incrementDerementBtnSize
    },
    quantityLabelStyles: {
      color: props.quantityLabelColor
    }
  };
  return (
    <div
      className={`${styles.quantityMainContainer} ${
        props.isLighterQuantityLabel ? styles.quantityBlockContainer : ''
      }`}
    >
      {props.showQuantityLabel && (
        <div
          className={
            props.isLighterQuantityLabel
              ? styles.lightQtyLabel
              : styles.quantityLabel
          }
          style={customStyle.quantityLabelStyles}
        >
          {props.isLighterQuantityLabel ? 'Qty:' : 'Qty'}
        </div>
      )}
      <div className={styles.quantityContainer}>
        <button
          id="decrementBtn"
          style={customStyle.buttonStyle}
          className={styles.round}
          disabled={props.count <= props.minQuantity}
          onClick={() => {
            props.onIncrementDerement(props.count - 1);
          }}
        >
          <img src="/images/decresvg.svg" alt="decrement" />
        </button>
        <input
          name="itemQuantity"
          style={customStyle.inputStyle}
          className={`center-align ${styles.qtyTextBoz} ${
            props.hasError ? styles.errorInput : styles.normalInput
          }`}
          type="text"
          value={props.count || 0}
          onBlur={evt => {
            handleChange(evt, props.onInputChange);
          }}
          onChange={evt => {
            handleKeyPress(evt, props.onInputChange);
          }}
          onKeyPress={evt => {
            handleKeyDown(evt, props.onInputChange);
          }}
          maxLength={props.maxLength || '2'}
        />
        <button
          id="incrementBtn"
          style={customStyle.buttonStyle}
          className={styles.round}
          onClick={() => {
            props.onIncrementDerement(props.count + 1);
          }}
        >
          <img src="/images/incresvg.svg" alt="increment" />
        </button>
      </div>
    </div>
  );
};

QuantityComponent.defaultProps = {
  maxLength: '2',
  isLighterQuantityLabel: false,
  showQuantityLabel: false,
  inputWidth: '38px',
  inputHeight: '35px',
  inputFontSize: '24px',
  incrementDerementBtnSize: '30px',
  hasError: false,
  quantityLabelColor: '#323232',
  minQuantity: 1
};

export default QuantityComponent;
