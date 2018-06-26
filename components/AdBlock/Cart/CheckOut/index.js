// @flow

import React from 'react';
import styles from './styles.scss';
import { paypalCartTermURL } from '../../../config/serviceAPI';

type Props = {
  verifyOrderCheckout: Function,
  checkOutClickTrack: () => void,
  paypalClickTrack: () => void, // Analytics
  staticLabelData: Object,
  subTotal: number,
  noOfCartItems: number,
  paypalData: Object,
  handlePaypalLookup: Function,
  toggeleTopMessage: () => void
};

type State = {
  paypalActionValue: string,
  paypalPaReqValue: string,
  paypalTermURLValue: string,
  paypalMDValue: string
};

const PaypalLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="99"
    height="24"
    viewBox="0 0 99 24"
  >
    <g fill="none" fillRule="nonzero">
      <path
        fill="#003087"
        d="M31.75 3.688H25.9c-.375 0-.75.3-.825.675l-2.325 15c-.075.3.15.525.45.525h2.775c.375 0 .75-.3.825-.675l.6-4.05a.816.816 0 0 1 .825-.675H30.1c3.825 0 6.075-1.875 6.675-5.55.225-1.575 0-2.85-.75-3.75-.825-.975-2.325-1.5-4.275-1.5zm.675 5.475c-.3 2.1-1.95 2.1-3.45 2.1h-.9l.6-3.9c0-.225.225-.375.45-.375h.375c1.05 0 2.025 0 2.55.6.375.3.525.825.375 1.575zM49.15 9.088h-2.775c-.225 0-.45.15-.45.375l-.15.75-.225-.3c-.6-.9-1.95-1.2-3.3-1.2-3.075 0-5.7 2.325-6.225 5.625-.3 1.65.075 3.225 1.05 4.275.825.975 2.1 1.425 3.525 1.425 2.475 0 3.9-1.575 3.9-1.575l-.15.75c-.075.3.15.6.45.6h2.55c.375 0 .75-.3.825-.675l1.5-9.6c.075-.15-.225-.45-.525-.45zm-3.825 5.4c-.3 1.575-1.5 2.7-3.15 2.7-.825 0-1.425-.225-1.875-.75-.45-.525-.6-1.2-.45-1.95.225-1.575 1.575-2.7 3.15-2.7.825 0 1.425.3 1.875.75.375.525.525 1.2.45 1.95zM64.075 9.088H61.3c-.3 0-.525.15-.675.375l-3.9 5.7-1.65-5.475c-.075-.375-.45-.6-.75-.6H51.55c-.3 0-.6.3-.45.675l3.075 9.075-2.925 4.05c-.225.3 0 .75.375.75H54.4c.3 0 .525-.15.675-.375l9.375-13.5c.225-.225 0-.675-.375-.675z"
      />
      <path
        fill="#009CDE"
        d="M73.375 3.688h-5.85c-.375 0-.75.3-.825.675l-2.325 14.925c-.075.3.15.525.45.525h3c.3 0 .525-.225.525-.45l.675-4.275a.816.816 0 0 1 .825-.675h1.875c3.825 0 6.075-1.875 6.675-5.55.225-1.575 0-2.85-.75-3.75-.9-.9-2.325-1.425-4.275-1.425zm.675 5.475c-.3 2.1-1.95 2.1-3.45 2.1h-.9l.6-3.9c0-.225.225-.375.45-.375h.375c1.05 0 2.025 0 2.55.6.375.3.45.825.375 1.575zM90.775 9.088H88c-.225 0-.45.15-.45.375l-.15.75-.225-.3c-.6-.9-1.95-1.2-3.3-1.2-3.075 0-5.7 2.325-6.225 5.625-.3 1.65.075 3.225 1.05 4.275.825.975 2.1 1.425 3.525 1.425 2.475 0 3.9-1.575 3.9-1.575l-.15.75c-.075.3.15.6.45.6h2.55c.375 0 .75-.3.825-.675l1.5-9.6c0-.15-.225-.45-.525-.45zm-3.9 5.4c-.3 1.575-1.5 2.7-3.15 2.7-.825 0-1.425-.225-1.875-.75-.45-.525-.6-1.2-.45-1.95.225-1.575 1.575-2.7 3.15-2.7.825 0 1.425.3 1.875.75.45.525.6 1.2.45 1.95zM94.075 4.063l-2.4 15.225c-.075.3.15.525.45.525h2.4c.375 0 .75-.3.825-.675l2.4-14.925c.075-.3-.15-.525-.45-.525h-2.7c-.3 0-.45.15-.525.375z"
      />
      <g>
        <path
          fill="#009CDE"
          d="M14.929 5.625c.21-1.575 0-2.625-.843-3.6C13.173.975 11.558.45 9.523.45H3.554c-.35 0-.771.375-.843.75L.254 17.85c0 .3.211.675.562.675h3.651l-.21 1.65c-.071.3.14.525.42.525h3.09c.352 0 .702-.225.772-.6v-.225l.632-3.9v-.15c.07-.375.421-.675.773-.675h.422c3.018 0 5.335-1.275 6.037-5.025.351-1.575.212-2.85-.631-3.75-.211-.3-.563-.525-.843-.75"
        />
        <path
          fill="#012169"
          d="M14.929 5.625c.21-1.575 0-2.625-.843-3.6C13.173.975 11.558.45 9.523.45H3.554c-.35 0-.771.375-.843.75L.254 17.85c0 .3.211.675.562.675h3.651L5.45 12.3l-.07.225c.07-.45.421-.75.842-.75h1.755c3.441 0 6.11-1.5 6.952-5.7-.07-.225 0-.3 0-.45"
        />
        <path
          fill="#003087"
          d="M6.364 5.625c.069-.225.21-.45.42-.6.14 0 .21-.075.35-.075h4.635c.563 0 1.123.075 1.546.15.14 0 .28 0 .42.075.14.075.281.075.351.15h.211c.21.075.421.225.632.3.21-1.575 0-2.625-.843-3.675C13.243.9 11.63.45 9.592.45H3.554c-.35 0-.771.3-.843.75L.254 17.85c0 .3.211.675.562.675h3.651L5.45 12.3l.914-6.675z"
        />
      </g>
    </g>
  </svg>
);

class Checkout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paypalActionValue: this.props.paypalData.acsURL,
      paypalPaReqValue: this.props.paypalData.payload,
      paypalTermURLValue: paypalCartTermURL,
      paypalMDValue: ''
    };
  }

  componentWillReceiveProps(newProps: Props) {
    if (this.props.paypalData.payload !== newProps.paypalData.payload) {
      this.setState(
        {
          paypalActionValue: newProps.paypalData.acsURL,
          paypalPaReqValue: newProps.paypalData.payload
        },
        () => {
          this.paypalForm.submit();
        }
      );
    }
  }

  paypalForm: HTMLFormElement;

  handlePaypalButtonClick = async (e: Object) => {
    e.preventDefault();
    this.props.paypalClickTrack();
    const orderVerified = await this.props.verifyOrderCheckout(true);
    if (orderVerified) {
      this.props.handlePaypalLookup(false);
    }
  };

  render() {
    return (
      <div>
        <div className={styles.checkOutContainer}>
          <div
            onClick={() => {
              this.props.toggeleTopMessage(true);
              this.props.verifyOrderCheckout();
              this.props.checkOutClickTrack();
            }}
            onKeyUp={/* istanbul ignore next */ () => false}
            role="button"
            tabIndex="0"
            className={styles.checkOutButton}
          >
            {this.props.staticLabelData &&
            this.props.staticLabelData.label_cart_orderSummary_Checkout
              ? this.props.staticLabelData.label_cart_orderSummary_Checkout
              : 'label_cart_orderSummary_Checkout'}
          </div>
          <div className={styles.checkOutSeparator}>
            {this.props.staticLabelData &&
            this.props.staticLabelData.label_cart_orderSummary_Or
              ? this.props.staticLabelData.label_cart_orderSummary_Or
              : 'label_cart_orderSummary_Or'}
          </div>
          {this.props.paypalData && (
            <form
              name="paypal"
              method="POST"
              action={this.state.paypalActionValue}
              ref={form => {
                if (form instanceof HTMLFormElement) {
                  this.paypalForm = form;
                }
              }}
            >
              <input
                type="hidden"
                name="PaReq"
                value={this.state.paypalPaReqValue}
              />
              <input
                type="hidden"
                name="TermUrl"
                value={this.state.paypalTermURLValue}
              />
              <input type="hidden" name="MD" value={this.state.paypalMDValue} />
              <button
                className={styles.paypalButton}
                onClick={this.handlePaypalButtonClick}
              >
                <PaypalLogo />
              </button>
            </form>
          )}
        </div>
        <div>
          <div className="show-on-small hide-on-med-and-up">
            <div className={`${styles.totalContainer} ${styles.bottomSection}`}>
              <div>
                {this.props.staticLabelData.label_checkout_os_Total
                  ? this.props.staticLabelData.label_checkout_os_Total
                  : 'label_checkout_os_Total'}: ${this.props.subTotal &&
                  this.props.subTotal.toFixed(2)}
              </div>
              {this.props && this.props.noOfCartItems === 1 ? (
                <div>
                  {this.props.noOfCartItems}{' '}
                  {this.props.staticLabelData.label_cart_promo_Item
                    ? this.props.staticLabelData.label_cart_promo_Item
                    : 'label_cart_promo_Item'}
                </div>
              ) : (
                <div>
                  {this.props.noOfCartItems}{' '}
                  {this.props.staticLabelData.label_cart_promo_Items
                    ? this.props.staticLabelData.label_cart_promo_Items
                    : 'label_cart_promo_Items'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
